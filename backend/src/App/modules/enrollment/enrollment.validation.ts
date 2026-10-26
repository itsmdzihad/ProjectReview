import { z } from "zod";

const enrollStudentSchema = z
  .object({
    courseId: z.uuid("Course ID must be a valid UUID"),
  })
  .strict();

export const enrollmentValidation = {
  enrollStudentSchema,
};
