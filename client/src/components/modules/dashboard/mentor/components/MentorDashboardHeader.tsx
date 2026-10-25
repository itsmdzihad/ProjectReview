import Link from "next/link";
import { PlusCircle } from "lucide-react";

export function MentorDashboardHeader() {
  return (
    <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-semibold tracking-[0.16em] text-emerald-700 uppercase dark:text-emerald-400">Mentor workspace</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Teaching dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">Track your courses and review the projects students have submitted.</p>
      </div>
      <Link href="/mentor/courses/create" className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 text-sm font-medium text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500">
        <PlusCircle className="size-4" aria-hidden="true" /> Create a course
      </Link>
    </header>
  );
}
