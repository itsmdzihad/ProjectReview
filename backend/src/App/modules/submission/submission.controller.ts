import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendRes from "../../utils/SendRes.js";
import { submissionService } from "./submission.service.js";

const createSubmission = catchAsync(async (req: Request, res: Response) => {
  const result = await submissionService.createSubmission(
    req.user?.id,
    req.body,
  );

  sendRes({
    res,
    success: true,
    statusCode: 201,
    message: "Project submitted successfully",
    data: result,
  });
});

const getMySubmissions = catchAsync(async (req: Request, res: Response) => {
  const result = await submissionService.getMySubmissions(req.user?.id, {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    status: req.query.status as "PENDING" | "APPROVED" | "REJECTED" | undefined,
  });

  sendRes({
    res,
    success: true,
    statusCode: 200,
    message: "Your submissions retrieved successfully",
    data: result.data,
  });
});

const getSubmissionById = catchAsync(async (req: Request, res: Response) => {
  const result = await submissionService.getSubmissionById(
    req.params.id as string,
    req.user?.id,
    req.user?.role,
  );

  sendRes({
    res,
    success: true,
    statusCode: 200,
    message: "Submission retrieved successfully",
    data: result,
  });
});

const updateSubmission = catchAsync(async (req: Request, res: Response) => {
  const result = await submissionService.updateSubmission(
    req.user?.id,
    req.params.id as string,
    req.body,
  );

  sendRes({
    res,
    success: true,
    statusCode: 200,
    message: "Submission updated successfully",
    data: result,
  });
});

const deleteSubmission = catchAsync(async (req: Request, res: Response) => {
  const result = await submissionService.deleteSubmission(
    req.user?.id,
    req.params.id as string,
  );

  sendRes({
    res,
    success: true,
    statusCode: 200,
    message: result.message,
    data: null,
  });
});

const getCourseSubmissions = catchAsync(async (req: Request, res: Response) => {
  const result = await submissionService.getCourseSubmissions(
    req.user?.id,
    req.params.courseId as string,
    {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
      status: req.query.status as
        | "PENDING"
        | "APPROVED"
        | "REJECTED"
        | undefined,
    },
  );

  sendRes({
    res,
    success: true,
    statusCode: 200,
    message: "Course submissions retrieved successfully",
    data: result.data,
  });
});

const reviewSubmission = catchAsync(async (req: Request, res: Response) => {
  const result = await submissionService.reviewSubmission(
    req.user?.id,
    req.params.id as string,
    req.body,
  );

  sendRes({
    res,
    success: true,
    statusCode: 200,
    message: "Submission reviewed successfully",
    data: result,
  });
});

export const submissionController = {
  createSubmission,
  getMySubmissions,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
  getCourseSubmissions,
  reviewSubmission,
};
