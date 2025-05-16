import { InsertForum } from "@/db/schema/forum";
import { InsertForumPost } from "@/db/schema/post";
import { ForumPostRequest, ForumRequest } from "../types/forum";
import {
  fetchAllPostByForumId,
  fetchForumById,
  fetchTopForums,
  fetchUserCreatedForums,
  insertForum,
  insertForumPost,
} from "../repo/forum";

export async function saveForum(forumRequest: ForumRequest) {
  try {
    const insertForumT: InsertForum = {
      adminId: forumRequest.adminId,
      name: forumRequest.name,
      description: forumRequest.description,
      logo: forumRequest.logo,
      industry: forumRequest.industry,
    };

    const id = await insertForum(insertForumT);

    return id;
  } catch (e: any) {
    return null;
  }
}

export async function getForumById(forumId: string) {
  try {
    const resp = await fetchForumById(forumId);

    return resp;
  } catch (e: any) {
    return null;
  }
}

export async function saveForumPost(forumPostRequest: ForumPostRequest) {
  try {
    const insertForumPostT: InsertForumPost = {
      userId: forumPostRequest.userId,
      forumId: forumPostRequest.forumId,
      text: forumPostRequest.text?.trim(),
      files: forumPostRequest.fileList,
      hashtags: forumPostRequest.hashtags,
    };

    await insertForumPost(insertForumPostT);

    return { success: true, error: "" };
  } catch (e: any) {
    return {
      success: false,
      error: e.message,
    };
  }
}

export async function getAllForumPost(
  forumId: string,
  offset: number,
  limit: number
) {
  try {
    const resp = await fetchAllPostByForumId(forumId);

    return { success: true, posts: resp };
  } catch (e: any) {
    return {
      success: false,
      error: e.message,
      posts: [],
    };
  }
}

export async function getTopForums(userId: string) {
  try {
    const resp = await fetchTopForums(userId);

    return resp;
  } catch (e: any) {
    return null;
  }
}

export async function getUserCreatedForums(userId: string) {
  try {
    const resp = await fetchUserCreatedForums(userId);

    return resp;
  } catch (e: any) {
    return null;
  }
}
