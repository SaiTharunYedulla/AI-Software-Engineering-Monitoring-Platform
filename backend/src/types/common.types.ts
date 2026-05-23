// ============================================================================
// Common Type Definitions
// ============================================================================
// This file contains common and shared TypeScript types and interfaces used
// across the backend application, such as pagination, sorting, and API
// response structures.
// ============================================================================

/**
 * Represents a paginated list of items.
 * @template T The type of items in the list.
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Defines query parameters for pagination.
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Defines sorting order.
 */
export type SortOrder = "asc" | "desc";

/**
 * Defines query parameters for sorting.
 * @template T The type of the object to sort by.
 */
export interface SortParams<T> {
  sortBy?: keyof T;
  sortOrder?: SortOrder;
}

/**
 * Defines a standardized API response structure.
 * @template T The type of the data payload.
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  error?: {
    code: string;
    details?: any;
  };
}
