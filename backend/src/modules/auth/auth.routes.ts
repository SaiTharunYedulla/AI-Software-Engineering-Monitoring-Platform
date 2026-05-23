// ============================================================================
// Authentication Routes
// ============================================================================
// This file defines the routes for authentication, including GitHub OAuth
// sign-in, callback, and session management.
// ============================================================================

import { Router } from "express";
import * as authController from "./auth.controller";
import { protect } from "@middleware/auth.middleware";

const router = Router();

router.post("/github", authController.githubSignIn);
router.get("/callback", authController.githubCallback);
router.get("/me", protect, authController.getMe);
router.post("/logout", protect, authController.logout);

export default router;
