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
import ForumPostCardMenu from "./Menu";
import { ForumPost } from "@/src/types/forum";
import ForumPostCardComment from "./Comment";

type PostProps = {
  post: ForumPost;
};

export default function ForumPostCard({ post }: PostProps) {
  const rating = getRating(post as Post);

  const [openComments, setOpenComments] = useState<boolean>(false);

  const handleRevit = () => setOpenComments(!openComments);

  return (
    <Card className="w-full my-1.5">
      <CardHeader className="justify-between">
        <User
          avatarProps={{
            src: String(post.userProfileImage),
            showFallback: true,
          }}
          description={getPostDateString(post.createdAt)}
          name={post.userName}
        />
        <ForumPostCardMenu post={post} />
      </CardHeader>
      <CardBody className="overflow-visible px-3 pb-2 pt-0">
        <div className="pb-1">
          <p className="text-small text-default-600 whitespace-pre-line">
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
        <div className="flex flex-row justify-between p-2 gap-4 w-full">
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
            <p className="font-semibold text-default-400 text-small flex flex-row items-center">
              <span>{rating}&nbsp;</span>
              <span>({post.totalReviews})</span>
            </p>
          </div>
          <Button size="sm" variant="bordered" onPress={handleRevit}>
            <div className="flex flex-row items-center justify-center px-10">
              <StarIcon size={20} />
              <p className="text-default-700 text-sm ml-1">Revit</p>
            </div>
          </Button>
        </div>
      </CardFooter>
      {openComments && <ForumPostCardComment post={post} />}
    </Card>
  );
}
