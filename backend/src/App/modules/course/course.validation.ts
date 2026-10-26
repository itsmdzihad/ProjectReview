import { z } from "zod";

const createCourseSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Course title must be at least 3 characters")
      .max(150, "Course title cannot exceed 150 characters"),

    description: z
      .string()
      .trim()
      .min(10, "Description must be at least 10 characters")
      .max(1000, "Description cannot exceed 1000 characters"),

    coverImage: z.url("Cover image must be a valid URL").optional(),

    content: z
      .string()
      .trim()
      .min(20, "Course content must be at least 20 characters"),

    status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
  })
  .strict();

const updateCourseSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Course title must be at least 3 characters")
      .max(150, "Course title cannot exceed 150 characters")
      .optional(),

    description: z
      .string()
      .trim()
      .min(10, "Description must be at least 10 characters")
      .max(1000, "Description cannot exceed 1000 characters")
      .optional(),

    coverImage: z
      .union([
        z.url("Cover image must be a valid URL"),
        z.literal(""),
        z.null(),
      ])
      .optional(),

    content: z
      .string()
      .trim()
      .min(20, "Course content must be at least 20 characters")
      .optional(),

    status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const courseValidation = {
  createCourseSchema,
  updateCourseSchema,
};
