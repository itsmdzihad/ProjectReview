import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import config from "../config/index.js";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

  let message = err.message || "Something went wrong!";
  let error = err;

  if (err instanceof ZodError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = err.issues
      .map((issue) => {
        const field = issue.path.join(".");
        return field ? `${field}: ${issue.message}` : issue.message;
      })
      .join(", ");
    error = err.issues;
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: config.nodeEnv === "dev" ? error : null,
    stack: config.nodeEnv === "dev" ? err.stack : null,
  });
};

export default globalErrorHandler;
