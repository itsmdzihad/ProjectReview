"use client";

import { useEffect, useState } from "react";
import {
  PROJECT_SUBMISSIONS_CHANGE_EVENT,
  readProjectSubmissions,
  type ProjectSubmissionsByCourse,
} from "@/lib/project-submissions";

export function useMentorProjectSubmissions() {
  const [submissionsByCourse, setSubmissionsByCourse] =
    useState<ProjectSubmissionsByCourse>({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const syncSubmissions = () => {
      setSubmissionsByCourse(readProjectSubmissions());
      setIsReady(true);
    };
    syncSubmissions();
    window.addEventListener(PROJECT_SUBMISSIONS_CHANGE_EVENT, syncSubmissions);
    window.addEventListener("storage", syncSubmissions);

    return () => {
      window.removeEventListener(PROJECT_SUBMISSIONS_CHANGE_EVENT, syncSubmissions);
      window.removeEventListener("storage", syncSubmissions);
    };
  }, []);

  return { submissionsByCourse, isReady };
}
