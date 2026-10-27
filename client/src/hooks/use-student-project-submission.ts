"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  createSubmissionAction,
  deleteSubmissionAction,
  getMySubmissionsAction,
  updateSubmissionAction,
} from "@/actions/submission.actions";
import {
  toStudentProjectSubmission,
  type ProjectSubmissionDetails,
  type StudentProjectSubmission,
} from "@/lib/project-submissions";

export type { StudentProjectSubmission } from "@/lib/project-submissions";

export function useStudentProjectSubmission(courseId: string) {
  const [submission, setSubmission] = useState<StudentProjectSubmission | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let active = true;
    void getMySubmissionsAction({ page: 1, limit: 100 }).then((result) => {
      if (!active) return;
      if (result.error) {
        toast.error(result.error.message);
        setSubmission(null);
      } else {
        const courseSubmission = result.data.find((item) => item.courseId === courseId);
        setSubmission(courseSubmission ? toStudentProjectSubmission(courseSubmission) : null);
      }
      setIsReady(true);
    });
    return () => { active = false; };
  }, [courseId]);

  const saveSubmission = useCallback(async (details: ProjectSubmissionDetails) => {
    const toastId = toast.loading(submission ? "Updating project submission..." : "Submitting project...");
    const result = submission?.id
      ? await updateSubmissionAction(submission.id, {
          projectName: details.projectName,
          repositoryUrl: details.repoUrl,
          liveUrl: details.liveLink,
          description: details.description,
        })
      : await createSubmissionAction({
          courseId,
          projectName: details.projectName,
          repositoryUrl: details.repoUrl,
          liveUrl: details.liveLink,
          description: details.description,
        });

    if (result.error) {
      toast.error(result.error.message, { id: toastId });
      return false;
    }

    setSubmission(toStudentProjectSubmission(result.data));
    toast.success(submission ? "Project submission updated." : "Project submitted successfully.", { id: toastId });
    return true;
  }, [courseId, submission]);

  const removeSubmission = useCallback(async () => {
    if (!submission?.id) return false;

    const toastId = toast.loading("Deleting project submission...");
    const result = await deleteSubmissionAction(submission.id);
    if (result.error) {
      toast.error(result.error.message, { id: toastId });
      return false;
    }

    setSubmission(null);
    toast.success("Project submission deleted.", { id: toastId });
    return true;
  }, [submission]);

  return { submission, isReady, saveSubmission, removeSubmission };
}
