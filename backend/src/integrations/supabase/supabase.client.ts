// ============================================================================
// Supabase Client
// ============================================================================
// This file initializes and configures the Supabase client for server-side use.
// It uses the service role key for administrative access to the database.
// ============================================================================

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { env } from "@configs/env.config";
import logger from "@utils/logger";

let supabase: SupabaseClient;

try {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase URL and service role key are required.");
  }

  supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  logger.info("Supabase client initialized successfully.");
} catch (error) {
  logger.error("Failed to initialize Supabase client:", error);
  process.exit(1);
}

/**
 * Checks the connection to Supabase by performing a simple query.
 * @returns {Promise<boolean>} True if the connection is successful, false otherwise.
 */
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.from("users").select("id").limit(1);
    if (error) {
      throw error;
    }
    logger.info("Supabase connection verified successfully.");
    return true;
  } catch (error) {
    logger.error("Failed to verify Supabase connection:", error);
    return false;
  }
};

export default supabase;
