"use client";

import { CourseCard } from "@/components/modules/homePage/CourseCard";
import { courses } from "@/components/modules/homePage/courseData";

export function EnrolledCourseCatalog() {
  return (
    <section aria-label="Available courses" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {courses.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
    </section>
  );
}
