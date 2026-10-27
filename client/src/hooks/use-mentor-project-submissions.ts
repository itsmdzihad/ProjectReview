"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { getCourseSubmissionsAction, reviewSubmissionAction } from "@/actions/submission.actions";
import type { ProjectSubmissionsByCourse, StudentProjectSubmission } from "@/lib/project-submissions";
import type { ApiProjectSubmission, SubmissionReviewStatus } from "@/services/submission.services";

async function loadSubmissions(courseIdsKey: string) {
  const ids = courseIdsKey ? courseIdsKey.split(",") : [];
  if (ids.length === 0) return { submissions: {} as ProjectSubmissionsByCourse, error: null as string | null };

  const results = await Promise.all(ids.map((courseId) => getCourseSubmissionsAction(courseId, { page: 1, limit: 100 })));
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

export function useMentorProjectSubmissions(courseIds: string[]) {
  const [submissionsByCourse, setSubmissionsByCourse] = useState<ProjectSubmissionsByCourse>({});
  const [isReady, setIsReady] = useState(false);
  const courseIdsKey = [...new Set(courseIds.filter(Boolean))].sort().join(",");

  const refreshSubmissions = useCallback(async () => {
    setIsReady(false);
    const result = await loadSubmissions(courseIdsKey);
    setSubmissionsByCourse(result.submissions);
    setIsReady(true);
    if (result.error) toast.error(result.error);
    return !result.error;
  }, [courseIdsKey]);

  useEffect(() => {
    let active = true;
    void loadSubmissions(courseIdsKey).then((result) => {
      if (!active) return;
      setSubmissionsByCourse(result.submissions);
      setIsReady(true);
      if (result.error) toast.error(result.error);
    });
    return () => { active = false; };
  }, [courseIdsKey]);

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

  return { submissionsByCourse, isReady, refreshSubmissions, reviewSubmission };
}
