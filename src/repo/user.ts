import { eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { InsertProfile, profileTable } from "@/db/schema/user";
import { UpdateUser } from "../types/user";

export const checkUserExists = async (email: string) => {
  const user = await db.execute(
    sql`select au.id from auth.users au where au.email = ${email}`
  );

  return user.length != 0;
};

export async function fetchUserById(userId: string) {
  const rows = await db
    .select({
      id: profileTable.id,
      name: profileTable.name,
      email: profileTable.email,
      profileImage: profileTable.profileImage,
      dob: profileTable.dob,
      bio: profileTable.bio,
      createdAt: profileTable.createdAt,
    })
    .from(profileTable)
    .where(eq(profileTable.id, userId));

  return rows[0];
}

export async function insertUserProfile(user: InsertProfile) {
  // save the details in the profile table as well
  const res = await db
    .insert(profileTable)
    .values(user)
    .returning({ userId: profileTable.id });

  return res[0].userId;
}

export async function updateUserProfile(userId: string, user: UpdateUser) {
  const res = await db
    .update(profileTable)
    .set(user)
    .where(eq(profileTable.id, userId))
    .returning({ userId: profileTable.id });

  return res[0].userId;
}
