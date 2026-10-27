"use client";

import { useEffect, useState } from "react";
import { BookOpenText, ClipboardCheck, GraduationCap, UsersRound } from "lucide-react";
import { courses as builtInCourses } from "@/components/modules/homePage/courseData";
import { getMyCoursesAction } from "@/actions/course.actions";
import { toMentorCourse } from "@/lib/mentor-course-presentation";
import type { MentorCourse } from "@/types/mentorCourse";
import { useMentorProjectSubmissions } from "@/hooks/use-mentor-project-submissions";
import type { MentorMetric } from "./components/MentorMetricCard";
import { CreatedCoursesCard } from "./components/CreatedCoursesCard";
import { MentorAnalyticsGrid } from "./components/MentorAnalyticsGrid";
import { MentorDashboardHeader } from "./components/MentorDashboardHeader";
import { RecentSubmissionsCard, type RecentMentorSubmission } from "./components/RecentSubmissionsCard";

const numberFormat = new Intl.NumberFormat();

export function MentorDashboard() {
  const [mentorCourses, setMentorCourses] = useState<MentorCourse[]>([]);
  const [coursesReady, setCoursesReady] = useState(false);
  useEffect(() => {
    let active = true;
    void getMyCoursesAction({ page: 1, limit: 100 }).then((result) => {
      if (!active) return;
      if (!result.error) setMentorCourses(result.data.map(toMentorCourse));
      setCoursesReady(true);
    });
    return () => { active = false; };
  }, []);
  const { submissionsByCourse, isReady: submissionsReady } = useMentorProjectSubmissions();
  const submissions = Object.entries(submissionsByCourse).flatMap(([courseId, entries]) =>
    entries.map((submission) => ({
      ...submission,
      courseId,
      courseTitle:
        mentorCourses.find((course) => course.id === courseId)?.title ??
        builtInCourses.find((course) => course.id === courseId)?.title ??
        "Course",
    })),
  );
  const activeStudentCount = new Set(submissions.map((submission) => submission.studentId)).size;
  const submissionCourseCount = Object.values(submissionsByCourse).filter((items) => items.length > 0).length;
  const metrics: MentorMetric[] = [
    {
      label: "Courses created",
      value: coursesReady ? numberFormat.format(mentorCourses.length) : "—",
      note: "Your course library",
      icon: BookOpenText,
      color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    },
    {
      label: "Submissions to review",
      value: submissionsReady ? numberFormat.format(submissions.length) : "—",
      note: `${submissionCourseCount} course${submissionCourseCount === 1 ? "" : "s"} with submissions`,
      icon: ClipboardCheck,
      color: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    },
    {
      label: "Students reached",
      value: submissionsReady ? numberFormat.format(activeStudentCount) : "—",
      note: "Students who submitted work",
      icon: UsersRound,
      color: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
    },
    {
      label: "Projects submitted",
      value: submissionsReady ? numberFormat.format(submissions.length) : "—",
      note: "Across your courses",
      icon: GraduationCap,
      color: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
    },
  ];
  const recentSubmissions = [...submissions]
    .sort((first, second) => second.submittedAt.localeCompare(first.submittedAt))
    .slice(0, 5) as RecentMentorSubmission[];
  const submissionCounts = Object.fromEntries(
    Object.entries(submissionsByCourse).map(([courseId, items]) => [courseId, items.length]),
  );

  return (
    <div className="space-y-7">
      <MentorDashboardHeader />
      <MentorAnalyticsGrid metrics={metrics} />
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.8fr)]">
        <RecentSubmissionsCard submissions={recentSubmissions} />
        <CreatedCoursesCard courses={mentorCourses} submissionCounts={submissionCounts} />
      </section>
    </div>
  );
}
