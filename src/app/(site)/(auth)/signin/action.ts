"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/supabase/server";
import { SignupUser } from "@/src/types/user";

export const signInAction = async ({ email, password }: SignupUser) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
    error: "",
  };
};

export const signInWithGoogleAction = async () => {
  const origin = (await headers()).get("origin");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url);
  }
};
