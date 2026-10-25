import { ArrowLeft, BookOpenText } from "lucide-react";
import Link from "next/link";
import { CreateMentorCourseForm } from "@/components/modules/dashboard/mentor/CreateMentorCourseForm";

export default function CreateMentorCoursePage() {
  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <Link href="/mentor/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-4" aria-hidden="true" /> Back to dashboard
        </Link>
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-300">
            <BookOpenText className="size-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-emerald-700 uppercase dark:text-emerald-400">Course workspace</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">Create a course</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">Add an article path and final project for students to complete and submit.</p>
          </div>
        </div>
      </header>
      <CreateMentorCourseForm />
    </div>
  );
}
