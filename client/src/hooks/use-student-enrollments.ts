"use client";

import { useEffect, useSyncExternalStore } from "react";
import { toast } from "sonner";
import {
  checkEnrollmentAction,
  createEnrollmentAction,
  deleteEnrollmentAction,
  getMyEnrollmentsAction,
} from "@/actions/enrollment.actions";
import type { EnrollmentStatus, StudentEnrollment } from "@/services/enrollment.services";

type EnrollmentSnapshot = {
  enrollments: StudentEnrollment[];
  isReady: boolean;
  error: string | null;
};

const emptySnapshot: EnrollmentSnapshot = {
  enrollments: [],
  isReady: false,
  error: null,
};

let snapshot = emptySnapshot;
let loadPromise: Promise<void> | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return emptySnapshot;
}

function updateSnapshot(next: EnrollmentSnapshot) {
  snapshot = next;
  listeners.forEach((listener) => listener());
}

async function refreshEnrollments(force = false) {
  if (loadPromise) return loadPromise;
  if (snapshot.isReady && !force) return;

  loadPromise = (async () => {
    const result = await getMyEnrollmentsAction({ page: 1, limit: 100 });
    if (result.error) {
      updateSnapshot({ enrollments: [], isReady: true, error: result.error.message });
    } else {
      updateSnapshot({ enrollments: result.data, isReady: true, error: null });
    }
  })();

  try {
    await loadPromise;
  } finally {
    loadPromise = null;
  }
}

export function useStudentEnrollments() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    void refreshEnrollments(true);
  }, []);

  const enrollCourse = async (courseId: string) => {
    const existingEnrollment = snapshot.enrollments.find((item) => item.courseId === courseId);
    if (existingEnrollment) return true;

    const toastId = toast.loading("Enrolling in course...");
    const result = await createEnrollmentAction(courseId);
    if (result.error) {
      toast.error(result.error.message, { id: toastId });
      return false;
    }

    updateSnapshot({
      enrollments: [result.data, ...snapshot.enrollments.filter((item) => item.id !== result.data.id)],
      isReady: true,
      error: null,
    });
    toast.success("You are enrolled in this course.", { id: toastId });
    return true;
  };

  const unenrollCourse = async (enrollmentId: string) => {
    const toastId = toast.loading("Leaving course...");
    const result = await deleteEnrollmentAction(enrollmentId);
    if (result.error) {
      toast.error(result.error.message, { id: toastId });
      return false;
    }

    updateSnapshot({
      enrollments: snapshot.enrollments.filter((item) => item.id !== enrollmentId),
      isReady: true,
      error: null,
    });
    toast.success("You have left the course.", { id: toastId });
    return true;
  };

  const isEnrolled = (courseId: string) =>
    state.enrollments.some((enrollment) => enrollment.courseId === courseId);

  const getEnrollment = (courseId: string) =>
    state.enrollments.find((enrollment) => enrollment.courseId === courseId) ?? null;

  const checkCourseEnrollment = async (courseId: string): Promise<EnrollmentStatus | null> => {
    const result = await checkEnrollmentAction(courseId);
    return result.error ? null : result.data;
  };

  return {
    enrollments: state.enrollments,
    enrolledCourseIds: state.enrollments.map((enrollment) => enrollment.courseId),
    isReady: state.isReady,
    error: state.error,
    enrollCourse,
    unenrollCourse,
    isEnrolled,
    getEnrollment,
    checkCourseEnrollment,
    refreshEnrollments: () => refreshEnrollments(true),
  };
}
