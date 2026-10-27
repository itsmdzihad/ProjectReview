"use client";

import { startTransition, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Code2 } from "lucide-react";
import { getPublishedCoursesAction } from "@/actions/course.actions";
import type { PublishedCourse } from "@/services/course.services";
import { getCourseMetadata } from "@/lib/mentor-course-presentation";
import { CourseCard } from "./CourseCard";
import type { Course } from "./types";

const cardStyle = {
  accent: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  graphic: "from-emerald-100/80 to-teal-50 dark:from-emerald-950 dark:to-teal-950",
};

function toCourseCardData(course: PublishedCourse): Course {
  const metadata = getCourseMetadata(course.content);

  return {
    id: course.id,
    title: course.title,
    description: course.description,
    category: metadata.category,
    level: metadata.level,
    duration: metadata.duration,
    coverImageUrl: course.coverImage ?? undefined,
    instructorName: course.mentor?.name,
    icon: Code2,
    ...cardStyle,
    code: [
      `// ${course.title}`,
      `// by ${course.mentor?.name ?? "CodePath mentor"}`,
      "Start learning...",
    ],
  };
}

export function CoursesSection() {
  const [courses, setCourses] = useState<PublishedCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    startTransition(async () => {
      const result = await getPublishedCoursesAction();
      if (!active) return;

      if (result.error) {
        setLoadError(result.error.message);
      } else {
        setCourses(result.data);
      }
      setIsLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="courses" className="scroll-mt-20 border-y border-border/70 bg-muted/30">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-emerald-700 uppercase dark:text-emerald-400">Your next skill starts here</p>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Explore courses</h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">Start learning with practical, text-based programming courses.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#how-it-works" className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-emerald-700 dark:hover:text-emerald-400">
              How learning works <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <Link href="/courses" className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-4 text-sm font-semibold transition-colors hover:bg-muted">
              See all courses <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {courses.map((course, index) => {
            const cardCourse = toCourseCardData(course);
            return <CourseCard key={course.id} course={cardCourse} index={index} />;
          })}
          {isLoading && Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="h-[390px] animate-pulse rounded-2xl border border-border/70 bg-card" aria-label="Loading courses" />
          ))}
          {!isLoading && !loadError && courses.length === 0 && (
            <p className="col-span-full rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              No published courses are available yet. Please check back soon.
            </p>
          )}
          {!isLoading && loadError && (
            <p className="col-span-full rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground" role="status">
              {loadError}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
