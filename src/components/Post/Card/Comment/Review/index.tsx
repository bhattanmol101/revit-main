import { Slider } from "@heroui/slider";
import { Avatar } from "@heroui/avatar";
import { Review } from "@/src/types/review";
import { useState } from "react";
import PostReviewMenu from "../Menu";

export const ReviewItem = ({ review }: { review: Review }) => {
  const [hidden, setHidden] = useState(false);

  return (
    <div
      className={`flex flex-row w-full gap-3 mb-1 ${hidden ? "hidden" : ""}`}
    >
      <div className="mt-1">
        <Avatar
          showFallback
          className="h-8 w-8 sm:h-8 sm:w-10"
          name={`${review.userName}`}
          src={String(review.userProfileImage)}
        />
      </div>
      <div className="flex flex-col justify-center items-start w-full bg-default-100 rounded-xl px-3 py-2">
        <div className="flex flex-row items-center justify-between gap-2 w-full">
          <Slider
            hideThumb
            classNames={{
              labelWrapper: "mb-0 text-tiny",
              label: "text-default-600 text-tiny",
              value: "text-default-600 text-tiny",
              track: "m-0 p-0",
            }}
            color="primary"
            label={review.userName}
            maxValue={5}
            minValue={0}
            size="sm"
            step={0.1}
            value={review.rating}
          />
          <PostReviewMenu review={review} setHidden={setHidden} />
        </div>
        <p className="text-tiny text-default-600 pt-1">{review.text}</p>
      </div>
    </div>
  );
};
