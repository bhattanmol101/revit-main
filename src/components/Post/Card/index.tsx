"use client";

import { Post } from "@/src/types/post";
import { getPostDateString } from "@/src/utils/date-utils";
import { getRating } from "@/src/utils/utils";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Slider,
  User,
} from "@heroui/react";
import { StarIcon } from "../../Icons";
import FileSlider from "../../Common/File/Slider";
import { useState } from "react";
import PostCardComment from "./Comment";
import PostCardMenu from "./Menu";

type PostProps = {
  post: Post;
};

export default function PostCard({ post }: PostProps) {
  const rating = getRating(post);

  const [openComments, setOpenComments] = useState<boolean>(false);

  const handleRevit = () => setOpenComments(!openComments);

  return (
    <Card className="w-full my-1">
      <CardHeader className="justify-between">
        <User
          avatarProps={{
            src: String(post.userProfileImage),
            showFallback: true,
            name: `${post.userName}`,
            className: "h-8 w-8 sm:h-10 sm:w-10",
          }}
          classNames={{
            name: "text-tiny sm:text-base",
          }}
          description={getPostDateString(post.createdAt)}
          name={post.userName}
        />
        <PostCardMenu post={post} />
      </CardHeader>
      <CardBody className="overflow-visible px-3 pb-2 pt-0">
        <div className="pb-1">
          <p className="sm:text-small text-tiny text-default-600 whitespace-pre-line">
            {post.text}
          </p>
          {post.hashtags.map((item) => (
            <span className="text-tiny text-default-600" key={item}>
              {item}
            </span>
          ))}
        </div>
        <FileSlider files={post.fileList} />
      </CardBody>
      <CardFooter className="flex flex-col p-0 border-t-1 border-default-200">
        <div className="flex flex-row justify-between p-2 sm:gap-4 gap-2 w-full">
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
            <p className="text-default-600 sm:text-small text-tiny flex flex-row items-center">
              <span>{rating}&nbsp;</span>
              <span>({post.totalReviews})</span>
            </p>
          </div>
          <Button size="sm" variant="bordered" onPress={handleRevit}>
            <div className="flex flex-row items-center justify-center sm:px-10 px-6">
              <StarIcon size={20} className="h-4 sm:h-6" />
              <p className="text-default-700 text-tiny ml-1 sm:text-sm">
                Revit
              </p>
            </div>
          </Button>
        </div>
      </CardFooter>
      {openComments && <PostCardComment post={post} />}
    </Card>
  );
}
