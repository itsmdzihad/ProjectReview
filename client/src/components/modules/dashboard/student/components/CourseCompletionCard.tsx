import Link from "next/link";
import { ArrowRight, ExternalLink, GraduationCap, Pencil, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { StudentProjectSubmission } from "@/hooks/use-student-project-submission";

export function CourseCompletionCard({
  courseTitle,
  submission,
  onReview,
  onEditSubmission,
}: {
  courseTitle: string;
  submission: StudentProjectSubmission;
  onReview: () => void;
  onEditSubmission: () => void;
}) {
  return (
    <Card className="overflow-hidden rounded-2xl border-emerald-900/10 shadow-none">
      <CardContent className="flex flex-col items-center px-6 py-12 text-center sm:px-10">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
          <GraduationCap className="size-7" aria-hidden="true" />
        </span>
        <p className="mt-5 text-xs font-semibold tracking-[0.14em] text-emerald-700 uppercase dark:text-emerald-400">Course completed</p>
        <h2 id="lesson-title" className="mt-2 text-2xl font-semibold tracking-tight">Great work finishing this course.</h2>
        <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">You’ve submitted your project for {courseTitle}. Review the lessons any time or update your submission below.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          <span className="font-medium">{submission.projectName}</span>
          <a href={submission.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-emerald-800 hover:underline dark:text-emerald-300">
            Repository <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
          {submission.liveLink && (
            <a href={submission.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-emerald-800 hover:underline dark:text-emerald-300">
              Live project <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button type="button" variant="outline" className="rounded-full" onClick={onEditSubmission}>
            <Pencil className="size-4" aria-hidden="true" /> Edit project
          </Button>
          <Button type="button" variant="outline" className="rounded-full" onClick={onReview}>
            <RotateCcw className="size-4" aria-hidden="true" /> Review from start
          </Button>
          <Link href="/student/dashboard" className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-emerald-700 px-4 text-sm font-medium text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500">
            Back to dashboard <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
