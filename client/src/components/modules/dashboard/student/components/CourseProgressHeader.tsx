import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/components/modules/homePage/types";

export function CourseProgressHeader({
  course,
  completedSteps,
  totalSteps,
}: {
  course: Course;
  completedSteps: number;
  totalSteps: number;
}) {
  const CourseIcon = course.icon;
  const progressPercent = Math.round((completedSteps / totalSteps) * 100);

  return (
    <header className="space-y-5">
      <Link href="/student/courses/enroll" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="size-4" aria-hidden="true" /> Enrolled course list
      </Link>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="flex items-start gap-3">
          <span className={`mt-1 flex size-11 shrink-0 items-center justify-center rounded-xl ${course.accent}`}>
            <CourseIcon className="size-5" aria-hidden="true" />
          </span>
          <div>
            <Badge variant="secondary">{course.category}</Badge>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{course.title}</h1>
          </div>
        </div>
        <div className="min-w-48 sm:text-right">
          <p className="text-xs text-muted-foreground">Course progress</p>
          <p className="mt-1 text-sm font-semibold tabular-nums">{progressPercent}% · {completedSteps} of {totalSteps} sections</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-emerald-600 transition-[width] dark:bg-emerald-500" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>
    </header>
  );
}
