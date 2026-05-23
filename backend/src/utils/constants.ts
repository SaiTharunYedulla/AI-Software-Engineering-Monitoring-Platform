// ============================================================================
// Application Constants
// ============================================================================
// This file contains constant values used throughout the backend application,
// such as default pagination settings, rate limits, and other magic numbers.
// ============================================================================

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
};

export const RATE_LIMITS = {
  API: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100,
  },
  WEBHOOK: {
    WINDOW_MS: 1 * 60 * 1000, // 1 minute
    MAX_REQUESTS: 1000,
  },
};

export const GITHUB = {
  DEFAULT_SCOPES: "repo,user",
};
