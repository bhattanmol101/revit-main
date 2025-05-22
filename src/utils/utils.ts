import { redirect } from "next/navigation";

import { POST_BUCKET, POST_BUCKET_URL, QR_CODE_GEN_URL } from "./constants";

import { Post } from "../types/post";
import { PageState } from "../types";
import { JsonFieldType } from "../types/form";
import { TallyReviewType } from "../types/review";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export function initPostState(): PageState {
  return {
    disabled: false,
    loading: false,
    success: false,
    error: "",
  };
}

// Upload file using standard upload
export async function uploadFile(uploadClient: any, file: any) {
  const fileExt = file.name.split(".").pop();

  const fileName = "file_" + createRandomString(10) + "." + fileExt;

  const { data, error } = await uploadClient.storage
    .from(POST_BUCKET)
    .upload(fileName, file);

  if (error) {
    return {
      success: false,
      error: error.message,
      fileUrl: "",
    };
  } else {
    const fileUrl = POST_BUCKET_URL + data.path;

    return {
      success: true,
      error: "",
      fileUrl: fileUrl,
    };
  }
}

function createRandomString(length: number) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

export function getRating(post: Post) {
  const rating = post.rating
    ? Number(post.rating) / Number(post.totalReviews)
    : 0;

  return Number(rating.toPrecision(2));
}

export function getQRCodeURL(url: string) {
  return `${QR_CODE_GEN_URL}/?data=${url}&size=512x512`;
}

export function showFooter(path: string) {
  return (
    path === "/" ||
    path === "/signin" ||
    path === "/signup" ||
    path === "/terms" ||
    path === "/privacy" ||
    path === "/support"
  );
}

export const onTallySubmitHandler = async (
  data: any,
  reviewHandler: (review: TallyReviewType) => void
) => {
  let rating = 0;
  let text = "";
  let name = "";
  let json: JsonFieldType[] = [];

  data.fields.map((field: any) => {
    switch (field.title) {
      case "rating":
        rating = field.answer.value;
        break;
      case "description":
        text = field.answer.value;
        break;
      case "name":
        name = field.answer.value;
        break;
      case "businessId":
      case "userId":
        break;
      default:
        json.push({
          title: field.title,
          value: field.answer.value,
          type: field.type,
        });
        break;
    }
  });

  json.sort((a: JsonFieldType, b: JsonFieldType) =>
    a.type === b.type
      ? 1
      : a.type === "RATING"
        ? 1
        : b.type === "RATING"
          ? 1
          : 0
  );

  const review = {
    rating,
    text,
    name,
    json,
  };

  reviewHandler(review);
};
