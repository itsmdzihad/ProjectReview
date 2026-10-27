import { Suspense } from "react";
import { notFound } from "next/navigation";
import { courses } from "@/components/modules/homePage/courseData";
import { CourseDetailsPage } from "@/components/modules/courseDetails/CourseDetailsPage";
import { courseContent as builtInCourseContent, type CourseContent } from "@/components/modules/courseDetails/courseContent";
import { courseServices } from "@/services/course.services";
import { getCourseMetadata } from "@/lib/mentor-course-presentation";
import { Code2 } from "lucide-react";
import type { Course } from "@/components/modules/homePage/types";
import { CourseDetailsLoading } from "@/components/modules/courseDetails/CourseDetailsLoading";

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
    <Suspense fallback={<CourseDetailsLoading />}>
      <CourseDetailsRouteContent params={params} />
    </Suspense>
  );
}

async function CourseDetailsRouteContent({ params }: CourseDetailsRouteProps) {
  const { courseId } = await params;
  const builtInCourse = courses.find((item) => item.id === courseId);

  if (builtInCourse) {
    const content = builtInCourseContent[courseId];
    if (!content) notFound();
    return <CourseDetailsPage course={builtInCourse} content={content} />;
  }

  const result = await courseServices.getCourseById(courseId);
  if (result.error) notFound();

  const publishedCourse = result.data;
  const metadata = getCourseMetadata(publishedCourse.content);
  const course: Course = {
    id: publishedCourse.id,
    title: publishedCourse.title,
    description: publishedCourse.description,
    category: metadata.category,
    level: metadata.level,
    duration: metadata.duration,
    coverImageUrl: publishedCourse.coverImage ?? undefined,
    instructorName: publishedCourse.mentor.name,
    icon: Code2,
    accent: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    graphic: "from-emerald-100/80 to-teal-50 dark:from-emerald-950 dark:to-teal-950",
    code: [`// ${publishedCourse.title}`, `// by ${publishedCourse.mentor.name}`, "Start learning..."],
  };
  const content = toCourseContent(publishedCourse.description, publishedCourse.content);

  return <CourseDetailsPage course={course} content={content} />;
}

function toCourseContent(description: string, rawContent: string): CourseContent {
  try {
    const parsed: unknown = JSON.parse(rawContent);
    if (isCourseContent(parsed)) return parsed;
  } catch {
    // Store plain-text course content as a single lesson below.
  }

  const lesson = rawContent.trim();
  return {
    overview: description,
    outcomes: [],
    articles: lesson ? ["Course material"] : [],
    articleSummaries: lesson ? [lesson] : [],
    projectTitle: "Course project",
    projectDescription: "Apply the ideas from this course in a project of your own.",
    projectDeliverable: "A project that demonstrates what you learned.",
  };
}

function isCourseContent(value: unknown): value is CourseContent {
  if (!value || typeof value !== "object") return false;
  const content = value as Partial<CourseContent>;
  return (
    typeof content.overview === "string" &&
    Array.isArray(content.outcomes) &&
    content.outcomes.every((item) => typeof item === "string") &&
    Array.isArray(content.articles) &&
    content.articles.every((item) => typeof item === "string") &&
    Array.isArray(content.articleSummaries) &&
    content.articleSummaries.every((item) => typeof item === "string") &&
    typeof content.projectTitle === "string" &&
    typeof content.projectDescription === "string" &&
    typeof content.projectDeliverable === "string"
  );
}
