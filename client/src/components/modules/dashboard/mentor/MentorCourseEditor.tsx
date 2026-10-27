"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCw } from "lucide-react";
import { getMyCoursesAction } from "@/actions/course.actions";
import { buttonVariants } from "@/components/ui/button";
import { CreateMentorCourseForm } from "@/components/modules/dashboard/mentor/CreateMentorCourseForm";
import { toMentorCourse } from "@/lib/mentor-course-presentation";
import type { MentorCourse } from "@/types/mentorCourse";

export function MentorCourseEditor({ courseId }: { courseId: string }) {
  const [course, setCourse] = useState<MentorCourse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    void getMyCoursesAction({ page: 1, limit: 100 }).then((result) => {
      if (!active) return;
      if (result.error) {
        setError(result.error.message);
      } else {
        const record = result.data.find((item) => item.id === courseId);
        if (record) setCourse(toMentorCourse(record));
        else setError("Course not found or you do not have permission to edit it.");
      }
      setIsLoading(false);
    });
    return () => { active = false; };
  }, [courseId]);

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <Link href="/mentor/courses" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-4" aria-hidden="true" /> Back to courses
        </Link>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-emerald-700 uppercase dark:text-emerald-400">Course workspace</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">Edit course</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">Update course information, learning material, or publishing status.</p>
        </div>
      </header>
      {isLoading ? (
        <div className="mx-auto h-[32rem] w-full max-w-4xl animate-pulse rounded-2xl bg-muted" />
      ) : error ? (
        <div className="flex flex-col items-center rounded-2xl border border-border/70 px-6 py-12 text-center">
          <p className="text-sm text-destructive">{error}</p>
          <Link href="/mentor/courses" className={buttonVariants({ variant: "outline", className: "mt-4 gap-2 rounded-full" })}><RotateCw className="size-4" aria-hidden="true" /> Back to courses</Link>
        </div>
      ) : course ? <CreateMentorCourseForm initialCourse={course} /> : null}
    </div>
  );
}
