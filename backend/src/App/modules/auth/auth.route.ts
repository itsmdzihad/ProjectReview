import { Router } from "express";
import validateRequest from "../../middleware/validateRequest.js";
import { authController } from "./auth.controller.js";
import { authValidation } from "./auth.validation.js";
import { authRateLimiter } from "../../middleware/rateLimiter.js";

const authRoute = Router();

authRoute.post(
  "/register",
  authRateLimiter,
  validateRequest(authValidation.registerUserSchema),
  authController.userRegistration,
);

authRoute.post(
  "/login",
  authRateLimiter,
  validateRequest(authValidation.loginUserSchema),
  authController.userLogin,
);

export default authRoute;
