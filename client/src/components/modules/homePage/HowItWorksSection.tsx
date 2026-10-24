import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { learningSteps } from "./courseData";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto mb-10 max-w-xl text-center">
        <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-emerald-700 uppercase dark:text-emerald-400">A little progress, every day</p>
        <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">A simple path to building</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">Learn the concepts, try them out, and make something that’s yours.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {learningSteps.map(({ number, icon: Icon, title, description }) => (
          <div key={number} className="relative rounded-2xl border border-border/70 bg-card p-6 sm:p-7">
            <div className="mb-6 flex items-center justify-between">
              <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"><Icon className="size-5" aria-hidden="true" /></span>
              <span className="font-mono text-xs text-muted-foreground/60">{number}</span>
            </div>
            <h3 className="text-base font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-emerald-900 px-6 py-6 text-white sm:flex-row sm:px-8 dark:bg-emerald-950">
        <div>
          <h3 className="text-lg font-semibold">Ready to write your first line?</h3>
          <p className="mt-1 text-sm text-emerald-100/80">Pick a course and make today your starting point.</p>
        </div>
        <Button render={<a href="#courses" />} variant="secondary" className="rounded-full bg-white px-5 text-emerald-950 hover:bg-emerald-50">
          Find your course <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}
