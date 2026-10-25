import type { MentorCourse } from "@/types/mentorCourse";

export function CourseSubmissionSelector({
  courses,
  selectedCourseId,
  disabled,
  onSelect,
}: {
  courses: MentorCourse[];
  selectedCourseId: string;
  disabled: boolean;
  onSelect: (courseId: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border/70 bg-card px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
      <label htmlFor="submission-course" className="text-xs font-semibold text-muted-foreground">Course submissions</label>
      <select
        id="submission-course"
        value={selectedCourseId}
        onChange={(event) => onSelect(event.currentTarget.value)}
        className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/30 sm:w-auto sm:min-w-64 sm:max-w-md"
        disabled={disabled}
      >
        {courses.length === 0 ? (
          <option value="">No courses created yet</option>
        ) : courses.map((course) => (
          <option key={course.id} value={course.id}>{course.title}</option>
        ))}
      </select>
    </div>
  );
}
