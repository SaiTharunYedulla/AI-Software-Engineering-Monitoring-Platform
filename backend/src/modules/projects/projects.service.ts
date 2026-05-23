// ============================================================================
// Projects Service
// ============================================================================
// This file contains the business logic for the projects module, handling
// operations such as creation, retrieval, updating, and deletion of projects.
// ============================================================================

import * as projectRepo from "./projects.repository";
import { Project } from "@types/project.types";
import { PaginationParams, SortParams } from "@types/common.types";
import { AppError } from "@middleware/error.middleware";

export const createProject = async (
  userId: string,
  name: string,
  description?: string,
): Promise<Project> => {
  return projectRepo.createProject({ user_id: userId, name, description });
};

export const getProjects = async (
  userId: string,
  pagination: PaginationParams,
  sort: SortParams<Project>,
) => {
  return projectRepo.findProjectsByUserId(userId, pagination, sort);
};

export const getProjectById = async (
  id: string,
  userId: string,
): Promise<Project> => {
  const project = await projectRepo.findProjectById(id);
  if (!project) {
    throw new AppError("Project not found", 404, "NOT_FOUND");
  }
  if (project.user_id !== userId) {
    throw new AppError(
      "You are not authorized to access this project",
      403,
      "FORBIDDEN",
    );
  }
  return project;
};

export const updateProject = async (
  id: string,
  userId: string,
  updates: Partial<Project>,
): Promise<Project> => {
  await getProjectById(id, userId); // Authorization check
  return projectRepo.updateProject(id, updates);
};

export const deleteProject = async (
  id: string,
  userId: string,
): Promise<void> => {
  await getProjectById(id, userId); // Authorization check
  await projectRepo.deleteProject(id);
};
