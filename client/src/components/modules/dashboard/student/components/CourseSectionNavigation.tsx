"use client";

import { Check, Circle, FolderKanban } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CourseContent } from "@/components/modules/courseDetails/courseContent";

export function CourseSectionNavigation({
  content,
  currentStep,
  onSelectStep,
}: {
  content: CourseContent;
  currentStep: number;
  onSelectStep: (step: number) => void;
}) {
  const isComplete = currentStep >= content.articles.length + 1;
  const isProject = currentStep === content.articles.length && !isComplete;

  return (
    <Card className="rounded-2xl border-border/70 shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Course sections</CardTitle>
        <p className="text-xs text-muted-foreground">Move through the articles, then finish with the project.</p>
      </CardHeader>
      <CardContent>
        <ol className="space-y-1">
          {content.articles.map((article, index) => {
            const isCurrent = !isComplete && currentStep === index;
            const isDone = currentStep > index;

            return (
              <li key={article}>
                <button
                  type="button"
                  className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-55 ${isCurrent ? "bg-emerald-600/10 text-foreground" : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"}`}
                  onClick={() => onSelectStep(index)}
                  disabled={index > currentStep}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  <span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${isDone ? "bg-emerald-600 text-white" : isCurrent ? "text-emerald-700 dark:text-emerald-300" : "text-muted-foreground"}`}>
                    {isDone ? <Check className="size-3.5" aria-hidden="true" /> : <Circle className="size-3.5" aria-hidden="true" />}
                  </span>
                  <span className="text-xs leading-5">{article}</span>
                </button>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-55 ${isProject ? "bg-emerald-600/10 text-foreground" : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"}`}
              onClick={() => onSelectStep(content.articles.length)}
              disabled={currentStep < content.articles.length}
              aria-current={isProject ? "step" : undefined}
            >
              <span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${isComplete ? "bg-emerald-600 text-white" : isProject ? "text-emerald-700 dark:text-emerald-300" : "text-muted-foreground"}`}>
                {isComplete ? <Check className="size-3.5" aria-hidden="true" /> : <FolderKanban className="size-3.5" aria-hidden="true" />}
              </span>
              <span className="text-xs leading-5">{content.projectTitle}</span>
            </button>
          </li>
        </ol>
      </CardContent>
    </Card>
  );
}
