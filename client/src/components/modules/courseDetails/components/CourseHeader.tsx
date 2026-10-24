import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/components/modules/homePage/types";

export function CourseHeader({ course }: { course: Course }) {
  return (
    <>
      <Link href="/#courses" className="mb-6 inline-flex items-center gap-2 rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <ArrowLeft className="size-4" aria-hidden="true" /> All courses
      </Link>
      <header className="mb-8 max-w-4xl sm:mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{course.category}</Badge>
          <Badge variant="outline">{course.level}</Badge>
        </div>
        <h1 className="text-3xl leading-tight font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">{course.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{course.description}</p>
      </header>
    </>
  );
}
