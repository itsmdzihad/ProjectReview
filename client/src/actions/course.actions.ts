"use server";

import { courseServices } from "@/services/course.services";
import type { CreateCoursePayload } from "@/services/course.services";

export async function createCourseAction(payload: CreateCoursePayload) {
  return courseServices.createCourse(payload);
}

export async function getPublishedCoursesAction(limit = 6) {
  return courseServices.getPublishedCourses(limit);
}

export async function getCourseByIdAction(id: string) {
  return courseServices.getCourseById(id);
}
