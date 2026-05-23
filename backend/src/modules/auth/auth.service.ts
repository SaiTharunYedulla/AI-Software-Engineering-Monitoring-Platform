// ============================================================================
// Authentication Service
// ============================================================================
// This file contains the business logic for authentication, including GitHub
// OAuth flow, user management, and session handling.
// ============================================================================

import supabase from "@integrations/supabase/supabase.client";
import { encrypt } from "@utils/encryption";
import { AppError } from "@middleware/error.middleware";
import { User } from "@types/user.types";

export const signInWithGitHub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  if (error) {
    throw new AppError("GitHub sign-in failed", 500, "GITHUB_AUTH_ERROR");
  }

  return data;
};

export const handleGitHubCallback = async (code: string) => {
  const {
    data: { session },
    error,
  } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !session) {
    throw new AppError(
      "Failed to exchange code for session",
      400,
      "GITHUB_AUTH_ERROR",
    );
  }

  const { user: authUser, access_token } = session;

  if (!authUser || !access_token) {
    throw new AppError(
      "User or access token not found in session",
      400,
      "GITHUB_AUTH_ERROR",
    );
  }

  const { data: existingUser, error: findError } = await supabase
    .from("users")
    .select("*")
    .eq("github_id", authUser.user_metadata.provider_id)
    .single();

  if (findError && findError.code !== "PGRST116") {
    // PGRST116: single row not found
    throw new AppError("Failed to query user", 500, "DATABASE_ERROR");
  }

  const encryptedToken = encrypt(access_token);

  if (existingUser) {
    const { data: updatedUser, error: updateError } = await supabase
      .from("users")
      .update({
        github_access_token: encryptedToken,
        username: authUser.user_metadata.user_name,
        avatar_url: authUser.user_metadata.avatar_url,
        email: authUser.email,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingUser.id)
      .select()
      .single();

    if (updateError) {
      throw new AppError("Failed to update user", 500, "DATABASE_ERROR");
    }
    return { user: updatedUser as User, session };
  } else {
    const { data: newUser, error: createError } = await supabase
      .from("users")
      .insert({
        github_id: authUser.user_metadata.provider_id,
        username: authUser.user_metadata.user_name,
        avatar_url: authUser.user_metadata.avatar_url,
        email: authUser.email,
        github_access_token: encryptedToken,
      })
      .select()
      .single();

    if (createError) {
      throw new AppError("Failed to create user", 500, "DATABASE_ERROR");
    }
    return { user: newUser as User, session };
  }
};

export const signOut = async (token: string) => {
  const { error } = await supabase.auth.signOut(token);
  if (error) {
    throw new AppError("Sign-out failed", 500, "AUTH_ERROR");
  }
};
