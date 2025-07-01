"use server";

import { addReviewToBusiness } from "@/src/api/review";
import { BusinessReviewRequest } from "@/src/types/review";
import { DEFAULT_ERROR_MESSAGE } from "@/src/utils/constants";

export const addReviewToBusinessAction = async (
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
