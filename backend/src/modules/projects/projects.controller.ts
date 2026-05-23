// ============================================================================
// Projects Controller
// ============================================================================
// This file contains the controller functions for handling HTTP requests
// related to projects.
// ============================================================================

import { Request, Response, NextFunction } from "express";
import * as projectService from "./projects.service";
import { sendSuccess } from "@utils/response";

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const { name, description } = req.body;
    const project = await projectService.createProject(
      userId,
      name,
      description,
    );
    sendSuccess(res, project, "Project created successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const projects = await projectService.getProjects(
      userId,
      req.query,
      req.query,
    );
    sendSuccess(res, projects, "Projects retrieved successfully");
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const { id } = req.params;
    const project = await projectService.getProjectById(id, userId);
    sendSuccess(res, project, "Project retrieved successfully");
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const { id } = req.params;
    const project = await projectService.updateProject(id, userId, req.body);
    sendSuccess(res, project, "Project updated successfully");
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const { id } = req.params;
    await projectService.deleteProject(id, userId);
    sendSuccess(res, null, "Project deleted successfully");
  } catch (error) {
    next(error);
  }
};
