// ============================================================================
// GitHub API Client (Octokit)
// ============================================================================
// This file initializes and configures the Octokit client for interacting
// with the GitHub API. It includes token management and error handling.
// ============================================================================

import { Octokit } from "@octokit/rest";
import { decrypt } from "@utils/encryption";
import { AppError } from "@middleware/error.middleware";
import logger from "@utils/logger";

export const getOctokit = (encryptedToken: string) => {
  try {
    const token = decrypt(encryptedToken);
    return new Octokit({ auth: token });
  } catch (error) {
    logger.error("Failed to initialize Octokit:", error);
    throw new AppError("Invalid access token", 500, "OCTOKIT_INIT_ERROR");
  }
};

// Note: Token refresh logic is handled by Supabase Auth during session refresh.
// The Octokit client is initialized with a fresh token for each request.
