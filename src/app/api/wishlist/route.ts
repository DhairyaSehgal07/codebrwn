import { getSession } from "@/app/actions/auth/common";
import { getWishlist } from "@/lib/firebase/wishlist";
import { WishlistItem } from "@/utils/types";
import { doc, getDoc, updateDoc, runTransaction } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { NextRequest, NextResponse } from "next/server";
import { extractId } from "@/utils/helper";
import logger from "@/lib/logger";

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

    const wishlist = await getWishlist(session.id);

    return NextResponse.json(
      {
        success: true,
        wishlist,
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
    const { customerId, item }: { customerId: string; item: WishlistItem } =
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

    const wishlistRef = doc(db, "wishlist", userId);

    await runTransaction(db, async (transaction) => {
      const wishlistDoc = await transaction.get(wishlistRef);

      let updatedItems: WishlistItem[] = [];
      if (wishlistDoc.exists()) {
        const wishlistData = wishlistDoc.data();
        if (!wishlistData) {
          throw new Error("Wishlist data is missing");
        }

        const existingItemIndex = wishlistData.items.findIndex(
          (wishlistItem: WishlistItem) => wishlistItem.name === item.name,
        );

        if (existingItemIndex === -1) {
          // Item does not exist, add it to the wishlist
          updatedItems = [...wishlistData.items, item];
          logger.info("Item added to wishlist for userId", { userId, item });
        } else {
          // Item exists, remove it from the wishlist
          updatedItems = wishlistData.items.filter(
            (wishlistItem: WishlistItem) => wishlistItem.name !== item.name,
          );
          logger.info("Item removed from wishlist for userId", {
            userId,
            item,
          });
        }
      } else {
        // Wishlist does not exist, create it with the new item
        updatedItems = [item];
        logger.info("Wishlist created and item added for userId", {
          userId,
          item,
        });
      }

      // Update the wishlist document with new items
      transaction.set(wishlistRef, { items: updatedItems });
    });

    return NextResponse.json(
      { message: "Wishlist updated successfully", success: true },
      { status: 200 },
    );
  } catch (err: any) {
    logger.error("Error updating wishlist", { error: err });
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 },
    );
  }
}
