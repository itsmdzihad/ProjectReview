"use client";

import { useCallback, useEffect, useState } from "react";
import type { MentorCourse, NewMentorCourse } from "@/types/mentorCourse";

export const MENTOR_COURSES_STORAGE_KEY = "codepath:mentor:courses";
export const MENTOR_COURSES_CHANGE_EVENT = "codepath:mentor-courses-changed";

function normalizeMentorCourse(value: unknown): MentorCourse | null {
  if (!value || typeof value !== "object") return null;
  const course = value as Partial<MentorCourse>;
  const isValid = (
    typeof course.id === "string" &&
    typeof course.title === "string" &&
    typeof course.description === "string" &&
    typeof course.category === "string" &&
    (course.level === "Beginner" || course.level === "Intermediate") &&
    typeof course.duration === "string" &&
    Array.isArray(course.articles) &&
    course.articles.every((article) => typeof article === "string") &&
    typeof course.projectTitle === "string" &&
    typeof course.projectDescription === "string" &&
    typeof course.projectDeliverable === "string" &&
    typeof course.createdAt === "string"
  );
  if (!isValid) return null;

  return {
    ...course,
    coverImageUrl: typeof course.coverImageUrl === "string" ? course.coverImageUrl : "",
  } as MentorCourse;
}

function readCourses() {
  try {
    const stored = window.localStorage.getItem(MENTOR_COURSES_STORAGE_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed)
      ? parsed.map(normalizeMentorCourse).filter((course): course is MentorCourse => course !== null)
      : [];
  } catch {
    return [];
  }
}

export function useMentorCourses() {
  const [mentorCourses, setMentorCourses] = useState<MentorCourse[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const syncCourses = () => {
      setMentorCourses(readCourses());
      setIsReady(true);
    };
    syncCourses();
    window.addEventListener(MENTOR_COURSES_CHANGE_EVENT, syncCourses);
    window.addEventListener("storage", syncCourses);

    return () => {
      window.removeEventListener(MENTOR_COURSES_CHANGE_EVENT, syncCourses);
      window.removeEventListener("storage", syncCourses);
    };
  }, []);

  const createCourse = useCallback((details: NewMentorCourse) => {
    const slug = details.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "course";
    const created: MentorCourse = {
      ...details,
      id: `${slug}-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
    };
    const nextCourses = [created, ...readCourses()];

    try {
      window.localStorage.setItem(MENTOR_COURSES_STORAGE_KEY, JSON.stringify(nextCourses));
      window.dispatchEvent(new Event(MENTOR_COURSES_CHANGE_EVENT));
    } catch {
      // Keep the current screen functional if browser storage is unavailable.
    }

    setMentorCourses(nextCourses);
    return created;
  }, []);

  return { mentorCourses, isReady, createCourse };
}
