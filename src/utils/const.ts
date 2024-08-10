export const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
export const AUTH_DOMAIN = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
export const STORAGE_BUCKET = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
export const MESSAGE_SENDER_ID = process.env.NEXT_PUBLIC_MESSAGESENDER_ID;
export const PUBLIC_APP_ID = process.env.NEXT_PUBLIC_APP_ID;
export const MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;
export const SHOPIFY_CHECKOUT_URL_COOKIE = "shopify_checkoutUrl";
export const SHOPIFY_COOKIE_EXPIRE = 90;

export const API_URL =
  process.env.NEXT_PUBLIC_FRAMEWORK === "shopify_local"
    ? process.env.NEXT_PUBLIC_LOCAL_STORE_DOMAIN
    : process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;

export const SHOPIFY_CHECKOUT_ID_COOKIE =
  process.env.NEXT_PUBLIC_FRAMEWORK === "shopify_local"
    ? "shopify_local_checkoutId"
    : "shopify_checkoutId";

export const STOREFRONT_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export const ADMIN_API_URL =
  process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_ACCESS_DOMAIN;
export const ADMIN_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN;
