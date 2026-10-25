import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Clock3,
  FolderKanban,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Course } from "@/components/modules/homePage/types";
import type { CourseContent } from "@/components/modules/courseDetails/courseContent";
import type { StudentProjectSubmission } from "@/hooks/use-student-project-submission";
import { ProjectSubmissionForm } from "./ProjectSubmissionForm";

export function CourseLessonCard({
  course,
  content,
  currentStep,
  isProject,
  onPrevious,
  onNext,
  submission,
  onSubmitProject,
}: {
  course: Course;
  content: CourseContent;
  currentStep: number;
  isProject: boolean;
  onPrevious: () => void;
  onNext: () => void;
  submission: StudentProjectSubmission | null;
  onSubmitProject: (details: Omit<StudentProjectSubmission, "submittedAt">) => void;
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
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {isProject ? "Final module · Project" : `Module 1 · Article ${currentStep + 1} of ${content.articles.length}`}
            </p>
            <h2 id="lesson-title" className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
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
          <ArticleLesson course={course} content={content} articleIndex={currentStep} />
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
  course,
  content,
  articleIndex,
}: {
  course: Course;
  content: CourseContent;
  articleIndex: number;
}) {
  return (
    <article className="max-w-3xl">
      <div className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Clock3 className="size-3.5" aria-hidden="true" />
        <span>About 8 min read</span>
      </div>
      <p className="text-base leading-8 text-foreground/85">{content.articleSummaries[articleIndex]}</p>
      <div className="mt-7 rounded-xl border border-border/70 bg-muted/25 p-5">
        <h3 className="text-sm font-semibold">What to remember</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{content.outcomes[articleIndex % content.outcomes.length]}. Look for a small way to apply this idea in your own project before moving on.</p>
      </div>
      <div className="mt-5 overflow-hidden rounded-xl border border-border/70 bg-zinc-950 text-zinc-100">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="size-2 rounded-full bg-rose-400" />
          <span className="size-2 rounded-full bg-amber-400" />
          <span className="size-2 rounded-full bg-emerald-400" />
          <span className="ml-2 font-mono text-[10px] text-zinc-400">course-example</span>
        </div>
        <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 text-emerald-200"><code>{course.code.join("\n")}</code></pre>
      </div>
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
  onSubmitProject: (details: Omit<StudentProjectSubmission, "submittedAt">) => void;
}) {
  return (
    <div className="space-y-6">
      <p className="text-base leading-7 text-muted-foreground">{content.projectDescription}</p>
      <div className="rounded-xl border border-emerald-900/10 bg-emerald-50/60 p-5 dark:border-emerald-200/10 dark:bg-emerald-950/20">
        <p className="text-sm font-semibold">Project outcome</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{content.projectDeliverable}</p>
      </div>
      <div className="rounded-xl border border-border/70 p-5">
        <h3 className="text-sm font-semibold">Suggested approach</h3>
        <ol className="mt-3 list-inside list-decimal space-y-2 text-sm leading-6 text-muted-foreground">
          <li>Review the course articles and identify the concepts you’ll use.</li>
          <li>Break the deliverable into small parts and build them one at a time.</li>
          <li>Test your work, make improvements, and prepare it to share.</li>
        </ol>
      </div>
      <ProjectSubmissionForm submission={submission} onSubmit={onSubmitProject} />
    </div>
  );
}
