"use server";

import {
  getAllForumPost,
  getForumById,
  getTopForums,
  getUserCreatedForums,
  saveForum,
  saveForumPost,
} from "@/src/api/forum";
import { ForumPostRequest, ForumRequest } from "@/src/types/forum";
import { DEFAULT_ERROR_MESSAGE, POST_LIMIT } from "@/src/utils/constants";
import { uploadFile } from "@/src/utils/utils";
import { createClient } from "@/supabase/server";

export const saveForumAction = async (
  forumRequest: ForumRequest,
  logo?: Blob
) => {
  if (logo) {
    const supabase = await createClient();

    const fuResp = await uploadFile(supabase, logo);

    if (!fuResp.success) {
      return {
        success: false,
        error: fuResp.error,
      };
    }

    forumRequest.logo = fuResp.fileUrl;
  }

  const id = await saveForum(forumRequest);

  if (id) {
    return {
      success: true,
      id: id,
    };
  }

  return {
    success: false,
    error: DEFAULT_ERROR_MESSAGE,
    id: "",
  };
};

export const fetchForumByIdAction = async (forumId: string) => {
  const forum = await getForumById(forumId);

  if (!forum) {
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGE,
      forum: null,
    };
  }

  return {
    success: true,
    error: "",
    forum: forum,
  };
};

export const saveForumPostAction = async (
  forumPostRequest: ForumPostRequest,
  files: Blob[]
) => {
  const supabase = await createClient();

  const fileList: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const resp = await uploadFile(supabase, files[i]);

    if (resp.success) {
      fileList.push(resp.fileUrl);
    } else {
      return {
        success: false,
        error: {
          code: 103,
          message: resp.error,
        },
      };
    }
  }

  forumPostRequest.fileList = fileList;

  const resp = await saveForumPost(forumPostRequest);

  return {
    success: resp.success,
    error: {
      code: 102,
      message: resp.error,
    },
  };
};

export const getForumPostsAction = async (userId: string, page: number) => {
  let offset = page * POST_LIMIT;
  const resp = await getAllForumPost(userId, offset, POST_LIMIT);

  if (!resp.success) {
    throw undefined;
  }

  return resp.posts;
};

export const fetchTopForumsAction = async (userId: string) => {
  const forums = await getTopForums(userId);

  if (!forums) {
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGE,
    };
  }

  return { success: true, forums: forums };
};

export const fetchUserCreatedForumsAction = async (userId: string) => {
  const forums = await getUserCreatedForums(userId);

  if (!forums) {
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGE,
    };
  }

  return { success: true, forums: forums };
};
