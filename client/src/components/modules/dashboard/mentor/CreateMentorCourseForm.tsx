"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { useMentorCourses } from "@/hooks/use-mentor-courses";
import { Button } from "@/components/ui/button";
import type { MentorCourse } from "@/types/mentorCourse";
import { ArticleModuleSection } from "./components/ArticleModuleSection";
import { CourseInformationSection } from "./components/CourseInformationSection";
import { CreateCourseSuccess } from "./components/CreateCourseSuccess";
import { FinalProjectSection } from "./components/FinalProjectSection";

export function CreateMentorCourseForm() {
  const { createCourse } = useMentorCourses();
  const [createdCourse, setCreatedCourse] = useState<MentorCourse | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const articles = String(formData.get("articles") ?? "")
      .split("\n")
      .map((article) => article.trim())
      .filter(Boolean);

    const course = createCourse({
      title: String(formData.get("title") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      category: String(formData.get("category") ?? "").trim(),
      coverImageUrl: String(formData.get("coverImageUrl") ?? "").trim(),
      level: String(formData.get("level")) === "Intermediate" ? "Intermediate" : "Beginner",
      duration: String(formData.get("duration") ?? "").trim(),
      articles,
      projectTitle: String(formData.get("projectTitle") ?? "").trim(),
      projectDescription: String(formData.get("projectDescription") ?? "").trim(),
      projectDeliverable: String(formData.get("projectDeliverable") ?? "").trim(),
    });

    setCreatedCourse(course);
    event.currentTarget.reset();
  }

  if (createdCourse) {
    return (
      <CreateCourseSuccess
        course={createdCourse}
        onCreateAnother={() => setCreatedCourse(null)}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-4xl space-y-6">
      <CourseInformationSection />
      <ArticleModuleSection />
      <FinalProjectSection />
      <div className="flex justify-end">
        <Button type="submit" className="rounded-full bg-emerald-700 px-6 text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500">
          Create course <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
}
