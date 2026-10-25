import Link from "next/link";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { MentorCourseLibrary } from "@/components/modules/dashboard/mentor/components/MentorCourseLibrary";

export default function MentorCoursesPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-4">
          <Link href="/mentor/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="size-4" aria-hidden="true" /> Back to dashboard
          </Link>
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-emerald-700 uppercase dark:text-emerald-400">Course workspace</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">My Courses</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">Manage and review all the courses you’ve created.</p>
          </div>
        </div>
        <Link href="/mentor/courses/create" className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 text-sm font-medium text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500">
          <PlusCircle className="size-4" aria-hidden="true" /> Create Course
        </Link>
      </header>
      <MentorCourseLibrary />
    </div>
  );
}
