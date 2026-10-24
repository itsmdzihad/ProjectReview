import type { Course } from "@/components/modules/homePage/types";
import type { CourseContent } from "./courseContent";
import { CourseCurriculum } from "./components/CourseCurriculum";
import { CourseHeader } from "./components/CourseHeader";
import { CourseOverview } from "./components/CourseOverview";
import { CourseSummaryCard } from "./components/CourseSummaryCard";

type CourseDetailsPageProps = {
  course: Course;
  content: CourseContent;
};

export function CourseDetailsPage({ course, content }: CourseDetailsPageProps) {
  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      <CourseHeader course={course} />
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
        <div className="min-w-0 space-y-8">
          <CourseOverview course={course} content={content} />
          <CourseCurriculum content={content} />
        </div>
        <CourseSummaryCard course={course} content={content} />
      </div>
    </main>
  );
}
