import { Suspense } from "react";
import { notFound } from "next/navigation";
import { courses } from "@/components/modules/homePage/courseData";
import { CourseDetailsPage } from "@/components/modules/courseDetails/CourseDetailsPage";
import { courseContent } from "@/components/modules/courseDetails/courseContent";

export function generateStaticParams() {
  return courses.map((course) => ({ courseId: course.id }));
}

type CourseDetailsRouteProps = {
  params: Promise<{ courseId: string }>;
};

export default function CourseDetailsRoute({
  params,
}: CourseDetailsRouteProps) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <p role="status" className="text-sm text-muted-foreground">
            Loading course details…
          </p>
        </main>
      }
    >
      <CourseDetailsRouteContent params={params} />
    </Suspense>
  );
}

async function CourseDetailsRouteContent({ params }: CourseDetailsRouteProps) {
  const { courseId } = await params;
  const course = courses.find((item) => item.id === courseId);
  const content = courseContent[courseId];

  if (!course || !content) notFound();

  return <CourseDetailsPage course={course} content={content} />;
}
