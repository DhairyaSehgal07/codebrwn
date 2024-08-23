import { getSession } from "@/app/actions/auth/common";
import { getCart, debouncedAddItemToCart } from "@/lib/firebase/cart";
import { NextRequest, NextResponse } from "next/server";
import { CartItem } from "@/utils/types";
import { doc, getDoc, updateDoc, runTransaction } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import logger from "@/lib/logger";

const extractId = (shopifyId: string): string | null => {
  const match = shopifyId.match(/\/(\d+)$/);
  return match ? match[1] : null;
};

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

    // Validate the data
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

      if (existingItemIndex !== -1) {
        // Item already exists, update its quantity
        const updatedItems = cartData.cartInfo.items.map(
          (cartItem: CartItem, index: number) => {
            if (index === existingItemIndex) {
              return {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              };
            }
            return cartItem;
          },
        );
        const updatedTotalPrice =
          cartData.cartInfo.totalPrice +
          cartData.cartInfo.items[existingItemIndex].price;

        // Update the cart document with new items and total price
        transaction.update(cartRef, {
          "cartInfo.items": updatedItems,
          "cartInfo.totalPrice": updatedTotalPrice,
        });
        logger.info("Item quantity updated for userId", {
          userId,
          itemId: item.id,
          newQuantity: cartData.cartInfo.items[existingItemIndex].quantity + 1,
        });
      } else {
        logger.info("Item not found in cart, adding new item for userId", {
          userId,
          itemId: item.id,
        });

        // Item does not exist, add it to the cart
        const updatedItems = [
          ...cartData.cartInfo.items,
          { ...item, quantity: 1 },
        ];
        const updatedTotalPrice = cartData.cartInfo.totalPrice + item.price;

        // Update the cart document with new items and total price
        transaction.update(cartRef, {
          "cartInfo.items": updatedItems,
          "cartInfo.totalPrice": updatedTotalPrice,
        });
        logger.info(`Item added to cart for userId: ${userId}`, { item });
      }
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
