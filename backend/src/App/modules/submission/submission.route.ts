import { Router } from "express";
import { Role } from "../../../generated/prisma/client.js";
import auth from "../../middleware/auth.js";
import validateRequest from "../../middleware/validateRequest.js";
import { submissionController } from "./submission.controller.js";
import { submissionValidation } from "./submission.validation.js";

const submissionRoute = Router();

submissionRoute.post(
  "/",
  auth(Role.STUDENT),
  validateRequest(submissionValidation.createSubmissionSchema),
  submissionController.createSubmission,
);

submissionRoute.get(
  "/my-submissions",
  auth(Role.STUDENT),
  submissionController.getMySubmissions,
);

submissionRoute.get(
  "/course/:courseId",
  auth(Role.MENTOR),
  submissionController.getCourseSubmissions,
);

submissionRoute.get(
  "/:id",
  auth(Role.STUDENT, Role.MENTOR),
  submissionController.getSubmissionById,
);

submissionRoute.patch(
  "/:id",
  auth(Role.STUDENT),
  validateRequest(submissionValidation.updateSubmissionSchema),
  submissionController.updateSubmission,
);

submissionRoute.delete(
  "/:id",
  auth(Role.STUDENT),
  submissionController.deleteSubmission,
);

submissionRoute.patch(
  "/:id/review",
  auth(Role.MENTOR),
  validateRequest(submissionValidation.reviewSubmissionSchema),
  submissionController.reviewSubmission,
);

export default submissionRoute;
