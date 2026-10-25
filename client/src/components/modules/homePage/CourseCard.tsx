"use client";

import { ArrowRight, Clock3 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Course } from "./types";
import { useStudentEnrollments } from "@/hooks/use-student-enrollments";

type CourseCardProps = {
  course: Course;
  index: number;
  detailsHref?: string;
};

export function CourseCard({ course, index, detailsHref = `/details/${course.id}` }: CourseCardProps) {
  const Icon = course.icon;
  const { enrollCourse, isEnrolled } = useStudentEnrollments();
  const enrolled = isEnrolled(course.id);

  return (
    <Card className="group h-full gap-0 rounded-2xl border border-border/70 bg-card p-0 shadow-none transition duration-200 hover:-translate-y-1 hover:border-foreground/15 hover:shadow-lg hover:shadow-foreground/5">
      <div
        className={`relative mx-3 mt-3 flex h-40 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br ${course.graphic} bg-cover bg-center`}
        style={course.coverImageUrl ? {
          backgroundImage: `linear-gradient(180deg, rgb(0 0 0 / 0.05) 20%, rgb(0 0 0 / 0.5) 100%), url("${course.coverImageUrl}")`,
        } : undefined}
        role={course.coverImageUrl ? "img" : undefined}
        aria-label={course.coverImageUrl ? `${course.title} cover image` : undefined}
      >
        {course.coverImageUrl ? (
          <span className="absolute inset-x-4 bottom-4 line-clamp-2 text-sm font-semibold text-white drop-shadow">{course.title}</span>
        ) : (
          <>
            <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(var(--foreground)_0.7px,transparent_0.7px)] [background-size:14px_14px]" />
            <div className="relative w-[78%] rounded-lg border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-black/30">
              <div className="mb-3 flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-rose-400" />
                <span className="size-2 rounded-full bg-amber-400" />
                <span className="size-2 rounded-full bg-emerald-400" />
                <span className="ml-auto font-mono text-[9px] text-muted-foreground">lesson-{index + 1}.code</span>
              </div>
              <div className="space-y-1 font-mono text-[10px] leading-relaxed text-foreground/75 sm:text-[11px]">
                {course.code.map((line, lineIndex) => (
                  <div key={`${lineIndex}-${line}`} className="flex gap-3">
                    <span className="w-3 text-right text-muted-foreground/50">{lineIndex + 1}</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        <div className={`absolute right-5 bottom-4 flex size-10 items-center justify-center rounded-xl ${course.accent} shadow-sm`}>
          <Icon className="size-5" aria-hidden="true" />
        </div>
      </div>
      <CardHeader className="gap-3 px-5 pt-5 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{course.category}</Badge>
          <Badge variant="outline">{course.level}</Badge>
        </div>
        <h3 className="text-lg font-semibold tracking-tight">
          <Link href={detailsHref} className="rounded-sm outline-none transition-colors hover:text-emerald-700 focus-visible:ring-2 focus-visible:ring-ring dark:hover:text-emerald-400" aria-label={`View ${course.title} course details`}>
            {course.title}
          </Link>
        </h3>
      </CardHeader>
      <CardContent className="flex-1 px-5 pb-5">
        <p className="text-sm leading-6 text-muted-foreground">{course.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-border/70 px-5 py-4">
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Clock3 className="size-3.5" aria-hidden="true" /> {course.duration}
        </span>
        <div className="flex items-center gap-3">
          <Link href={detailsHref} className="text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400">Details</Link>
          {enrolled ? (
            <Link
              href={`/student/courses/enroll/${course.id}`}
              className="inline-flex h-8 items-center justify-center gap-1.5 rounded-full bg-emerald-700 px-4 text-xs font-medium text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
            >
              Continue <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          ) : (
            <Button
              type="button"
              size="sm"
              className="rounded-full bg-emerald-700 px-4 text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
              onClick={() => enrollCourse(course.id)}
            >
              Enroll Now <ArrowRight className="size-3.5" aria-hidden="true" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
