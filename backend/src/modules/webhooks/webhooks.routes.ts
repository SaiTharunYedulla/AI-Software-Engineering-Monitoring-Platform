// ============================================================================
// Webhooks Routes
// ============================================================================
// This file defines the route for receiving GitHub webhook events.
// ============================================================================

import { Router } from "express";
import * as webhookController from "./webhooks.controller";
import { webhookRateLimiter } from "@middleware/rateLimit.middleware";

const router = Router();

// It's important to use express.raw({ type: 'application/json' }) for the webhook route
// to have access to the raw body for signature verification.
// This should be configured in app.ts for this specific route.
router.post(
  "/github",
  webhookRateLimiter,
  webhookController.handleGitHubWebhook,
);

export default router;
