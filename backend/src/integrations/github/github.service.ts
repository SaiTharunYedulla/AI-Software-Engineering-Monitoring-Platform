// ============================================================================
// GitHub Service
// ============================================================================
// This file contains the business logic for interacting with the GitHub API,
// such as fetching repositories and managing webhooks.
// ============================================================================

import { getOctokit } from "./github.client";
import { AppError } from "@middleware/error.middleware";
import { env } from "@configs/env.config";

export const fetchUserRepositories = async (encryptedToken: string) => {
  const octokit = getOctokit(encryptedToken);
  try {
    const { data } = await octokit.repos.listForAuthenticatedUser();
    return data;
  } catch (error) {
    throw new AppError(
      "Failed to fetch user repositories",
      500,
      "GITHUB_API_ERROR",
    );
  }
};

export const createWebhook = async (
  encryptedToken: string,
  owner: string,
  repo: string,
  webhookUrl: string,
  secret: string,
) => {
  const octokit = getOctokit(encryptedToken);
  try {
    const { data } = await octokit.repos.createWebhook({
      owner,
      repo,
      config: {
        url: webhookUrl,
        content_type: "json",
        secret,
      },
      events: ["push", "pull_request"], // Add more events as needed
    });
    return data;
  } catch (error) {
    throw new AppError("Failed to create webhook", 500, "GITHUB_API_ERROR");
  }
};

export const deleteWebhook = async (
  encryptedToken: string,
  owner: string,
  repo: string,
  hook_id: number,
) => {
  const octokit = getOctokit(encryptedToken);
  try {
    await octokit.repos.deleteWebhook({
      owner,
      repo,
      hook_id,
    });
  } catch (error) {
    throw new AppError("Failed to delete webhook", 500, "GITHUB_API_ERROR");
  }
};

export const verifyRepositoryAccess = async (
  encryptedToken: string,
  repo_id: number,
) => {
  const octokit = getOctokit(encryptedToken);
  try {
    const { data: repo } = await octokit.repositories.getById({
      repository_id: repo_id,
    });
    // The fact that we can get the repo means we have access.
    // We could add more specific permission checks here if needed.
    return repo;
  } catch (error) {
    throw new AppError(
      "Repository not found or access denied",
      404,
      "GITHUB_API_ERROR",
    );
  }
};
