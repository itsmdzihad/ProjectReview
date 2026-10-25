"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  Clock3,
  Flame,
  GraduationCap,
  MoveUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courses } from "@/components/modules/homePage/courseData";
import { useStudentEnrollments } from "@/hooks/use-student-enrollments";

const weeklyActivity = [
  { day: "Mon", hours: 1.5 },
  { day: "Tue", hours: 2.25 },
  { day: "Wed", hours: 1.1 },
  { day: "Thu", hours: 3.2 },
  { day: "Fri", hours: 2.4 },
  { day: "Sat", hours: 3.8 },
  { day: "Sun", hours: 1.75 },
];

const courseProgress: Record<string, number> = {
  "javascript-fundamentals": 68,
  "html-css": 42,
  "react-fundamentals": 24,
  "typescript-essentials": 12,
  "responsive-web-design": 0,
  "git-github-basics": 0,
};

type Metric = {
  label: string;
  value: string;
  note: string;
  icon: typeof BookOpenText;
  tint: string;
};

function MetricCard({ metric }: { metric: Metric }) {
  const Icon = metric.icon;

  return (
    <Card className="gap-4 rounded-2xl border-border/70 shadow-none">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div>
          <p className="text-sm text-muted-foreground">{metric.label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{metric.value}</p>
          <p className="mt-2 text-xs text-muted-foreground">{metric.note}</p>
        </div>
        <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${metric.tint}`}>
          <Icon className="size-5" aria-hidden="true" />
        </div>
      </CardContent>
    </Card>
  );
}

function WeeklyActivity() {
  return (
    <Card className="rounded-2xl border-border/70 shadow-none">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="text-base">Study activity</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">Your learning time over the last 7 days</p>
        </div>
        <Badge variant="secondary" className="rounded-full">16 hrs</Badge>
      </CardHeader>
      <CardContent>
        <div className="flex h-48 items-end justify-between gap-3 pt-3" aria-label="Weekly study hours bar chart">
          {weeklyActivity.map((entry) => (
            <div key={entry.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <span className="text-[11px] tabular-nums text-muted-foreground">{entry.hours}h</span>
              <div className="flex h-36 w-full items-end rounded-lg bg-muted/70 p-1">
                <div
                  className="w-full rounded-md bg-emerald-600 transition-[height] dark:bg-emerald-500"
                  style={{ height: `${(entry.hours / 4) * 100}%` }}
                  title={`${entry.hours} hours on ${entry.day}`}
                />
              </div>
              <span className="text-xs text-muted-foreground">{entry.day}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ActiveCourseList({ enrolledCourseIds }: { enrolledCourseIds: string[] }) {
  const activeCourses = courses.filter((course) => enrolledCourseIds.includes(course.id));

  return (
    <Card className="rounded-2xl border-border/70 shadow-none">
      <CardHeader className="flex-row items-center justify-between gap-3">
        <div>
          <CardTitle className="text-base">Continue learning</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">Pick up where you left off</p>
        </div>
        <Link href="/student/courses/enroll" className="inline-flex h-8 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium text-emerald-700 transition-colors hover:bg-muted hover:text-emerald-800 dark:text-emerald-400">
          All courses <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-5">
        {activeCourses.length > 0 ? activeCourses.map((course) => {
          const progress = courseProgress[course.id] ?? 0;
          return (
            <div key={course.id} className="space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">{course.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{course.category}</p>
                </div>
                <span className="text-xs font-semibold tabular-nums text-foreground">{progress}%</span>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="h-2 flex-1 overflow-hidden rounded-full bg-muted"
                  role="progressbar"
                  aria-label={`${course.title} progress`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                >
                  <div className="h-full rounded-full bg-emerald-600 dark:bg-emerald-500" style={{ width: `${progress}%` }} />
                </div>
                <Link href={`/details/${course.id}`} className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400">
                  Continue <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          );
        }) : (
          <div className="rounded-xl border border-dashed border-border p-6 text-center">
            <BookOpenText className="mx-auto size-7 text-muted-foreground" aria-hidden="true" />
            <p className="mt-3 text-sm font-medium">No enrolled courses yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Enroll in a course to see it here.</p>
            <Link href="/student/courses/enroll" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400">
              Browse the course list <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function LearningSnapshot() {
  return (
    <Card className="overflow-hidden rounded-2xl border-emerald-900/10 bg-emerald-950 text-white shadow-none dark:border-emerald-300/10">
      <CardContent className="relative p-6 sm:p-7">
        <div className="absolute -right-8 -top-12 size-44 rounded-full border border-emerald-100/10" />
        <div className="absolute -right-1 -top-5 size-32 rounded-full border border-emerald-100/10" />
        <div className="relative">
          <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-200">
            <GraduationCap className="size-5" aria-hidden="true" />
          </div>
          <p className="text-sm font-medium text-emerald-100/70">A little progress adds up</p>
          <h2 className="mt-2 max-w-xs text-2xl font-semibold tracking-tight">You’re building a strong learning habit.</h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-emerald-50/70">You studied on 5 days this week. Keep going with one lesson today.</p>
          <Link href="/student/courses/enroll" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 transition-colors hover:text-white">
            Find your next course <MoveUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export function StudentDashboard() {
  const { enrolledCourseIds } = useStudentEnrollments();
  const metrics: Metric[] = [
    {
      label: "Enrolled courses",
      value: String(enrolledCourseIds.length),
      note: enrolledCourseIds.length === 1 ? "1 course ready to continue" : `${enrolledCourseIds.length} courses ready to continue`,
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
        <Link href="/student/courses/enroll" className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 text-sm font-medium text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500">
          Explore courses <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </header>

      <section aria-label="Learning statistics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.85fr)]">
        <WeeklyActivity />
        <LearningSnapshot />
      </section>

      <ActiveCourseList enrolledCourseIds={enrolledCourseIds} />
    </div>
  );
}
