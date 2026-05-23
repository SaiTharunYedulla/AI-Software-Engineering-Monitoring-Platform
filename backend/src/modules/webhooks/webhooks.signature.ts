// ============================================================================
// Webhook Signature Verification
// ============================================================================
// This file provides utility functions for verifying GitHub webhook signatures
// to ensure that incoming webhook payloads are authentic.
// ============================================================================

import crypto from "crypto";

/**
 * Verifies the signature of a GitHub webhook payload.
 * @param secret The webhook secret.
 * @param payload The raw request body.
 * @param signature The signature from the 'X-Hub-Signature-256' header.
 * @returns True if the signature is valid, false otherwise.
 */
export const verifySignature = (
  secret: string,
  payload: string,
  signature: string,
): boolean => {
  const expectedSignature = `sha256=${crypto.createHmac("sha256", secret).update(payload).digest("hex")}`;

  // Use constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature),
  );
};
