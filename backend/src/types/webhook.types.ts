// ============================================================================
// Webhook Event Type Definitions
// ============================================================================
// This file contains TypeScript types and interfaces related to the WebhookEvent model.
// ============================================================================

export interface WebhookEvent {
  id: string;
  repository_id: string;
  github_delivery_id: string;
  event_type: string;
  payload: Record<string, any>;
  processed_at?: string | null;
  created_at: string;
}
