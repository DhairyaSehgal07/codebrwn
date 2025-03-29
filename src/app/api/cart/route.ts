import { getSession } from "@/app/actions/auth/common";
import { getCart, debouncedAddItemToCart } from "@/lib/firebase/cart";
import { NextRequest, NextResponse } from "next/server";
import { CartItem } from "@/utils/types";
import { doc, runTransaction } from "firebase/firestore";
import { extractId } from "@/utils/helper";
import { db } from "@/lib/firebase/firebase";
import logger from "@/lib/logger";
import { API_URL, headers } from "@/utils/const";
import {
  cartLinesAddMutation,
  cartLinesUpdateMutation,
  cartLinesRemoveMutation,
} from "@/lib/graphql/mutations";

// Helper to interact with Shopify API

// Shopify Add Line Items
const shopifyLinesAdd = async (cartId: string, item: CartItem) => {
  const shopifyCartItem = {
    quantity: item.quantity,
    merchandiseId: item.id,
  };

  const variables = {
    cartId,
    lines: [shopifyCartItem],
  };

  const reqBody = {
    query: cartLinesAddMutation,
    variables,
  };

  try {
    const res = await fetch(API_URL!, {
      method: "POST",
      headers,
      body: JSON.stringify(reqBody),
    });

    if (!res.ok) {
      console.log(res.status);
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const result = await res.json();

    return result;
  } catch (error: any) {
    // Handle any network or other errors
    throw new Error(`Error updating Shopify cart lines: ${error.message}`);
  }
};

// Shopify Update Line Items
const shopifyLinesUpdate = async (
  cartId: string,
  lineId: string,
  merchandiseId: string,
  type: "INCREMENT" | "DECREMENT",
  currentQuantity: number,
) => {
  const newQuantity =
    type === "DECREMENT" && currentQuantity > 1
      ? currentQuantity - 1
      : type === "INCREMENT"
        ? currentQuantity + 1
        : currentQuantity; // Ensure no change if type is DECREMENT and quantity is 1

  const shopifyCartItem = {
    id: lineId,
    merchandiseId: merchandiseId,
    quantity: newQuantity,
  };

  const variables = {
    cartId,
    lines: [shopifyCartItem],
  };

  const reqBody = {
    query: cartLinesUpdateMutation, // Ensure this is defined with the correct mutation string
    variables,
  };

  try {
    const res = await fetch(API_URL!, {
      method: "POST",
      headers,
      body: JSON.stringify(reqBody),
    });

    if (!res.ok) {
      console.log(res.status);
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const result = await res.json();
    console.log(JSON.stringify(result));
    return result;
  } catch (error: any) {
    throw new Error(`Error updating Shopify cart lines: ${error.message}`);
  }
};

// Shopify Remove Line Items
const shopifyLinesRemove = async (cartId: string, lineId: string) => {
  const variables = {
    cartId,
    lineIds: [lineId], // Fix variable name here
  };
  const reqBody = {
    query: cartLinesRemoveMutation,
    variables,
  };

  try {
    const res = await fetch(API_URL!, {
      method: "POST",
      headers,
      body: JSON.stringify(reqBody),
    });

    if (!res.ok) {
      console.log(res.status);
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    console.log("remove handler is running....");

    const result = await res.json();

    console.log(JSON.stringify(result));

    return result;
  } catch (error: any) {
    // Handle any network or other errors
    throw new Error(`Error updating Shopify cart lines: ${error.message}`);
  }
};

//--------------------------------------- ROUTE HANDLERS-------------------------------------------------------------------
export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "No session found",
        },
        { status: 200 },
      );
    }

    const cart = await getCart(session.id);

    return NextResponse.json(
      {
        success: true,
        cart,
      },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message, success: false },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { customerId, item }: { customerId: string; item: CartItem } =
      await req.json();

    if (!customerId || !item) {
      return NextResponse.json(
        { message: "Invalid input data", success: false },
        { status: 400 },
      );
    }

    const userId = extractId(customerId);
    if (!userId) {
      return NextResponse.json(
        { message: "Invalid Shopify ID format", success: false },
        { status: 400 },
      );
    }

    const cartRef = doc(db, "cart", userId);

    await runTransaction(db, async (transaction) => {
      const cartDoc = await transaction.get(cartRef);

      if (!cartDoc.exists()) {
        logger.warn("Cart not found for user", { userId });
        return NextResponse.json(
          { message: "Cart not found", success: false },
          { status: 404 },
        );
      }

      const cartData = cartDoc.data();
      if (!cartData) {
        throw new Error("Cart data is missing");
      }

      const existingItemIndex = cartData.cartInfo.items.findIndex(
        (cartItem: any) => cartItem.id === item.id,
      );

      const shopifyCartId = cartData?.shopifyCartId;
      const shopifyCartExpiry = cartData?.shopifyCartExpiry?.toDate();

      if (existingItemIndex != -1) {
        const itemToBeUpdated = cartData.lines.find(
          (line: any) => line.merchandise.id === item.id,
        );

        const result = await shopifyLinesUpdate(
          shopifyCartId,
          itemToBeUpdated.id,
          itemToBeUpdated.merchandise.id,
          "INCREMENT",
          item.quantity,
        );
        if (result) {
          const lines = result.data.cartLinesUpdate.cart.lines.edges.map(
            (edge: any) => ({
              id: edge.node.id,
              quantity: edge.node.quantity,
              merchandise: {
                id: edge.node.merchandise.id,
                title: edge.node.merchandise.title,
              },
            }),
          );

          // Update Firebase lines
          transaction.update(cartRef, { lines });
        }
      } else {
        if (
          shopifyCartId &&
          shopifyCartExpiry &&
          new Date() <= shopifyCartExpiry
        ) {
          if (existingItemIndex !== -1) {
            // await shopifyLinesUpdate(shopifyCartId, item, "INCREMENT");
          } else {
            const result = await shopifyLinesAdd(shopifyCartId, item);
            // also update the lines array with the item
            const lines = result.data.cartLinesAdd.cart.lines.edges.map(
              (edge: any) => ({
                id: edge.node.id,
                quantity: edge.node.quantity,
                merchandise: {
                  id: edge.node.merchandise.id,
                  title: edge.node.merchandise.title,
                },
              }),
            );

            transaction.update(cartRef, {
              lines: lines,
            });
          }
        }
      }

      const updatedItems =
        existingItemIndex !== -1
          ? cartData.cartInfo.items.map((cartItem: CartItem, index: number) =>
              index === existingItemIndex
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem,
            )
          : [...cartData.cartInfo.items, { ...item, quantity: 1 }];
      const updatedTotalPrice =
        existingItemIndex !== -1
          ? cartData.cartInfo.totalPrice +
            cartData.cartInfo.items[existingItemIndex].price
          : cartData.cartInfo.totalPrice + item.price;

      transaction.update(cartRef, {
        "cartInfo.items": updatedItems,
        "cartInfo.totalPrice": updatedTotalPrice,
      });
    });

    return NextResponse.json(
      { message: "Item added to cart successfully", success: true },
      { status: 200 },
    );
  } catch (err: any) {
    logger.error("Error adding item to cart", { error: err });
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const {
      customerId,
      itemId,
      type,
    }: { customerId: string; itemId: string; type: "INCREMENT" | "DECREMENT" } =
      await req.json();

    // Validate the data
    if (!customerId || !itemId || !type) {
      return NextResponse.json(
        { message: "Invalid input data", success: false },
        { status: 400 },
      );
    }

    const userId = extractId(customerId);
    if (!userId) {
      return NextResponse.json(
        { message: "Invalid Shopify ID format", success: false },
        { status: 400 },
      );
    }

    const cartRef = doc(db, "cart", userId);

    await runTransaction(db, async (transaction) => {
      const cartDoc = await transaction.get(cartRef);

      if (!cartDoc.exists()) {
        logger.warn("Cart not found for user", { userId });
        return NextResponse.json(
          { message: "Cart not found", success: false },
          { status: 404 },
        );
      }

      const cartData = cartDoc.data();
      if (!cartData) {
        throw new Error("Cart data is missing");
      }

      const existingItemIndex = cartData.cartInfo.items.findIndex(
        (cartItem: any) => cartItem.id === itemId,
      );

      if (existingItemIndex === -1) {
        logger.warn("Item not found in cart for userId", { userId, itemId });
        return NextResponse.json(
          { message: "Item not found in cart", success: false },
          { status: 404 },
        );
      }

      const currentQuantity =
        cartData.cartInfo.items[existingItemIndex].quantity;
      const shopifyCartId = cartData?.shopifyCartId;
      const shopifyCartExpiry = cartData?.shopifyCartExpiry?.toDate();
      const itemToBeUpdated = cartData.lines.find(
        (line: any) => line.merchandise.id === itemId,
      );

      if (
        shopifyCartId &&
        shopifyCartExpiry &&
        new Date() <= shopifyCartExpiry
      ) {
        console.log("Updating Shopify cart with lineId:", itemToBeUpdated.id);

        // Update the Shopify cart
        const result = await shopifyLinesUpdate(
          shopifyCartId,
          itemToBeUpdated.id,
          itemToBeUpdated.merchandise.id,
          type,
          currentQuantity,
        );

        if (result) {
          const lines = result.data.cartLinesUpdate.cart.lines.edges.map(
            (edge: any) => ({
              id: edge.node.id,
              quantity: edge.node.quantity,
              merchandise: {
                id: edge.node.merchandise.id,
                title: edge.node.merchandise.title,
              },
            }),
          );

          // Update Firebase lines
          transaction.update(cartRef, { lines });
        }
      }

      // Update local cartInfo.items
      let updatedItems;

      if (type === "INCREMENT") {
        updatedItems = cartData.cartInfo.items.map(
          (cartItem: any, index: number) =>
            index === existingItemIndex
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem,
        );

        logger.info("Item quantity incremented for userId", {
          userId,
          itemId,
          newQuantity: currentQuantity + 1,
        });
      } else if (type === "DECREMENT" && currentQuantity > 1) {
        updatedItems = cartData.cartInfo.items.map(
          (cartItem: any, index: number) =>
            index === existingItemIndex
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem,
        );

        logger.info("Item quantity decremented for userId", {
          userId,
          itemId,
          newQuantity: currentQuantity - 1,
        });
      } else if (type === "DECREMENT" && currentQuantity === 1) {
        logger.warn("Cannot decrement quantity below 1 for userId", {
          userId,
          itemId,
        });
        return NextResponse.json(
          { message: "Cannot decrement quantity below 1", success: false },
          { status: 400 },
        );
      }

      // Recalculate total price after the quantity update
      const newTotalPrice = updatedItems.reduce(
        (total: number, item: any) => total + item.price * item.quantity,
        0,
      );

      transaction.update(cartRef, {
        "cartInfo.items": updatedItems,
        "cartInfo.totalPrice": newTotalPrice,
      });
    });

    return NextResponse.json(
      { message: "Item quantity updated successfully", success: true },
      { status: 200 },
    );
  } catch (err: any) {
    logger.error("Error updating item quantity in cart", { error: err });
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { customerId, itemId }: { customerId: string; itemId: string } =
      await req.json();

    // Validate the data
    if (!customerId || !itemId) {
      return NextResponse.json(
        { message: "Invalid input data", success: false },
        { status: 400 },
      );
    }

    const userId = extractId(customerId);
    if (!userId) {
      return NextResponse.json(
        { message: "Invalid Shopify ID format", success: false },
        { status: 400 },
      );
    }

    const cartRef = doc(db, "cart", userId);

    await runTransaction(db, async (transaction) => {
      const cartDoc = await transaction.get(cartRef);

      if (!cartDoc.exists()) {
        logger.warn("Cart not found for user", { userId });
        return NextResponse.json(
          { message: "Cart not found", success: false },
          { status: 404 },
        );
      }

      const cartData = cartDoc.data();
      if (!cartData) {
        throw new Error("Cart data is missing");
      }

      const shopifyCartId = cartData?.shopifyCartId;
      const shopifyCartExpiry = cartData?.shopifyCartExpiry?.toDate();

      const itemToBeRemoved = cartData.lines.find(
        (line: any) => line.merchandise.id === itemId,
      );

      if (!itemToBeRemoved || !itemToBeRemoved.id) {
        // If item to be removed is not found or has an invalid ID
        logger.warn(
          "Item to be removed not found in Shopify cart or has invalid ID",
          {
            userId,
            itemId,
          },
        );
        return NextResponse.json(
          { message: "Item not found in Shopify cart", success: false },
          { status: 404 },
        );
      }

      // Check if the Shopify cart is valid
      if (
        shopifyCartId &&
        shopifyCartExpiry &&
        new Date() <= shopifyCartExpiry
      ) {
        console.log("shopifyCartId:", shopifyCartId);
        console.log(
          "Removing item from Shopify cart with lineId:",
          itemToBeRemoved.id,
        );

        const result = await shopifyLinesRemove(
          shopifyCartId,
          itemToBeRemoved.id,
        );

        if (result) {
          const lines = result.data.cartLinesRemove.cart.lines.edges.map(
            (edge: any) => ({
              id: edge.node.id,
              quantity: edge.node.quantity,
              merchandise: {
                id: edge.node.merchandise.id,
                title: edge.node.merchandise.title,
              },
            }),
          );

          transaction.update(cartRef, {
            lines: lines,
          });
        }
      }

      const existingItemIndex = cartData.cartInfo.items.findIndex(
        (cartItem: any) => cartItem.id === itemId,
      );

      if (existingItemIndex !== -1) {
        // Item exists in Firebase, remove it from cartInfo
        const itemToRemove = cartData.cartInfo.items[existingItemIndex];
        const updatedItems = cartData.cartInfo.items.filter(
          (cartItem: any) => cartItem.id !== itemId,
        );

        // Update the total price by subtracting price * quantity
        const itemTotalPrice = itemToRemove.price * itemToRemove.quantity;
        const updatedTotalPrice = cartData.cartInfo.totalPrice - itemTotalPrice;

        // Update the cart document with new items and total price
        transaction.update(cartRef, {
          "cartInfo.items": updatedItems,
          "cartInfo.totalPrice": updatedTotalPrice,
        });

        logger.info("Item removed from cart for userId", {
          userId,
          itemId,
        });
      } else {
        logger.warn("Item not found in cart for userId", { userId, itemId });
        return NextResponse.json(
          { message: "Item not found in cart", success: false },
          { status: 404 },
        );
      }
    });

    return NextResponse.json(
      { message: "Item removed from cart successfully", success: true },
      { status: 200 },
    );
  } catch (err: any) {
    logger.error("Error removing item from cart", { error: err });
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 },
    );
  }
}
