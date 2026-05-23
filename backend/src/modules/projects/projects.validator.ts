// ============================================================================
// Projects Validators
// ============================================================================
// This file contains Zod schemas for validating requests related to the
// projects module.
// ============================================================================

import { z } from "zod";

export const createProjectSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
  }),
});

export const updateProjectSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    description: z.string().max(500).optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const projectQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().optional(),
    sortBy: z.enum(["name", "created_at", "updated_at"]).optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});

export const projectIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
