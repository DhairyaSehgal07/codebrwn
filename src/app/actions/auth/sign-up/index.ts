"use server";
import { CustomerCreateInput } from "@/utils/shopify-schemas/schema";
import customerCreate from "@/lib/graphql/mutations/customer-create-mutation";
import { schema } from "./formSchema";
import { STOREFRONT_TOKEN, API_URL, headers } from "@/utils/const";

interface formData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  notifications: boolean;
}

export type FormState = {
  message: string;
  // fields?: Record<string, string | boolean>;
  issues?: string[];
};

export async function onSubmitAction(data: formData): Promise<FormState> {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    return {
      message: "Invalid form data",
      issues: parsed.error.issues.map((issue) => issue.message),
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
    const res = await fetch(API_URL!, {
      method: "POST",
      headers,
      body: JSON.stringify(reqBody),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const responseData = await res.json();

    console.log(responseData);
    console.log("Request successful");

    return { message: "User registered" };
  } catch (error: any) {
    console.error("Error making request:", error);
    return { message: "Failed to register user", issues: [error.message] };
  }
}
