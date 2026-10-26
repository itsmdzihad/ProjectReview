export interface CreateSubmissionPayload {
  courseId: string;
  projectName: string;
  repositoryUrl: string;
  liveUrl: string;
  description: string;
}

export interface UpdateSubmissionPayload {
  projectName?: string;
  repositoryUrl?: string;
  liveUrl?: string;
  description?: string;
}

export interface ReviewSubmissionPayload {
  status: "APPROVED" | "REJECTED";
  feedback?: string | null;
}

export interface SubmissionQuery {
  page?: number;
  limit?: number;
  status?: "PENDING" | "APPROVED" | "REJECTED";
}
