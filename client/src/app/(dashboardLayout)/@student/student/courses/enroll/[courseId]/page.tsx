import { Suspense } from "react";
import { CourseLearningPage } from "@/components/modules/dashboard/student/CourseLearningPage";
import { courses } from "@/components/modules/homePage/courseData";

export function generateStaticParams() {
  return courses.map((course) => ({ courseId: course.id }));
}

type CourseLearningRouteProps = {
  params: Promise<{ courseId: string }>;
};

export default function CourseLearningRoute({ params }: CourseLearningRouteProps) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-6xl animate-pulse space-y-5 py-8" aria-label="Loading course">
          <div className="h-5 w-36 rounded bg-muted" />
          <div className="h-12 w-2/3 rounded bg-muted" />
          <div className="h-80 rounded-2xl bg-muted" />
        </div>
      }
    >
      <CourseLearningRouteContent params={params} />
    </Suspense>
  );
}

async function CourseLearningRouteContent({ params }: CourseLearningRouteProps) {
  const { courseId } = await params;
  return <CourseLearningPage courseId={courseId} />;
}
