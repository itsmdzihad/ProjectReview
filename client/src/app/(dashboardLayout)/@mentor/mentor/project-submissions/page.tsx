import { ClipboardList } from "lucide-react";
import { MentorProjectSubmissions } from "@/components/modules/dashboard/mentor/MentorProjectSubmissions";

export default function MentorProjectSubmissionsPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-300">
          <ClipboardList className="size-6" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-emerald-700 uppercase dark:text-emerald-400">Review student work</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">Project submissions</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">Select one of your courses to review every project students have submitted.</p>
        </div>
      </header>
      <MentorProjectSubmissions />
    </div>
  );
}
