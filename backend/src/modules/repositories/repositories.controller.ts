// ============================================================================
// Repositories Controller
// ============================================================================
// This file contains the controller functions for handling HTTP requests
// related to repositories.
// ============================================================================

import { Request, Response, NextFunction } from "express";
import * as repoService from "./repositories.service";
import { sendSuccess } from "@utils/response";
import supabase from "@integrations/supabase/supabase.client";

const getEncryptedToken = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("github_access_token")
    .eq("id", userId)
    .single();
  if (error || !data) throw new Error("User not found or token missing");
  return data.github_access_token;
};

export const searchRepositories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const encryptedToken = await getEncryptedToken(userId);
    const repos = await repoService.searchGitHubRepositories(encryptedToken);
    sendSuccess(res, repos, "Repositories found");
  } catch (error) {
    next(error);
  }
};

export const connectRepository = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const { projectId, ...repoDetails } = req.body;
    const encryptedToken = await getEncryptedToken(userId);
    const newRepo = await repoService.connectRepository(
      userId,
      projectId,
      repoDetails,
      encryptedToken,
    );
    sendSuccess(res, newRepo, "Repository connected", 201);
  } catch (error) {
    next(error);
  }
};

export const disconnectRepository = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const { id } = req.params;
    const encryptedToken = await getEncryptedToken(userId);
    await repoService.disconnectRepository(id, userId, encryptedToken);
    sendSuccess(res, null, "Repository disconnected");
  } catch (error) {
    next(error);
  }
};

export const getRepositorySettings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const { id } = req.params;
    const settings = await repoService.getRepositorySettings(id, userId);
    sendSuccess(res, settings, "Repository settings retrieved");
  } catch (error) {
    next(error);
  }
};
