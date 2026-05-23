// ============================================================================
// Authentication Controller
// ============================================================================
// This file contains the controller functions for handling authentication-
// related HTTP requests, such as sign-in, callback, and sign-out.
// ============================================================================

import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { sendSuccess } from "@utils/response";
import { env } from "@configs/env.config";

export const githubSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await authService.signInWithGitHub();
    res.redirect(data.url);
  } catch (error) {
    next(error);
  }
};

export const githubCallback = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { code } = req.query;
  if (!code || typeof code !== "string") {
    return res.status(400).send("Invalid authorization code");
  }

  try {
    const { session } = await authService.handleGitHubCallback(code);
    // Redirect to frontend with session token
    const redirectUrl = new URL(env.GITHUB_CALLBACK_URL);
    redirectUrl.searchParams.set("access_token", session.access_token);
    redirectUrl.searchParams.set("refresh_token", session.refresh_token);
    res.redirect(redirectUrl.toString());
  } catch (error) {
    next(error);
  }
};

export const getMe = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  sendSuccess(res, req.user, "User retrieved successfully");
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).send("No token provided");
  }

  try {
    await authService.signOut(token);
    sendSuccess(res, null, "Signed out successfully");
  } catch (error) {
    next(error);
  }
};
