import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { StudentProjectSubmission } from "@/lib/project-submissions";
import type { SubmissionReviewStatus } from "@/services/submission.services";
import { StudentProjectSubmissionCard } from "./StudentProjectSubmissionCard";

export function ProjectSubmissionTable({
  submissions,
  isSample = false,
  onReview,
}: {
  submissions: StudentProjectSubmission[];
  isSample?: boolean;
  onReview?: (id: string, status: SubmissionReviewStatus, feedback?: string) => Promise<void>;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead>Student</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Project name</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <StudentProjectSubmissionCard
                key={submission.id ?? `${submission.courseId}-${submission.studentId}-${submission.submittedAt}`}
                submission={submission}
                isSample={isSample}
                onReview={onReview}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
