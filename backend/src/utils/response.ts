// ============================================================================
// API Response Utility
// ============================================================================
// This file provides helper functions for creating standardized API responses,
// ensuring consistency across all endpoints.
// ============================================================================

import { Response } from "express";
import { ApiResponse } from "@types/common.types";

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = "Success",
  statusCode: number = 200,
) => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string = "An error occurred",
  statusCode: number = 500,
  code: string = "INTERNAL_SERVER_ERROR",
  details?: any,
) => {
  const response: ApiResponse<null> = {
    success: false,
    message,
    data: null,
    error: {
      code,
      details,
    },
  };
  res.status(statusCode).json(response);
};
