import { InsertPost } from "@/db/schema/post";
import {
  deletePostById,
  fetchPostById,
  fetchPostsByText,
  fetchPostsByUserId,
  fetchTopPost,
  fetchUserFeedPosts,
  insertPost,
} from "../repo/post";
import { PostRequest } from "../types/post";

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

export async function getUserPosts(userId: string) {
  try {
    const resp = await fetchPostsByUserId(userId);

    return resp;
  } catch (e: any) {
    return null;
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

export async function searchPostByText(text: string) {
  try {
    const resp = await fetchPostsByText(text);

    return resp;
  } catch (e: any) {
    return null;
  }
}

export async function getTopPost(userId: string) {
  try {
    const posts = await fetchTopPost(userId);

    posts.sort((a, b) => b.rating / b.totalReviews - a.rating / a.totalReviews);

    return posts;
  } catch (e: any) {
    console.log(e);
    return null;
  }
}

export async function getPostById(postId: string) {
  try {
    const post = await fetchPostById(postId);

    return post;
  } catch (e: any) {
    console.log(e);

    return null;
  }
}
