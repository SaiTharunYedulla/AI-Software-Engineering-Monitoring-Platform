// ============================================================================
// Environment Configuration
// ============================================================================
// This file defines and validates the environment variables required by the
// application. It uses Zod for schema validation to ensure that all necessary
// configuration is present and correctly formatted on startup.
// ============================================================================

import dotenv from "dotenv";
import { z } from "zod";

// Load environment variables from .env file
dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3001),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  CORS_ORIGIN: z.string().url().default("http://localhost:3000"),

  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),

  GITHUB_CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),
  GITHUB_CALLBACK_URL: z.string().url(),

  REDIS_URL: z.string().url(),
  REDIS_TIMEOUT: z.coerce.number().int().positive().default(5000),

  JWT_SECRET: z.string().min(32),
  WEBHOOK_SECRET: z.string().min(1),
  ENCRYPTION_KEY: z.string().length(64), // 32 bytes hex encoded

  LOG_LEVEL: z
    .enum(["error", "warn", "info", "http", "verbose", "debug", "silly"])
    .default("info"),
});

try {
  envSchema.parse(process.env);
} catch (error) {
  console.error("Invalid environment variables:", error);
  process.exit(1);
}

export const env = envSchema.parse(process.env);
