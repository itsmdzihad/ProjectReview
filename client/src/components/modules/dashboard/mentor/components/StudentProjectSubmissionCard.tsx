import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { StudentProjectSubmission } from "@/lib/project-submissions";

export function StudentProjectSubmissionCard({
  submission,
}: {
  submission: StudentProjectSubmission;
}) {
  return (
    <Card className="rounded-2xl border-border/70 shadow-none">
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-emerald-700 uppercase dark:text-emerald-400">Student project</p>
            <h3 className="mt-1 text-lg font-semibold">{submission.projectName}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{submission.studentName} · {submission.studentEmail}</p>
          </div>
          <time className="text-xs text-muted-foreground" dateTime={submission.submittedAt}>{new Date(submission.submittedAt).toLocaleString()}</time>
        </div>
        <p className="mt-5 whitespace-pre-wrap text-sm leading-6 text-foreground/80">{submission.description}</p>
        <div className="mt-5 flex flex-wrap gap-3 border-t border-border/70 pt-4">
          <a href={submission.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm font-medium transition-colors hover:bg-muted">
            Repository <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          {submission.liveLink && (
            <a href={submission.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm font-medium transition-colors hover:bg-muted">
              Live project <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
