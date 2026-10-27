"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { getCourseSubmissionsAction, reviewSubmissionAction } from "@/actions/submission.actions";
import type { ProjectSubmissionsByCourse, StudentProjectSubmission } from "@/lib/project-submissions";
import type { ApiProjectSubmission, SubmissionReviewStatus } from "@/services/submission.services";

async function loadSubmissions(courseIdsKey: string, status?: "PENDING" | "APPROVED" | "REJECTED") {
  const ids = courseIdsKey ? courseIdsKey.split(",") : [];
  if (ids.length === 0) return { submissions: {} as ProjectSubmissionsByCourse, error: null as string | null };

  const results = await Promise.all(ids.map((courseId) => getCourseSubmissionsAction(courseId, { page: 1, limit: 100, status })));
  const submissions: ProjectSubmissionsByCourse = {};
  let error: string | null = null;

  results.forEach((result, index) => {
    if (result.error) {
      error ??= result.error.message;
      submissions[ids[index]] = [];
    } else {
      const records: unknown = result.data;
      submissions[ids[index]] = Array.isArray(records)
        ? records.reduce<StudentProjectSubmission[]>((mapped, value: unknown) => {
            if (!value || typeof value !== "object") return mapped;
            const submission = value as ApiProjectSubmission;
            mapped.push({
              id: submission.id,
              studentId: submission.student?.id ?? submission.studentId,
              studentName: submission.student?.name ?? "Student",
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
            });
            return mapped;
          }, [])
        : [];
      if (!Array.isArray(result.data)) {
        error ??= "The server returned an invalid submissions list.";
      }
    }
  });

  return { submissions, error };
}

export function useMentorProjectSubmissions(
  courseIds: string[],
  status?: "PENDING" | "APPROVED" | "REJECTED",
) {
  const [submissionsByCourse, setSubmissionsByCourse] = useState<ProjectSubmissionsByCourse>({});
  const [loadedQueryKey, setLoadedQueryKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const courseIdsKey = [...new Set(courseIds.filter(Boolean))].sort().join(",");
  const statusKey = status ?? "ALL";
  const selectedStatus = statusKey === "ALL" ? undefined : statusKey;
  const queryKey = `${courseIdsKey}|${statusKey}`;

  const refreshSubmissions = useCallback(async () => {
    setLoadedQueryKey(null);
    const result = await loadSubmissions(courseIdsKey, selectedStatus);
    setSubmissionsByCourse(result.submissions);
    setError(result.error);
    setLoadedQueryKey(queryKey);
    if (result.error) toast.error(result.error);
    return !result.error;
  }, [courseIdsKey, queryKey, selectedStatus]);

  useEffect(() => {
    let active = true;
    void loadSubmissions(courseIdsKey, selectedStatus).then((result) => {
      if (!active) return;
      setSubmissionsByCourse(result.submissions);
      setError(result.error);
      setLoadedQueryKey(queryKey);
      if (result.error) toast.error(result.error);
    });
    return () => { active = false; };
  }, [courseIdsKey, queryKey, selectedStatus]);

  const reviewSubmission = useCallback(async (
    submissionId: string,
    status: SubmissionReviewStatus,
    feedback?: string,
  ) => {
    const toastId = toast.loading(status === "APPROVED" ? "Approving project..." : "Sending feedback...");
    const result = await reviewSubmissionAction(submissionId, { status, feedback });
    if (result.error) {
      toast.error(result.error.message, { id: toastId });
      return false;
    }

    toast.success(status === "APPROVED" ? "Project approved." : "Project returned with feedback.", { id: toastId });
    await refreshSubmissions();
    return true;
  }, [refreshSubmissions]);

  return {
    submissionsByCourse,
    isReady: loadedQueryKey === queryKey,
    error: loadedQueryKey === queryKey ? error : null,
    refreshSubmissions,
    reviewSubmission,
  };
}
