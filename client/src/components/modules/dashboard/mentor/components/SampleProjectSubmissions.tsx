import { Sparkles } from "lucide-react";
import { ProjectSubmissionTable } from "./ProjectSubmissionTable";
import type { StudentProjectSubmission } from "@/lib/project-submissions";

const sampleSubmissions: StudentProjectSubmission[] = [
  {
    studentId: "sample-student-jamie",
    studentName: "Jamie Lee",
    studentEmail: "jamie@example.com",
    projectName: "Personal Portfolio Website",
    repoUrl: "https://github.com/example/portfolio-project",
    liveLink: "https://portfolio.example.com",
    description: "A responsive portfolio with an introduction, selected project cards, and a contact section. Built with semantic page structure and reusable styles.",
    submittedAt: "2026-10-20T10:00:00.000Z",
  },
  {
    studentId: "sample-student-avery",
    studentName: "Avery Chen",
    studentEmail: "avery@example.com",
    projectName: "Creative Studio Landing Page",
    repoUrl: "https://github.com/example/studio-landing-page",
    liveLink: "https://studio.example.com",
    description: "A small studio landing page with a responsive navigation, service details, and a clear call to action. I focused on readable spacing and mobile layouts.",
    submittedAt: "2026-10-18T14:30:00.000Z",
  },
];

export function SampleProjectSubmissions({ courseTitle }: { courseTitle: string }) {
  return (
    <section className="space-y-4" aria-label="Sample project submissions">
      <div className="flex items-start gap-3 rounded-xl border border-dashed border-emerald-700/25 bg-emerald-50/50 p-4 dark:border-emerald-300/15 dark:bg-emerald-950/20">
        <Sparkles className="mt-0.5 size-4 shrink-0 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
        <div>
          <h2 className="text-sm font-semibold">Sample submissions for {courseTitle}</h2>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">These examples are placeholders only. Real student submissions will appear here when submitted.</p>
        </div>
      </div>
      <ProjectSubmissionTable submissions={sampleSubmissions} isSample />
    </section>
  );
}
