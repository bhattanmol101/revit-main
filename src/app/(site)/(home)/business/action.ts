"use server";

import {
  getBusinessById,
  getBusinessReviews,
  getUserBusinesses,
  removeBusinessReview,
  saveBusiness,
  updateBusinessById,
} from "@/src/api/business";
import { addReviewToBusiness } from "@/src/api/review";
import { BusinessRequest, UpdateBusiness } from "@/src/types/business";
import { BusinessReviewRequest } from "@/src/types/review";
import { DEFAULT_ERROR_MESSAGE } from "@/src/utils/constants";
import { getQRCodeURL, uploadFile } from "@/src/utils/utils";
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

export const fetchUserBusinessesAction = async (userId: string) => {
  const businesses = await getUserBusinesses(userId);

  if (!businesses) {
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGE,
    };
  }

  return {
    success: true,
    error: "",
    businesses: businesses,
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

export const fetchQRCodeAction = async (formUrl: string) => {
  const resp = await fetch(getQRCodeURL(formUrl), {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  return resp.blob();
};
