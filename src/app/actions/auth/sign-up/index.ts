"use server";
import { CustomerCreateInput } from "@/utils/shopify-schemas/schema";
import customerCreate from "@/lib/graphql/mutations/customer-create-mutation";
import { schema } from "./formSchema";
import { STOREFRONT_TOKEN, API_URL, headers } from "@/utils/const";
import logger from "@/lib/logger";
import { generateToken } from "../common";
import { initialiseCart } from "@/lib/firebase/cart";
import { initialiseWishlist } from "@/lib/firebase/wishlist";
import { Customer } from "@/utils/types";

export type FormState = {
  message: string;
  issues?: string[];
};

export async function onSubmitAction(data: Customer): Promise<FormState> {
  logger.info("Form submission initiated");

  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    const validationIssues = parsed.error.issues.map((issue) => issue.message);
    logger.warn("Form validation failed", { issues: validationIssues });
    return {
      message: "Invalid form data",
      issues: validationIssues,
    };
  }

  const input: CustomerCreateInput = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    acceptsMarketing: data.notifications,
  };

  const reqBody = {
    query: customerCreate,
    variables: {
      input,
    },
  };

  try {
    logger.info("Sending registration request", { input });
    const res = await fetch(API_URL!, {
      method: "POST",
      headers,
      body: JSON.stringify(reqBody),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const responseData = await res.json();

    if (responseData.data.customerCreate.customer) {
      const customer = responseData.data.customerCreate.customer;
      // generate token
      await generateToken(data.email, data.password);

      // init cart
      await initialiseCart(customer.id);

      // init wishlist
      await initialiseWishlist(customer.id);

      logger.info("User init successful");
      return { message: "User registered" };
    }
    throw new Error("Customer creation failed");
  } catch (error: any) {
    logger.error("Error making request", { error: error.message });
    return { message: "Failed to register user", issues: [error.message] };
  }
}
