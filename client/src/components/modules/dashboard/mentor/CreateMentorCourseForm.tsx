"use client";

import { useState, useTransition } from "react";
import { ArrowRight } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { useMentorCourses } from "@/hooks/use-mentor-courses";
import { Button } from "@/components/ui/button";
import type { MentorCourse } from "@/types/mentorCourse";
import { formatValidationErrors } from "@/lib/validation-messages";
import { createCourseAction } from "@/actions/course.actions";
import { ArticleModuleSection } from "./components/ArticleModuleSection";
import { CourseInformationSection } from "./components/CourseInformationSection";
import { CourseInputField, CourseLevelField, CourseTextareaField } from "./components/CourseFormFields";
import { CreateCourseSuccess } from "./components/CreateCourseSuccess";
import { FinalProjectSection } from "./components/FinalProjectSection";

const courseFormSchema = z.object({
  title: z.string().trim().min(3, "Course title must be at least 3 characters.").max(150, "Course title cannot exceed 150 characters."),
  category: z.string().trim().min(2, "Enter a course category."),
  coverImageUrl: z.url("Enter a valid cover image URL."),
  level: z.enum(["Beginner", "Intermediate"]),
  duration: z.string().trim().min(2, "Enter the course duration."),
  description: z.string().trim().min(10, "Description must be at least 10 characters.").max(1000, "Description cannot exceed 1000 characters."),
  articles: z.string().trim().refine(
    (value) => value.split("\n").some((article) => article.trim().length > 0),
    "Add at least one article title.",
  ),
  projectTitle: z.string().trim().min(3, "Project title must be at least 3 characters."),
  projectDescription: z.string().trim().min(10, "Project description must be at least 10 characters."),
  projectDeliverable: z.string().trim().min(10, "Project deliverable must be at least 10 characters."),
});

export function CreateMentorCourseForm() {
  const { addCourse } = useMentorCourses();
  const [createdCourse, setCreatedCourse] = useState<MentorCourse | null>(null);
  const [isCreating, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      title: "",
      category: "",
      coverImageUrl: "",
      level: "Beginner" as "Beginner" | "Intermediate",
      duration: "",
      description: "",
      articles: "",
      projectTitle: "",
      projectDescription: "",
      projectDeliverable: "",
    },
    validators: { onSubmit: courseFormSchema },
    onSubmit: ({ value }) => {
      const toastId = toast.loading("Creating course...");
      startTransition(async () => {
        const articles = value.articles
          .split("\n")
          .map((article) => article.trim())
          .filter(Boolean);
        const title = value.title.trim();
        const description = value.description.trim();
        const category = value.category.trim();
        const duration = value.duration.trim();
        const projectTitle = value.projectTitle.trim();
        const projectDescription = value.projectDescription.trim();
        const projectDeliverable = value.projectDeliverable.trim();
        const content = JSON.stringify({
          overview: description,
          outcomes: articles.map((article) => `Understand and apply ${article.toLowerCase()}`),
          articles,
          articleSummaries: articles.map(
            (article) => `${article} introduces an important part of ${title}. Read through the main idea, try the examples from your course materials, and consider how it can help you build the final project.`,
          ),
          projectTitle,
          projectDescription,
          projectDeliverable,
          category,
          level: value.level,
          duration,
        });

        const result = await createCourseAction({
          title,
          description,
          coverImage: value.coverImageUrl.trim(),
          content,
          status: "PUBLISHED",
        });

        if (result.error) {
          toast.error(result.error.message, { id: toastId });
          return;
        }

        const createdCourse = {
          id: result.data.id,
          title: result.data.title,
          description: result.data.description,
          category,
          coverImageUrl: result.data.coverImage ?? "",
          level: value.level,
          duration,
          articles,
          projectTitle,
          projectDescription,
          projectDeliverable,
          createdAt: result.data.createdAt,
        } satisfies MentorCourse;
        addCourse(createdCourse);
        setCreatedCourse(createdCourse);
        toast.success("Course created successfully.", { id: toastId });
      });
    },
  });

  if (createdCourse) {
    return (
      <CreateCourseSuccess
        course={createdCourse}
        onCreateAnother={() => {
          form.reset();
          setCreatedCourse(null);
        }}
      />
    );
  }

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit();
      }}
      className="mx-auto w-full max-w-4xl space-y-6"
    >
      <CourseInformationSection>
        <form.Field name="title">
          {(field) => (
            <CourseInputField
              label="Course title"
              name={field.name}
              placeholder="e.g. UI Design Fundamentals"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={field.handleChange}
              error={formatValidationErrors(field.state.meta.errors)}
            />
          )}
        </form.Field>
        <form.Field name="category">
          {(field) => (
            <CourseInputField
              label="Category"
              name={field.name}
              placeholder="e.g. Design"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={field.handleChange}
              error={formatValidationErrors(field.state.meta.errors)}
            />
          )}
        </form.Field>
        <form.Field name="coverImageUrl">
          {(field) => (
            <CourseInputField
              label="Cover image URL"
              name={field.name}
              type="url"
              placeholder="https://images.example.com/course-cover.jpg"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={field.handleChange}
              error={formatValidationErrors(field.state.meta.errors)}
            />
          )}
        </form.Field>
        <form.Field name="level">
          {(field) => (
            <CourseLevelField
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(value) => field.handleChange(value as "Beginner" | "Intermediate")}
              error={formatValidationErrors(field.state.meta.errors)}
            />
          )}
        </form.Field>
        <form.Field name="duration">
          {(field) => (
            <CourseInputField
              label="Duration"
              name={field.name}
              placeholder="e.g. 4 weeks"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={field.handleChange}
              error={formatValidationErrors(field.state.meta.errors)}
            />
          )}
        </form.Field>
        <form.Field name="description">
          {(field) => (
            <CourseTextareaField
              label="Course description"
              name={field.name}
              placeholder="What will students learn in this course?"
              className="sm:col-span-2"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={field.handleChange}
              error={formatValidationErrors(field.state.meta.errors)}
            />
          )}
        </form.Field>
      </CourseInformationSection>

      <ArticleModuleSection>
        <form.Field name="articles">
          {(field) => (
            <CourseTextareaField
              label="Article titles"
              name={field.name}
              placeholder={"Introduction to the topic\nCore concepts\nPutting the concepts together"}
              rows={6}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={field.handleChange}
              error={formatValidationErrors(field.state.meta.errors)}
            />
          )}
        </form.Field>
      </ArticleModuleSection>

      <FinalProjectSection>
        <form.Field name="projectTitle">
          {(field) => (
            <CourseInputField
              label="Project title"
              name={field.name}
              placeholder="e.g. Design a responsive portfolio"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={field.handleChange}
              error={formatValidationErrors(field.state.meta.errors)}
            />
          )}
        </form.Field>
        <form.Field name="projectDescription">
          {(field) => (
            <CourseTextareaField
              label="Project description"
              name={field.name}
              placeholder="Explain what students should build."
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={field.handleChange}
              error={formatValidationErrors(field.state.meta.errors)}
            />
          )}
        </form.Field>
        <form.Field name="projectDeliverable">
          {(field) => (
            <CourseTextareaField
              label="Project deliverable"
              name={field.name}
              placeholder="Describe what students should include in their submission."
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={field.handleChange}
              error={formatValidationErrors(field.state.meta.errors)}
            />
          )}
        </form.Field>
      </FinalProjectSection>

      <div className="flex justify-end">
        <Button type="submit" disabled={isCreating} className="rounded-full bg-emerald-700 px-6 text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500">
          {isCreating ? "Creating course..." : "Create course"} <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
}
