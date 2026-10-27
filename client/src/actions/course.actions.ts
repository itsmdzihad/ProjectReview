"use server";

import { courseServices } from "@/services/course.services";

export async function getPublishedCoursesAction(limit = 6) {
  return courseServices.getPublishedCourses(limit);
}

export async function getCourseByIdAction(id: string) {
  return courseServices.getCourseById(id);
}
