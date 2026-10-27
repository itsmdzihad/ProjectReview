import { Code2 } from "lucide-react";
import type { Course } from "@/components/modules/homePage/types";
import type { CourseContent } from "@/components/modules/courseDetails/courseContent";
import type { MentorCourse } from "@/types/mentorCourse";
import type { MentorCourseRecord } from "@/services/course.services";

export type CourseMetadata = {
  category?: string;
  level?: string;
  duration?: string;
};

export function getCourseMetadata(rawContent: string): CourseMetadata {
  try {
    const value: unknown = JSON.parse(rawContent);
    if (!value || typeof value !== "object") return {};

    const metadata = value as Partial<CourseMetadata>;
    return {
      category: typeof metadata.category === "string" ? metadata.category : undefined,
      level: typeof metadata.level === "string" ? metadata.level : undefined,
      duration: typeof metadata.duration === "string" ? metadata.duration : undefined,
    };
  } catch {
    return {};
  }
}

export function toMentorCourse(course: MentorCourseRecord): MentorCourse {
  const metadata = getCourseMetadata(course.content);
  let content: Partial<CourseContent> & CourseMetadata = {};
  try {
    const parsed: unknown = JSON.parse(course.content);
    if (parsed && typeof parsed === "object") content = parsed as typeof content;
  } catch {
    // Older courses can store plain text in the content field.
  }

  const articles = Array.isArray(content.articles)
    ? content.articles.filter((article): article is string => typeof article === "string")
    : [];
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    category: metadata.category ?? "Course",
    coverImageUrl: course.coverImage ?? "",
    level: metadata.level === "Intermediate" ? "Intermediate" : "Beginner",
    duration: metadata.duration ?? "Self-paced",
    articles,
    projectTitle: typeof content.projectTitle === "string" ? content.projectTitle : "Final project",
    projectDescription: typeof content.projectDescription === "string" ? content.projectDescription : "",
    projectDeliverable: typeof content.projectDeliverable === "string" ? content.projectDeliverable : "",
    createdAt: course.createdAt,
    status: course.status,
    enrollmentCount: course._count?.enrollments ?? 0,
    submissionCount: course._count?.submissions ?? 0,
  };
}

export function toCourseCardData(course: MentorCourse): Course {
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    category: course.category,
    coverImageUrl: course.coverImageUrl,
    level: course.level,
    duration: course.duration,
    icon: Code2,
    accent: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    graphic: "from-emerald-100/80 to-teal-50 dark:from-emerald-950 dark:to-teal-950",
    code: [`// ${course.category}`, `// ${course.title}`, "Start building..."],
  };
}

export function toCourseContent(course: MentorCourse): CourseContent {
  return {
    overview: course.description,
    outcomes: course.articles.map((article) => `Understand and apply ${article.toLowerCase()}`),
    articles: course.articles,
    articleSummaries: course.articles.map(
      (article) => `${article} introduces an important part of ${course.title}. Read through the main idea, try the examples from your course materials, and consider how it can help you build the final project.`,
    ),
    projectTitle: course.projectTitle,
    projectDescription: course.projectDescription,
    projectDeliverable: course.projectDeliverable,
  };
}
