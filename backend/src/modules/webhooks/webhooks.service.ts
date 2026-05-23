// ============================================================================
// Webhooks Service
// ============================================================================
// This file contains the business logic for the webhooks module, handling
// signature verification, event storage, and queuing for processing.
// ============================================================================

import * as webhookRepo from "./webhooks.repository";
import { verifySignature } from "./webhooks.signature";
import { AppError } from "@middleware/error.middleware";
import { decrypt } from "@utils/encryption";
import * as repoRepo from "@modules/repositories/repositories.repository";
import { WebhookEvent } from "@types/webhook.types";

export const processWebhook = async (
  signature: string,
  deliveryId: string,
  eventType: string,
  payload: any,
): Promise<WebhookEvent> => {
  const repo = await repoRepo.findRepositoryById(payload.repository.id); // Assuming payload has repository.id
  if (!repo || !repo.webhook_secret) {
    throw new AppError(
      "Repository not found or webhook secret is missing",
      404,
      "NOT_FOUND",
    );
  }

  const secret = decrypt(repo.webhook_secret);
  if (!verifySignature(secret, JSON.stringify(payload), signature)) {
    throw new AppError("Invalid webhook signature", 401, "UNAUTHORIZED");
  }

  const existingEvent = await webhookRepo.findEventByDeliveryId(deliveryId);
  if (existingEvent) {
    // Idempotency: if event is already received, do nothing.
    return existingEvent;
  }

  const newEvent = await webhookRepo.storeWebhookEvent({
    repository_id: repo.id,
    github_delivery_id: deliveryId,
    event_type: eventType,
    payload,
  });

  // TODO: Enqueue for processing
  // queueService.enqueueWebhookEvent(newEvent);

  return newEvent;
};
