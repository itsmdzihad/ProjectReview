"use client";

import { useState } from "react";
import { useMentorCourses } from "@/hooks/use-mentor-courses";
import { useMentorProjectSubmissions } from "@/hooks/use-mentor-project-submissions";
import { CourseSubmissionSelector } from "./components/CourseSubmissionSelector";
import { ProjectSubmissionList } from "./components/ProjectSubmissionList";
import { SubmissionEmptyState } from "./components/SubmissionEmptyState";

export function MentorProjectSubmissions() {
  const [selectedCourseIdState, setSelectedCourseId] = useState("");
  const { mentorCourses, isReady: coursesReady } = useMentorCourses();
  const { submissionsByCourse, isReady: submissionsReady } = useMentorProjectSubmissions();
  const selectedCourseId = mentorCourses.some((course) => course.id === selectedCourseIdState)
    ? selectedCourseIdState
    : mentorCourses[0]?.id ?? "";
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
      ) : !selectedCourse || submissions.length === 0 ? (
        <SubmissionEmptyState courseTitle={selectedCourse?.title} />
      ) : (
        <ProjectSubmissionList courseTitle={selectedCourse.title} submissions={submissions} />
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
