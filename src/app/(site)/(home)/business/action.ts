"use server";

import {
  getAllBusiness,
  getBusinessById,
  getBusinessReviews,
  removeBusinessReview,
  saveBusiness,
  updateBusinessById,
} from "@/src/api/business";
import { addReviewToBusiness } from "@/src/api/review";
import { BusinessRequest, UpdateBusiness } from "@/src/types/business";
import { BusinessReviewRequest } from "@/src/types/review";
import { DEFAULT_ERROR_MESSAGE } from "@/src/utils/constants";
import { uploadFile } from "@/src/utils/utils";
import { createClient } from "@/supabase/server";

export const saveBusinessAction = async (
  businessRequest: BusinessRequest,
  logo?: Blob
) => {
  if (logo) {
    const supabase = await createClient();

    const furesp = await uploadFile(supabase, logo);

    if (!furesp.success) {
      return {
        success: false,
        error: furesp.error,
      };
    }

    businessRequest.logo = furesp.fileUrl;
  }

  const id = await saveBusiness(businessRequest);

  if (!id) {
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGE,
    };
  }

  return {
    success: true,
    error: "",
    id: id,
  };
};

export const fetchBusinessByIdAction = async (businessId: string) => {
  const business = await getBusinessById(businessId);

  if (!business) {
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGE,
    };
  }

  return {
    success: true,
    error: "",
    business: business,
  };
};

export const updateBusinessAction = async (
  businessId: string,
  updateBusinessR: UpdateBusiness,
  logo?: Blob
) => {
  if (logo) {
    const supabase = await createClient();

    const furesp = await uploadFile(supabase, logo);

    if (!furesp.success) {
      return {
        success: false,
        error: {
          code: 103,
          message: furesp.error,
        },
      };
    }

    updateBusinessR.logo = furesp.fileUrl;
  }

  const resp = await updateBusinessById(businessId, updateBusinessR);

  return {
    success: resp.success,
    error: {
      code: 102,
      message: resp.error,
    },
  };
};

export const fetchAllBusinessAction = async (userId: string) => {
  const resp = await getAllBusiness(userId);

  console.log(resp);

  if (!resp.success) {
    return undefined;
  }

  return resp.forums;
};

export const saveReviewForBusinessAction = async (
  businessId: string,
  businessReviewRequest: BusinessReviewRequest
) => {
  const id = await addReviewToBusiness(businessId, businessReviewRequest);

  if (!id) {
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGE,
    };
  }

  return {
    success: true,
    error: "",
  };
};

export const fetchBusinessReviewsAction = async (userId: string) => {
  const reviews = await getBusinessReviews(userId);

  if (!reviews) {
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGE,
    };
  }

  return {
    success: true,
    error: "",
    reviews: reviews,
  };
};

export const removeBusinessReviewAction = async (reviewId: string) => {
  const resp = await removeBusinessReview(reviewId);

  if (resp) {
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGE,
    };
  }

  return {
    success: true,
    error: "",
  };
};
