"use server";

import { fetchUserById } from "@/src/repo/user";
import { createClient } from "@/supabase/server";

export const fetchUserAction = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) return null;

  if (!user) return null;

  const profile = await fetchUserById(user.id);

  if (!profile) return null;

  return {
    id: profile.id,
    email: profile.email,
    name: profile.name,
    profileImage: profile.profileImage,
    createdAt: profile.createdAt,
  };
};
