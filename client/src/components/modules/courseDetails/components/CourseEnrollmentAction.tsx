"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useStudentEnrollments } from "@/hooks/use-student-enrollments";

export function CourseEnrollmentAction({ courseId }: { courseId: string }) {
  const router = useRouter();
  const { enrollCourse, isEnrolled, isReady } = useStudentEnrollments();
  const enrolled = isEnrolled(courseId);

  const handleEnroll = async () => {
    const success = await enrollCourse(courseId);
    if (success) router.push(`/student/courses/enroll/${courseId}`);
  };

  if (!isReady) {
    return (
      <Button
        type="button"
        disabled
        className="h-10 w-full rounded-full bg-emerald-700 text-white dark:bg-emerald-600"
      >
        Checking enrollment...
      </Button>
    );
  }

  if (enrolled) {
    return (
      <Link
        href={`/student/courses/enroll/${courseId}`}
        className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full bg-emerald-700 px-4 text-sm font-medium text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
      >
        Continue learning <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <Button
      type="button"
      onClick={() => void handleEnroll()}
      className="h-10 w-full rounded-full bg-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
    >
      Enroll Now <ArrowRight className="size-4" aria-hidden="true" />
    </Button>
  );
}
