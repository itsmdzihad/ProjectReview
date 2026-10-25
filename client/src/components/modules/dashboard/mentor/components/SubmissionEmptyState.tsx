import Link from "next/link";
import { ClipboardList, FolderOpen, PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function SubmissionEmptyState({
  courseTitle,
}: {
  courseTitle?: string;
}) {
  const hasCourse = Boolean(courseTitle);

  return (
    <Card className="rounded-2xl border-border/70 shadow-none">
      <CardContent className="flex flex-col items-center px-6 py-12 text-center">
        {hasCourse ? (
          <ClipboardList className="size-9 text-muted-foreground" aria-hidden="true" />
        ) : (
          <FolderOpen className="size-9 text-muted-foreground" aria-hidden="true" />
        )}
        <h2 className="mt-4 text-lg font-semibold">
          {hasCourse ? `No submissions for ${courseTitle}` : "Create a course first"}
        </h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          {hasCourse
            ? "Project submissions for this course will appear here when students complete the final module."
            : "Once you create a course, students can enroll and submit their project work here."}
        </p>
        {!hasCourse && (
          <Link href="/mentor/courses/create" className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500">
            <PlusCircle className="size-4" aria-hidden="true" /> Create a course
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
