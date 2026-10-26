import { Router } from "express";
import { Role } from "../../../generated/prisma/client.js";
import { courseController } from "./course.controller.js";
import auth from "../../middleware/auth.js";
import validateRequest from "../../middleware/validateRequest.js";
import { courseValidation } from "./course.validation.js";

const courseRoute = Router();

courseRoute.get("/", courseController.getPublishedCourses);

courseRoute.get(
  "/my-courses",
  auth(Role.MENTOR),
  courseController.getMyCourses,
);

courseRoute.get("/:id", courseController.getCourseById);

courseRoute.post(
  "/",
  auth(Role.MENTOR),
  validateRequest(courseValidation.createCourseSchema),
  courseController.createCourse,
);

courseRoute.patch(
  "/:id",
  auth(Role.MENTOR),
  validateRequest(courseValidation.updateCourseSchema),
  courseController.updateCourse,
);

courseRoute.delete("/:id", auth(Role.MENTOR), courseController.deleteCourse);

export default courseRoute;
