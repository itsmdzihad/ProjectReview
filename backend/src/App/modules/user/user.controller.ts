import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendRes from "../../utils/SendRes.js";
import { userService } from "./user.service.js";

const getMe = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const result = await userService.getMe(userId);

  sendRes({
    res,
    success: true,
    statusCode: 200,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await userService.getUserById(id as string);

  sendRes({
    res,
    success: true,
    statusCode: 200,
    message: "User retrieved successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const role = req.query.role as "STUDENT" | "MENTOR" | undefined;

  const result = await userService.getAllUsers({
    page,
    limit,
    role,
  });

  sendRes({
    res,
    success: true,
    statusCode: 200,
    message: "Users retrieved successfully",
    data: result.data,
  });
});

const getStudentDashboardAnalytics = catchAsync(
  async (req: Request, res: Response) => {
    const result = await userService.getStudentDashboardAnalytics(req.user?.id);

    sendRes({
      res,
      success: true,
      statusCode: 200,
      message: "Student dashboard analytics retrieved successfully",
      data: result,
    });
  },
);

const getMentorDashboardAnalytics = catchAsync(
  async (req: Request, res: Response) => {
    const result = await userService.getMentorDashboardAnalytics(req.user?.id);

    sendRes({
      res,
      success: true,
      statusCode: 200,
      message: "Mentor dashboard analytics retrieved successfully",
      data: result,
    });
  },
);

export const userController = {
  getMe,
  getUserById,
  getAllUsers,
  getStudentDashboardAnalytics,
  getMentorDashboardAnalytics,
};
