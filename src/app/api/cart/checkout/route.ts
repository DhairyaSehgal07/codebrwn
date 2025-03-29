// what can you say about thatimport { getSession } from "@/app/actions/auth/common";
import { getCart, debouncedAddItemToCart } from "@/lib/firebase/cart";
import { NextRequest, NextResponse } from "next/server";
import { CartItem, LineItem } from "@/utils/types";
import {
  doc,
  getDoc,
  updateDoc,
  runTransaction,
  Timestamp,
} from "firebase/firestore";
import { extractId } from "@/utils/helper";
import { db } from "@/lib/firebase/firebase";
import logger from "@/lib/logger";
import { createCartMutation } from "@/lib/graphql/mutations";
import { API_URL, STOREFRONT_TOKEN, headers } from "@/utils/const";
import { getToken } from "@/app/actions/auth/common";

const createShopifyCart = async (items: CartItem[], email: string) => {
  const lines: LineItem[] = items.map((item) => ({
    merchandiseId: item.id, // Using item.id here, ensure this is the merchandiseId in your system
    quantity: item.quantity,
  }));

  try {
    const customerToken = await getToken(); // This should fetch the customerAccessToken
    const reqBody = {
      query: `
       mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      checkoutUrl
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
              }
            }
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}

      `,
      variables: {
        input: {
          lines,
          buyerIdentity: {
            countryCode: "IN",
            customerAccessToken: customerToken,
            email,
          },
        },
      },
    };

    const res = await fetch(API_URL!, {
      method: "POST",
      headers,
      body: JSON.stringify(reqBody),
    });

    if (!res.ok) {
      const errorBody = await res.json();
      logger.error("Error response from Shopify API", { errorBody });
      return {
        success: false,
        message: "Failed to create Shopify cart",
        details: errorBody,
      };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (err: any) {
    logger.error("Error creating Shopify cart", { error: err });
    return {
      success: false,
      message: "Internal server error",
      details: err.message,
    };
  }
};

export async function POST(req: NextRequest) {
  try {
    const { customerId, items, email } = await req.json();

    if (!customerId || !items || !email) {
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

    const shopifyCartResponse = await createShopifyCart(items, email);

    if (!shopifyCartResponse.success) {
      return NextResponse.json(
        {
          message: shopifyCartResponse.message,
          success: false,
          details: shopifyCartResponse.details,
        },
        { status: 500 },
      );
    }

    // Extract the cart ID from the response
    const cartId = shopifyCartResponse.data.data.cartCreate.cart.id;

    const simplifiedLines =
      shopifyCartResponse.data.data.cartCreate.cart.lines.edges.map(
        (line: any) => ({
          id: line.node.id,
          quantity: line.node.quantity,
          merchandise: line.node.merchandise,
        }),
      );
    //response.data.data.cartCreate.cart.lines.edges[0].node.id;

    // Calculate expiry date (9 days from now)
    const expiryDate = Timestamp.fromDate(
      new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    );

    // Reference to the user's cart document in Firestore
    const cartRef = doc(db, "cart", userId);

    // Update the document with the shopifyCartId and expiryDate fields
    await updateDoc(cartRef, {
      shopifyCartId: cartId,
      shopifyCartExpiry: expiryDate,
      lines: simplifiedLines,
    });

    return NextResponse.json(
      {
        message: "Shopify cart created and saved to Firebase successfully",
        success: true,
        data: shopifyCartResponse.data,
      },
      { status: 200 },
    );
  } catch (err: any) {
    logger.error("Error adding item to cart", { error: err });
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
        details: err.message,
      },
      { status: 500 },
    );
  }
}
