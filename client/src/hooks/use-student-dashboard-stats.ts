"use client";

import { useEffect, useMemo, useState } from "react";
import { getMySubmissionsAction } from "@/actions/submission.actions";
import type { StudentEnrollment } from "@/services/enrollment.services";
import {
  readStudentCourseProgress,
  readStudentLearningActivity,
  STUDENT_COURSE_PROGRESS_EVENT,
} from "@/hooks/use-student-course-progress";
import { parseCourseContent } from "@/lib/mentor-course-presentation";

export type DailyActivity = {
  date: string;
  day: string;
  steps: number;
};

function getDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function useStudentDashboardStats(enrollments: StudentEnrollment[], enrollmentsReady: boolean) {
  const [progressByCourse, setProgressByCourse] = useState<Record<string, number>>({});
  const [activityByDate, setActivityByDate] = useState<Record<string, number>>({});
  const [submittedCourseIds, setSubmittedCourseIds] = useState<string[]>([]);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [submissionsReady, setSubmissionsReady] = useState(false);

  useEffect(() => {
    let active = true;
    const syncProgress = () => {
      setProgressByCourse(readStudentCourseProgress());
      setActivityByDate(readStudentLearningActivity());
    };
    window.addEventListener(STUDENT_COURSE_PROGRESS_EVENT, syncProgress);
    window.addEventListener("storage", syncProgress);
    void Promise.resolve().then(() => {
      if (active) syncProgress();
    });
    return () => {
      active = false;
      window.removeEventListener(STUDENT_COURSE_PROGRESS_EVENT, syncProgress);
      window.removeEventListener("storage", syncProgress);
    };
  }, []);

  useEffect(() => {
    if (!enrollmentsReady) return;
    let active = true;
    void getMySubmissionsAction({ page: 1, limit: 100 }).then((result) => {
      if (!active) return;
      if (result.error) {
        setSubmittedCourseIds([]);
        setSubmissionCount(0);
      } else {
        setSubmittedCourseIds(result.data.map((submission) => submission.courseId));
        setSubmissionCount(result.data.length);
      }
      setSubmissionsReady(true);
    });
    return () => { active = false; };
  }, [enrollmentsReady]);

  const weeklyActivity = useMemo<DailyActivity[]>(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - index));
      const dateKey = getDateKey(date);
      return {
        date: dateKey,
        day: new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(date),
        steps: activityByDate[dateKey] ?? 0,
      };
    });
  }, [activityByDate]);

  const learningStepsCompleted = useMemo(() => {
    const submittedIds = new Set(submittedCourseIds);
    return enrollments.reduce((total, enrollment) => {
      const articleCount = parseCourseContent(
        enrollment.course.content ?? "",
        enrollment.course.title,
        enrollment.course.description,
      ).articles.length;
      const completedArticles = Math.min(progressByCourse[enrollment.courseId] ?? 0, articleCount);
      const projectSubmitted = submittedIds.has(enrollment.courseId) ? 1 : 0;
      return total + completedArticles + projectSubmitted;
    }, 0);
  }, [enrollments, progressByCourse, submittedCourseIds]);

  const weeklySteps = weeklyActivity.reduce((sum, day) => sum + day.steps, 0);
  const activeDaysThisWeek = weeklyActivity.filter((day) => day.steps > 0).length;

  const learningStreak = useMemo(() => {
    const activityDates = new Set(Object.entries(activityByDate).filter(([, steps]) => steps > 0).map(([date]) => date));
    const today = new Date();
    const todayKey = getDateKey(today);
    if (!activityDates.has(todayKey)) today.setDate(today.getDate() - 1);

    let streak = 0;
    while (activityDates.has(getDateKey(today))) {
      streak += 1;
      today.setDate(today.getDate() - 1);
    }
    return streak;
  }, [activityByDate]);

  return {
    progressByCourse,
    submittedCourseIds,
    weeklyActivity,
    weeklySteps,
    activeDaysThisWeek,
    learningStepsCompleted,
    learningStreak,
    submissionCount,
    isReady: submissionsReady,
  };
}
