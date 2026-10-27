"use server";

import { enrollmentServices } from "@/services/enrollment.services";

export async function createEnrollmentAction(courseId: string) {
  return enrollmentServices.createEnrollment(courseId);
}

export async function getMyEnrollmentsAction(params?: { page?: number; limit?: number }) {
  return enrollmentServices.getMyEnrollments(params);
}

export async function checkEnrollmentAction(courseId: string) {
  return enrollmentServices.checkEnrollment(courseId);
}

export async function getEnrollmentByIdAction(enrollmentId: string) {
  return enrollmentServices.getEnrollmentById(enrollmentId);
}

export async function deleteEnrollmentAction(enrollmentId: string) {
  return enrollmentServices.deleteEnrollment(enrollmentId);
}
