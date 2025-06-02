"use server";

import { getPostById } from "@/src/api/post";
import { deletePostReview } from "@/src/api/review";
import { DEFAULT_ERROR_MESSAGE } from "@/src/utils/constants";

export const getPostByIdAction = async (postId: string, userId: string) => {
  const post = await getPostById(postId);

  if (!post) {
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGE,
    };
  }

  return { success: true, error: "", post: post };
};

export const deletePostReviewByIdAction = async (reviewId: string) => {
  const resp = await deletePostReview(reviewId);

  if (resp) {
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGE,
    };
  }

  return { success: true, error: "" };
};
