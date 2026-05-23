// ============================================================================
// Webhooks Repository
// ============================================================================
// This file contains the data access logic for the webhooks module,
// handling all database interactions related to webhook events.
// ============================================================================

import supabase from "@integrations/supabase/supabase.client";
import { WebhookEvent } from "@types/webhook.types";

export const storeWebhookEvent = async (
  event: Omit<WebhookEvent, "id" | "created_at">,
): Promise<WebhookEvent> => {
  const { data, error } = await supabase
    .from("webhook_events")
    .insert(event)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const findEventByDeliveryId = async (
  deliveryId: string,
): Promise<WebhookEvent | null> => {
  const { data, error } = await supabase
    .from("webhook_events")
    .select("*")
    .eq("github_delivery_id", deliveryId)
    .single();
  if (error && error.code !== "PGRST116") throw error;
  return data;
};

export const markEventAsProcessed = async (
  id: string,
): Promise<WebhookEvent> => {
  const { data, error } = await supabase
    .from("webhook_events")
    .update({ processed_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const getEventsByRepositoryId = async (
  repositoryId: string,
): Promise<WebhookEvent[]> => {
  const { data, error } = await supabase
    .from("webhook_events")
    .select("*")
    .eq("repository_id", repositoryId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};
