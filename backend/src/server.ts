// ============================================================================
// HTTP Server
// ============================================================================
// This file is the main entry point for the backend server. It initializes
// the Express application, starts the HTTP server, and handles graceful
// shutdown.
// ============================================================================

import http from "http";
import app from "./app";
import { env } from "@configs/env.config";
import logger from "@utils/logger";
import { checkSupabaseConnection } from "@integrations/supabase/supabase.client";

import { initSocketServer } from "@services/socket.service";

const server = http.createServer(app);
initSocketServer(server);

const startServer = async () => {
  if (!(await checkSupabaseConnection())) {
    logger.error("Server startup failed: could not connect to Supabase.");
    process.exit(1);
  }

  server.listen(env.PORT, () => {
    logger.info(`Server is running on port ${env.PORT}`);
  });
};

const gracefulShutdown = () => {
  logger.info("Shutting down server gracefully...");
  server.close(() => {
    logger.info("Server has been shut down.");
    process.exit(0);
  });
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

startServer();
