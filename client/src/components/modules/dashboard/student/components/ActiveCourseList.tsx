import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";
import { courses } from "@/components/modules/homePage/courseData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMentorCourses } from "@/hooks/use-mentor-courses";
import { toCourseCardData } from "@/lib/mentor-course-presentation";

const courseProgress: Record<string, number> = {
  "javascript-fundamentals": 68,
  "html-css": 42,
  "react-fundamentals": 24,
  "typescript-essentials": 12,
  "responsive-web-design": 0,
  "git-github-basics": 0,
};

export function ActiveCourseList({ enrolledCourseIds }: { enrolledCourseIds: string[] }) {
  const { mentorCourses } = useMentorCourses();
  const availableCourses = [
    ...courses,
    ...mentorCourses.map(toCourseCardData),
  ];
  const activeCourses = availableCourses.filter((course) => enrolledCourseIds.includes(course.id));

  return (
    <Card className="rounded-2xl border-border/70 shadow-none">
      <CardHeader className="flex-row items-center justify-between gap-3">
        <div>
          <CardTitle className="text-base">Continue learning</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">Pick up where you left off</p>
        </div>
        <Link href="/student/courses/enroll" className="inline-flex h-8 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium text-emerald-700 transition-colors hover:bg-muted hover:text-emerald-800 dark:text-emerald-400">
          All courses <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-5">
        {activeCourses.length > 0 ? activeCourses.map((course) => {
          const progress = courseProgress[course.id] ?? 0;
          return (
            <div key={course.id} className="space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">{course.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{course.category}</p>
                </div>
                <span className="text-xs font-semibold tabular-nums text-foreground">{progress}%</span>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="h-2 flex-1 overflow-hidden rounded-full bg-muted"
                  role="progressbar"
                  aria-label={`${course.title} progress`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                >
                  <div className="h-full rounded-full bg-emerald-600 dark:bg-emerald-500" style={{ width: `${progress}%` }} />
                </div>
                <Link href={`/student/courses/enroll/${course.id}`} className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400">
                  Continue <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          );
        }) : (
          <div className="rounded-xl border border-dashed border-border p-6 text-center">
            <BookOpenText className="mx-auto size-7 text-muted-foreground" aria-hidden="true" />
            <p className="mt-3 text-sm font-medium">No enrolled courses yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Enroll in a course to see it here.</p>
            <Link href="/student/courses/enroll" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400">
              Browse the course list <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
