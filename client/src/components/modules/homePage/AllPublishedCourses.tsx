"use client";

import { useEffect, useState } from "react";
import { Code2 } from "lucide-react";
import { getPublishedCoursesAction } from "@/actions/course.actions";
import { PaginationControls } from "@/components/modules/dashboard/PaginationControls";
import { CourseCard } from "@/components/modules/homePage/CourseCard";
import { getCourseMetadata } from "@/lib/mentor-course-presentation";
import type { PublishedCourse } from "@/services/course.services";
import type { Course } from "./types";

const pageSizeOptions = [5, 10, 20, 50] as const;

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
    accent: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    graphic: "from-emerald-100/80 to-teal-50 dark:from-emerald-950 dark:to-teal-950",
    code: [`// ${course.title}`, `// by ${course.mentor?.name ?? "CodePath mentor"}`, "Start learning..."],
  };
}

export function AllPublishedCourses() {
  const [courses, setCourses] = useState<PublishedCourse[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<(typeof pageSizeOptions)[number]>(10);
  const [reloadKey, setReloadKey] = useState(0);
  const [loadedQueryKey, setLoadedQueryKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const queryKey = `${page}-${pageSize}-${reloadKey}`;
  const isLoading = loadedQueryKey !== queryKey;

  useEffect(() => {
    let active = true;
    void getPublishedCoursesAction(pageSize, page).then((result) => {
      if (!active) return;
      if (result.error) {
        setError(result.error.message);
        setCourses([]);
      } else {
        setError(null);
        setCourses(result.data);
      }
      setLoadedQueryKey(queryKey);
    });
    return () => { active = false; };
  }, [page, pageSize, queryKey]);

  const hasNextPage = courses.length === pageSize;

  return (
    <div className="space-y-6">
      {error && !isLoading ? (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center" role="alert">
          <p className="text-sm text-destructive">{error}</p>
          <button type="button" className="mt-4 text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400" onClick={() => setReloadKey((current) => current + 1)}>
            Try again
          </button>
        </div>
      ) : isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5" aria-label="Loading courses" aria-busy="true">
          {Array.from({ length: Math.min(pageSize, 6) }, (_, index) => <div key={index} className="h-[390px] animate-pulse rounded-2xl border border-border/70 bg-card" />)}
        </div>
      ) : courses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <h2 className="text-lg font-semibold">No published courses yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">Published courses will appear here when mentors add them.</p>
        </div>
      ) : (
        <>
          <section aria-label="All published courses" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={toCourseCardData(course)} index={(page - 1) * pageSize + index} />
            ))}
          </section>
          <PaginationControls
            page={page}
            pageSize={pageSize}
            canPrevious={page > 1 && !isLoading}
            canNext={hasNextPage && !isLoading}
            pageSizeLabel="Courses per page"
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              if (!pageSizeOptions.includes(size as (typeof pageSizeOptions)[number])) return;
              setPageSize(size as (typeof pageSizeOptions)[number]);
              setPage(1);
            }}
          />
        </>
      )}
    </div>
  );
}
