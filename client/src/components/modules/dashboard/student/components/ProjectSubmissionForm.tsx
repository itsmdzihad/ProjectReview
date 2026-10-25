"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, ExternalLink, Pencil, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { StudentProjectSubmission } from "@/hooks/use-student-project-submission";

type SubmissionFields = Omit<StudentProjectSubmission, "submittedAt">;

export function ProjectSubmissionForm({
  submission,
  onSubmit,
}: {
  submission: StudentProjectSubmission | null;
  onSubmit: (details: SubmissionFields) => void;
}) {
  const [isEditing, setIsEditing] = useState(!submission);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    onSubmit({
      projectName: String(formData.get("projectName") ?? "").trim(),
      repoUrl: String(formData.get("repoUrl") ?? "").trim(),
      liveLink: String(formData.get("liveLink") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
    });
    setIsEditing(false);
  }

  if (submission && !isEditing) {
    return (
      <section className="rounded-2xl border border-emerald-900/10 bg-emerald-50/60 p-5 dark:border-emerald-200/10 dark:bg-emerald-950/20" aria-label="Project submission status">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
              <CheckCircle2 className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-sm font-semibold">Project submitted</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Saved {new Date(submission.submittedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={() => setIsEditing(true)}>
            <Pencil className="size-3.5" aria-hidden="true" /> Edit submission
          </Button>
        </div>
        <dl className="mt-5 grid gap-4 border-t border-emerald-900/10 pt-4 text-sm dark:border-emerald-200/10 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-muted-foreground">Project name</dt>
            <dd className="mt-1 font-medium">{submission.projectName}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Repository</dt>
            <dd className="mt-1">
              <a href={submission.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-emerald-800 hover:underline dark:text-emerald-300">
                Open repository <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            </dd>
          </div>
          {submission.liveLink && (
            <div>
              <dt className="text-xs text-muted-foreground">Live project</dt>
              <dd className="mt-1">
                <a href={submission.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-emerald-800 hover:underline dark:text-emerald-300">
                  Open live link <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </dd>
            </div>
          )}
          <div className="sm:col-span-2">
            <dt className="text-xs text-muted-foreground">Description</dt>
            <dd className="mt-1 leading-6 text-foreground/80">{submission.description}</dd>
          </div>
        </dl>
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border/70 p-5 sm:p-6">
      <div>
        <h3 className="text-base font-semibold">Submit your project</h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">Share your completed work to finish this course. You can update your submission later.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="projectName">Project name</Label>
          <Input id="projectName" name="projectName" placeholder="My personal profile site" required defaultValue={submission?.projectName ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="repoUrl">Repository URL</Label>
          <Input id="repoUrl" name="repoUrl" type="url" placeholder="https://github.com/you/project" required defaultValue={submission?.repoUrl ?? ""} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="liveLink">Live link <span className="font-normal text-muted-foreground">(optional)</span></Label>
          <Input id="liveLink" name="liveLink" type="url" placeholder="https://your-project.example.com" defaultValue={submission?.liveLink ?? ""} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            name="description"
            required
            minLength={20}
            rows={5}
            placeholder="Describe what you built, the features you included, and what you learned."
            defaultValue={submission?.description ?? ""}
            className="w-full resize-y rounded-2xl border border-border bg-background px-3 py-2.5 text-sm leading-6 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 placeholder:text-muted-foreground"
          />
          <p className="text-xs text-muted-foreground">At least 20 characters. Include the main features and what you learned.</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-3 border-t border-border/70 pt-4">
        {submission && (
          <Button type="button" variant="outline" className="rounded-full" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        )}
        <Button type="submit" className="rounded-full bg-emerald-700 px-5 text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500">
          <Send className="size-4" aria-hidden="true" /> Submit project
        </Button>
      </div>
    </form>
  );
}
