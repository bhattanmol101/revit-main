import { InsertBusiness } from "@/db/schema/business";
import { BusinessRequest, UpdateBusiness } from "../types/business";
import {
  deleteBusinessReviewById,
  fetchAllBusiness,
  fetchBusinessById,
  fetchBusinessReviews,
  insertBusiness,
  updateBusiness,
} from "../repo/business";
import { DEFAULT_ERROR_MESSAGE } from "../utils/constants";

export async function saveBusiness(businessRequest: BusinessRequest) {
  try {
    const insertBusinessT: InsertBusiness = {
      adminId: businessRequest.adminId,
      name: businessRequest.name,
      ownerName: businessRequest.ownerName,
      description: businessRequest.description,
      logo: businessRequest.logo,
      location: businessRequest.location,
      contact: businessRequest.contact,
      website: businessRequest.website,
      industry: businessRequest.industry,
    };

    const id = await insertBusiness(insertBusinessT);

    return id;
  } catch (e: any) {
    return null;
  }
}

export async function getBusinessById(businessId: string) {
  try {
    const resp = await fetchBusinessById(businessId);

    return resp;
  } catch (e: any) {
    return null;
  }
}

export async function updateBusinessById(
  businessId: string,
  updateBusinessR: UpdateBusiness
) {
  try {
    await updateBusiness(businessId, updateBusinessR);

    return { success: true, error: "" };
  } catch (e: any) {
    return {
      success: false,
      error: e.message,
    };
  }
}

export async function getAllBusiness(userId: string) {
  try {
    const resp = await fetchAllBusiness(userId);

    return { success: true, forums: resp };
  } catch (e: any) {
    return {
      success: false,
      error: e.message,
    };
  }
}

export async function getBusinessReviews(businessId: string) {
  try {
    const reviews = await fetchBusinessReviews(businessId);

    return reviews;
  } catch (e: any) {
    return null;
  }
}

export async function removeBusinessReview(reviewId: string) {
  try {
    await deleteBusinessReviewById(reviewId);

    return;
  } catch (e: any) {
    return DEFAULT_ERROR_MESSAGE;
  }
}
