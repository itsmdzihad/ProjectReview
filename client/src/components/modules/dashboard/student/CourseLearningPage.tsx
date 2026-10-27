"use client";

import { useEffect, useState } from "react";
import { checkEnrollmentAction, getEnrollmentByIdAction } from "@/actions/enrollment.actions";
import { getCourseByIdAction } from "@/actions/course.actions";
import type { Course } from "@/components/modules/homePage/types";
import type { CourseContent } from "@/components/modules/courseDetails/courseContent";
import { useStudentCourseProgress } from "@/hooks/use-student-course-progress";
import { useStudentEnrollments } from "@/hooks/use-student-enrollments";
import { useStudentProjectSubmission } from "@/hooks/use-student-project-submission";
import { parseCourseContent, toPublishedCourseCardData } from "@/lib/mentor-course-presentation";
import { CourseCompletionCard } from "./components/CourseCompletionCard";
import { CourseEnrollmentPrompt } from "./components/CourseEnrollmentPrompt";
import { CourseLessonCard } from "./components/CourseLessonCard";
import { CourseProgressHeader } from "./components/CourseProgressHeader";
import { CourseSectionNavigation } from "./components/CourseSectionNavigation";

export function CourseLearningPage({ courseId }: { courseId: string }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [content, setContent] = useState<CourseContent | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoadingCourse, setIsLoadingCourse] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const { enrollCourse } = useStudentEnrollments();
  const totalSteps = (content?.articles.length ?? 0) + 1;
  const { currentStep, isReady: progressReady, goToStep, nextStep } =
    useStudentCourseProgress(courseId, totalSteps);
  const {
    submission,
    isReady: submissionReady,
    saveSubmission,
    removeSubmission,
  } = useStudentProjectSubmission(courseId);

  useEffect(() => {
    let active = true;
    void (async () => {
      const status = await checkEnrollmentAction(courseId);
      if (!active) return;
      if (status.error) {
        setLoadError(status.error.message);
        setIsLoadingCourse(false);
        return;
      }

      setIsEnrolled(status.data.isEnrolled);
      if (status.data.isEnrolled && status.data.enrollment) {
        const enrollment = await getEnrollmentByIdAction(status.data.enrollment.id);
        if (!active) return;
        if (enrollment.error) {
          setLoadError(enrollment.error.message);
        } else {
          setCourse(toPublishedCourseCardData(enrollment.data.course));
          setContent(parseCourseContent(enrollment.data.course.content ?? "", enrollment.data.course.title, enrollment.data.course.description));
        }
      } else {
        const publishedCourse = await getCourseByIdAction(courseId);
        if (!active) return;
        if (publishedCourse.error) {
          setLoadError(publishedCourse.error.message);
        } else {
          setCourse(toPublishedCourseCardData(publishedCourse.data));
          setContent(parseCourseContent(publishedCourse.data.content, publishedCourse.data.title, publishedCourse.data.description));
        }
      }
      setIsLoadingCourse(false);
    })();
    return () => { active = false; };
  }, [courseId, reloadKey]);

  const handleEnroll = async () => {
    setIsLoadingCourse(true);
    const success = await enrollCourse(courseId);
    if (success) setReloadKey((current) => current + 1);
    else setIsLoadingCourse(false);
  };

  if (isLoadingCourse || !progressReady || !submissionReady) {
    return <CourseLearningPlaceholder />;
  }

  if (loadError || !course || !content) {
    return <p className="py-10 text-sm text-destructive" role="alert">{loadError ?? "This course could not be found."}</p>;
  }

  if (!isEnrolled) {
    return <CourseEnrollmentPrompt course={course} onEnroll={() => void handleEnroll()} />;
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
              content={content}
              currentStep={currentStep}
              isProject={isProject}
              onPrevious={() => goToStep(currentStep - 1)}
              onNext={nextStep}
              submission={submission}
              onSubmitProject={async (details) => {
                const saved = await saveSubmission(details);
                if (saved) goToStep(totalSteps);
                return saved;
              }}
              onDeleteSubmission={removeSubmission}
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
