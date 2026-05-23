// ============================================================================
// Projects Routes
// ============================================================================
// This file defines the routes for project management, including CRUD
// operations for projects.
// ============================================================================

import { Router } from "express";
import * as projectController from "./projects.controller";
import { protect } from "@middleware/auth.middleware";
import { validate } from "@middleware/validation.middleware";
import {
  createProjectSchema,
  updateProjectSchema,
  projectQuerySchema,
  projectIdSchema,
} from "./projects.validator";

const router = Router();

router.use(protect);

router
  .route("/")
  .post(validate(createProjectSchema), projectController.createProject)
  .get(validate(projectQuerySchema), projectController.getProjects);

router
  .route("/:id")
  .get(validate(projectIdSchema), projectController.getProjectById)
  .put(validate(updateProjectSchema), projectController.updateProject)
  .delete(validate(projectIdSchema), projectController.deleteProject);

export default router;
