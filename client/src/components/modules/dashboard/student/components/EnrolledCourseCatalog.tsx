"use client";

import { CourseCard } from "@/components/modules/homePage/CourseCard";
import { courses } from "@/components/modules/homePage/courseData";
import { useMentorCourses } from "@/hooks/use-mentor-courses";
import { toCourseCardData } from "@/lib/mentor-course-presentation";

export function EnrolledCourseCatalog() {
  const { mentorCourses } = useMentorCourses();

  return (
    <section aria-label="Available courses" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {courses.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
      {mentorCourses.map((mentorCourse, index) => (
        <CourseCard
          key={mentorCourse.id}
          course={toCourseCardData(mentorCourse)}
          index={courses.length + index}
          detailsHref={`/student/courses/enroll/${mentorCourse.id}`}
        />
      ))}
    </section>
  );
}
