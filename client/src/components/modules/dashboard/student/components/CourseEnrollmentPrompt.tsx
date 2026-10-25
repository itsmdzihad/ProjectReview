import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Course } from "@/components/modules/homePage/types";

export function CourseEnrollmentPrompt({
  course,
  onEnroll,
}: {
  course: Course;
  onEnroll: () => void;
}) {
  const CourseIcon = course.icon;

  return (
    <main className="mx-auto w-full max-w-3xl py-8">
      <Link href="/student/courses/enroll" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" aria-hidden="true" /> Course list
      </Link>
      <Card className="mt-6 rounded-2xl border-border/70 shadow-none">
        <CardContent className="flex flex-col items-center px-6 py-12 text-center">
          <div className={`flex size-14 items-center justify-center rounded-2xl ${course.accent}`}>
            <CourseIcon className="size-7" aria-hidden="true" />
          </div>
          <h1 className="mt-5 text-2xl font-semibold">Enroll to start learning</h1>
          <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
            Join <span className="font-medium text-foreground">{course.title}</span> to read the articles and work through its project.
          </p>
          <Button
            type="button"
            className="mt-6 rounded-full bg-emerald-700 px-5 text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
            onClick={onEnroll}
          >
            Enroll in course <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
