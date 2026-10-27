import Link from "next/link";
import { ArrowLeft, BookOpenText } from "lucide-react";
import { AllPublishedCourses } from "@/components/modules/homePage/AllPublishedCourses";

export default function CoursesPage() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      <header className="space-y-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-4" aria-hidden="true" /> Back to home
        </Link>
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-300">
            <BookOpenText className="size-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-emerald-700 uppercase dark:text-emerald-400">Course catalog</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">All courses</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">Browse all published courses and choose what you want to learn next.</p>
          </div>
        </div>
      </header>
      <AllPublishedCourses />
    </main>
  );
}
