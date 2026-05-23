// ============================================================================
// Repository Type Definitions
// ============================================================================
// This file contains TypeScript types and interfaces related to the Repository model.
// ============================================================================

export interface Repository {
  id: string;
  project_id: string;
  github_repo_id: number;
  name: string;
  full_name: string;
  private: boolean;
  owner_login: string;
  webhook_id?: number | null;
  webhook_secret?: string | null;
  created_at: string;
  updated_at: string;
}
