import { BookOpenText } from "lucide-react";
import { CourseInputField, CourseLevelField, CourseTextareaField } from "./CourseFormFields";

export function CourseInformationSection() {
  return (
    <section className="rounded-2xl border border-border/70 bg-card p-5 sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-300">
          <BookOpenText className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-semibold">Course information</h2>
          <p className="mt-1 text-sm text-muted-foreground">Set the details students will see in the course catalog.</p>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <CourseInputField label="Course title" name="title" placeholder="e.g. UI Design Fundamentals" required />
        <CourseInputField label="Category" name="category" placeholder="e.g. Design" required />
        <CourseInputField label="Cover image URL" name="coverImageUrl" type="url" placeholder="https://images.example.com/course-cover.jpg" required />
        <CourseLevelField />
        <CourseInputField label="Duration" name="duration" placeholder="e.g. 4 weeks" required />
        <CourseTextareaField label="Course description" name="description" placeholder="What will students learn in this course?" required className="sm:col-span-2" />
      </div>
    </section>
  );
}
