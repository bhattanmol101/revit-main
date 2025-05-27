import { addReviewToBusiness } from "@/src/api/review";
import { BusinessReviewRequest } from "@/src/types/review";
import { convertTallyFormFieldsToReview } from "@/src/utils/utils";

export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();
  if (!body || !body.data) {
    return new Response("Invalid request", { status: 400 });
  }

  console.log("Received request body:", body.data.fields);

  const review = convertTallyFormFieldsToReview(body.data);

  const { businessId, userId } = body;

  if (businessId) {
    return new Response("Invalid request", { status: 400 });
  }

  const businessReview: BusinessReviewRequest = {
    businessId: review.businessId,
    rating: review.rating,
    text: review.text,
    userId: userId,
    userName: review.name,
    json: review.json,
  };

  const id = await addReviewToBusiness(review.businessId, businessReview);

  return new Response(JSON.stringify(id), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
