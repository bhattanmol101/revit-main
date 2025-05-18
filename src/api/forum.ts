import { InsertForum } from "@/db/schema/forum";
import { InsertForumPost } from "@/db/schema/post";
import { ForumPostRequest, ForumRequest } from "../types/forum";
import {
  fetchForumById,
  fetchPostsByForumId,
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

export async function getForumById(userId: string, forumId: string) {
  try {
    const resp = await fetchForumById(userId, forumId);

    return resp;
  } catch (e: any) {
    console.log(e);
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

    const id = await insertForumPost(insertForumPostT);

    return id;
  } catch (e: any) {
    return null;
  }
}

export async function getForumPosts(
  forumId: string,
  offset: number,
  limit: number
) {
  try {
    const resp = await fetchPostsByForumId(forumId);

    return resp;
  } catch (e: any) {
    return null;
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
