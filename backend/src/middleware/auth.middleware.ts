// ============================================================================
// Authentication Middleware
// ============================================================================
// This file contains middleware for authenticating users via JWT tokens.
// It validates the token using Supabase Auth and attaches the user to the
// request object.
// ============================================================================

import { Request, Response, NextFunction } from "express";
import supabase from "@integrations/supabase/supabase.client";
import { AppError } from "./error.middleware";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new AppError("No token provided", 401, "UNAUTHORIZED"));
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return next(
        new AppError("Invalid or expired token", 401, "UNAUTHORIZED"),
      );
    }

    // @ts-ignore
    req.user = user;
    next();
  } catch (error) {
    next(new AppError("Authentication failed", 500, "AUTH_ERROR"));
  }
};
