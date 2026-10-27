import Link from "next/link";
import { ArrowRight, CircleCheck, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { MentorCourse } from "@/types/mentorCourse";

export function CreateCourseSuccess({
  course,
  onCreateAnother,
}: {
  course: MentorCourse;
  onCreateAnother: () => void;
}) {
  return (
    <Card className="mx-auto w-full max-w-3xl rounded-2xl border-emerald-900/10 shadow-none">
      <CardContent className="flex flex-col items-center px-6 py-12 text-center sm:px-10">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
          <CircleCheck className="size-7" aria-hidden="true" />
        </span>
        <p className="mt-5 text-xs font-semibold tracking-[0.14em] text-emerald-700 uppercase dark:text-emerald-400">{course.status === "DRAFT" ? "Draft saved" : "Course created"}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">{course.title}</h2>
        <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
          {course.status === "DRAFT"
            ? "Your draft is saved and can be published whenever it is ready."
            : "Your course is published and available in the student course list and project submission selector."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button type="button" variant="outline" className="rounded-full" onClick={onCreateAnother}>
            <PlusCircle className="size-4" aria-hidden="true" /> Create another
          </Button>
          <Link href="/mentor/dashboard" className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-emerald-700 px-4 text-sm font-medium text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500">
            Dashboard <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
