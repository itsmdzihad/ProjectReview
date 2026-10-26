import httpStatus from "http-status";
import { prisma } from "../../config/db.config.js";
import AppError from "../../errors/AppError.js";
import {
  CourseQuery,
  CreateCoursePayload,
  UpdateCoursePayload,
} from "./course.interface.js";

const createCourse = async (mentorId: string, payload: CreateCoursePayload) => {
  const mentor = await prisma.user.findUnique({
    where: { id: mentorId },
    select: { id: true, role: true },
  });

  if (!mentor || mentor.role !== "MENTOR") {
    throw new AppError(httpStatus.FORBIDDEN, "Only mentors can create courses");
  }

  return prisma.course.create({
    data: {
      title: payload.title,
      description: payload.description,
      coverImage: payload.coverImage,
      content: payload.content,
      status: payload.status ?? "DRAFT",
      mentorId,
    },
  });
};

const getPublishedCourses = async (query: CourseQuery) => {
  const page = Math.max(1, query.page ?? 1);
  const limit = Math.min(100, Math.max(1, query.limit ?? 10));
  const skip = (page - 1) * limit;

  const where = {
    status: "PUBLISHED" as const,
    ...(query.search?.trim()
      ? {
          OR: [
            {
              title: {
                contains: query.search.trim(),
                mode: "insensitive" as const,
              },
            },
            {
              description: {
                contains: query.search.trim(),
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {}),
  };

  const [courses, total] = await prisma.$transaction([
    prisma.course.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        mentor: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: { enrollments: true },
        },
      },
    }),
    prisma.course.count({ where }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: courses,
  };
};

const getCourseById = async (courseId: string) => {
  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
      status: "PUBLISHED",
    },
    include: {
      mentor: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: { enrollments: true },
      },
    },
  });

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  return course;
};

const getMyCourses = async (mentorId: string, query: CourseQuery) => {
  const page = Math.max(1, query.page ?? 1);
  const limit = Math.min(100, Math.max(1, query.limit ?? 10));
  const skip = (page - 1) * limit;

  const where = {
    mentorId,
    ...(query.search?.trim()
      ? {
          title: {
            contains: query.search.trim(),
            mode: "insensitive" as const,
          },
        }
      : {}),
  };

  const [courses, total] = await prisma.$transaction([
    prisma.course.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            enrollments: true,
            submissions: true,
          },
        },
      },
    }),
    prisma.course.count({ where }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: courses,
  };
};

const updateCourse = async (
  mentorId: string,
  courseId: string,
  payload: UpdateCoursePayload,
) => {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { id: true, mentorId: true },
  });

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  if (course.mentorId !== mentorId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You can only update your own courses",
    );
  }

  return prisma.course.update({
    where: { id: courseId },
    data: payload,
  });
};

const deleteCourse = async (mentorId: string, courseId: string) => {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { id: true, mentorId: true },
  });

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  if (course.mentorId !== mentorId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You can only delete your own courses",
    );
  }

  await prisma.course.delete({
    where: { id: courseId },
  });

  return null;
};

export const courseService = {
  createCourse,
  getPublishedCourses,
  getCourseById,
  getMyCourses,
  updateCourse,
  deleteCourse,
};
