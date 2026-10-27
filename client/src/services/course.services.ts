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
  createdAt: string;
  updatedAt: string;
  mentor: { id: string; name: string };
  _count: { enrollments: number };
};

export type MentorCourseRecord = Omit<PublishedCourse, "status" | "mentor" | "_count"> & {
  status: "DRAFT" | "PUBLISHED";
  mentorId: string;
  _count?: { enrollments?: number; submissions?: number };
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
  coverImage?: string;
  content: string;
  status: "DRAFT" | "PUBLISHED";
};

export type UpdateCoursePayload = Omit<Partial<CreateCoursePayload>, "coverImage"> & {
  coverImage?: string | null;
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

  getMyCourses: async function (params?: { page?: number; limit?: number; search?: string }): Promise<CourseServiceResult<MentorCourseRecord[]>> {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/courses/my-courses`);
      if (params?.page) url.searchParams.set("page", String(params.page));
      if (params?.limit) url.searchParams.set("limit", String(params.limit));
      if (params?.search?.trim()) url.searchParams.set("search", params.search.trim());
      const res = await fetch(url.toString(), {
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      });
      const result = (await res.json().catch(() => null)) as CourseApiResponse<MentorCourseRecord[]> | null;

      if (!res.ok || !result?.success || !Array.isArray(result.data)) {
        return { data: null, error: { message: result?.message ?? "Unable to load your courses right now." } };
      }

      return { data: result.data, error: null };
    } catch {
      return { data: null, error: { message: "Unable to load your courses right now." } };
    }
  },

  updateCourse: async function (id: string, payload: UpdateCoursePayload): Promise<CourseServiceResult<CreatedCourse>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/courses/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Cookie: cookieStore.toString() },
        body: JSON.stringify(payload),
        cache: "no-store",
      });
      const result = (await res.json().catch(() => null)) as CourseApiResponse<CreatedCourse> | null;
      if (!res.ok || !result?.success || !result.data) {
        return { data: null, error: { message: result?.message ?? "Unable to update the course right now." } };
      }
      return { data: result.data, error: null };
    } catch {
      return { data: null, error: { message: "Unable to update the course right now." } };
    }
  },

  deleteCourse: async function (id: string): Promise<CourseServiceResult<null>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/courses/${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      });
      const result = (await res.json().catch(() => null)) as CourseApiResponse<null> | null;
      if (!res.ok || !result?.success) {
        return { data: null, error: { message: result?.message ?? "Unable to delete the course right now." } };
      }
      return { data: null, error: null };
    } catch {
      return { data: null, error: { message: "Unable to delete the course right now." } };
    }
  },

  getPublishedCourses: async function (
    limit = 6,
    page = 1,
  ): Promise<CourseServiceResult<PublishedCourse[]>> {
    try {
      const url = new URL(`${API_URL}/courses`);
      url.searchParams.set("page", String(page));
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
