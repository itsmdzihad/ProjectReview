"use client";

import { useState } from "react";
import { useEffect } from "react";
import { getMyCoursesAction } from "@/actions/course.actions";
import { useMentorProjectSubmissions } from "@/hooks/use-mentor-project-submissions";
import { toMentorCourse } from "@/lib/mentor-course-presentation";
import type { MentorCourse } from "@/types/mentorCourse";
import { CourseSubmissionSelector } from "./components/CourseSubmissionSelector";
import { ProjectSubmissionList } from "./components/ProjectSubmissionList";
import { SubmissionEmptyState } from "./components/SubmissionEmptyState";

export function MentorProjectSubmissions() {
  const [selectedCourseIdState, setSelectedCourseId] = useState("");
  const [mentorCourses, setMentorCourses] = useState<MentorCourse[]>([]);
  const [coursesReady, setCoursesReady] = useState(false);
  useEffect(() => {
    let active = true;
    void getMyCoursesAction({ page: 1, limit: 100 }).then((result) => {
      if (!active) return;
      if (!result.error) setMentorCourses(result.data.map(toMentorCourse));
      setCoursesReady(true);
    });
    return () => { active = false; };
  }, []);
  const selectedCourseId = mentorCourses.some((course) => course.id === selectedCourseIdState)
    ? selectedCourseIdState
    : mentorCourses[0]?.id ?? "";
  const { submissionsByCourse, isReady: submissionsReady, reviewSubmission } = useMentorProjectSubmissions(selectedCourseId ? [selectedCourseId] : []);
  const selectedCourse = mentorCourses.find((course) => course.id === selectedCourseId);
  const submissions = selectedCourseId ? submissionsByCourse[selectedCourseId] ?? [] : [];
  const isLoading = !coursesReady || !submissionsReady;

  return (
    <div className="space-y-6">
      <CourseSubmissionSelector
        courses={mentorCourses}
        selectedCourseId={selectedCourseId}
        disabled={isLoading || mentorCourses.length === 0}
        onSelect={setSelectedCourseId}
      />
      {isLoading ? (
        <SubmissionListPlaceholder />
      ) : !selectedCourse ? (
        <SubmissionEmptyState />
      ) : submissions.length === 0 ? (
        <SubmissionEmptyState courseTitle={selectedCourse.title} />
      ) : (
        <ProjectSubmissionList
          courseTitle={selectedCourse.title}
          submissions={submissions}
          onReview={async (id, status, feedback) => {
            await reviewSubmission(id, status, feedback);
          }}
        />
      )}
    </div>
  );
}

function SubmissionListPlaceholder() {
  return (
    <div className="grid gap-4" aria-label="Loading submissions">
      <div className="h-40 animate-pulse rounded-2xl bg-muted" />
      <div className="h-40 animate-pulse rounded-2xl bg-muted" />
    </div>
  );
}
