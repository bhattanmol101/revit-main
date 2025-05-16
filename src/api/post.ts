import { InsertPost } from "@/db/schema/post";
import {
  deletePostById,
  fetchAllPostByUserId,
  fetchAllPostsByText,
  fetchTopPost,
  fetchUserFeedPosts,
  insertPost,
} from "../repo/post";
import { Post, PostRequest } from "../types/post";
import { getRating } from "../utils/utils";

export async function getUserFeedPosts(
  userId: string,
  offset: number,
  limit: number
) {
  try {
    const resp = await fetchUserFeedPosts(userId, offset, limit);

    return { posts: resp.items };
  } catch (e: any) {
    return null;
  }
}

export async function getAllUserPost(userId: string) {
  try {
    const resp = await fetchAllPostByUserId(userId);

    return { success: true, posts: resp };
  } catch (e: any) {
    return {
      success: false,
      error: e.message,
      posts: [],
    };
  }
}

export async function savePost(postRequest: PostRequest) {
  try {
    const insertPostT: InsertPost = {
      userId: postRequest.userId,
      text: postRequest.text,
      files: postRequest.fileList,
      hashtags: postRequest.hashtags,
    };

    await insertPost(insertPostT);

    return "";
  } catch (e: any) {
    return e.message;
  }
}

export async function deletePost(postId: string) {
  try {
    await deletePostById(postId);

    return;
  } catch (e: any) {
    return e.message;
  }
}

export async function getAllPostByText(text: string) {
  try {
    const resp = await fetchAllPostsByText(text);

    return { success: true, posts: resp.items };
  } catch (e: any) {
    return {
      success: false,
      error: e.message,
      posts: [],
    };
  }
}

export async function getTopPost(userId: string) {
  try {
    const resp = await fetchTopPost(userId);

    let maxPost: Post | undefined;

    if (resp) {
      let maxRating = 0;

      resp.forEach((item) => {
        let currRating = getRating(item);

        if (maxRating < currRating) {
          maxRating = currRating;
          maxPost = item;
        }
      });
    }

    return maxPost;
  } catch (e: any) {
    return null;
  }
}
