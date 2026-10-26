import { Router } from "express";
import { Role } from "../../../generated/prisma/client.js";
import auth from "../../middleware/auth.js";
import validateRequest from "../../middleware/validateRequest.js";
import { enrollmentController } from "./enrollment.controller.js";
import { enrollmentValidation } from "./enrollment.validation.js";

const enrollmentRoute = Router();

enrollmentRoute.use(auth(Role.STUDENT));

enrollmentRoute.post(
  "/",
  validateRequest(enrollmentValidation.enrollStudentSchema),
  enrollmentController.enrollStudent,
);

enrollmentRoute.get("/", enrollmentController.getMyEnrollments);

enrollmentRoute.get("/check/:courseId", enrollmentController.checkEnrollment);

enrollmentRoute.get("/:id", enrollmentController.getEnrollmentById);

enrollmentRoute.delete("/:id", enrollmentController.unenrollStudent);

export default enrollmentRoute;
