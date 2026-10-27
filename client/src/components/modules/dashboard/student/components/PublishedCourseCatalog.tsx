"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPublishedCoursesAction } from "@/actions/course.actions";
import { CourseCard } from "@/components/modules/homePage/CourseCard";
import { toPublishedCourseCardData } from "@/lib/mentor-course-presentation";
import type { PublishedCourse } from "@/services/course.services";
import { useStudentEnrollments } from "@/hooks/use-student-enrollments";

export function PublishedCourseCatalog() {
  const [courses, setCourses] = useState<PublishedCourse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { enrolledCourseIds, isReady: enrollmentsReady } = useStudentEnrollments();

  useEffect(() => {
    let active = true;
    void getPublishedCoursesAction(100).then((result) => {
      if (!active) return;
      if (result.error) setError(result.error.message);
      else setCourses(result.data);
      setIsLoading(false);
    });
    return () => { active = false; };
  }, []);

  if (isLoading || !enrollmentsReady) {
    return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">{Array.from({ length: 3 }, (_, index) => <div key={index} className="h-[390px] animate-pulse rounded-2xl border border-border/70 bg-card" />)}</div>;
  }

  if (error) {
    return <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-destructive" role="alert">{error}</p>;
  }

  if (courses.length === 0) {
    return <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">No published courses are available yet.</p>;
  }

  const enrolledCourseIdSet = new Set(enrolledCourseIds);
  const coursesToExplore = courses.filter((course) => !enrolledCourseIdSet.has(course.id));

  if (coursesToExplore.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center">
        <h2 className="text-lg font-semibold">You’re enrolled in every available course</h2>
        <p className="mt-2 text-sm text-muted-foreground">Continue learning in your enrolled courses while new courses are added.</p>
        <Link href="/student/courses/enroll" className="mt-5 inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500">
          View my enrolled courses
        </Link>
      </div>
    );
  }

  return (
    <section aria-label="Available courses" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {coursesToExplore.map((course, index) => (
        <CourseCard
          key={course.id}
          course={toPublishedCourseCardData(course)}
          index={index}
          detailsHref={`/student/courses/enroll/${course.id}`}
        />
      ))}
    </section>
  );
}
