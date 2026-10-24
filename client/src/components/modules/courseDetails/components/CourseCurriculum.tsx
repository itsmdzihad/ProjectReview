import { ArticleModule } from "./ArticleModule";
import { ProjectModule } from "./ProjectModule";
import type { CourseContent } from "../courseContent";

export function CourseCurriculum({ content }: { content: CourseContent }) {
  return (
    <section aria-labelledby="course-curriculum">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-emerald-700 uppercase dark:text-emerald-400">Your learning path</p>
          <h2 id="course-curriculum" className="mt-1 text-2xl font-semibold tracking-tight">Course modules</h2>
        </div>
        <span className="text-xs text-muted-foreground">2 modules · articles + project</span>
      </div>
      <ArticleModule articles={content.articles} />
      <ProjectModule content={content} />
    </section>
  );
}
