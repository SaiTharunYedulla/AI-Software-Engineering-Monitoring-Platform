import { webhookEventRepository } from './webhook.repository';
import { addWebhookEventJob } from '../../services/queue.service';
import { logger } from '../../utils/logger';

export const webhookEventService = {
  async handleWebhookEvent(
    provider: string,
    payload: any,
    signature: string,
    rawPayload: Buffer
  ) {
    // TODO: Verify signature
    logger.info(`Handling webhook event from ${provider}`);

    const event = await webhookEventRepository.createWebhookEvent({
      provider,
      payload,
    });

    await addWebhookEventJob({
      id: event.id,
      provider,
      payload,
    });

    return event;
  },

  async processWebhookEvent(data: {
    id: string;
    provider: string;
    payload: any;
  }) {
    logger.info(`Processing webhook event ${data.id}`);
    // TODO: Implement business logic for different event types
    // e.g., if (data.payload.type === 'push') { ... }

    import { broadcastEvent } from '../../services/socket.service';

// ... existing code ...

  async processWebhookEvent(data: {
    id: string;
    provider: string;
    payload: any;
  }) {
    logger.info(`Processing webhook event ${data.id}`);
    // TODO: Implement business logic for different event types
    // e.g., if (data.payload.type === 'push') { ... }

    // For now, just mark as processed
    await webhookEventRepository.updateWebhookEventStatus(data.id, 'processed');

    // Broadcast the event to the frontend
    broadcastEvent('webhook-events', 'newEvent', {
      id: data.id,
      ...data.payload,
    });
  },
};
