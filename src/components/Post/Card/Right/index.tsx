"use client";

import { Post } from "@/src/types/post";
import { getPostDateString } from "@/src/utils/date-utils";
import { getRating } from "@/src/utils/utils";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Slider,
  User,
} from "@heroui/react";
import { useRouter } from "next/navigation";

type PostProps = {
  post: Post;
};

export default function RightPostCard({ post }: PostProps) {
  const router = useRouter();

  const rating = getRating(post);

  const handleShowMore = () => {
    router.push(`/posts/${post.id}`);
  };

  return (
    <Card className="w-full my-1">
      <CardHeader>
        <User
          avatarProps={{
            src: String(post.userProfileImage),
            showFallback: true,
            name: `${post.userName}`,
          }}
          description={getPostDateString(post.createdAt)}
          name={post.userName}
        />
      </CardHeader>
      <CardBody className="overflow-visible px-3 pb-2 pt-0">
        <div className="pb-1">
          <p className="text-small text-default-600 whitespace-pre-line">
            {post.text ? `${post.text.slice(0, 100)}...` : null}
          </p>
          {post.hashtags.map((item) => (
            <span className="text-tiny text-default-600" key={item}>
              {item}
            </span>
          ))}
        </div>
        <p
          className="text-[10px] text-primary-600 hover:cursor-pointer hover:underline"
          onClick={handleShowMore}
        >
          Show more
        </p>
      </CardBody>
      <CardFooter className="flex flex-col border-t-1 border-default-200">
        <div className="flex flex-row items-center w-full gap-2">
          <Slider
            hideThumb
            aria-label="rating"
            color="primary"
            maxValue={5}
            minValue={0}
            size="sm"
            value={rating}
          />
          <p className="text-default-600 text-small flex flex-row items-center">
            <span>{rating}&nbsp;</span>
            <span>({post.totalReviews})</span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
