"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "codepath:student:project-submissions";
const CHANGE_EVENT = "codepath:student-project-submissions-changed";

export type StudentProjectSubmission = {
  projectName: string;
  repoUrl: string;
  liveLink: string;
  description: string;
  submittedAt: string;
};

function readSubmissions() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : {};
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, StudentProjectSubmission>)
      : {};
  } catch {
    return {};
  }
}

export function useStudentProjectSubmission(courseId: string) {
  const [submission, setSubmission] = useState<StudentProjectSubmission | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const syncSubmission = () => {
      setSubmission(readSubmissions()[courseId] ?? null);
    };

    syncSubmission();
    setIsReady(true);
    window.addEventListener(CHANGE_EVENT, syncSubmission);
    window.addEventListener("storage", syncSubmission);

    return () => {
      window.removeEventListener(CHANGE_EVENT, syncSubmission);
      window.removeEventListener("storage", syncSubmission);
    };
  }, [courseId]);

  const saveSubmission = useCallback((details: Omit<StudentProjectSubmission, "submittedAt">) => {
    const nextSubmission = { ...details, submittedAt: new Date().toISOString() };
    const submissions = readSubmissions();
    submissions[courseId] = nextSubmission;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch {
      // Keep the current page usable when browser storage is unavailable.
    }

    setSubmission(nextSubmission);
  }, [courseId]);

  return { submission, isReady, saveSubmission };
}
