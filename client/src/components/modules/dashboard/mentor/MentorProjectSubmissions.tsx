"use client";

import { useEffect, useState } from "react";
import { AlertCircle, LoaderCircle, RefreshCw } from "lucide-react";
import { getMyCoursesAction } from "@/actions/course.actions";
import { Button } from "@/components/ui/button";
import { useMentorProjectSubmissions } from "@/hooks/use-mentor-project-submissions";
import { toMentorCourse } from "@/lib/mentor-course-presentation";
import type { MentorCourse } from "@/types/mentorCourse";
import type { SubmissionStatus } from "@/services/submission.services";
import { CourseSubmissionSelector } from "./components/CourseSubmissionSelector";
import { ProjectSubmissionList } from "./components/ProjectSubmissionList";
import { SubmissionEmptyState } from "./components/SubmissionEmptyState";

export function MentorProjectSubmissions() {
  const [selectedCourseId, setSelectedCourseId] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState<"ALL" | SubmissionStatus>("ALL");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [mentorCourses, setMentorCourses] = useState<MentorCourse[]>([]);
  const [coursesReady, setCoursesReady] = useState(false);
  const [coursesError, setCoursesError] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    void getMyCoursesAction({ page: 1, limit: 100 }).then((result) => {
      if (!active) return;
      if (result.error) setCoursesError(result.error.message);
      else {
        setCoursesError(null);
        setMentorCourses(result.data.map(toMentorCourse));
      }
      setCoursesReady(true);
    });
    return () => { active = false; };
  }, []);
  const validSelectedCourseId = selectedCourseId === "all" || mentorCourses.some((course) => course.id === selectedCourseId)
    ? selectedCourseId
    : "all";
  const selectedCourse = mentorCourses.find((course) => course.id === validSelectedCourseId);
  const courseIds = validSelectedCourseId === "all"
    ? mentorCourses.map((course) => course.id)
    : [validSelectedCourseId];
  const { submissionsByCourse, isReady: submissionsReady, error: submissionsError, refreshSubmissions, reviewSubmission } = useMentorProjectSubmissions(
    courseIds,
    selectedStatus === "ALL" ? undefined : selectedStatus,
  );
  const submissions = Object.entries(submissionsByCourse).flatMap(([courseId, courseSubmissions]) =>
    courseSubmissions.map((submission) => ({
      ...submission,
      courseId,
      courseTitle: mentorCourses.find((course) => course.id === courseId)?.title ?? submission.courseTitle ?? "Course",
    })),
  );
  const isLoading = !coursesReady || !submissionsReady;

  const retryLoading = () => {
    setCoursesReady(false);
    void getMyCoursesAction({ page: 1, limit: 100 }).then((result) => {
      if (result.error) setCoursesError(result.error.message);
      else {
        setCoursesError(null);
        setMentorCourses(result.data.map(toMentorCourse));
      }
      setCoursesReady(true);
    });
    void refreshSubmissions();
  };

  return (
    <div className="space-y-6">
      <CourseSubmissionSelector
        courses={mentorCourses}
        selectedCourseId={validSelectedCourseId}
        selectedStatus={selectedStatus}
        disabled={isLoading}
        onSelect={(courseId) => { setSelectedCourseId(courseId); setPage(1); }}
        onStatusSelect={(status) => { setSelectedStatus(status); setPage(1); }}
      />
      {isLoading ? (
        <SubmissionListPlaceholder />
      ) : coursesError || submissionsError ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center" role="alert">
          <AlertCircle className="mx-auto size-7 text-destructive" aria-hidden="true" />
          <h2 className="mt-3 text-sm font-semibold">Could not load project submissions</h2>
          <p className="mt-1 text-sm text-muted-foreground">{coursesError ?? submissionsError}</p>
          <Button type="button" variant="outline" className="mt-4 rounded-full" onClick={retryLoading}>
            <RefreshCw className="size-4" aria-hidden="true" /> Try again
          </Button>
        </div>
      ) : mentorCourses.length === 0 ? (
        <SubmissionEmptyState />
      ) : submissions.length === 0 ? (
        <SubmissionEmptyState
          courseTitle={selectedCourse?.title ?? "all courses"}
          isRefreshing={!submissionsReady}
          onRefresh={() => void refreshSubmissions()}
        />
      ) : (
        <ProjectSubmissionList
          courseTitle={selectedCourse?.title ?? "All courses"}
          submissions={submissions}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(nextPageSize) => { setPageSize(nextPageSize); setPage(1); }}
          onReview={async (id, status, feedback) => {
            if (await reviewSubmission(id, status, feedback)) setPage(1);
          }}
        />
      )}
    </div>
  );
}

function SubmissionListPlaceholder() {
  return (
    <div className="space-y-4" aria-label="Loading submissions" aria-busy="true">
      <div className="flex min-h-28 items-center justify-center gap-3 rounded-2xl border border-border/70 bg-card text-sm text-muted-foreground" role="status">
        <LoaderCircle className="size-5 animate-spin text-emerald-600" aria-hidden="true" />
        Loading project submissions...
      </div>
      <div className="h-40 animate-pulse rounded-2xl bg-muted" />
    </div>
  );
}
