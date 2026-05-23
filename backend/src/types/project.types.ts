// ============================================================================
// Project Type Definitions
// ============================================================================
// This file contains TypeScript types and interfaces related to the Project model.
// ============================================================================

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
}
