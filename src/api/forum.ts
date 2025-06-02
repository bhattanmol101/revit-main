import { InsertForum, InsertForumUser } from "@/db/schema/forum";
import { InsertForumPost } from "@/db/schema/post";
import { ForumPostRequest, ForumRequest } from "../types/forum";
import {
  deleteForumById,
  deleteForumPostById,
  deleteForumPostReviewById,
  fetchForumById,
  fetchForumPostReviewsById,
  fetchForumsByText,
  fetchPostsByForumId,
  fetchTopForums,
  fetchUserCreatedForums,
  fetchUserJoinedForums,
  insertForum,
  insertForumPost,
  insertReviewForForumPost,
  inserUserToForumById,
} from "../repo/forum";
import { ReviewRequest } from "../types/review";
import { InsertForumReview } from "@/db/schema/review";

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
    const resp = await fetchPostsByForumId(forumId, offset, limit);

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

export async function getUserJoinedForums(userId: string) {
  try {
    const resp = await fetchUserJoinedForums(userId);

    return resp;
  } catch (e: any) {
    return null;
  }
}

export async function addUserToForum(userId: string, forumId: string) {
  try {
    const insertUserToForum: InsertForumUser = {
      userId: userId,
      forumId: forumId,
    };

    const resp = await inserUserToForumById(insertUserToForum);

    return resp;
  } catch (e: any) {
    return null;
  }
}

export async function deleteForumPost(postId: string) {
  try {
    await deleteForumPostById(postId);

    return;
  } catch (e: any) {
    return e.message;
  }
}

export async function getForumPostReviewsById(postId: string, userId: string) {
  try {
    const resp = await fetchForumPostReviewsById(postId);

    return resp;
  } catch (e: any) {
    return null;
  }
}

export async function addReviewToForumPost(
  postId: string,
  review: ReviewRequest
) {
  const insertReview: InsertForumReview = {
    postId: postId,
    userId: review.userId,
    rating: review.rating,
    text: review.text,
  };

  try {
    const id = await insertReviewForForumPost(insertReview);

    return id;
  } catch (e: any) {
    return null;
  }
}

export async function deleteForum(forumId: string) {
  try {
    await deleteForumById(forumId);

    return;
  } catch (e: any) {
    return e.message;
  }
}

export async function deleteForumPostReview(reviewId: string) {
  try {
    await deleteForumPostReviewById(reviewId);

    return;
  } catch (e: any) {
    return e.message;
  }
}

export async function searchForumByText(text: string) {
  try {
    const resp = await fetchForumsByText(text);

    return resp;
  } catch (e: any) {
    return null;
  }
}
