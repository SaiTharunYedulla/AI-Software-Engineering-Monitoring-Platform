// ============================================================================
// Repositories Repository
// ============================================================================
// This file contains the data access logic for the repositories module,
// handling all database interactions related to repositories.
// ============================================================================

import supabase from "@integrations/supabase/supabase.client";
import { Repository } from "@types/repository.types";

export const createRepository = async (
  repo: Omit<Repository, "id" | "created_at" | "updated_at">,
): Promise<Repository> => {
  const { data, error } = await supabase
    .from("repositories")
    .insert(repo)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const findRepositoriesByProjectId = async (
  projectId: string,
): Promise<Repository[]> => {
  const { data, error } = await supabase
    .from("repositories")
    .select("*")
    .eq("project_id", projectId);
  if (error) throw error;
  return data;
};

export const findRepositoryById = async (
  id: string,
): Promise<Repository | null> => {
  const { data, error } = await supabase
    .from("repositories")
    .select("*")
    .eq("id", id)
    .single();
  if (error && error.code !== "PGRST116") throw error;
  return data;
};

export const deleteRepository = async (id: string): Promise<void> => {
  const { error } = await supabase.from("repositories").delete().eq("id", id);
  if (error) throw error;
};

export const checkRepositoryExists = async (
  projectId: string,
  githubRepoId: number,
): Promise<boolean> => {
  const { data, error } = await supabase
    .from("repositories")
    .select("id")
    .eq("project_id", projectId)
    .eq("github_repo_id", githubRepoId)
    .single();
  if (error && error.code !== "PGRST116") throw error;
  return !!data;
};
