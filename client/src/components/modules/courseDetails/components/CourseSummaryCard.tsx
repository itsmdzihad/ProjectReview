import { BookOpenText, Clock3, FolderKanban, Layers3 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { Course } from "@/components/modules/homePage/types";
import type { CourseContent } from "../courseContent";
import { CourseEnrollmentAction } from "./CourseEnrollmentAction";

export function CourseSummaryCard({ course, content }: { course: Course; content: CourseContent }) {
  const CourseIcon = course.icon;

  return (
    <aside className="lg:sticky lg:top-24">
      <Card className="gap-0 overflow-hidden rounded-2xl border-border/70 p-0 shadow-sm">
        <div className={`relative flex h-36 items-center justify-center overflow-hidden bg-linear-to-br ${course.graphic}`}>
          <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(var(--foreground)_0.7px,transparent_0.7px)] [background-size:14px_14px]" />
          <span className={`relative flex size-16 items-center justify-center rounded-2xl ${course.accent} shadow-sm`}>
            <CourseIcon className="size-8" aria-hidden="true" />
          </span>
          <span className="absolute top-4 left-4 rounded-full border border-white/60 bg-white/70 px-2.5 py-1 text-[10px] font-semibold text-foreground/70 dark:border-white/10 dark:bg-black/30 dark:text-white/80">CODEPATH COURSE</span>
        </div>
        <CardHeader className="gap-1 px-5 pt-5 pb-4">
          <p className="text-xs font-medium text-muted-foreground">Course details</p>
          <h2 className="text-lg font-semibold leading-snug">{course.title}</h2>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="space-y-3 border-y border-border/70 py-4">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 text-muted-foreground"><Layers3 className="size-4" aria-hidden="true" /> Level</span>
              <span className="font-medium">{course.level ?? "Not specified"}</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 text-muted-foreground"><Clock3 className="size-4" aria-hidden="true" /> Estimated time</span>
              <span className="font-medium">{course.duration ?? "Not specified"}</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 text-muted-foreground"><BookOpenText className="size-4" aria-hidden="true" /> Article lessons</span>
              <span className="font-medium">{content.articles.length}</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 text-muted-foreground"><FolderKanban className="size-4" aria-hidden="true" /> Final project</span>
              <span className="font-medium">1 project</span>
            </div>
          </div>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">Learn through focused articles, then demonstrate your skills with a project.</p>
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-3 border-t border-border/70 px-5 py-4">
          <CourseEnrollmentAction courseId={course.id} />
          <p className="text-center text-[11px] text-muted-foreground">Self-paced · Learn from anywhere</p>
        </CardFooter>
      </Card>
    </aside>
  );
}
