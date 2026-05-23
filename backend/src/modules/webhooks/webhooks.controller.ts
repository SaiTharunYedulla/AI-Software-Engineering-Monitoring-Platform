// ============================================================================
// Webhooks Controller
// ============================================================================
// This file contains the controller function for handling incoming GitHub
// webhook requests.
// ============================================================================

import { Request, Response, NextFunction } from "express";
import * as webhookService from "./webhooks.service";
import { sendSuccess } from "@utils/response";

export const handleGitHubWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const signature = req.headers["x-hub-signature-256"] as string;
    const eventType = req.headers["x-github-event"] as string;
    const deliveryId = req.headers["x-github-delivery"] as string;

    const event = await webhookService.processWebhook(
      signature,
      deliveryId,
      eventType,
      req.body,
    );

    sendSuccess(
      res,
      { eventId: event.id, queued: true },
      "Webhook received and queued",
      202,
    );
  } catch (error) {
    next(error);
  }
};
