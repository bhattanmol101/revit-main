"use server";

import { searchBusinessByText } from "@/src/api/business";
import { searchForumByText } from "@/src/api/forum";
import { searchPostByText } from "@/src/api/post";
import { DEFAULT_ERROR_MESSAGE } from "@/src/utils/constants";

export const searchPostByTextAction = async (text: string) => {
  const posts = await searchPostByText(text);

  if (!posts) {
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGE,
    };
  }

  return {
    success: true,
    error: "",
    posts,
  };
};

export const searchForumByTextAction = async (text: string) => {
  const forums = await searchForumByText(text);

  if (!forums) {
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGE,
    };
  }

  return {
    success: true,
    error: "",
    forums,
  };
};

export const searchBusinessByTextAction = async (text: string) => {
  const businesses = await searchBusinessByText(text);

  if (!businesses) {
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGE,
    };
  }

  return {
    success: true,
    error: "",
    businesses,
  };
};
