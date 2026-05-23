// ============================================================================
// Repositories Routes
// ============================================================================
// This file defines the routes for repository management, including searching,
// connecting, and disconnecting repositories.
// ============================================================================

import { Router } from "express";
import * as repoController from "./repositories.controller";
import { protect } from "@middleware/auth.middleware";
import { validate } from "@middleware/validation.middleware";
import {
  connectRepositorySchema,
  searchRepositoriesSchema,
  repositoryIdSchema,
} from "./repositories.validator";

const router = Router();

router.use(protect);

router.get(
  "/search",
  validate(searchRepositoriesSchema),
  repoController.searchRepositories,
);
router.post(
  "/connect",
  validate(connectRepositorySchema),
  repoController.connectRepository,
);
router.delete(
  "/:id",
  validate(repositoryIdSchema),
  repoController.disconnectRepository,
);
router.get(
  "/:id/settings",
  validate(repositoryIdSchema),
  repoController.getRepositorySettings,
);

export default router;
