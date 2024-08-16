import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import logger from "@/lib/logger";

const extractId = (shopifyId: string): string | null => {
  const match = shopifyId.match(/\/(\d+)$/);
  return match ? match[1] : null;
};

export const initialiseCart = async (shopifyId: string) => {
  try {
    const userId = extractId(shopifyId);
    if (!userId) throw new Error("Invalid Shopify ID format");

    // Create docuemnt
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
