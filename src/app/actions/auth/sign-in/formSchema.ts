import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters long")
    .max(40, "Password must be no more than 40 characters long"),
});
