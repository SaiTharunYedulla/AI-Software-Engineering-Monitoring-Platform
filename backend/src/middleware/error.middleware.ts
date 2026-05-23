// ============================================================================
// Centralized Error Handling Middleware
// ============================================================================
// This file contains middleware for handling errors in a centralized manner.
// It catches errors from the application, logs them, and sends a
// standardized error response to the client.
// ============================================================================

import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { sendError } from "@utils/response";
import logger from "@utils/logger";
import { env } from "@configs/env.config";

class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

const handleZodError = (err: ZodError, res: Response) => {
  const errors = err.flatten().fieldErrors;
  sendError(res, "Validation failed", 400, "VALIDATION_ERROR", errors);
};

const handleAppError = (err: AppError, res: Response) => {
  sendError(res, err.message, err.statusCode, err.code);
};

const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error("An error occurred:", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  if (err instanceof ZodError) {
    return handleZodError(err, res);
  }

  if (err instanceof AppError) {
    return handleAppError(err, res);
  }

  if (env.NODE_ENV === "production") {
    sendError(
      res,
      "An internal server error occurred.",
      500,
      "INTERNAL_SERVER_ERROR",
    );
  } else {
    sendError(res, err.message, 500, "INTERNAL_SERVER_ERROR", err.stack);
  }
};

export { AppError, handleError };
