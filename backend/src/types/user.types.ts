// ============================================================================
// User Type Definitions
// ============================================================================
// This file contains TypeScript types and interfaces related to the User model.
// ============================================================================

export interface User {
  id: string;
  github_id: number;
  username: string;
  avatar_url?: string | null;
  email?: string | null;
  github_access_token: string;
  created_at: string;
  updated_at: string;
}
