import { CourseTextareaField } from "./CourseFormFields";

export function ArticleModuleSection() {
  return (
    <section className="rounded-2xl border border-border/70 bg-card p-5 sm:p-7">
      <h2 className="font-semibold">Article module</h2>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">Add one article title per line. Students will read them in this order before reaching the project.</p>
      <CourseTextareaField
        label="Article titles"
        name="articles"
        placeholder={"Introduction to the topic\nCore concepts\nPutting the concepts together"}
        required
        rows={6}
        className="mt-4"
      />
    </section>
  );
}
