import { cookies } from "next/headers";
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

export type CreateCoursePayload = {
  title: string;
  description: string;
  coverImage: string;
  content: string;
  status: "PUBLISHED";
};

export type CreatedCourse = {
  id: string;
  title: string;
  description: string;
  coverImage: string | null;
  content: string;
  status: "DRAFT" | "PUBLISHED";
  mentorId: string;
  createdAt: string;
  updatedAt: string;
};

export const courseServices = {
  createCourse: async function (
    payload: CreateCoursePayload,
  ): Promise<CourseServiceResult<CreatedCourse>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });
      const result = (await res.json().catch(() => null)) as
        | CourseApiResponse<CreatedCourse>
        | null;

      if (!res.ok || !result?.success || !result.data) {
        return {
          data: null,
          error: {
            message: result?.message ?? "Unable to create the course right now.",
          },
        };
      }

      return { data: result.data, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Unable to create the course right now." },
      };
    }
  },

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
