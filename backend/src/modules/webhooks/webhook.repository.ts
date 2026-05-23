import { db } from "../../configs/db.config";
import { NewWebhookEvent, webhook_events } from "../../db/schema";
import { eq } from "drizzle-orm";

export const webhookEventRepository = {
  async createWebhookEvent(event: NewWebhookEvent) {
    const [newEvent] = await db
      .insert(webhook_events)
      .values(event)
      .returning();
    return newEvent;
  },

  async getWebhookEventById(id: string) {
    const [event] = await db
      .select()
      .from(webhook_events)
      .where(eq(webhook_events.id, id));
    return event;
  },

  async updateWebhookEventStatus(
    id: string,
    status: "pending" | "processed" | "failed",
  ) {
    const [updatedEvent] = await db
      .update(webhook_events)
      .set({ status, updatedAt: new Date() })
      .where(eq(webhook_events.id, id))
      .returning();
    return updatedEvent;
  },
};
