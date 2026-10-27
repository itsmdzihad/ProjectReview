"use server";

import { submissionServices } from "@/services/submission.services";
import type {
  CreateSubmissionPayload,
  SubmissionReviewStatus,
  SubmissionStatus,
  UpdateSubmissionPayload,
} from "@/services/submission.services";

export async function createSubmissionAction(payload: CreateSubmissionPayload) {
  return submissionServices.create(payload);
}

export async function getMySubmissionsAction(params?: {
  page?: number;
  limit?: number;
  status?: SubmissionStatus;
}) {
  return submissionServices.getMySubmissions(params);
}

export async function getCourseSubmissionsAction(
  courseId: string,
  params?: { page?: number; limit?: number; status?: SubmissionStatus },
) {
  return submissionServices.getCourseSubmissions(courseId, params);
}

export async function getSubmissionByIdAction(id: string) {
  return submissionServices.getById(id);
}

export async function updateSubmissionAction(id: string, payload: UpdateSubmissionPayload) {
  return submissionServices.update(id, payload);
}

export async function deleteSubmissionAction(id: string) {
  return submissionServices.delete(id);
}

export async function reviewSubmissionAction(
  id: string,
  payload: { status: SubmissionReviewStatus; feedback?: string },
) {
  return submissionServices.review(id, payload);
}
