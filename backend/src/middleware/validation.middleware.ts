// ============================================================================
// Validation Middleware
// ============================================================================
// This file contains middleware for validating incoming request data against
// Zod schemas. It provides a flexible wrapper for validating the request
// body, query parameters, and URL parameters.
// ============================================================================

import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.flatten().fieldErrors,
        });
      }
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
