"use server";

import {
  deletePost,
  getAllPostByText,
  getTopPost,
  getUserFeedPosts,
  savePost,
} from "@/src/api/post";
import { addReviewToPost, getPostReviewsById } from "@/src/api/review";
import { PostRequest } from "@/src/types/post";
import { ReviewRequest } from "@/src/types/review";
import { DEFAULT_ERROR_MESSAGE, POST_LIMIT } from "@/src/utils/constants";
import { uploadFile } from "@/src/utils/utils";
import { createClient } from "@/supabase/server";

export const savePostAction = async (
  userId: string,
  text: string,
  files: Blob[]
) => {
  const supabase = await createClient();

  const fileList: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const resp = await uploadFile(supabase, files[i]);

    if (resp.success) {
      fileList.push(`${resp.fileUrl}?width=500&height=600`);
    } else {
      return {
        success: false,
        error: resp.error,
      };
    }
  }

  const postRequest: PostRequest = {
    userId: userId,
    text: text.trim(),
    fileList: fileList,
  };

  const err = await savePost(postRequest);

  if (err) {
    return {
      success: false,
      error: err,
    };
  }

  return {
    success: true,
    error: "",
  };
};

export const getUserFeedAction = async (userId: string, page: number) => {
  let offset = page * POST_LIMIT;
  const resp = await getUserFeedPosts(userId, offset, POST_LIMIT);

  if (!resp) {
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGE,
    };
  }

  return { success: true, posts: resp.posts };
};

export const addReviewToPostAction = async (
  postId: string,
  review: ReviewRequest
) => {
  const resp = await addReviewToPost(postId, review);

  if (!resp) {
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGE,
    };
  }

  return { success: true, error: "" };
};

export const getPostReviewsByIdAction = async (postId: string) => {
  const resp = await getPostReviewsById(postId, "");

  if (!resp) {
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGE,
    };
  }

  return {
    success: true,
    error: "",
    reviews: resp,
  };
};

export const deletePostAction = async (postId: string) => {
  const resp = await deletePost(postId);

  if (resp) {
    return {
      success: false,
      error: resp,
    };
  }

  return {
    success: true,
    error: "",
  };
};

export const getAllPostByTextAction = async (text: string) => {
  const resp = await getAllPostByText(text);

  return {
    success: resp.success,
    error: {
      code: 102,
      message: resp.error,
    },
    posts: resp.posts,
  };
};

export const getTopPostsAction = async (userId: string) => {
  const resp = await getTopPost(userId);

  if (!resp) {
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGE,
    };
  }

  return {
    success: true,
    error: "",
    post: resp,
  };
};
