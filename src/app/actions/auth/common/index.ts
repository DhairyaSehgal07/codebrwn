import { createCustomerTokenMutation } from "@/lib/graphql/mutations";
import { API_URL, STOREFRONT_TOKEN, headers } from "@/utils/const";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { SECRET_KEY } from "@/utils/const";
import logger from "@/lib/logger";
import { getCart } from "@/lib/firebase/cart";
import { getWishlist } from "@/lib/firebase/wishlist";

const key = new TextEncoder().encode(SECRET_KEY);

export async function encrypt(payload: any, expiresAt: string) {
  const expirationDate = new Date(expiresAt);
  const expirationTime = Math.floor(expirationDate.getTime() / 1000); // Convert to seconds

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expirationTime) // Set token expiration to the same as Shopify token
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function getToken() {
  const encryptedToken = cookies().get("customer_token")?.value;
  if (!encryptedToken) return null;
  const { token } = await decrypt(encryptedToken);
  return token;
}

export async function storeToken(accessToken: string, expiresAt: string) {
  try {
    logger.info("Storing token", { expiresAt });

    const expires = new Date(expiresAt); // Parse the expiresAt string into a Date object
    const encryptedToken = await encrypt({ token: accessToken }, expiresAt); // Pass expiresAt to encrypt

    cookies().set("customer_token", encryptedToken, {
      expires,
      httpOnly: true,
    });

    logger.info("Token stored successfully", { expiresAt });
  } catch (error: any) {
    logger.error("Error storing token", { error: error.message });
    throw new Error(`Failed to store token: ${error.message}`);
  }
}

export async function generateToken(email: string, password: string) {
  logger.info("Generating token", { email });

  const reqBody = {
    query: createCustomerTokenMutation,
    variables: {
      input: { email, password },
    },
  };

  try {
    const res = await fetch(API_URL!, {
      method: "POST",
      headers,
      body: JSON.stringify(reqBody),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const responseData = await res.json();

    const { accessToken, expiresAt } =
      responseData.data.customerAccessTokenCreate.customerAccessToken;

    logger.info("Token generated successfully", { expiresAt });

    await storeToken(accessToken, expiresAt);
  } catch (err: any) {
    logger.error("Error generating token", { error: err.message });
    throw new Error(`Failed to generate token: ${err.message}`);
  }
}

export async function getSession() {
  logger.info("Attempting to retrieve session");

  const token = await getToken();
  if (!token) {
    logger.warn("No token found, returning null");
    return null;
  }

  const reqBody = {
    query: `
      query {
        customer(customerAccessToken: "${token}") {
          id
          firstName
          lastName
          acceptsMarketing
          email
          phone
        }
      }
    `,
  };

  try {
    logger.info("Sending request to fetch customer details", { token });

    const res = await fetch(API_URL!, {
      method: "POST",
      headers,
      body: JSON.stringify(reqBody),
    });

    if (!res.ok) {
      const errorMsg = `HTTP error! status: ${res.status}`;
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }

    const responseData = await res.json();
    const customer = responseData.data.customer;

    const cart = await getCart(customer.id);
    const wishlist = await getWishlist(customer.id);

    return {
      customer,
      cart,
      wishlist,
    };
  } catch (err: any) {
    logger.error("Error occurred in fetching customer details", {
      error: err.message,
    });
    return null;
  }
}
