import { ProjectSubmissionTable } from "./ProjectSubmissionTable";
import type { StudentProjectSubmission } from "@/lib/project-submissions";
import type { SubmissionReviewStatus } from "@/services/submission.services";

export function ProjectSubmissionList({
  courseTitle,
  submissions,
  onReview,
}: {
  courseTitle: string;
  submissions: StudentProjectSubmission[];
  onReview: (id: string, status: SubmissionReviewStatus, feedback?: string) => Promise<void>;
}) {
  const sortedSubmissions = [...submissions].sort((a, b) =>
    b.submittedAt.localeCompare(a.submittedAt),
  );

  return (
    <section aria-label={`Project submissions for ${courseTitle}`} className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{courseTitle}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {submissions.length} project{submissions.length === 1 ? "" : "s"} submitted
          </p>
        </div>
        <span className="rounded-full bg-emerald-600/10 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
          {submissions.length} submissions
        </span>
      </div>
      <ProjectSubmissionTable submissions={sortedSubmissions} onReview={onReview} />
    </section>
  );
}
