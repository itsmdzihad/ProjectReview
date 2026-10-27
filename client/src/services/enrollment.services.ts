import { cookies } from "next/headers";
import { env } from "@/types/env";
import type { CourseServiceResult } from "@/services/course.services";

const API_URL = env.BACKEND_URL;

export type EnrollmentCourse = {
  id: string;
  title: string;
  description: string;
  coverImage: string | null;
  status: "PUBLISHED";
  content?: string;
  mentor?: { id: string; name: string };
};

export type StudentEnrollment = {
  id: string;
  studentId: string;
  courseId: string;
  createdAt: string;
  course: EnrollmentCourse;
};

export type EnrollmentStatus = {
  isEnrolled: boolean;
  enrollment: { id: string; createdAt: string } | null;
};

type ApiResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T;
};

async function request<T>(path: string, init?: RequestInit): Promise<CourseServiceResult<T>> {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        ...(init?.body ? { "Content-Type": "application/json" } : {}),
        Cookie: cookieStore.toString(),
        ...init?.headers,
      },
      cache: "no-store",
    });
    const result = (await response.json().catch(() => null)) as ApiResponse<T> | null;

    if (!response.ok || !result?.success || result.data === undefined) {
      return {
        data: null,
        error: { message: result?.message ?? "Unable to complete this enrollment request." },
      };
    }

    return { data: result.data, error: null };
  } catch {
    return { data: null, error: { message: "Unable to complete this enrollment request." } };
  }
}

export const enrollmentServices = {
  createEnrollment(courseId: string) {
    return request<StudentEnrollment>("/enrollments", {
      method: "POST",
      body: JSON.stringify({ courseId }),
    });
  },

  getMyEnrollments(params?: { page?: number; limit?: number }) {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    return request<StudentEnrollment[]>(`/enrollments${query.size ? `?${query}` : ""}`);
  },

  checkEnrollment(courseId: string) {
    return request<EnrollmentStatus>(`/enrollments/check/${encodeURIComponent(courseId)}`);
  },

  getEnrollmentById(enrollmentId: string) {
    return request<StudentEnrollment>(`/enrollments/${encodeURIComponent(enrollmentId)}`);
  },

  deleteEnrollment(enrollmentId: string) {
    return request<null>(`/enrollments/${encodeURIComponent(enrollmentId)}`, { method: "DELETE" });
  },
};
