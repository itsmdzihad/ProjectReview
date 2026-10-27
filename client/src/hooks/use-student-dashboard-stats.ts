"use client";

import { useEffect, useMemo, useState } from "react";
import { getStudentDashboardAnalyticsAction } from "@/actions/user.actions";
import type { StudentDashboardAnalytics } from "@/services/user.services";
import {
  readStudentCourseProgress,
  STUDENT_COURSE_PROGRESS_EVENT,
} from "@/hooks/use-student-course-progress";

function getDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function useStudentDashboardStats(
  enrollmentsReady: boolean,
) {
  const [progressByCourse, setProgressByCourse] = useState<Record<string, number>>({});
  const [analytics, setAnalytics] = useState<StudentDashboardAnalytics | null>(null);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const syncProgress = () => setProgressByCourse(readStudentCourseProgress());
    window.addEventListener(STUDENT_COURSE_PROGRESS_EVENT, syncProgress);
    window.addEventListener("storage", syncProgress);
    syncProgress();
    return () => {
      window.removeEventListener(STUDENT_COURSE_PROGRESS_EVENT, syncProgress);
      window.removeEventListener("storage", syncProgress);
    };
  }, []);

  useEffect(() => {
    if (!enrollmentsReady) return;
    let active = true;

    void getStudentDashboardAnalyticsAction().then((result) => {
      if (!active) return;
      setAnalytics(result.data);
      setAnalyticsError(result.error?.message ?? null);
      setIsReady(true);
    });

    return () => {
      active = false;
    };
  }, [enrollmentsReady]);

  const weeklyActivity = useMemo(() => {
    if (analytics) return analytics.weeklyActivity;

    const today = new Date();
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - index));
      return {
        date: getDateKey(date),
        day: new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(date),
        count: 0,
      };
    });
  }, [analytics]);

  return {
    analytics,
    analyticsError,
    progressByCourse,
    submittedCourseIds: analytics?.submittedCourseIds ?? [],
    weeklyActivity,
    weeklyEvents: weeklyActivity.reduce((sum, day) => sum + day.count, 0),
    activeDaysThisWeek: analytics?.activeDaysThisWeek ?? 0,
    isReady,
  };
}
