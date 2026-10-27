"use client";

import { useCallback, useEffect, useState } from "react";

export const STUDENT_COURSE_PROGRESS_KEY = "codepath:student:course-progress";
export const STUDENT_COURSE_PROGRESS_EVENT = "codepath:student-course-progress-changed";
export const STUDENT_LEARNING_ACTIVITY_KEY = "codepath:student:learning-activity";

export function readStudentCourseProgress() {
  try {
    const stored = window.localStorage.getItem(STUDENT_COURSE_PROGRESS_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : {};
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return Object.fromEntries(Object.entries(parsed).filter((entry): entry is [string, number] =>
      typeof entry[1] === "number" && Number.isFinite(entry[1]) && entry[1] >= 0,
    ));
  } catch {
    return {};
  }
}

export function readStudentLearningActivity() {
  try {
    const stored = window.localStorage.getItem(STUDENT_LEARNING_ACTIVITY_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : {};
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return Object.fromEntries(Object.entries(parsed).filter((entry): entry is [string, number] =>
      typeof entry[1] === "number" && Number.isFinite(entry[1]) && entry[1] >= 0,
    ));
  } catch {
    return {};
  }
}

function persistProgress(progress: Record<string, number>, gainedSteps: number) {
  try {
    window.localStorage.setItem(STUDENT_COURSE_PROGRESS_KEY, JSON.stringify(progress));
    if (gainedSteps > 0) {
      const activity = readStudentLearningActivity();
      const today = new Date();
      const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
      activity[dateKey] = (activity[dateKey] ?? 0) + gainedSteps;
      window.localStorage.setItem(STUDENT_LEARNING_ACTIVITY_KEY, JSON.stringify(activity));
    }
    window.dispatchEvent(new Event(STUDENT_COURSE_PROGRESS_EVENT));
  } catch {
    // Keep the current page usable when browser storage is unavailable.
  }
}

export function useStudentCourseProgress(courseId: string, totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const syncProgress = () => {
      const savedStep = readStudentCourseProgress()[courseId] ?? 0;
      setCurrentStep(Math.max(0, Math.min(totalSteps, savedStep)));
      setIsReady(true);
    };

    syncProgress();
    window.addEventListener(STUDENT_COURSE_PROGRESS_EVENT, syncProgress);
    window.addEventListener("storage", syncProgress);

    return () => {
      window.removeEventListener(STUDENT_COURSE_PROGRESS_EVENT, syncProgress);
      window.removeEventListener("storage", syncProgress);
    };
  }, [courseId, totalSteps]);

  const goToStep = useCallback((step: number) => {
    const safeStep = Math.max(0, Math.min(totalSteps, step));
    const progress = readStudentCourseProgress();
    const previousStep = progress[courseId] ?? 0;
    progress[courseId] = safeStep;
    persistProgress(progress, Math.max(0, safeStep - previousStep));
    setCurrentStep(safeStep);
  }, [courseId, totalSteps]);

  const nextStep = useCallback(() => goToStep(currentStep + 1), [currentStep, goToStep]);

  return { currentStep, isReady, goToStep, nextStep };
}
