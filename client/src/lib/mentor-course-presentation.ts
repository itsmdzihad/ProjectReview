import { Code2 } from "lucide-react";
import type { Course } from "@/components/modules/homePage/types";
import type { CourseContent } from "@/components/modules/courseDetails/courseContent";
import type { MentorCourse } from "@/types/mentorCourse";
import type { MentorCourseRecord, PublishedCourse } from "@/services/course.services";
import type { EnrollmentCourse } from "@/services/enrollment.services";

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
  const articleSummaries = Array.isArray(content.articleSummaries) ? content.articleSummaries : [];
  const outcomes = Array.isArray(content.outcomes) ? content.outcomes : [];
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    category: metadata.category ?? "Course",
    coverImageUrl: course.coverImage ?? "",
    level: metadata.level === "Intermediate" ? "Intermediate" : "Beginner",
    duration: metadata.duration ?? "Self-paced",
    articles,
    articleSummaries: articles.map((article, index) => {
      const summary = articleSummaries[index];
      if (typeof summary !== "string") return "";
      const oldPlaceholder = summary.includes(`introduces an important part of ${course.title}.`) && summary.includes("Read through the main idea");
      return oldPlaceholder ? "" : summary;
    }),
    outcomes: articles.map((article, index) => {
      const outcome = outcomes[index];
      if (typeof outcome !== "string") return "";
      return outcome === `Understand and apply ${article.toLowerCase()}` ? "" : outcome;
    }),
    projectTitle: typeof content.projectTitle === "string" ? content.projectTitle : "Final project",
    projectDescription: typeof content.projectDescription === "string" ? content.projectDescription : "",
    projectDeliverable: typeof content.projectDeliverable === "string" ? content.projectDeliverable : "",
    createdAt: course.createdAt,
    status: course.status,
    enrollmentCount: course._count?.enrollments ?? 0,
    submissionCount: course._count?.submissions ?? 0,
  };
}

export function toPublishedCourseCardData(course: PublishedCourse | EnrollmentCourse): Course {
  const metadata = getCourseMetadata(course.content ?? "");
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    category: metadata.category ?? "Course",
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

export function parseCourseContent(rawContent: string, title: string, description: string): CourseContent {
  let parsed: Partial<CourseContent> = {};
  try {
    const value: unknown = JSON.parse(rawContent);
    if (value && typeof value === "object") parsed = value as Partial<CourseContent>;
  } catch {
    // Fall back to the course description when legacy content is plain text.
  }

  const articles = Array.isArray(parsed.articles)
    ? parsed.articles.filter((item): item is string => typeof item === "string")
    : [];
  const rawOutcomes = Array.isArray(parsed.outcomes)
    ? parsed.outcomes.map((item) => typeof item === "string" ? item : "")
    : [];
  const rawArticleSummaries = Array.isArray(parsed.articleSummaries)
    ? parsed.articleSummaries.map((item) => typeof item === "string" ? item : "")
    : [];

  return {
    overview: typeof parsed.overview === "string" ? parsed.overview : description,
    outcomes: articles.map((article, index) => {
      const outcome = rawOutcomes[index] ?? "";
      return outcome === `Understand and apply ${article.toLowerCase()}` ? "" : outcome;
    }),
    articles,
    articleSummaries: articles.map((article, index) => {
      const summary = rawArticleSummaries[index] ?? "";
      const oldPlaceholder = summary.includes(`introduces an important part of ${title}.`) && summary.includes("Read through the main idea");
      return oldPlaceholder ? "" : summary;
    }),
    projectTitle: typeof parsed.projectTitle === "string" ? parsed.projectTitle : "Course project",
    projectDescription: typeof parsed.projectDescription === "string" ? parsed.projectDescription : description,
    projectDeliverable: typeof parsed.projectDeliverable === "string" ? parsed.projectDeliverable : "Submit your completed project.",
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
    outcomes: course.outcomes ?? [],
    articles: course.articles,
    articleSummaries: course.articleSummaries ?? [],
    projectTitle: course.projectTitle,
    projectDescription: course.projectDescription,
    projectDeliverable: course.projectDeliverable,
  };
}
