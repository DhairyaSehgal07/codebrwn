import { db } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import logger from "@/lib/logger";
import { WishlistItem } from "@/utils/types";

const extractId = (shopifyId: string): string | null => {
  const match = shopifyId.match(/\/(\d+)$/);
  return match ? match[1] : null;
};

export const initialiseWishlist = async (shopifyId: string) => {
  try {
    const userId = extractId(shopifyId);
    if (!userId) throw new Error("Invalid Shopify ID format");

    const wishlistDoc = {
      userId,
      items: [],
    };

    const wishlistRef = doc(db, "wishlist", userId);
    await setDoc(wishlistRef, wishlistDoc);
    logger.info(`Wishlist created successfully for userId: ${userId}`);
  } catch (err: any) {
    const errorMsg = `Error initializing wishlist: ${err.message}`;
    logger.error(errorMsg);
    throw new Error(errorMsg);
  }
};

export const getWishlist = async (shopifyId: string) => {
  try {
    logger.info("getWishlist initiated", { shopifyId });

    const userId = extractId(shopifyId);
    if (!userId) {
      logger.warn("Invalid Shopify ID format", { shopifyId });
      throw new Error("Invalid Shopify ID format");
    }

    logger.info("Extracted user ID", { userId });

    const wishlistRef = doc(db, "wishlist", userId);
    const wishlistDoc = await getDoc(wishlistRef);

    if (wishlistDoc.exists()) {
      const wishlistData = wishlistDoc.data();
      logger.info("Wishlist found", { userId, wishlistData });
      return wishlistData;
    } else {
      logger.info("Wishlist not found", { userId });
      return null;
    }
  } catch (err: any) {
    logger.error("Error in getWishlist", { error: err.message, shopifyId });
    return null; // or you could rethrow the error or handle it differently
  }
};

export const removeFromWishlist = async (
  shopifyId: string,
  itemName: string,
) => {
  try {
    const userId = extractId(shopifyId);
    if (!userId) throw new Error("Invalid Shopify ID format");

    const wishlistRef = doc(db, "wishlist", userId);

    await runTransaction(db, async (transaction) => {
      const wishlistDoc = await transaction.get(wishlistRef);

      if (!wishlistDoc.exists()) {
        throw new Error("Wishlist does not exist");
      }

      const wishlistData = wishlistDoc.data();
      if (!wishlistData || !wishlistData.items) {
        throw new Error("Wishlist data is missing or corrupted");
      }

      const updatedItems = wishlistData.items.filter(
        (wishlistItem: WishlistItem) => wishlistItem.name !== itemName,
      );

      if (updatedItems.length === wishlistData.items.length) {
        // Item not found in the wishlist
        logger.info("Item not found in wishlist", { userId, itemName });
        return; // No update needed
      }

      // Update the wishlist document with the new items array
      transaction.set(wishlistRef, { items: updatedItems });
      logger.info("Item removed from wishlist", { userId, itemName });
    });

    return {
      message: "Item removed from wishlist successfully",
      success: true,
    };
  } catch (err: any) {
    const errorMsg = `Error removing item from wishlist: ${err.message}`;
    logger.error(errorMsg);
    return { message: errorMsg, success: false };
  }
};
