import type { ApiProjectSubmission } from "@/services/submission.services";

export type StudentProjectSubmission = {
  id?: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseId?: string;
  courseTitle?: string;
  projectName: string;
  repoUrl: string;
  liveLink: string;
  description: string;
  submittedAt: string;
  status?: "PENDING" | "APPROVED" | "REJECTED";
  feedback?: string | null;
};

export type ProjectSubmissionDetails = Pick<
  StudentProjectSubmission,
  "projectName" | "repoUrl" | "liveLink" | "description"
>;

export type ProjectSubmissionsByCourse = Record<string, StudentProjectSubmission[]>;

export function toStudentProjectSubmission(submission: ApiProjectSubmission): StudentProjectSubmission {
  return {
    id: submission.id,
    studentId: submission.student?.id ?? submission.studentId,
    studentName: submission.student?.name ?? "You",
    studentEmail: submission.student?.email ?? "",
    courseId: submission.courseId,
    courseTitle: submission.course?.title,
    projectName: submission.projectName,
    repoUrl: submission.repositoryUrl,
    liveLink: submission.liveUrl,
    description: submission.description,
    submittedAt: submission.createdAt,
    status: submission.status,
    feedback: submission.feedback,
  };
}
