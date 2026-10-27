import { cookies } from "next/headers";
import { env } from "@/types/env";
import type { CourseServiceResult } from "@/services/course.services";

const API_URL = env.BACKEND_URL;

export type SubmissionStatus = "PENDING" | "APPROVED" | "REJECTED";
export type SubmissionReviewStatus = Exclude<SubmissionStatus, "PENDING">;

export type ApiProjectSubmission = {
  id: string;
  projectName: string;
  repositoryUrl: string;
  liveUrl: string;
  description: string;
  status: SubmissionStatus;
  feedback: string | null;
  studentId: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  course?: { id: string; title: string; coverImage?: string | null; mentorId?: string };
  student?: { id: string; name: string; email: string };
};

export type CreateSubmissionPayload = {
  courseId: string;
  projectName: string;
  repositoryUrl: string;
  liveUrl: string;
  description: string;
};

export type UpdateSubmissionPayload = Partial<Omit<CreateSubmissionPayload, "courseId">>;

type ApiResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T;
};

async function request<T>(
  path: string,
  init?: RequestInit,
): Promise<CourseServiceResult<T>> {
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
        error: { message: result?.message ?? "Unable to complete this submission request." },
      };
    }

    return { data: result.data, error: null };
  } catch {
    return { data: null, error: { message: "Unable to complete this submission request." } };
  }
}

export const submissionServices = {
  create(payload: CreateSubmissionPayload) {
    return request<ApiProjectSubmission>("/submissions", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getMySubmissions(params?: { page?: number; limit?: number; status?: SubmissionStatus }) {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.status) query.set("status", params.status);
    return request<ApiProjectSubmission[]>(`/submissions/my-submissions${query.size ? `?${query}` : ""}`);
  },

  getCourseSubmissions(courseId: string, params?: { page?: number; limit?: number; status?: SubmissionStatus }) {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.status) query.set("status", params.status);
    const suffix = query.size ? `?${query}` : "";
    return request<ApiProjectSubmission[]>(`/submissions/course/${encodeURIComponent(courseId)}${suffix}`);
  },

  getById(id: string) {
    return request<ApiProjectSubmission>(`/submissions/${encodeURIComponent(id)}`);
  },

  update(id: string, payload: UpdateSubmissionPayload) {
    return request<ApiProjectSubmission>(`/submissions/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  delete(id: string) {
    return request<null>(`/submissions/${encodeURIComponent(id)}`, { method: "DELETE" });
  },

  review(id: string, payload: { status: SubmissionReviewStatus; feedback?: string }) {
    return request<ApiProjectSubmission>(`/submissions/${encodeURIComponent(id)}/review`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },
};
