// ============================================================================
// Projects Repository
// ============================================================================
// This file contains the data access logic for the projects module,
// handling all database interactions related to projects.
// ============================================================================

import supabase from "@integrations/supabase/supabase.client";
import { Project } from "@types/project.types";
import { PaginationParams, SortParams } from "@types/common.types";

export const createProject = async (
  project: Omit<Project, "id" | "created_at" | "updated_at">,
): Promise<Project> => {
  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const findProjectsByUserId = async (
  userId: string,
  pagination: PaginationParams,
  sort: SortParams<Project>,
) => {
  const { page = 1, limit = 10 } = pagination;
  const { sortBy = "created_at", sortOrder = "desc" } = sort;

  const { data, error, count } = await supabase
    .from("projects")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .order(sortBy, { ascending: sortOrder === "asc" })
    .range((page - 1) * limit, page * limit - 1);

  if (error) throw error;
  return { items: data, total: count || 0 };
};

export const findProjectById = async (id: string): Promise<Project | null> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();
  if (error && error.code !== "PGRST116") throw error;
  return data;
};

export const updateProject = async (
  id: string,
  updates: Partial<Project>,
): Promise<Project> => {
  const { data, error } = await supabase
    .from("projects")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteProject = async (id: string): Promise<void> => {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
};
