import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import {
  businessIndustryFormTable,
  businessTable,
  InsertBusiness,
} from "@/db/schema/business";
import { profileTable } from "@/db/schema/user";
import { UpdateBusiness } from "../types/business";
import { businessReviewTable } from "@/db/schema/review";

export async function insertBusiness(business: InsertBusiness) {
  const res = await db
    .insert(businessTable)
    .values(business)
    .returning({ businessId: businessTable.id });

  return res[0].businessId;
}

export async function fetchBusinessById(businessId: string) {
  const rows = await db
    .select({
      id: businessTable.id,
      userId: profileTable.id,
      userName: profileTable.name,
      userProfileImage: profileTable.profileImage,
      adminId: businessTable.adminId,
      name: businessTable.name,
      logo: businessTable.logo,
      ownerName: businessTable.ownerName,
      description: businessTable.description,
      location: businessTable.location,
      website: businessTable.website,
      contact: businessTable.contact,
      industry: businessTable.industry,
      formId: businessIndustryFormTable.formId,
      formURL: businessIndustryFormTable.formURL,
      createdAt: businessTable.createdAt,
    })
    .from(businessTable)
    .innerJoin(profileTable, eq(businessTable.adminId, profileTable.id))
    .innerJoin(
      businessIndustryFormTable,
      eq(businessIndustryFormTable.industry, businessTable.industry)
    )
    .where(eq(businessTable.id, businessId));

  return rows[0];
}

export async function updateBusiness(
  businessId: string,
  business: UpdateBusiness
) {
  const res = await db
    .update(businessTable)
    .set(business)
    .where(eq(businessTable.id, businessId))
    .returning({ businessId: businessTable.id });

  return res[0].businessId;
}

export async function fetchAllBusiness(userId: string) {
  const rows = await db
    .select({
      id: businessTable.id,
      userId: profileTable.id,
      userName: profileTable.name,
      userProfileImage: profileTable.profileImage,
      adminId: businessTable.adminId,
      name: businessTable.name,
      logo: businessTable.logo,
      ownerName: businessTable.ownerName,
      description: businessTable.description,
      location: businessTable.location,
      website: businessTable.website,
      contact: businessTable.contact,
      industry: businessTable.industry,
      createdAt: businessTable.createdAt,
    })
    .from(businessTable)
    .innerJoin(profileTable, eq(businessTable.adminId, profileTable.id))
    .orderBy(desc(businessTable.createdAt));

  return rows;
}

export async function fetchBusinessReviews(businessId: string) {
  const rows = await db
    .select({
      id: businessReviewTable.id,
      userId: profileTable.id,
      userName: profileTable.name,
      userProfileImage: profileTable.profileImage,
      businessId: businessReviewTable.businessId,
      name: businessReviewTable.userName,
      text: businessReviewTable.text,
      rating: businessReviewTable.rating,
      json: businessReviewTable.json,
      createdAt: businessReviewTable.createdAt,
    })
    .from(businessReviewTable)
    .leftJoin(profileTable, eq(businessReviewTable.userId, profileTable.id))
    .where(eq(businessReviewTable.businessId, businessId))
    .orderBy(desc(businessReviewTable.createdAt));

  return rows;
}

export async function deleteBusinessReviewById(reviewId: string) {
  await db
    .delete(businessReviewTable)
    .where(eq(businessReviewTable.id, reviewId));

  return;
}
