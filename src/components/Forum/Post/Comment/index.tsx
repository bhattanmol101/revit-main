"use client";

import {
  addReviewToPostAction,
  getPostReviewsByIdAction,
} from "@/src/app/(site)/(home)/home/action";
import { ReviewItem } from "@/src/components/Common/Review";
import { SendIcon } from "@/src/components/Icons";
import { useSession } from "@/src/components/Provider";
import { PageState } from "@/src/types";
import { ForumPost } from "@/src/types/forum";
import { Review, ReviewRequest } from "@/src/types/review";
import { EMPTY_REVIEW_ERROR_MESSAGE } from "@/src/utils/constants";
import {
  CardBody,
  CardFooter,
  Button,
  Slider,
  Avatar,
  Textarea,
  SliderValue,
  Alert,
  Spinner,
} from "@heroui/react";
import { useEffect, useState } from "react";

type PostProps = {
  post: ForumPost;
};

export default function ForumPostCardComment({ post }: PostProps) {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [reviewLoading, setReviewLoading] = useState<boolean>();

  const [pageState, setPageState] = useState<PageState>({
    loading: true,
    success: false,
    error: "",
  });

  const onRatingChange = (value: SliderValue) => {
    setRating(Array.isArray(value) ? value[0] : value);
  };

  const fetchPostReviews = async () => {
    const resp = await getPostReviewsByIdAction(post.id);

    setPageState({
      ...pageState,
      loading: false,
      success: resp.success,
      error: resp.error,
    });

    if (resp.reviews) {
      setReviews(resp.reviews);
    }
  };

  const onSubmit = async () => {
    if (rating === 0 && pageState.error != EMPTY_REVIEW_ERROR_MESSAGE) {
      setPageState({ ...pageState, error: EMPTY_REVIEW_ERROR_MESSAGE });
      return;
    }

    setReviewLoading(true);

    const review: ReviewRequest = {
      userId: user.id,
      text: text,
      rating: rating,
    };

    const res = await addReviewToPostAction(post.id, review);

    setReviewLoading(false);

    if (!res.success) {
      setPageState({ ...pageState, error: res.error });
    } else {
      setText("");
      setRating(0);
      fetchPostReviews();
    }
  };

  useEffect(() => {
    fetchPostReviews();
  }, []);

  const renderReview = (review: Review) => {
    return <ReviewItem key={review.id} review={review} />;
  };

  return (
    <>
      <CardFooter className="flex flex-col border-t-1 border-default-200 py-4 px-3">
        <Slider
          className="w-full"
          classNames={{
            labelWrapper: "p-1",
          }}
          color="primary"
          label={`Rate ${post.userName}'s post`}
          maxValue={5}
          minValue={0}
          size="sm"
          step={0.5}
          value={rating}
          onChange={onRatingChange}
        />
        <div className="flex flex-row gap-3 w-full items-center justify-center pt-3 pb-1">
          <div>
            <Avatar showFallback radius="full" size="md" src={""} />
          </div>
          <Textarea
            aria-label="review"
            errorMessage="Please enter a valid review"
            minRows={1}
            name="review"
            value={text}
            placeholder="What do you think about it...."
            type="text"
            onValueChange={setText}
          />
          <Button
            variant="flat"
            disabled={reviewLoading}
            isLoading={reviewLoading}
            spinnerPlacement="end"
            onPress={onSubmit}
            isIconOnly
          >
            <SendIcon size={20} />
          </Button>
        </div>
      </CardFooter>
      {pageState.error && (
        <Alert
          className="sm:mb-5 mb-2"
          color="warning"
          title={pageState.error}
        />
      )}
      <CardBody className="px-3 border-t-1 border-default-200 max-h-96">
        {pageState.loading ? (
          <Spinner className="w-full self-center py-2" />
        ) : reviews.length ? (
          reviews.flatMap(renderReview)
        ) : (
          <p className="text-center text-default-500 text-sm">
            No reviews yet, Be the first one to review!
          </p>
        )}
      </CardBody>
    </>
  );
}
