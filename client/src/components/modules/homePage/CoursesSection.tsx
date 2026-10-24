import { ArrowUpRight } from "lucide-react";
import { courses } from "./courseData";
import { CourseCard } from "./CourseCard";

export function CoursesSection() {
  return (
    <section id="courses" className="scroll-mt-20 border-y border-border/70 bg-muted/30">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-emerald-700 uppercase dark:text-emerald-400">Your next skill starts here</p>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Explore courses</h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">Start learning with practical, text-based programming courses.</p>
          </div>
          <a href="#how-it-works" className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-emerald-700 dark:hover:text-emerald-400">
            How learning works <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {courses.map((course, index) => (
            <CourseCard key={course.title} course={course} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
