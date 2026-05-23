// ============================================================================
// Webhooks Validators
// ============================================================================
// This file contains Zod schemas for validating requests related to the
// webhooks module, particularly the headers of incoming webhooks.
// ============================================================================

import { z } from "zod";

export const webhookHeadersSchema = z.object({
  headers: z.object({
    "x-hub-signature-256": z.string(),
    "x-github-event": z.string(),
    "x-github-delivery": z.string().uuid(),
  }),
});
