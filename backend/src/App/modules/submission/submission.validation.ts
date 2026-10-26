import { z } from "zod";

const createSubmissionSchema = z
  .object({
    courseId: z.uuid("Course ID must be a valid UUID"),

    projectName: z
      .string()
      .trim()
      .min(3, "Project name must be at least 3 characters")
      .max(150, "Project name cannot exceed 150 characters"),

    repositoryUrl: z.url("Repository URL must be a valid URL"),

    liveUrl: z.url("Live URL must be a valid URL"),

    description: z
      .string()
      .trim()
      .min(10, "Description must be at least 10 characters")
      .max(3000, "Description cannot exceed 3000 characters"),
  })
  .strict();

const updateSubmissionSchema = z
  .object({
    projectName: z
      .string()
      .trim()
      .min(3, "Project name must be at least 3 characters")
      .max(150, "Project name cannot exceed 150 characters")
      .optional(),

    repositoryUrl: z.url("Repository URL must be a valid URL").optional(),

    liveUrl: z.url("Live URL must be a valid URL").optional(),

    description: z
      .string()
      .trim()
      .min(10, "Description must be at least 10 characters")
      .max(3000, "Description cannot exceed 3000 characters")
      .optional(),
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one field must be provided",
  );

const reviewSubmissionSchema = z
  .object({
    status: z.enum(["APPROVED", "REJECTED"]),

    feedback: z
      .string()
      .trim()
      .max(3000, "Feedback cannot exceed 3000 characters")
      .optional(),
  })
  .strict()
  .refine(
    (data) =>
      data.status !== "REJECTED" && data.status !== "APPROVED"
        ? false
        : data.status !== "REJECTED" || Boolean(data.feedback?.trim()),
    {
      message: "Feedback is required when rejecting a submission",
      path: ["feedback"],
    },
  );

export const submissionValidation = {
  createSubmissionSchema,
  updateSubmissionSchema,
  reviewSubmissionSchema,
};
