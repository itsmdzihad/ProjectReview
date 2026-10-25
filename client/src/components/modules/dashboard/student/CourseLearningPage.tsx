"use client";

import { courses } from "@/components/modules/homePage/courseData";
import { courseContent } from "@/components/modules/courseDetails/courseContent";
import { useStudentCourseProgress } from "@/hooks/use-student-course-progress";
import { useStudentEnrollments } from "@/hooks/use-student-enrollments";
import { useStudentProjectSubmission } from "@/hooks/use-student-project-submission";
import { useMentorCourses } from "@/hooks/use-mentor-courses";
import { toCourseCardData, toCourseContent } from "@/lib/mentor-course-presentation";
import { CourseCompletionCard } from "./components/CourseCompletionCard";
import { CourseEnrollmentPrompt } from "./components/CourseEnrollmentPrompt";
import { CourseLessonCard } from "./components/CourseLessonCard";
import { CourseProgressHeader } from "./components/CourseProgressHeader";
import { CourseSectionNavigation } from "./components/CourseSectionNavigation";

export function CourseLearningPage({ courseId }: { courseId: string }) {
  const { mentorCourses, isReady: mentorCoursesReady } = useMentorCourses();
  const mentorCourse = mentorCourses.find((item) => item.id === courseId);
  const course = courses.find((item) => item.id === courseId)
    ?? (mentorCourse ? toCourseCardData(mentorCourse) : undefined);
  const content = courseContent[courseId]
    ?? (mentorCourse ? toCourseContent(mentorCourse) : undefined);
  const totalSteps = (content?.articles.length ?? 0) + 1;
  const { currentStep, isReady: progressReady, goToStep, nextStep } =
    useStudentCourseProgress(courseId, totalSteps);
  const { enrollCourse, isEnrolled, isReady: enrollmentsReady } =
    useStudentEnrollments();
  const {
    submission,
    isReady: submissionReady,
    saveSubmission,
  } = useStudentProjectSubmission(courseId);

  if (!progressReady || !enrollmentsReady || !submissionReady || !mentorCoursesReady) {
    return <CourseLearningPlaceholder />;
  }

  if (!course || !content) {
    return <p className="py-10 text-sm text-muted-foreground">This course could not be found.</p>;
  }

  if (!isEnrolled(courseId)) {
    return <CourseEnrollmentPrompt course={course} onEnroll={() => enrollCourse(course.id)} />;
  }

  const isComplete = submission !== null && currentStep >= totalSteps;
  const isProject = currentStep >= content.articles.length;
  const completedSteps = isComplete
    ? totalSteps
    : Math.min(currentStep, content.articles.length);

  return (
    <main className="mx-auto w-full max-w-6xl space-y-7 py-2">
      <CourseProgressHeader
        course={course}
        completedSteps={completedSteps}
        totalSteps={totalSteps}
      />
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section className="min-w-0" aria-labelledby="lesson-title">
          {submission && isComplete ? (
            <CourseCompletionCard
              courseTitle={course.title}
              submission={submission}
              onReview={() => goToStep(0)}
              onEditSubmission={() => goToStep(content.articles.length)}
            />
          ) : (
            <CourseLessonCard
              course={course}
              content={content}
              currentStep={currentStep}
              isProject={isProject}
              onPrevious={() => goToStep(currentStep - 1)}
              onNext={nextStep}
              submission={submission}
              onSubmitProject={(details) => {
                saveSubmission(details);
                goToStep(totalSteps);
              }}
            />
          )}
        </section>
        <aside className="lg:sticky lg:top-6">
          <CourseSectionNavigation
            content={content}
            currentStep={currentStep}
            onSelectStep={goToStep}
          />
        </aside>
      </div>
    </main>
  );
}

function CourseLearningPlaceholder() {
  return (
    <div className="mx-auto w-full max-w-6xl animate-pulse space-y-5 py-8" aria-label="Loading course">
      <div className="h-5 w-36 rounded bg-muted" />
      <div className="h-12 w-2/3 rounded bg-muted" />
      <div className="h-80 rounded-2xl bg-muted" />
    </div>
  );
}
