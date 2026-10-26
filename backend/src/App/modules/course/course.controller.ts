import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import sendRes from "../../utils/SendRes.js";
import { courseService } from "./course.service.js";

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const mentorId = req.user?.id;

  const result = await courseService.createCourse(mentorId, req.body);

  sendRes({
    res,
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Course created successfully",
    data: result,
  });
});

const getPublishedCourses = catchAsync(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search as string | undefined;

  const result = await courseService.getPublishedCourses({
    page,
    limit,
    search,
  });

  sendRes({
    res,
    success: true,
    statusCode: httpStatus.OK,
    message: "Published courses retrieved successfully",
    data: result.data,
  });
});

const getCourseById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await courseService.getCourseById(id as string);

  sendRes({
    res,
    success: true,
    statusCode: httpStatus.OK,
    message: "Course retrieved successfully",
    data: result,
  });
});

const getMyCourses = catchAsync(async (req: Request, res: Response) => {
  const mentorId = req.user?.id;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search as string | undefined;

  const result = await courseService.getMyCourses(mentorId, {
    page,
    limit,
    search,
  });

  sendRes({
    res,
    success: true,
    statusCode: httpStatus.OK,
    message: "Your courses retrieved successfully",
    data: result.data,
  });
});

const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const mentorId = req.user?.id;
  const { id } = req.params;

  const result = await courseService.updateCourse(
    mentorId,
    id as string,
    req.body,
  );

  sendRes({
    res,
    success: true,
    statusCode: httpStatus.OK,
    message: "Course updated successfully",
    data: result,
  });
});

const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const mentorId = req.user?.id;
  const { id } = req.params;

  await courseService.deleteCourse(mentorId, id as string);

  sendRes({
    res,
    success: true,
    statusCode: httpStatus.OK,
    message: "Course deleted successfully",
    data: null,
  });
});

export const courseController = {
  createCourse,
  getPublishedCourses,
  getCourseById,
  getMyCourses,
  updateCourse,
  deleteCourse,
};
