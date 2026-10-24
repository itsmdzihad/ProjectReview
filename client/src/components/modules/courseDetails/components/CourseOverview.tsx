import { Check } from "lucide-react";
import type { Course } from "@/components/modules/homePage/types";
import type { CourseContent } from "../courseContent";

export function CourseOverview({ course, content }: { course: Course; content: CourseContent }) {
  const CourseIcon = course.icon;

  return (
    <section aria-labelledby="course-overview" className="rounded-2xl border border-border/70 bg-card p-5 sm:p-7">
      <div className="flex items-center gap-3">
        <span className={`flex size-10 items-center justify-center rounded-xl ${course.accent}`}>
          <CourseIcon className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-medium text-muted-foreground">Course overview</p>
          <h2 id="course-overview" className="text-base font-semibold">Learn the concepts, then put them to work</h2>
        </div>
      </div>
      <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">{content.overview}</p>
      <div className="mt-6 border-t border-border/70 pt-5">
        <h3 className="mb-4 text-sm font-semibold">What you’ll learn</h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {content.outcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-2.5 text-sm leading-6 text-muted-foreground">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <Check className="size-3" aria-hidden="true" />
              </span>
              {outcome}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
