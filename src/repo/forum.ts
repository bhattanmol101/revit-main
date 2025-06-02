import { and, desc, eq, ilike, inArray, or, sql } from "drizzle-orm";

import { db } from "@/db";
import {
  forumTable,
  forumUserTable,
  InsertForum,
  InsertForumUser,
} from "@/db/schema/forum";
import { profileTable } from "@/db/schema/user";
import { forumPostTable, InsertForumPost } from "@/db/schema/post";
import { forumReviewTable, InsertForumReview } from "@/db/schema/review";

export async function insertForum(forum: InsertForum) {
  const res = await db
    .insert(forumTable)
    .values(forum)
    .returning({ forumId: forumTable.id });

  return res[0].forumId;
}

export async function fetchForumById(userId: string, forumId: string) {
  const rows = await db
    .select({
      id: forumTable.id,
      userName: profileTable.name, // rename to admin TODO
      userProfileImage: profileTable.profileImage,
      adminId: forumTable.adminId,
      name: forumTable.name,
      logo: forumTable.logo,
      description: forumTable.description,
      industry: forumTable.industry,
      createdAt: forumTable.createdAt,
      joined: db.$count(
        forumUserTable,
        and(
          eq(forumUserTable.forumId, forumId),
          eq(forumUserTable.userId, userId)
        )
      ),
    })
    .from(forumTable)
    .innerJoin(profileTable, eq(forumTable.adminId, profileTable.id))
    .where(eq(forumTable.id, forumId));

  return rows[0];
}

export async function insertForumPost(forumPost: InsertForumPost) {
  const res = await db
    .insert(forumPostTable)
    .values(forumPost)
    .returning({ postId: forumPostTable.id });

  return res[0].postId;
}

export async function fetchPostsByForumId(
  forumId: string,
  offset: number,
  limit: number
) {
  const rows = await db
    .select({
      id: forumPostTable.id,
      userId: forumPostTable.userId,
      forumId: forumPostTable.forumId,
      userName: profileTable.name,
      userProfileImage: profileTable.profileImage,
      text: forumPostTable.text,
      fileList: forumPostTable.files,
      rating: sql<number>`sum(${forumReviewTable.rating})`,
      totalReviews: sql<number>`count(${forumReviewTable.id})`,
      hashtags: forumPostTable.hashtags,
      createdAt: forumPostTable.createdAt,
    })
    .from(forumPostTable)
    .leftJoin(forumReviewTable, eq(forumPostTable.id, forumReviewTable.postId))
    .innerJoin(profileTable, eq(forumPostTable.userId, profileTable.id))
    .where(eq(forumPostTable.forumId, forumId))
    .groupBy(forumPostTable.id, profileTable.id)
    .orderBy(desc(forumPostTable.createdAt))
    .offset(offset)
    .limit(limit);

  return rows;
}

export async function fetchTopForums(userId: string) {
  const topForums = db
    .select({
      id: forumUserTable.forumId,
    })
    .from(forumUserTable)
    .groupBy(forumUserTable.forumId)
    .orderBy(desc(sql`count(${forumUserTable.userId})`))
    .limit(3)
    .as("top_forums");

  const rows = await db
    .select({
      id: forumTable.id,
      userName: profileTable.name,
      userProfileImage: profileTable.profileImage,
      adminId: forumTable.adminId,
      name: forumTable.name,
      logo: forumTable.logo,
      description: forumTable.description,
      industry: forumTable.industry,
      createdAt: forumTable.createdAt,
    })
    .from(forumTable)
    .innerJoin(profileTable, eq(forumTable.adminId, profileTable.id))
    .innerJoin(topForums, eq(forumTable.id, topForums.id))
    .orderBy(desc(forumTable.createdAt));

  return rows;
}

export async function fetchUserCreatedForums(userId: string) {
  const rows = await db
    .select({
      id: forumTable.id,
      userName: profileTable.name,
      userProfileImage: profileTable.profileImage,
      adminId: forumTable.adminId,
      name: forumTable.name,
      logo: forumTable.logo,
      description: forumTable.description,
      industry: forumTable.industry,
      createdAt: forumTable.createdAt,
    })
    .from(forumTable)
    .innerJoin(profileTable, eq(forumTable.adminId, profileTable.id))
    .where(eq(forumTable.adminId, userId))
    .orderBy(desc(forumTable.createdAt));

  return rows;
}

export async function fetchUserJoinedForums(userId: string) {
  const rows = await db
    .select({
      id: forumTable.id,
      userName: profileTable.name,
      userProfileImage: profileTable.profileImage,
      adminId: forumTable.adminId,
      name: forumTable.name,
      logo: forumTable.logo,
      description: forumTable.description,
      industry: forumTable.industry,
      createdAt: forumTable.createdAt,
    })
    .from(forumTable)
    .innerJoin(profileTable, eq(forumTable.adminId, profileTable.id))
    .innerJoin(forumUserTable, eq(forumTable.id, forumUserTable.forumId))
    .where(eq(forumUserTable.userId, userId))
    .orderBy(desc(forumTable.createdAt));

  return rows;
}

export async function inserUserToForumById(forumUser: InsertForumUser) {
  const rows = await db
    .insert(forumUserTable)
    .values(forumUser)
    .returning({ forumUserId: forumTable.id });

  return rows[0].forumUserId;
}

export async function deleteForumPostById(postId: string) {
  await db.transaction(async (tx) => {
    await tx.delete(forumPostTable).where(eq(forumPostTable.id, postId));

    await tx
      .delete(forumReviewTable)
      .where(eq(forumReviewTable.postId, postId));
  });

  return;
}

export async function fetchForumPostReviewsById(postId: string) {
  const rows = await db
    .select({
      id: forumReviewTable.id,
      userId: profileTable.id,
      userName: profileTable.name,
      userProfileImage: profileTable.profileImage,
      text: forumReviewTable.text,
      rating: forumReviewTable.rating,
      createdAt: forumReviewTable.createdAt,
    })
    .from(forumReviewTable)
    .innerJoin(profileTable, eq(forumReviewTable.userId, profileTable.id))
    .where(eq(forumReviewTable.postId, postId))
    .orderBy(desc(forumReviewTable.createdAt));

  return rows;
}

export async function insertReviewForForumPost(review: InsertForumReview) {
  const res = await db
    .insert(forumReviewTable)
    .values(review)
    .returning({ reviewId: forumReviewTable.id });

  return res[0].reviewId;
}

export async function deleteForumPostReviewById(reviewId: string) {
  await db.delete(forumReviewTable).where(eq(forumReviewTable.id, reviewId));

  return;
}

export async function deleteForumById(forumId: string) {
  await db.transaction(async (tx) => {
    await tx.delete(forumTable).where(eq(forumTable.id, forumId));

    await tx.delete(forumPostTable).where(eq(forumPostTable.forumId, forumId));
  });

  return;
}

export async function fetchForumsByText(text: string) {
  const rows = await db
    .select({
      id: forumTable.id,
      adminId: forumTable.adminId,
      name: forumTable.name,
      logo: forumTable.logo,
      description: forumTable.description,
      createdAt: forumTable.createdAt,
    })
    .from(forumTable)
    .where(
      or(
        ilike(forumTable.name, `%${text}%`),
        ilike(forumTable.description, `%${text}%`)
      )
    )
    .orderBy(desc(forumTable.createdAt))
    .limit(5);

  return rows;
}
