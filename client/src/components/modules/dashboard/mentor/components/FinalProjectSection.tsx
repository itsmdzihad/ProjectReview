import { CourseInputField, CourseTextareaField } from "./CourseFormFields";

export function FinalProjectSection() {
  return (
    <section className="rounded-2xl border border-border/70 bg-card p-5 sm:p-7">
      <h2 className="font-semibold">Final project</h2>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">Define the project students will submit when they complete the course.</p>
      <div className="mt-5 grid gap-5">
        <CourseInputField label="Project title" name="projectTitle" placeholder="e.g. Design a responsive portfolio" required />
        <CourseTextareaField label="Project description" name="projectDescription" placeholder="Explain what students should build." required />
        <CourseTextareaField label="Project deliverable" name="projectDeliverable" placeholder="Describe what students should include in their submission." required />
      </div>
    </section>
  );
}
