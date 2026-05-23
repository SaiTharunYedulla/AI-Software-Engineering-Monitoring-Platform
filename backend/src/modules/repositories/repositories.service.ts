// ============================================================================
// Repositories Service
// ============================================================================
// This file contains the business logic for the repositories module, handling
// operations such as searching, connecting, and disconnecting repositories.
// ============================================================================

import * as repoRepo from "./repositories.repository";
import * as githubService from "@integrations/github/github.service";
import { AppError } from "@middleware/error.middleware";
import { encrypt } from "@utils/encryption";
import { env } from "@configs/env.config";
import crypto from "crypto";

export const searchGitHubRepositories = async (encryptedToken: string) => {
  return githubService.fetchUserRepositories(encryptedToken);
};

export const connectRepository = async (
  userId: string,
  projectId: string,
  repoDetails: {
    github_repo_id: number;
    name: string;
    full_name: string;
    private: boolean;
    owner_login: string;
  },
  encryptedToken: string,
) => {
  const exists = await repoRepo.checkRepositoryExists(
    projectId,
    repoDetails.github_repo_id,
  );
  if (exists) {
    throw new AppError(
      "Repository is already connected to this project",
      409,
      "CONFLICT",
    );
  }

  await githubService.verifyRepositoryAccess(
    encryptedToken,
    repoDetails.github_repo_id,
  );

  const webhookSecret = crypto.randomBytes(32).toString("hex");
  const webhookUrl = `${env.API_URL}/webhooks/github`;

  const webhook = await githubService.createWebhook(
    encryptedToken,
    repoDetails.owner_login,
    repoDetails.name,
    webhookUrl,
    webhookSecret,
  );

  const newRepo = await repoRepo.createRepository({
    project_id: projectId,
    ...repoDetails,
    webhook_id: webhook.id,
    webhook_secret: encrypt(webhookSecret),
  });

  return newRepo;
};

export const disconnectRepository = async (
  repoId: string,
  userId: string,
  encryptedToken: string,
) => {
  const repo = await repoRepo.findRepositoryById(repoId);
  if (!repo) {
    throw new AppError("Repository not found", 404, "NOT_FOUND");
  }
  // TODO: Add project ownership check to ensure user can disconnect

  if (repo.webhook_id) {
    await githubService.deleteWebhook(
      encryptedToken,
      repo.owner_login,
      repo.name,
      repo.webhook_id,
    );
  }

  await repoRepo.deleteRepository(repoId);
};

export const getRepositorySettings = async (repoId: string, userId: string) => {
  const repo = await repoRepo.findRepositoryById(repoId);
  if (!repo) {
    throw new AppError("Repository not found", 404, "NOT_FOUND");
  }
  // TODO: Add project ownership check
  return repo;
};
