import Link from "next/link";
import { ArrowRight, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MentorCourse } from "@/types/mentorCourse";

export function CreatedCoursesCard({
  courses,
  submissionCounts,
}: {
  courses: MentorCourse[];
  submissionCounts: Record<string, number>;
}) {
  return (
    <Card className="rounded-2xl border-border/70 shadow-none">
      <CardHeader>
        <CardTitle className="text-base">Your courses</CardTitle>
        <p className="text-sm text-muted-foreground">Courses you’ve created for learners</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {courses.length > 0 ? courses.slice(0, 4).map((course) => (
          <div key={course.id} className="flex items-center justify-between gap-3 rounded-xl border border-border/70 p-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{course.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{course.articles.length} articles · {course.duration}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">{submissionCounts[course.id] ?? 0} submissions</span>
              <Link href={`/mentor/courses/${course.id}/edit`} className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs font-medium transition-colors hover:bg-muted" aria-label={`Edit ${course.title}`}>
                <Pencil className="size-3" aria-hidden="true" /> Edit
              </Link>
            </div>
          </div>
        )) : (
          <div className="rounded-xl border border-dashed border-border p-5 text-center">
            <p className="text-sm font-medium">Create your first course</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">Add articles and a project for students to complete.</p>
          </div>
        )}
        <Link href="/mentor/courses/create" className="inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400">
          Create a course <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  );
}
