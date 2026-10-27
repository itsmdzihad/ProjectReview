"use client";

import Link from "next/link";
import { ArrowRight, BookOpenText, CheckCircle2, Clock3, Flame } from "lucide-react";
import { useStudentEnrollments } from "@/hooks/use-student-enrollments";
import { ActiveCourseList } from "./components/ActiveCourseList";
import { LearningSnapshotCard } from "./components/LearningSnapshotCard";
import { MetricCard, type DashboardMetric } from "./components/MetricCard";
import { WeeklyActivityCard } from "./components/WeeklyActivityCard";

export function StudentDashboard() {
  const { enrollments, isReady, error } = useStudentEnrollments();
  const courseCount = enrollments.length;
  const metrics: DashboardMetric[] = [
    {
      label: "Enrolled courses",
      value: isReady ? String(courseCount) : "—",
      note: error ?? (courseCount === 1 ? "1 course ready to continue" : `${courseCount} courses ready to continue`),
      icon: BookOpenText,
      tint: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    },
    {
      label: "Learning hours",
      value: "18.5",
      note: "+3.5 hours this week",
      icon: Clock3,
      tint: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
    },
    {
      label: "Lessons completed",
      value: "26",
      note: "4 completed this week",
      icon: CheckCircle2,
      tint: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
    },
    {
      label: "Learning streak",
      value: "5 days",
      note: "Keep your momentum going",
      icon: Flame,
      tint: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    },
  ];

  return (
    <div className="space-y-7">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-emerald-700 uppercase dark:text-emerald-400">Your learning space</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">A snapshot of your learning progress and what to work on next.</p>
        </div>
        <Link href="/student/courses/catalog" className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 text-sm font-medium text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500">
          Explore courses <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </header>

      <section aria-label="Learning statistics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.85fr)]">
        <WeeklyActivityCard />
        <LearningSnapshotCard />
      </section>

      <ActiveCourseList enrollments={enrollments} isReady={isReady} error={error} />
    </div>
  );
}
