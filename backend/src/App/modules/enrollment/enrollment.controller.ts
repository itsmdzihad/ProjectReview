import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendRes from "../../utils/SendRes.js";
import { enrollmentService } from "./enrollment.service.js";

const enrollStudent = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body.courseId);
  const result = await enrollmentService.enrollStudent(
    req.user?.id,
    req.body.courseId,
  );

  sendRes({
    res,
    statusCode: 201,
    success: true,
    message: "Successfully enrolled in course",
    data: result,
  });
});

const getMyEnrollments = catchAsync(async (req: Request, res: Response) => {
  const result = await enrollmentService.getMyEnrollments(req.user?.id, {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
  });

  sendRes({
    res,
    statusCode: 200,
    success: true,
    message: "Enrollments retrieved successfully",
    data: result.data,
  });
});

const getEnrollmentById = catchAsync(async (req: Request, res: Response) => {
  const result = await enrollmentService.getEnrollmentById(
    req.user?.id,
    req.params.id as string,
  );

  sendRes({
    res,
    statusCode: 200,
    success: true,
    message: "Enrollment retrieved successfully",
    data: result,
  });
});

const checkEnrollment = catchAsync(async (req: Request, res: Response) => {
  const result = await enrollmentService.checkEnrollment(
    req.user?.id,
    req.params.courseId as string,
  );

  sendRes({
    res,
    statusCode: 200,
    success: true,
    message: "Enrollment status retrieved successfully",
    data: result,
  });
});

const unenrollStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await enrollmentService.unenrollStudent(
    req.user?.id,
    req.params.id as string,
  );

  sendRes({
    res,
    statusCode: 200,
    success: true,
    message: result.message,
    data: null,
  });
});

export const enrollmentController = {
  enrollStudent,
  getMyEnrollments,
  getEnrollmentById,
  checkEnrollment,
  unenrollStudent,
};
