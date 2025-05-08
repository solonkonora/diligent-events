import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),

  email: z.string().email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),

  role: z.enum(["admin", "user"]).optional(), // Default is handled on the backend
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
