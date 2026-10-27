import type { MentorCourse } from "@/types/mentorCourse";
import type { SubmissionStatus } from "@/services/submission.services";

export function CourseSubmissionSelector({
  courses,
  selectedCourseId,
  selectedStatus,
  disabled,
  onSelect,
  onStatusSelect,
}: {
  courses: MentorCourse[];
  selectedCourseId: string;
  selectedStatus: "ALL" | SubmissionStatus;
  disabled: boolean;
  onSelect: (courseId: string) => void;
  onStatusSelect: (status: "ALL" | SubmissionStatus) => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border/70 bg-card px-3 py-3 sm:flex-row sm:items-end sm:justify-between">
      <p className="text-xs font-semibold text-muted-foreground">Filter project submissions</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="submission-course" className="text-xs font-medium text-muted-foreground">Course</label>
          <select
            id="submission-course"
            value={selectedCourseId}
            onChange={(event) => onSelect(event.currentTarget.value)}
            className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/30 sm:min-w-64 sm:max-w-md"
            disabled={disabled}
          >
            <option value="all">All courses</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="submission-status" className="text-xs font-medium text-muted-foreground">Status</label>
          <select
            id="submission-status"
            value={selectedStatus}
            onChange={(event) => onStatusSelect(event.currentTarget.value as "ALL" | SubmissionStatus)}
            className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/30 sm:min-w-40"
            disabled={disabled}
          >
            <option value="ALL">All statuses</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>
    </div>
  );
}
