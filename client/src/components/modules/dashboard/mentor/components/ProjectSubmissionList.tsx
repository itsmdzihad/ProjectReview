import { ProjectSubmissionTable } from "./ProjectSubmissionTable";
import type { StudentProjectSubmission } from "@/lib/project-submissions";
import type { SubmissionReviewStatus } from "@/services/submission.services";
import { PaginationControls } from "@/components/modules/dashboard/PaginationControls";

export function ProjectSubmissionList({
  courseTitle,
  submissions,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onReview,
}: {
  courseTitle: string;
  submissions: StudentProjectSubmission[];
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onReview: (id: string, status: SubmissionReviewStatus, feedback?: string) => Promise<void>;
}) {
  const sortedSubmissions = [...submissions].sort((a, b) =>
    b.submittedAt.localeCompare(a.submittedAt),
  );
  const totalPages = Math.max(1, Math.ceil(sortedSubmissions.length / pageSize));
  const visibleSubmissions = sortedSubmissions.slice((page - 1) * pageSize, page * pageSize);

  return (
    <section aria-label={`Project submissions for ${courseTitle}`} className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{courseTitle}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {sortedSubmissions.length} project{sortedSubmissions.length === 1 ? "" : "s"} submitted
          </p>
        </div>
        <span className="rounded-full bg-emerald-600/10 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
          {sortedSubmissions.length} submissions
        </span>
      </div>
      <ProjectSubmissionTable submissions={visibleSubmissions} onReview={onReview} />
      <PaginationControls
        page={page}
        pageSize={pageSize}
        canPrevious={page > 1}
        canNext={page < totalPages}
        totalItems={sortedSubmissions.length}
        itemLabel="submissions"
        pageSizeLabel="Submissions per page"
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </section>
  );
}
