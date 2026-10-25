"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DEMO_STUDENT,
  PROJECT_SUBMISSIONS_CHANGE_EVENT,
  readProjectSubmissions,
  writeProjectSubmissions,
  type ProjectSubmissionDetails,
  type StudentProjectSubmission,
} from "@/lib/project-submissions";

export type { StudentProjectSubmission } from "@/lib/project-submissions";

export function useStudentProjectSubmission(courseId: string) {
  const [submission, setSubmission] = useState<StudentProjectSubmission | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const syncSubmission = () => {
      const courseSubmissions = readProjectSubmissions()[courseId] ?? [];
      setSubmission(courseSubmissions.find((item) => item.studentId === DEMO_STUDENT.id) ?? null);
      setIsReady(true);
    };

    syncSubmission();
    window.addEventListener(PROJECT_SUBMISSIONS_CHANGE_EVENT, syncSubmission);
    window.addEventListener("storage", syncSubmission);

    return () => {
      window.removeEventListener(PROJECT_SUBMISSIONS_CHANGE_EVENT, syncSubmission);
      window.removeEventListener("storage", syncSubmission);
    };
  }, [courseId]);

  const saveSubmission = useCallback((details: ProjectSubmissionDetails) => {
    const nextSubmission: StudentProjectSubmission = {
      ...details,
      studentId: DEMO_STUDENT.id,
      studentName: DEMO_STUDENT.name,
      studentEmail: DEMO_STUDENT.email,
      submittedAt: new Date().toISOString(),
    };
    const submissions = readProjectSubmissions();
    const courseSubmissions = submissions[courseId] ?? [];
    submissions[courseId] = [
      ...courseSubmissions.filter((item) => item.studentId !== DEMO_STUDENT.id),
      nextSubmission,
    ];
    writeProjectSubmissions(submissions);
    setSubmission(nextSubmission);
  }, [courseId]);

  return { submission, isReady, saveSubmission };
}
