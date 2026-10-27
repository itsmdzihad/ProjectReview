import Link from "next/link";
import { ClipboardList, FolderOpen, LoaderCircle, PlusCircle, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function SubmissionEmptyState({
  courseTitle,
  onRefresh,
  isRefreshing = false,
}: {
  courseTitle?: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}) {
  const hasCourse = Boolean(courseTitle);
  const isAllCourses = courseTitle === "all courses";

  return (
    <Card className="rounded-2xl border-border/70 shadow-none">
      <CardContent className="flex flex-col items-center px-6 py-12 text-center">
        {hasCourse ? (
          <ClipboardList className="size-9 text-muted-foreground" aria-hidden="true" />
        ) : (
          <FolderOpen className="size-9 text-muted-foreground" aria-hidden="true" />
        )}
        <h2 className="mt-4 text-lg font-semibold">
          {isAllCourses ? "No project submissions yet" : hasCourse ? `No submissions for ${courseTitle}` : "Create a course first"}
        </h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          {hasCourse
            ? isAllCourses
              ? "Student project work will appear here after they submit a course project."
              : "Project submissions for this course will appear here after students submit their work."
            : "Once you create a course, students can enroll and submit their project work here."}
        </p>
        {onRefresh && (
          <Button type="button" variant="outline" className="mt-5 rounded-full" disabled={isRefreshing} onClick={onRefresh}>
            {isRefreshing ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <RefreshCw className="size-4" aria-hidden="true" />}
            Refresh submissions
          </Button>
        )}
        {!hasCourse && (
          <Link href="/mentor/courses/create" className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500">
            <PlusCircle className="size-4" aria-hidden="true" /> Create a course
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
