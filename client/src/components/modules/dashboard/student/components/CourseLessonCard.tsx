import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  FolderKanban,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { CourseContent } from "@/components/modules/courseDetails/courseContent";
import type { ProjectSubmissionDetails, StudentProjectSubmission } from "@/lib/project-submissions";
import { ProjectSubmissionForm } from "./ProjectSubmissionForm";

export function CourseLessonCard({
  content,
  currentStep,
  isProject,
  onPrevious,
  onNext,
  submission,
  onSubmitProject,
}: {
  content: CourseContent;
  currentStep: number;
  isProject: boolean;
  onPrevious: () => void;
  onNext: () => void;
  submission: StudentProjectSubmission | null;
  onSubmitProject: (details: ProjectSubmissionDetails) => void;
}) {
  const title = isProject ? content.projectTitle : content.articles[currentStep];
  const StepIcon = isProject ? FolderKanban : BookOpenText;

  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border-border/70 p-0 shadow-none">
      <CardHeader className={`border-b border-border/70 px-5 py-5 sm:px-8 ${isProject ? "bg-emerald-50/70 dark:bg-emerald-950/30" : "bg-muted/30"}`}>
        <div className="flex items-center gap-3">
          <span className={`flex size-10 items-center justify-center rounded-xl ${isProject ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200" : "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300"}`}>
            <StepIcon className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {isProject ? "Final module · Project" : `Module 1 · Article ${currentStep + 1} of ${content.articles.length}`}
            </p>
            <h2 id="lesson-title" className="mt-1 min-w-0 text-xl font-semibold tracking-tight [overflow-wrap:anywhere] sm:text-2xl">{title}</h2>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-5 py-6 sm:px-8 sm:py-8">
        {isProject ? (
          <ProjectLesson
            content={content}
            submission={submission}
            onSubmitProject={onSubmitProject}
          />
        ) : (
          <ArticleLesson content={content} articleIndex={currentStep} />
        )}
      </CardContent>

      <div className="flex items-center justify-between gap-3 border-t border-border/70 bg-muted/20 px-5 py-4 sm:px-8">
        <Button type="button" variant="outline" className="rounded-full" disabled={currentStep === 0} onClick={onPrevious}>
          <ArrowLeft className="size-4" aria-hidden="true" /> Previous
        </Button>
        {isProject ? submission ? (
          <Button type="button" className="rounded-full bg-emerald-700 px-5 text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500" onClick={onNext}>
            Finish course <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        ) : (
          <p className="text-right text-xs text-muted-foreground">Submit the project form above to finish the course.</p>
        ) : (
          <Button type="button" className="rounded-full bg-emerald-700 px-5 text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500" onClick={onNext}>
            Next section <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        )}
      </div>
    </Card>
  );
}

function ArticleLesson({
  content,
  articleIndex,
}: {
  content: CourseContent;
  articleIndex: number;
}) {
  const summary = content.articleSummaries[articleIndex]?.trim();
  const outcome = content.outcomes[articleIndex]?.trim();

  return (
    <article className="max-w-3xl">
      <p className="whitespace-pre-line text-base leading-8 text-foreground/85">{summary || content.overview}</p>
      {outcome && (
        <div className="mt-7 rounded-xl border border-border/70 bg-muted/25 p-5">
          <h3 className="text-sm font-semibold">Key takeaway</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{outcome}</p>
        </div>
      )}
    </article>
  );
}

function ProjectLesson({
  content,
  submission,
  onSubmitProject,
}: {
  content: CourseContent;
  submission: StudentProjectSubmission | null;
  onSubmitProject: (details: ProjectSubmissionDetails) => void;
}) {
  return (
    <div className="space-y-6">
      <p className="text-base leading-7 text-muted-foreground">{content.projectDescription}</p>
      <div className="rounded-xl border border-emerald-900/10 bg-emerald-50/60 p-5 dark:border-emerald-200/10 dark:bg-emerald-950/20">
        <p className="text-sm font-semibold">Project outcome</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{content.projectDeliverable}</p>
      </div>
      <ProjectSubmissionForm submission={submission} onSubmit={onSubmitProject} />
    </div>
  );
}
