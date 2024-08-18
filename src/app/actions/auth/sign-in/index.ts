"use server";
import { signInSchema } from "./formSchema";
import { STOREFRONT_TOKEN, API_URL, headers } from "@/utils/const";
import logger from "@/lib/logger";
import { generateToken } from "../common";
import { Customer } from "@/utils/types";

export type FormState = {
  message: string;
  issues?: string[];
};

export async function onSignInAction(data: Customer): Promise<FormState> {
  logger.info("Sign-in form submission initiated");

  const parsed = signInSchema.safeParse(data);

  if (!parsed.success) {
    const validationIssues = parsed.error.issues.map((issue) => issue.message);
    logger.warn("Sign-in form validation failed", { issues: validationIssues });
    return {
      message: "Invalid form data",
      issues: validationIssues,
    };
  }

  try {
    // Generate token for authentication
    await generateToken(data.email, data.password);

    logger.info("User authentication successful");
    return { message: "User signed in successfully" };
  } catch (error: any) {
    logger.error("Error during sign-in process", { error: error.message });
    return { message: "Failed to sign in user", issues: [error.message] };
  }
}
