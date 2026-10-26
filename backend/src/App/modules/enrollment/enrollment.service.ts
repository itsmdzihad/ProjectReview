import { prisma } from "../../config/db.config.js";
import AppError from "../../errors/AppError.js";
import { EnrollmentQuery } from "./enrollment.interface.js";

const enrollStudent = async (studentId: string, courseId: string) => {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      status: true,
    },
  });

  if (!course || course.status !== "PUBLISHED") {
    throw new AppError(404, "Published course not found");
  }

  const existingEnrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId,
        courseId,
      },
    },
  });

  if (existingEnrollment) {
    throw new AppError(409, "You are already enrolled in this course");
  }

  return prisma.enrollment.create({
    data: {
      studentId,
      courseId,
    },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          description: true,
          coverImage: true,
          status: true,
        },
      },
    },
  });
};

const getMyEnrollments = async (studentId: string, query: EnrollmentQuery) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 10));
  const skip = (page - 1) * limit;

  const [enrollments, total] = await prisma.$transaction([
    prisma.enrollment.findMany({
      where: { studentId },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            coverImage: true,
            status: true,
            mentor: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    }),
    prisma.enrollment.count({
      where: { studentId },
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: enrollments,
  };
};

const getEnrollmentById = async (studentId: string, enrollmentId: string) => {
  const enrollment = await prisma.enrollment.findFirst({
    where: {
      id: enrollmentId,
      studentId,
    },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          description: true,
          coverImage: true,
          content: true,
          status: true,
          mentor: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (!enrollment) {
    throw new AppError(404, "Enrollment not found");
  }

  return enrollment;
};

const checkEnrollment = async (studentId: string, courseId: string) => {
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId,
        courseId,
      },
    },
    select: {
      id: true,
      createdAt: true,
    },
  });

  return {
    isEnrolled: Boolean(enrollment),
    enrollment,
  };
};

const unenrollStudent = async (studentId: string, enrollmentId: string) => {
  const enrollment = await prisma.enrollment.findFirst({
    where: {
      id: enrollmentId,
      studentId,
    },
    select: {
      id: true,
    },
  });

  if (!enrollment) {
    throw new AppError(404, "Enrollment not found");
  }

  await prisma.enrollment.delete({
    where: {
      id: enrollment.id,
    },
  });

  return { message: "Successfully unenrolled from course" };
};

export const enrollmentService = {
  enrollStudent,
  getMyEnrollments,
  getEnrollmentById,
  checkEnrollment,
  unenrollStudent,
};
