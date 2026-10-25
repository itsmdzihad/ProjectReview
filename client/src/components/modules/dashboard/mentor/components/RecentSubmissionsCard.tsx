import Link from "next/link";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StudentProjectSubmission } from "@/lib/project-submissions";

export type RecentMentorSubmission = StudentProjectSubmission & {
  courseId: string;
  courseTitle: string;
};

export function RecentSubmissionsCard({ submissions }: { submissions: RecentMentorSubmission[] }) {
  return (
    <Card className="rounded-2xl border-border/70 shadow-none">
      <CardHeader className="flex-row items-center justify-between gap-3">
        <div>
          <CardTitle className="text-base">Recent project submissions</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">The latest work submitted across your courses</p>
        </div>
        <Link href="/mentor/project-submissions" className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400">
          View all <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </CardHeader>
      <CardContent>
        {submissions.length > 0 ? (
          <div className="divide-y divide-border/70">
            {submissions.map((submission) => (
              <div key={`${submission.courseId}-${submission.studentId}`} className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-1 last:pb-1">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{submission.projectName}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{submission.studentName} · {submission.courseTitle}</p>
                </div>
                <time className="text-xs text-muted-foreground" dateTime={submission.submittedAt}>{new Date(submission.submittedAt).toLocaleDateString()}</time>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border px-5 py-10 text-center">
            <ClipboardCheck className="mx-auto size-7 text-muted-foreground" aria-hidden="true" />
            <p className="mt-3 text-sm font-medium">No project submissions yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Student projects will appear here when submitted.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
