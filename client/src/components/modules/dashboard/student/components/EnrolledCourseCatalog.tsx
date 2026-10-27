"use client";

import Link from "next/link";
import { useStudentEnrollments } from "@/hooks/use-student-enrollments";
import { CourseCard } from "@/components/modules/homePage/CourseCard";
import { toPublishedCourseCardData } from "@/lib/mentor-course-presentation";

export function EnrolledCourseCatalog() {
  const { enrollments, isReady, error } = useStudentEnrollments();

  if (!isReady) {
    return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">{Array.from({ length: 3 }, (_, index) => <div key={index} className="h-[390px] animate-pulse rounded-2xl border border-border/70 bg-card" />)}</div>;
  }

  if (error) {
    return <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-destructive" role="alert">{error}</p>;
  }

  if (enrollments.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center">
        <h2 className="text-lg font-semibold">You haven’t enrolled in a course yet</h2>
        <p className="mt-2 text-sm text-muted-foreground">Explore the catalog and enroll in a course to start learning.</p>
        <Link href="/student/courses/catalog" className="mt-5 inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500">
          Explore courses
        </Link>
      </div>
    );
  }

  return (
    <section aria-label="Your enrolled courses" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {enrollments.map((enrollment, index) => (
        <CourseCard
          key={enrollment.id}
          course={toPublishedCourseCardData(enrollment.course)}
          index={index}
          detailsHref={`/student/courses/enroll/${enrollment.courseId}`}
        />
      ))}
    </section>
  );
}
