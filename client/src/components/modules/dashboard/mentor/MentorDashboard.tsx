"use client";

import { useEffect, useState } from "react";
import { BookOpenText, ClipboardCheck, GraduationCap, UsersRound } from "lucide-react";
import { getMentorDashboardAnalyticsAction } from "@/actions/user.actions";
import { toMentorCourse } from "@/lib/mentor-course-presentation";
import type { MentorCourse } from "@/types/mentorCourse";
import { toStudentProjectSubmission } from "@/lib/project-submissions";
import type { MentorDashboardAnalytics } from "@/services/user.services";
import type { MentorMetric } from "./components/MentorMetricCard";
import { CreatedCoursesCard } from "./components/CreatedCoursesCard";
import { MentorAnalyticsGrid } from "./components/MentorAnalyticsGrid";
import { MentorDashboardHeader } from "./components/MentorDashboardHeader";
import { RecentSubmissionsCard, type RecentMentorSubmission } from "./components/RecentSubmissionsCard";

const numberFormat = new Intl.NumberFormat();

export function MentorDashboard() {
  const [mentorCourses, setMentorCourses] = useState<MentorCourse[]>([]);
  const [analytics, setAnalytics] = useState<MentorDashboardAnalytics | null>(null);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);
  const [analyticsReady, setAnalyticsReady] = useState(false);
  useEffect(() => {
    let active = true;
    void getMentorDashboardAnalyticsAction().then((analyticsResult) => {
      if (!active) return;
      if (!analyticsResult.error) {
        setAnalytics(analyticsResult.data);
        setMentorCourses(analyticsResult.data.courses.map(toMentorCourse));
      }
      setAnalyticsError(analyticsResult.error?.message ?? null);
      setAnalyticsReady(true);
    });
    return () => { active = false; };
  }, []);
  const submissions = (analytics?.recentSubmissions ?? []).map((submission) => ({
    ...toStudentProjectSubmission(submission),
    courseId: submission.course?.id ?? submission.courseId,
    courseTitle: submission.course?.title ?? "Course",
  })) as RecentMentorSubmission[];
  const pendingSubmissionCount = analytics?.submissionCounts.PENDING ?? 0;
  const metrics: MentorMetric[] = [
    {
      label: "Courses created",
      value: analyticsReady && analytics ? numberFormat.format(analytics.coursesCreatedCount) : "—",
      note: analyticsError ?? (analytics ? `${analytics.publishedCoursesCount} published · ${analytics.draftCoursesCount} drafts` : "Your course library"),
      icon: BookOpenText,
      color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    },
    {
      label: "Submissions to review",
      value: analyticsReady && analytics ? numberFormat.format(pendingSubmissionCount) : "—",
      note: `${Object.values(analytics?.submissionCountsByCourse ?? {}).filter((count) => count > 0).length} courses with submissions`,
      icon: ClipboardCheck,
      color: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    },
    {
      label: "Students reached",
      value: analyticsReady && analytics ? numberFormat.format(analytics.uniqueStudentsCount) : "—",
      note: analytics ? `${numberFormat.format(analytics.totalEnrollmentsCount)} total course enrollments` : "Students enrolled in your courses",
      icon: UsersRound,
      color: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
    },
    {
      label: "Projects submitted",
      value: analyticsReady && analytics ? numberFormat.format(analytics.totalSubmissionsCount) : "—",
      note: "Across your courses",
      icon: GraduationCap,
      color: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
    },
  ];
  const recentSubmissions = [...submissions]
    .sort((first, second) => second.submittedAt.localeCompare(first.submittedAt))
    .slice(0, 5) as RecentMentorSubmission[];
  const submissionCounts = Object.fromEntries(
    Object.entries(analytics?.submissionCountsByCourse ?? {}),
  );

  return (
    <div className="space-y-7">
      <MentorDashboardHeader />
      {analyticsError && <p role="alert" className="text-sm text-destructive">{analyticsError}</p>}
      <MentorAnalyticsGrid metrics={metrics} />
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.8fr)]">
        <RecentSubmissionsCard submissions={recentSubmissions} />
        <CreatedCoursesCard courses={mentorCourses} submissionCounts={submissionCounts} />
      </section>
    </div>
  );
}
