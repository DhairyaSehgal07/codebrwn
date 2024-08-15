import { z } from "zod";

export const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Invalid email address"),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters long")
    .max(40, "Password must be no more than 40 characters long"),
  notifications: z.boolean().optional(), // Checkbox is optional
});
