"use server";

import { courseServices } from "@/services/course.services";
import type { CreateCoursePayload, UpdateCoursePayload } from "@/services/course.services";

export async function createCourseAction(payload: CreateCoursePayload) {
  return courseServices.createCourse(payload);
}

export async function getPublishedCoursesAction(limit = 6, page = 1) {
  return courseServices.getPublishedCourses(limit, page);
}

export async function getCourseByIdAction(id: string) {
  return courseServices.getCourseById(id);
}

export async function getMyCoursesAction(params?: { page?: number; limit?: number; search?: string }) {
  return courseServices.getMyCourses(params);
}

export async function updateCourseAction(id: string, payload: UpdateCoursePayload) {
  return courseServices.updateCourse(id, payload);
}

export async function deleteCourseAction(id: string) {
  return courseServices.deleteCourse(id);
}
