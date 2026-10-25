"use client";

import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useMentorCourses } from "@/hooks/use-mentor-courses";
import { MentorCourseCard } from "./MentorCourseCard";

export function MentorCourseLibrary() {
  const { mentorCourses, isReady } = useMentorCourses();

  if (!isReady) {
    return <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"><div className="h-80 animate-pulse rounded-2xl bg-muted" /><div className="h-80 animate-pulse rounded-2xl bg-muted" /></div>;
  }

  if (mentorCourses.length === 0) {
    return (
      <Card className="rounded-2xl border-border/70 shadow-none">
        <CardContent className="flex flex-col items-center px-6 py-14 text-center">
          <h2 className="text-lg font-semibold">No courses yet</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">Courses you create will be listed here and added to the student catalog.</p>
          <Link href="/mentor/courses/create" className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500">
            <PlusCircle className="size-4" aria-hidden="true" /> Create your first course
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <section aria-label="Courses you created" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {mentorCourses.map((course) => <MentorCourseCard key={course.id} course={course} />)}
    </section>
  );
}
