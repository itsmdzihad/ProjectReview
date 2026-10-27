"use client";

import { useId, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import type { StudentProjectSubmission } from "@/lib/project-submissions";
import type { SubmissionReviewStatus } from "@/services/submission.services";

export function StudentProjectSubmissionCard({
  submission,
  isSample = false,
  onReview,
}: {
  submission: StudentProjectSubmission;
  isSample?: boolean;
  onReview?: (id: string, status: SubmissionReviewStatus, feedback?: string) => Promise<void>;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [feedback, setFeedback] = useState(submission.feedback ?? "");
  const [feedbackError, setFeedbackError] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const detailsId = useId();
  const canReview = !isSample && submission.status === "PENDING" && submission.id && onReview;

  const submitReview = async (status: SubmissionReviewStatus) => {
    if (!submission.id || !onReview) return;
    const reviewFeedback = feedback.trim();
    if (status === "REJECTED" && !reviewFeedback) {
      setFeedbackError("Feedback is required when requesting changes.");
      return;
    }
    setFeedbackError("");
    setIsReviewing(true);
    try {
      await onReview(submission.id, status, reviewFeedback || undefined);
    } finally {
      setIsReviewing(false);
    }
  };

  return (
    <>
      <TableRow>
        <TableCell className="min-w-40 font-medium">
          <div>{submission.studentName}</div>
          {isSample && <span className="mt-1 inline-block text-[10px] font-semibold tracking-wide text-amber-700 uppercase dark:text-amber-300">Sample</span>}
        </TableCell>
        <TableCell className="min-w-48 text-muted-foreground">{submission.studentEmail}</TableCell>
        <TableCell className="min-w-40 text-muted-foreground">{submission.courseTitle ?? "—"}</TableCell>
        <TableCell className="min-w-48 font-medium">{submission.projectName}</TableCell>
        <TableCell className="min-w-32 text-muted-foreground">{new Date(submission.submittedAt).toLocaleDateString()}</TableCell>
        <TableCell className="text-right">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-full text-emerald-700 hover:text-emerald-800 dark:text-emerald-300"
            aria-expanded={isExpanded}
            aria-controls={detailsId}
            onClick={() => setIsExpanded((expanded) => !expanded)}
          >
            {isExpanded ? "View less" : "View more"}
            <ArrowDown className={`size-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} aria-hidden="true" />
          </Button>
        </TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow id={detailsId}>
          <TableCell colSpan={6} className="bg-muted/20 px-5 py-5">
            {submission.status && (
              <p className="mb-3 text-xs font-semibold text-muted-foreground">
                Status: {submission.status === "PENDING" ? "Pending review" : submission.status === "APPROVED" ? "Approved" : "Changes requested"}
              </p>
            )}
            <p className="max-w-4xl whitespace-pre-wrap text-sm leading-6 text-foreground/80">{submission.description}</p>
            {submission.feedback && (
              <div className="mt-4 rounded-xl border border-border/70 bg-background p-4">
                <p className="text-xs font-semibold">Previous feedback</p>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{submission.feedback}</p>
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={submission.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-2 text-sm font-medium transition-colors hover:bg-muted">
                Repository <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              {submission.liveLink && (
                <a href={submission.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-2 text-sm font-medium transition-colors hover:bg-muted">
                  Live project <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              )}
            </div>
            {canReview && (
              <div className="mt-5 max-w-2xl space-y-3 border-t border-border/70 pt-4">
                <label htmlFor={`feedback-${submission.id}`} className="text-sm font-medium">Feedback <span className="font-normal text-muted-foreground">(required to request changes)</span></label>
                <textarea
                  id={`feedback-${submission.id}`}
                  value={feedback}
                  onChange={(event) => {
                    setFeedback(event.target.value);
                    setFeedbackError("");
                  }}
                  maxLength={3000}
                  rows={3}
                  placeholder="Share clear, helpful feedback with the student."
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm leading-6 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 placeholder:text-muted-foreground"
                />
                {feedbackError && <p className="text-xs text-destructive">{feedbackError}</p>}
                <div className="flex flex-wrap justify-end gap-2">
                  <Button type="button" variant="outline" className="rounded-full" disabled={isReviewing} onClick={() => void submitReview("REJECTED")}>
                    <X className="size-4" aria-hidden="true" /> Request changes
                  </Button>
                  <Button type="button" className="rounded-full bg-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500" disabled={isReviewing} onClick={() => void submitReview("APPROVED")}>
                    <Check className="size-4" aria-hidden="true" /> Approve
                  </Button>
                </div>
              </div>
            )}
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
