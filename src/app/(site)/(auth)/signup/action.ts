"use server";

import { createClient } from "@/supabase/server";
import { SignupUser, User } from "@/src/types/user";
import { checkUserExists } from "@/src/repo/user";
import { saveUserProfile } from "@/src/api/user";

export const signUpAction = async (signupUser: SignupUser) => {
  const { name, email, password } = signupUser;

  const isUser = await checkUserExists(email);

  // Check if user already exists.
  if (isUser) {
    return {
      success: false,
      error: "An account is already associated with this email.",
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: process.env.AUTH_EMAIL_REDIRECT,
      data: {
        name,
      },
    },
  });
  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  // If user signed up successfully then add to profile as well.
  if (data.user) {
    const user: User = {
      id: data.user.id,
      email: data.user.user_metadata.email,
      name: name,
      createdAt: new Date(data.user.created_at),
    };

    const err = await saveUserProfile(user);

    if (err) {
      return {
        success: false,
        error: err.message,
      };
    }

    return {
      success: true,
      error: "",
    };
  }

  return {
    success: false,
    error: "Something went wrong, Please try again!",
  };
};
