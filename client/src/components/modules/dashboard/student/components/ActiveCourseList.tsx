"use client";

import Link from "next/link";
import { useTransition } from "react";
import { ArrowRight, BookOpenText, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCourseMetadata } from "@/lib/mentor-course-presentation";
import { useStudentEnrollments } from "@/hooks/use-student-enrollments";
import type { StudentEnrollment } from "@/services/enrollment.services";

const courseProgress: Record<string, number> = {
  "javascript-fundamentals": 68,
  "html-css": 42,
  "react-fundamentals": 24,
  "typescript-essentials": 12,
  "responsive-web-design": 0,
  "git-github-basics": 0,
};

export function ActiveCourseList({
  enrollments,
  isReady,
  error,
}: {
  enrollments: StudentEnrollment[];
  isReady: boolean;
  error: string | null;
}) {
  const { unenrollCourse, refreshEnrollments } = useStudentEnrollments();
  const [isLeaving, startLeaving] = useTransition();

  const leaveCourse = (enrollment: StudentEnrollment) => {
    if (!window.confirm(`Unenroll from “${enrollment.course.title}”?`)) return;
    startLeaving(async () => { await unenrollCourse(enrollment.id); });
  };

  return (
    <Card className="rounded-2xl border-border/70 shadow-none">
      <CardHeader className="flex-row items-center justify-between gap-3">
        <div>
          <CardTitle className="text-base">Continue learning</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">Your courses and learning progress</p>
        </div>
        <Link href="/student/courses/catalog" className="inline-flex h-8 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium text-emerald-700 transition-colors hover:bg-muted hover:text-emerald-800 dark:text-emerald-400">
          Explore courses <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-5">
        {!isReady ? (
          <div className="h-28 animate-pulse rounded-xl bg-muted" aria-label="Loading enrollments" />
        ) : error ? (
          <div className="rounded-xl border border-dashed border-border p-6 text-center">
            <p className="text-sm text-destructive">{error}</p>
            <Button variant="outline" className="mt-3 rounded-full" onClick={() => void refreshEnrollments()}>Try again</Button>
          </div>
        ) : enrollments.length > 0 ? enrollments.map((enrollment) => {
          const progress = courseProgress[enrollment.courseId] ?? 0;
          const category = getCourseMetadata(enrollment.course.content ?? "").category ?? "Course";
          return (
            <div key={enrollment.id} className="space-y-2.5 rounded-xl border border-border/70 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{enrollment.course.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{category}{enrollment.course.mentor?.name ? ` · ${enrollment.course.mentor.name}` : ""}</p>
                </div>
                <span className="text-xs font-semibold tabular-nums text-foreground">{progress}%</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted" role="progressbar" aria-label={`${enrollment.course.title} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
                  <div className="h-full rounded-full bg-emerald-600 dark:bg-emerald-500" style={{ width: `${progress}%` }} />
                </div>
                <Link href={`/student/courses/enroll/${enrollment.courseId}`} className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400">
                  Continue <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
                <Button variant="ghost" size="icon-sm" className="size-8 rounded-full text-muted-foreground hover:text-destructive" aria-label={`Unenroll from ${enrollment.course.title}`} title="Unenroll" disabled={isLeaving} onClick={() => leaveCourse(enrollment)}>
                  <LogOut className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          );
        }) : (
          <div className="rounded-xl border border-dashed border-border p-6 text-center">
            <BookOpenText className="mx-auto size-7 text-muted-foreground" aria-hidden="true" />
            <p className="mt-3 text-sm font-medium">No enrolled courses yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Enroll in a course to see it here.</p>
            <Link href="/student/courses/catalog" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400">
              Browse the course list <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
