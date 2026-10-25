import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="rounded-2xl border-border/70 shadow-none">
      <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
        <div>
          <label htmlFor="submission-course" className="text-sm font-semibold">Select a course</label>
          <p className="mt-1 text-sm text-muted-foreground">View project work submitted for one of your courses.</p>
        </div>
        <select
          id="submission-course"
          value={selectedCourseId}
          onChange={(event) => onSelect(event.currentTarget.value)}
          className="h-11 w-full rounded-full border border-border bg-background px-4 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/30 sm:max-w-sm"
          disabled={disabled}
        >
          {courses.length === 0 ? (
            <option value="">No courses created yet</option>
          ) : courses.map((course) => (
            <option key={course.id} value={course.id}>{course.title}</option>
          ))}
        </select>
      </CardContent>
    </Card>
  );
}
