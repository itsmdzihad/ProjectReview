import { z } from "zod";

const registerUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name cannot exceed 100 characters"),

    email: z
      .email("Please provide a valid email address")
      .max(254, "Email is too long")
      .transform((value) => value.trim().toLowerCase()),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(72, "Password cannot exceed 72 characters"),
  })
  .strict();

const loginUserSchema = z
  .object({
    email: z
      .email("Please provide a valid email address")
      .max(254, "Email is too long")
      .transform((value) => value.trim().toLowerCase()),

    password: z
      .string()
      .min(1, "Password is required")
      .max(72, "Password cannot exceed 72 characters"),
  })
  .strict();

export const authValidation = {
  registerUserSchema,
  loginUserSchema,
};
