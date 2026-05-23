// ============================================================================
// Repositories Validators
// ============================================================================
// This file contains Zod schemas for validating requests related to the
// repositories module.
// ============================================================================

import { z } from "zod";

export const connectRepositorySchema = z.object({
  body: z.object({
    projectId: z.string().uuid(),
    github_repo_id: z.number().int().positive(),
    name: z.string(),
    full_name: z.string(),
    private: z.boolean(),
    owner_login: z.string(),
  }),
});

export const searchRepositoriesSchema = z.object({
  query: z.object({
    q: z.string().optional(),
  }),
});

export const repositoryIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
