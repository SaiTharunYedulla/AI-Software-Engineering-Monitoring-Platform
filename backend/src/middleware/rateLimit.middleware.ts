// ============================================================================
// Rate Limiting Middleware
// ============================================================================
// This file contains middleware for applying rate limits to API and webhook
// endpoints to prevent abuse and ensure service stability.
// ============================================================================

import rateLimit from "express-rate-limit";
import { RATE_LIMITS } from "@utils/constants";
import logger from "@utils/logger";

const handler = (req: any, res: any, next: any, options: any) => {
  logger.warn("Rate limit exceeded", {
    ip: req.ip,
    path: req.path,
    method: req.method,
  });
  res.status(options.statusCode).send(options.message);
};

export const apiRateLimiter = rateLimit({
  windowMs: RATE_LIMITS.API.WINDOW_MS,
  max: RATE_LIMITS.API.MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});

export const webhookRateLimiter = rateLimit({
  windowMs: RATE_LIMITS.WEBHOOK.WINDOW_MS,
  max: RATE_LIMITS.WEBHOOK.MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});
