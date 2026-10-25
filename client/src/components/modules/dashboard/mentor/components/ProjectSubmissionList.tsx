import { StudentProjectSubmissionCard } from "./StudentProjectSubmissionCard";
import type { StudentProjectSubmission } from "@/lib/project-submissions";

export function ProjectSubmissionList({
  courseTitle,
  submissions,
}: {
  courseTitle: string;
  submissions: StudentProjectSubmission[];
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
      <div className="grid gap-4">
        {sortedSubmissions.map((submission) => (
          <StudentProjectSubmissionCard
            key={`${submission.studentId}-${submission.submittedAt}`}
            submission={submission}
          />
        ))}
      </div>
    </section>
  );
}
