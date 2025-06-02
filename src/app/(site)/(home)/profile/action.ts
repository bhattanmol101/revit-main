"use server";

import { getUserPosts } from "@/src/api/post";
import { getUserById, updateUser } from "@/src/api/user";
import { UpdateUser } from "@/src/types/user";
import { DEFAULT_ERROR_MESSAGE } from "@/src/utils/constants";
import { uploadFile } from "@/src/utils/utils";
import { createClient } from "@/supabase/server";

export const fetchUserProfileAction = async (userId: string) => {
  const profile = await getUserById(userId);

  if (!profile)
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGE,
    };

  return {
    success: true,
    error: "",
    profile: profile,
  };
};

export const updateUserAction = async (
  userId: string,
  user: UpdateUser,
  file: Blob | undefined
) => {
  const supabase = await createClient();

  if (file) {
    const resp = await uploadFile(supabase, file);

    if (resp.success) {
      user.profileImage = resp.fileUrl;
    } else {
      return {
        success: false,
        error: resp.error,
      };
    }
  }

  const id = await updateUser(userId, user);

  if (!id) {
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGE,
    };
  }

  return {
    success: true,
    error: "",
  };
};

export const logoutUserAction = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  } else {
    return {
      success: true,
      error: "",
    };
  }
};

export const getUserPostsAction = async (userId: string) => {
  const posts = await getUserPosts(userId);

  if (!posts) {
    return { success: false, error: DEFAULT_ERROR_MESSAGE };
  }

  return { success: true, error: "", posts };
};
