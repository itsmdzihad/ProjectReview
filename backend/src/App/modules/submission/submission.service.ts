import httpStatus from "http-status";
import { prisma } from "../../config/db.config.js";
import AppError from "../../errors/AppError.js";
import {
  CreateSubmissionPayload,
  ReviewSubmissionPayload,
  SubmissionQuery,
  UpdateSubmissionPayload,
} from "./submission.interface.js";

const createSubmission = async (
  studentId: string,
  payload: CreateSubmissionPayload,
) => {
  const course = await prisma.course.findUnique({
    where: { id: payload.courseId },
    select: {
      id: true,
      title: true,
      status: true,
    },
  });

  if (!course || course.status !== "PUBLISHED") {
    throw new AppError(httpStatus.NOT_FOUND, "Published course not found");
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId,
        courseId: payload.courseId,
      },
    },
  });

  if (!enrollment) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You must enroll in this course before submitting your project",
    );
  }

  const existingSubmission = await prisma.submission.findUnique({
    where: {
      studentId_courseId: {
        studentId,
        courseId: payload.courseId,
      },
    },
  });

  if (existingSubmission) {
    throw new AppError(
      httpStatus.CONFLICT,
      "You have already submitted a project for this course",
    );
  }

  return prisma.submission.create({
    data: {
      studentId,
      courseId: payload.courseId,
      projectName: payload.projectName,
      repositoryUrl: payload.repositoryUrl,
      liveUrl: payload.liveUrl,
      description: payload.description,
    },
    include: {
      course: {
        select: {
          id: true,
          title: true,
        },
      },
      student: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

const getMySubmissions = async (studentId: string, query: SubmissionQuery) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 10));
  const skip = (page - 1) * limit;

  const where = {
    studentId,
    ...(query.status ? { status: query.status } : {}),
  };

  const [data, total] = await prisma.$transaction([
    prisma.submission.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            coverImage: true,
          },
        },
      },
    }),
    prisma.submission.count({ where }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data,
  };
};

const getSubmissionById = async (
  submissionId: string,
  userId: string,
  role: "STUDENT" | "MENTOR",
) => {
  const submission = await prisma.submission.findUnique({
    where: { id: submissionId },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          mentorId: true,
        },
      },
      student: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!submission) {
    throw new AppError(httpStatus.NOT_FOUND, "Submission not found");
  }

  if (role === "STUDENT" && submission.studentId !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You can only access your own submissions",
    );
  }

  if (role === "MENTOR" && submission.course.mentorId !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You can only access submissions for your own courses",
    );
  }

  return submission;
};

const updateSubmission = async (
  studentId: string,
  submissionId: string,
  payload: UpdateSubmissionPayload,
) => {
  const submission = await prisma.submission.findFirst({
    where: {
      id: submissionId,
      studentId,
    },
  });

  if (!submission) {
    throw new AppError(httpStatus.NOT_FOUND, "Submission not found");
  }

  if (submission.status !== "PENDING") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only pending submissions can be updated",
    );
  }

  return prisma.submission.update({
    where: { id: submissionId },
    data: payload,
  });
};

const deleteSubmission = async (studentId: string, submissionId: string) => {
  const submission = await prisma.submission.findFirst({
    where: {
      id: submissionId,
      studentId,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!submission) {
    throw new AppError(httpStatus.NOT_FOUND, "Submission not found");
  }

  if (submission.status !== "PENDING") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only pending submissions can be deleted",
    );
  }

  await prisma.submission.delete({
    where: { id: submissionId },
  });

  return { message: "Submission deleted successfully" };
};

const getCourseSubmissions = async (
  mentorId: string,
  courseId: string,
  query: SubmissionQuery,
) => {
  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
      mentorId,
    },
    select: { id: true },
  });

  if (!course) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Course not found or you do not own this course",
    );
  }

  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 10));
  const skip = (page - 1) * limit;

  const where = {
    courseId,
    ...(query.status ? { status: query.status } : {}),
  };

  const [data, total] = await prisma.$transaction([
    prisma.submission.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    }),
    prisma.submission.count({ where }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data,
  };
};

const reviewSubmission = async (
  mentorId: string,
  submissionId: string,
  payload: ReviewSubmissionPayload,
) => {
  const submission = await prisma.submission.findUnique({
    where: { id: submissionId },
    include: {
      course: {
        select: { mentorId: true },
      },
    },
  });

  if (!submission) {
    throw new AppError(httpStatus.NOT_FOUND, "Submission not found");
  }

  if (submission.course.mentorId !== mentorId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You can only review submissions for your own courses",
    );
  }

  if (submission.status !== "PENDING") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This submission has already been reviewed",
    );
  }

  if (payload.status === "REJECTED" && !payload.feedback?.trim()) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Feedback is required when rejecting a submission",
    );
  }

  return prisma.submission.update({
    where: { id: submissionId },
    data: {
      status: payload.status,
      feedback: payload.feedback?.trim() || null,
    },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      course: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

export const submissionService = {
  createSubmission,
  getMySubmissions,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
  getCourseSubmissions,
  reviewSubmission,
};
