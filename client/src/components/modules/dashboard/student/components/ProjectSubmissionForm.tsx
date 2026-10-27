"use client";

import { useState } from "react";
import { CheckCircle2, ExternalLink, Pencil, Send } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatValidationErrors } from "@/lib/validation-messages";
import type { StudentProjectSubmission } from "@/lib/project-submissions";
import type { ProjectSubmissionDetails } from "@/lib/project-submissions";

type SubmissionFields = ProjectSubmissionDetails;

const projectSubmissionSchema = z.object({
  projectName: z.string().trim().min(3, "Project name must be at least 3 characters.").max(150, "Project name must be at most 150 characters."),
  repoUrl: z.string().trim().min(1, "Enter your repository URL.").pipe(z.url("Enter a valid repository URL.")),
  liveLink: z.string().trim().min(1, "Enter your live project URL.").pipe(z.url("Enter a valid live project URL.")),
  description: z.string().trim().min(10, "Description must be at least 10 characters.").max(3000, "Description must be at most 3000 characters."),
});

export function ProjectSubmissionForm({
  submission,
  onSubmit,
  onDelete,
}: {
  submission: StudentProjectSubmission | null;
  onSubmit: (details: SubmissionFields) => Promise<boolean>;
  onDelete: () => Promise<boolean>;
}) {
  const [isEditing, setIsEditing] = useState(!submission);
  const form = useForm({
    defaultValues: {
      projectName: submission?.projectName ?? "",
      repoUrl: submission?.repoUrl ?? "",
      liveLink: submission?.liveLink ?? "",
      description: submission?.description ?? "",
    },
    validators: { onSubmit: projectSubmissionSchema },
    onSubmit: async ({ value }) => {
      const success = await onSubmit(value);
      if (success) setIsEditing(false);
    },
  });

  if (submission && !isEditing) {
    const isPending = !submission.status || submission.status === "PENDING";

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
              {submission.status && (
                <p className="mt-2 inline-flex rounded-full bg-background px-2.5 py-1 text-[11px] font-semibold text-foreground/80">
                  {submission.status === "PENDING" ? "Awaiting review" : submission.status === "APPROVED" ? "Approved" : "Needs changes"}
                </p>
              )}
            </div>
          </div>
          {isPending && (
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={() => setIsEditing(true)}>
                <Pencil className="size-3.5" aria-hidden="true" /> Edit submission
              </Button>
              <Button type="button" variant="outline" size="sm" className="rounded-full text-destructive" onClick={() => {
                if (window.confirm("Delete this project submission?")) void onDelete();
              }}>
                Delete
              </Button>
            </div>
          )}
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
        {submission.feedback && (
          <div className="mt-4 rounded-xl border border-border/70 bg-background/70 p-4">
            <h4 className="text-xs font-semibold">Mentor feedback</h4>
            <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{submission.feedback}</p>
          </div>
        )}
      </section>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit();
      }}
      className="space-y-5 rounded-2xl border border-border/70 p-5 sm:p-6"
    >
      <div>
        <h3 className="text-base font-semibold">Submit your project</h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">Share your completed work to finish this course. You can update your submission later.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="projectName">Project name</Label>
          <form.Field name="projectName">
            {(field) => (
              <>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="My personal profile site"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  aria-invalid={field.state.meta.errors.length > 0}
                  aria-describedby="projectName-error"
                />
                <FieldValidationMessage id="projectName-error" errors={field.state.meta.errors} />
              </>
            )}
          </form.Field>
        </div>
        <div className="space-y-2">
          <Label htmlFor="repoUrl">Repository URL</Label>
          <form.Field name="repoUrl">
            {(field) => (
              <>
                <Input
                  id={field.name}
                  name={field.name}
                  type="url"
                  placeholder="https://github.com/you/project"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  aria-invalid={field.state.meta.errors.length > 0}
                  aria-describedby="repoUrl-error"
                />
                <FieldValidationMessage id="repoUrl-error" errors={field.state.meta.errors} />
              </>
            )}
          </form.Field>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="liveLink">Live project URL</Label>
          <form.Field name="liveLink">
            {(field) => (
              <>
                <Input
                  id={field.name}
                  name={field.name}
                  type="url"
                  placeholder="https://your-project.example.com"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  aria-invalid={field.state.meta.errors.length > 0}
                  aria-describedby="liveLink-error"
                />
                <FieldValidationMessage id="liveLink-error" errors={field.state.meta.errors} />
              </>
            )}
          </form.Field>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description">Description</Label>
          <form.Field name="description">
            {(field) => (
              <>
                <textarea
                  id={field.name}
                  name={field.name}
                  rows={5}
                  placeholder="Describe what you built, the features you included, and what you learned."
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  aria-invalid={field.state.meta.errors.length > 0}
                  aria-describedby="description-help description-error"
                  className="w-full resize-y rounded-2xl border border-border bg-background px-3 py-2.5 text-sm leading-6 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 placeholder:text-muted-foreground"
                />
                <FieldValidationMessage id="description-error" errors={field.state.meta.errors} />
              </>
            )}
          </form.Field>
          <p id="description-help" className="text-xs text-muted-foreground">10–3000 characters. Include the main features and what you learned.</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-3 border-t border-border/70 pt-4">
        {submission && (
          <Button type="button" variant="outline" className="rounded-full" onClick={() => {
            form.reset();
            form.setFieldValue("projectName", submission?.projectName ?? "");
            form.setFieldValue("repoUrl", submission?.repoUrl ?? "");
            form.setFieldValue("liveLink", submission?.liveLink ?? "");
            form.setFieldValue("description", submission?.description ?? "");
            setIsEditing(false);
          }}>
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

function FieldValidationMessage({ id, errors }: { id: string; errors: readonly unknown[] }) {
  const message = formatValidationErrors(errors);
  if (!message) return null;

  return <p id={id} className="text-xs text-destructive">{message}</p>;
}
