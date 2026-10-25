"use client";

import { useId, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import type { StudentProjectSubmission } from "@/lib/project-submissions";

export function StudentProjectSubmissionCard({
  submission,
  isSample = false,
}: {
  submission: StudentProjectSubmission;
  isSample?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsId = useId();

  return (
    <>
      <TableRow>
        <TableCell className="min-w-40 font-medium">
          <div>{submission.studentName}</div>
          {isSample && <span className="mt-1 inline-block text-[10px] font-semibold tracking-wide text-amber-700 uppercase dark:text-amber-300">Sample</span>}
        </TableCell>
        <TableCell className="min-w-48 text-muted-foreground">{submission.studentEmail}</TableCell>
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
          <TableCell colSpan={5} className="bg-muted/20 px-5 py-5">
            <p className="max-w-4xl whitespace-pre-wrap text-sm leading-6 text-foreground/80">{submission.description}</p>
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
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
