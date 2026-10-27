import httpStatus from "http-status";
import { prisma } from "../../config/db.config.js";
import AppError from "../../errors/AppError.js";
import type {
  DashboardActivityDay,
  DashboardSubmissionCounts,
} from "./user.interface.js";

const createSubmissionCounts = (): DashboardSubmissionCounts => ({
  PENDING: 0,
  APPROVED: 0,
  REJECTED: 0,
});

const countBySubmissionStatus = (
  groups: Array<{ status: keyof DashboardSubmissionCounts; _count: { _all: number } }>,
) => {
  const counts = createSubmissionCounts();
  for (const group of groups) counts[group.status] = group._count._all;
  return counts;
};

const getActivityWindow = () => {
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCDate(start.getUTCDate() - 6);
  return start;
};

const buildWeeklyActivity = (dates: Date[], start: Date) => {
  const countsByDate = new Map<string, number>();
  for (const date of dates) {
    const key = date.toISOString().slice(0, 10);
    countsByDate.set(key, (countsByDate.get(key) ?? 0) + 1);
  }

  const activity: DashboardActivityDay[] = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + index);
    const key = date.toISOString().slice(0, 10);

    return {
      date: key,
      day: new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        timeZone: "UTC",
      }).format(date),
      count: countsByDate.get(key) ?? 0,
    };
  });

  return {
    activity,
    activeDays: activity.filter((day) => day.count > 0).length,
  };
};

const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    omit: {
      passwordHash: true,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return user;
};

const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    omit: {
      passwordHash: true,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return user;
};

const getAllUsers = async (query: {
  page?: number;
  limit?: number;
  role?: "STUDENT" | "MENTOR";
}) => {
  const page = Math.max(1, query.page ?? 1);
  const limit = Math.min(100, Math.max(1, query.limit ?? 10));
  const skip = (page - 1) * limit;

  const where = query.role ? { role: query.role } : {};

  const [users, total] = await prisma.$transaction([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      omit: {
        passwordHash: true,
      },
    }),
    prisma.user.count({
      where,
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: users,
  };
};

const getStudentDashboardAnalytics = async (studentId: string) => {
  const activityStart = getActivityWindow();
  const [enrolledCoursesCount, submissionGroups, submissions, recentSubmissions, enrollmentActivity, submissionActivity] =
    await Promise.all([
      prisma.enrollment.count({ where: { studentId } }),
      prisma.submission.groupBy({
        by: ["status"],
        where: { studentId },
        _count: { _all: true },
      }),
      prisma.submission.findMany({
        where: { studentId },
        select: { courseId: true },
      }),
      prisma.submission.findMany({
        where: { studentId },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          course: { select: { id: true, title: true } },
        },
      }),
      prisma.enrollment.findMany({
        where: { studentId, createdAt: { gte: activityStart } },
        select: { createdAt: true },
      }),
      prisma.submission.findMany({
        where: { studentId, createdAt: { gte: activityStart } },
        select: { createdAt: true },
      }),
    ]);

  const weekly = buildWeeklyActivity(
    [...enrollmentActivity, ...submissionActivity].map((entry) => entry.createdAt),
    activityStart,
  );

  return {
    enrolledCoursesCount,
    submittedProjectsCount: submissions.length,
    submittedCourseIds: submissions.map((submission) => submission.courseId),
    submissionCounts: countBySubmissionStatus(submissionGroups),
    recentSubmissions,
    weeklyActivity: weekly.activity,
    activeDaysThisWeek: weekly.activeDays,
  };
};

const getMentorDashboardAnalytics = async (mentorId: string) => {
  const activityStart = getActivityWindow();
  const [courses, enrollments, submissionGroups, recentSubmissions, submissionActivity] =
    await Promise.all([
      prisma.course.findMany({
        where: { mentorId },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          description: true,
          coverImage: true,
          content: true,
          status: true,
          mentorId: true,
          createdAt: true,
          updatedAt: true,
          _count: { select: { enrollments: true, submissions: true } },
        },
      }),
      prisma.enrollment.findMany({
        where: { course: { mentorId } },
        select: { studentId: true },
      }),
      prisma.submission.groupBy({
        by: ["status"],
        where: { course: { mentorId } },
        _count: { _all: true },
      }),
      prisma.submission.findMany({
        where: { course: { mentorId } },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          student: { select: { id: true, name: true, email: true } },
          course: { select: { id: true, title: true } },
        },
      }),
      prisma.submission.findMany({
        where: { course: { mentorId }, createdAt: { gte: activityStart } },
        select: { createdAt: true },
      }),
    ]);

  const submissionCounts = countBySubmissionStatus(submissionGroups);
  const weekly = buildWeeklyActivity(
    submissionActivity.map((entry) => entry.createdAt),
    activityStart,
  );

  return {
    coursesCreatedCount: courses.length,
    publishedCoursesCount: courses.filter((course) => course.status === "PUBLISHED").length,
    draftCoursesCount: courses.filter((course) => course.status === "DRAFT").length,
    totalEnrollmentsCount: enrollments.length,
    uniqueStudentsCount: new Set(enrollments.map((enrollment) => enrollment.studentId)).size,
    totalSubmissionsCount: Object.values(submissionCounts).reduce((sum, count) => sum + count, 0),
    submissionCounts,
    submissionCountsByCourse: Object.fromEntries(
      courses.map((course) => [course.id, course._count.submissions]),
    ),
    enrollmentCountsByCourse: Object.fromEntries(
      courses.map((course) => [course.id, course._count.enrollments]),
    ),
    courses,
    recentSubmissions,
    weeklyActivity: weekly.activity,
    activeDaysThisWeek: weekly.activeDays,
  };
};

export const userService = {
  getMe,
  getUserById,
  getAllUsers,
  getStudentDashboardAnalytics,
  getMentorDashboardAnalytics,
};
