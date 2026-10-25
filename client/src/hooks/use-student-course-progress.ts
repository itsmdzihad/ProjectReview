"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "codepath:student:course-progress";
const CHANGE_EVENT = "codepath:student-course-progress-changed";

function readProgress() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : {};
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, number>)
      : {};
  } catch {
    return {};
  }
}

function persistProgress(progress: Record<string, number>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // Keep the current page usable when browser storage is unavailable.
  }
}

export function useStudentCourseProgress(courseId: string, totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const syncProgress = () => {
      const savedStep = readProgress()[courseId] ?? 0;
      setCurrentStep(Math.max(0, Math.min(totalSteps, savedStep)));
      setIsReady(true);
    };

    syncProgress();
    window.addEventListener(CHANGE_EVENT, syncProgress);
    window.addEventListener("storage", syncProgress);

    return () => {
      window.removeEventListener(CHANGE_EVENT, syncProgress);
      window.removeEventListener("storage", syncProgress);
    };
  }, [courseId, totalSteps]);

  const goToStep = useCallback((step: number) => {
    const safeStep = Math.max(0, Math.min(totalSteps, step));
    const progress = readProgress();
    progress[courseId] = safeStep;
    persistProgress(progress);
    setCurrentStep(safeStep);
  }, [courseId, totalSteps]);

  const nextStep = useCallback(() => goToStep(currentStep + 1), [currentStep, goToStep]);

  return { currentStep, isReady, goToStep, nextStep };
}
