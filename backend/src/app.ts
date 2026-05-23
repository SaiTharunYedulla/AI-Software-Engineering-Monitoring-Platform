// ============================================================================
// Express Application
// ============================================================================
// This file configures and initializes the Express application, including
// middleware for security, CORS, request logging, and body parsing.
// ============================================================================

import express from "express";
import helmet from "helmet";
import cors from "cors";
import requestLogger from "@middleware/requestLogger.middleware";
import { env } from "@configs/env.config";
import { handleError } from "@middleware/error.middleware";
import authRoutes from "@modules/auth/auth.routes";
import projectRoutes from "@modules/projects/projects.routes";
import repositoryRoutes from "@modules/repositories/repositories.routes";
import webhookRoutes from "@modules/webhooks/webhooks.routes";

const app = express();

// Security headers
app.use(helmet());

// CORS
const corsOptions = {
  origin: env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Request logging
app.use(requestLogger);

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Raw body parser for webhook signature verification
app.use(
  "/api/v1/webhooks/github",
  express.raw({ type: "application/json" }),
  webhookRoutes,
);

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/repositories", repositoryRoutes);

// Error handling middleware
app.use(handleError);

export default app;
