import { BookOpenText } from "lucide-react";

export function CourseInformationSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border/70 bg-card p-5 sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-300">
          <BookOpenText className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-semibold">Course information</h2>
          <p className="mt-1 text-sm text-muted-foreground">Set the details students will see in the course catalog.</p>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {children}
      </div>
    </section>
  );
}
