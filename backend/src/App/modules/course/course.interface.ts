export type CreateCoursePayload = {
  title: string;
  description: string;
  coverImage?: string;
  content: string;
  status?: "DRAFT" | "PUBLISHED";
};

export type UpdateCoursePayload = {
  title?: string;
  description?: string;
  coverImage?: string | null;
  content?: string;
  status?: "DRAFT" | "PUBLISHED";
};

export type CourseQuery = {
  page?: number;
  limit?: number;
  search?: string;
};
