import { env } from "@/types/env";

const API_URL = env.BACKEND_URL;

export type PublishedCourse = {
  id: string;
  title: string;
  description: string;
  coverImage: string | null;
  content: string;
  status: "PUBLISHED";
  mentor: { id: string; name: string };
  _count: { enrollments: number };
};

export type CourseServiceResult<T> =
  | { data: T; error: null }
  | { data: null; error: { message: string } };

type CourseApiResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T;
};

export const courseServices = {
  getPublishedCourses: async function (
    limit = 6,
  ): Promise<CourseServiceResult<PublishedCourse[]>> {
    try {
      const url = new URL(`${API_URL}/courses`);
      url.searchParams.set("page", "1");
      url.searchParams.set("limit", String(limit));

      const res = await fetch(url.toString(), { cache: "no-store" });
      const result = (await res.json().catch(() => null)) as
        | CourseApiResponse<PublishedCourse[]>
        | null;

      if (!res.ok || !result?.success || !Array.isArray(result.data)) {
        return {
          data: null,
          error: {
            message: result?.message ?? "Unable to load courses right now.",
          },
        };
      }

      return { data: result.data, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Unable to load courses right now." },
      };
    }
  },

  getCourseById: async function (
    id: string,
  ): Promise<CourseServiceResult<PublishedCourse>> {
    try {
      const res = await fetch(`${API_URL}/courses/${encodeURIComponent(id)}`, {
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      });
      const result = (await res.json().catch(() => null)) as
        | CourseApiResponse<PublishedCourse>
        | null;

      if (!res.ok || !result?.success || !result.data) {
        return {
          data: null,
          error: { message: result?.message ?? "Course not found." },
        };
      }

      return { data: result.data, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Unable to load this course right now." },
      };
    }
  },
};
