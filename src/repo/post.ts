import { desc, eq, ilike, sql } from "drizzle-orm";

import { db } from "@/db";
import { InsertPost, postTable } from "@/db/schema/post";
import { reviewTable } from "@/db/schema/review";
import { profileTable } from "@/db/schema/user";

export async function insertPost(post: InsertPost) {
  const res = await db
    .insert(postTable)
    .values(post)
    .returning({ postId: postTable.id });

  return res[0].postId;
}

export async function fetchPostById(postId: string) {
  const rows = await db
    .select({
      id: postTable.id,
      userId: profileTable.id,
      userName: profileTable.name,
      userProfileImage: profileTable.profileImage,
      text: postTable.text,
      fileList: postTable.files,
      rating: sql<number>`sum(${reviewTable.rating})`,
      totalReviews: sql<number>`count(${reviewTable.id})`,
      hashtags: postTable.hashtags,
      createdAt: postTable.createdAt,
    })
    .from(postTable)
    .innerJoin(profileTable, eq(postTable.userId, profileTable.id))
    .leftJoin(reviewTable, eq(reviewTable.postId, postTable.id))
    .groupBy(postTable.id, profileTable.id)
    .where(eq(postTable.id, postId));

  return rows[0];
}

export async function deletePostById(postId: string) {
  await db.transaction(async (tx) => {
    await tx.delete(postTable).where(eq(postTable.id, postId));

    await tx.delete(reviewTable).where(eq(reviewTable.postId, postId));
  });

  return;
}

export async function fetchPostsByUserId(userId: string) {
  const rows = await db
    .select({
      id: postTable.id,
      userId: postTable.userId,
      userName: profileTable.name,
      userProfileImage: profileTable.profileImage,
      text: postTable.text,
      fileList: postTable.files,
      rating: sql<number>`sum(${reviewTable.rating})`,
      totalReviews: sql<number>`count(${reviewTable.id})`,
      hashtags: postTable.hashtags,
      createdAt: postTable.createdAt,
    })
    .from(postTable)
    .leftJoin(reviewTable, eq(postTable.id, reviewTable.postId))
    .innerJoin(profileTable, eq(postTable.userId, profileTable.id))
    .where(eq(postTable.userId, userId))
    .groupBy(postTable.id, profileTable.id)
    .orderBy(desc(postTable.createdAt));

  return rows;
}

export async function fetchUserFeedPosts(
  userId: string,
  offset: number,
  limit: number
) {
  const rows = await db
    .select({
      id: postTable.id,
      userId: profileTable.id,
      userName: profileTable.name,
      userProfileImage: profileTable.profileImage,
      text: postTable.text,
      fileList: postTable.files,
      rating: sql<number>`sum(${reviewTable.rating})`,
      totalReviews: sql<number>`count(${reviewTable.id})`,
      hashtags: postTable.hashtags,
      createdAt: postTable.createdAt,
    })
    .from(postTable)
    .innerJoin(profileTable, eq(postTable.userId, profileTable.id))
    .leftJoin(reviewTable, eq(reviewTable.postId, postTable.id))
    .groupBy(postTable.id, profileTable.id)
    .orderBy(desc(postTable.createdAt))
    .offset(offset)
    .limit(limit);

  return {
    items: rows,
  };
}

export async function fetchPostsByText(text: string) {
  const rows = await db
    .select({
      id: postTable.id,
      userId: profileTable.id,
      userName: profileTable.name,
      userProfileImage: profileTable.profileImage,
      text: postTable.text,
      createdAt: postTable.createdAt,
    })
    .from(postTable)
    .innerJoin(profileTable, eq(postTable.userId, profileTable.id))
    .leftJoin(reviewTable, eq(reviewTable.postId, postTable.id))
    .where(ilike(postTable.text, `%${text}%`))
    .groupBy(postTable.id, profileTable.id)
    .orderBy(desc(postTable.createdAt))
    .limit(5);

  return rows;
}

export async function fetchTopPost(userId: string) {
  /* 
  TODO: This should happend when there are posts regularly
   const fromDate = new Date();
   const toDate = fromDate;
   fromDate.setDate(fromDate.getDate() - 7);
  */

  const topPosts = db
    .select({
      id: reviewTable.postId,
      rating: sql<number>`sum(${reviewTable.rating})`.as("rating"),
      totalReviews: sql<number>`count(${reviewTable.id})`.as("totalReviews"),
    })
    .from(reviewTable)
    // .where(between(reviewTable.createdAt, fromDate, toDate))
    .groupBy(reviewTable.postId)
    .orderBy(desc(sql`count(${reviewTable.id})`))
    .limit(3)
    .as("top_posts");

  const rows = await db
    .select({
      id: postTable.id,
      userId: profileTable.id,
      userName: profileTable.name,
      userProfileImage: profileTable.profileImage,
      text: postTable.text,
      fileList: postTable.files,
      rating: topPosts.rating,
      totalReviews: topPosts.totalReviews,
      hashtags: postTable.hashtags,
      createdAt: postTable.createdAt,
    })
    .from(postTable)
    .innerJoin(profileTable, eq(postTable.userId, profileTable.id))
    .innerJoin(topPosts, eq(topPosts.id, postTable.id))
    .orderBy(desc(postTable.createdAt));

  return rows;
}
