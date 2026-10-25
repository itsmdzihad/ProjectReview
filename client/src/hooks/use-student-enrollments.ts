"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "codepath:student:enrolled-course-ids";
const CHANGE_EVENT = "codepath:student-enrollments-changed";

function readEnrollments() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed)
      ? parsed.filter((courseId): courseId is string => typeof courseId === "string")
      : [];
  } catch {
    return [];
  }
}

function saveEnrollments(courseIds: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(courseIds));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // Keep the current page state usable when browser storage is unavailable.
  }
}

export function useStudentEnrollments() {
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const syncEnrollments = () => {
      setEnrolledCourseIds(readEnrollments());
      setIsReady(true);
    };
    syncEnrollments();
    window.addEventListener(CHANGE_EVENT, syncEnrollments);
    window.addEventListener("storage", syncEnrollments);

    return () => {
      window.removeEventListener(CHANGE_EVENT, syncEnrollments);
      window.removeEventListener("storage", syncEnrollments);
    };
  }, []);

  const enrollCourse = useCallback((courseId: string) => {
    const nextCourseIds = Array.from(new Set([...readEnrollments(), courseId]));
    saveEnrollments(nextCourseIds);
    setEnrolledCourseIds(nextCourseIds);
  }, []);

  const isEnrolled = useCallback(
    (courseId: string) => enrolledCourseIds.includes(courseId),
    [enrolledCourseIds],
  );

  return { enrolledCourseIds, enrollCourse, isEnrolled, isReady };
}
