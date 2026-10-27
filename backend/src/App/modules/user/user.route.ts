import { Router } from "express";
import { Role } from "../../../generated/prisma/client.js";
import { userController } from "./user.controller.js";
import auth from "../../middleware/auth.js";

const userRoute = Router();

userRoute.get("/me", auth(Role.STUDENT, Role.MENTOR), userController.getMe);
userRoute.get(
  "/dashboard/student",
  auth(Role.STUDENT),
  userController.getStudentDashboardAnalytics,
);
userRoute.get(
  "/dashboard/mentor",
  auth(Role.MENTOR),
  userController.getMentorDashboardAnalytics,
);

userRoute.get("/", auth(Role.MENTOR), userController.getAllUsers);

userRoute.get("/:id", auth(Role.MENTOR), userController.getUserById);

export default userRoute;
