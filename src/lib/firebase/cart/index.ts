import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import logger from "@/lib/logger";
import _ from "lodash"; // Import lodash for debouncing

const extractId = (shopifyId: string): string | null => {
  const match = shopifyId.match(/\/(\d+)$/);
  return match ? match[1] : null;
};

export const initialiseCart = async (shopifyId: string) => {
  try {
    const userId = extractId(shopifyId);
    if (!userId) throw new Error("Invalid Shopify ID format");

    // Create document
    const cartDoc = {
      userId,
      cartInfo: {
        items: [],
        totalPrice: 0,
      },
    };
    const cartRef = doc(db, "cart", userId);
    await setDoc(cartRef, cartDoc);
    logger.info(`Cart created successfully for userId: ${userId}`);
  } catch (err: any) {
    const errorMsg = `Error initializing cart: ${err.message}`;
    logger.error(errorMsg);
    throw new Error(errorMsg);
  }
};

export const getCart = async (shopifyId: string) => {
  try {
    logger.info("getCart initiated", { shopifyId });

    const userId = extractId(shopifyId);
    if (!userId) {
      logger.warn("Invalid Shopify ID format", { shopifyId });
      throw new Error("Invalid Shopify ID format");
    }

    logger.info("Extracted user ID", { userId });

    const cartRef = doc(db, "cart", userId);
    const cartDoc = await getDoc(cartRef);

    if (cartDoc.exists()) {
      const cartData = cartDoc.data();
      logger.info("Cart found", { userId, cartData });
      return cartData;
    } else {
      logger.info("Cart not found", { userId });
      return null;
    }
  } catch (err: any) {
    logger.error("Error in getCart", { error: err.message, shopifyId });
    return null; // or you could rethrow the error or handle it differently
  }
};

export const addItemToCart = async (shopifyId: string, item: any) => {
  try {
    const userId = extractId(shopifyId);
    if (!userId) throw new Error("Invalid Shopify ID format");

    const cartRef = doc(db, "cart", userId);
    const cartDoc = await getDoc(cartRef);

    if (cartDoc.exists()) {
      const cartData = cartDoc.data();
      if (cartData) {
        // Check if the item already exists in the cart
        const existingItemIndex = cartData.cartInfo.items.findIndex(
          (cartItem: any) => cartItem.id === item.id,
        );

        if (existingItemIndex !== -1) {
          // If item exists, update its quantity using the updateItemInCart function
          await updateItemInCart(userId, item.id);
        } else {
          // Item does not exist, add it to the cart
          const updatedItems = [
            ...cartData.cartInfo.items,
            { ...item, quantity: 1 },
          ];
          const updatedTotalPrice = cartData.cartInfo.totalPrice
            ? cartData.cartInfo.totalPrice + item.price
            : item.price;

          // Update the cart document with the new items and total price
          await updateDoc(cartRef, {
            "cartInfo.items": updatedItems,
            "cartInfo.totalPrice": updatedTotalPrice,
          });
          logger.info(`Item added to cart for userId: ${userId}`, { item });
        }
      }
    } else {
      logger.warn("Cart not found for userId", { userId });
    }
  } catch (err: any) {
    const errorMsg = `Error adding item to cart: ${err.message}`;
    logger.error(errorMsg);
    throw new Error(errorMsg);
  }
};

export const updateItemInCart = async (userId: string, itemId: string) => {
  try {
    const cartRef = doc(db, "cart", userId);
    const cartDoc = await getDoc(cartRef);

    if (cartDoc.exists()) {
      const cartData = cartDoc.data();
      if (cartData) {
        // Find the index of the existing item in the cart
        const existingItemIndex = cartData.cartInfo.items.findIndex(
          (cartItem: any) => cartItem.id === itemId,
        );

        if (existingItemIndex !== -1) {
          // Item already exists, update its quantity
          const updatedItems = cartData.cartInfo.items.map(
            (cartItem: any, index: number) => {
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
            parseFloat(cartData.cartInfo.totalPrice) +
            parseFloat(cartData.cartInfo.items[existingItemIndex].price);

          // Update the cart document with the new items and total price
          await updateDoc(cartRef, {
            "cartInfo.items": updatedItems,
            "cartInfo.totalPrice": updatedTotalPrice,
          });

          logger.info(`Item quantity updated for userId: ${userId}`, {
            itemId,
          });
        } else {
          logger.warn(`Item not found in cart for userId: ${userId}`, {
            itemId,
          });
        }
      }
    } else {
      logger.warn("Cart not found for userId", { userId });
    }
  } catch (err: any) {
    const errorMsg = `Error updating item in cart: ${err.message}`;
    logger.error(errorMsg);
    throw new Error(errorMsg);
  }
};

// Debounce function for addItemToCart
const debouncedAddItemToCart = _.debounce(
  async (shopifyId: string, item: any) => {
    await addItemToCart(shopifyId, item);
  },
  300,
); // Adjust debounce delay as needed

export { debouncedAddItemToCart };
