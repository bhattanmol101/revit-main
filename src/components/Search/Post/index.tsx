"use client";

import { SearchPost } from "@/src/types/post";
import { getPostDateString } from "@/src/utils/date-utils";
import { Card, CardHeader, CardBody, User } from "@heroui/react";
import { useRouter } from "next/navigation";

type PostProps = {
  post: SearchPost;
  cleanupFunction: () => void;
};

export default function SearchPostCard({ post, cleanupFunction }: PostProps) {
  const router = useRouter();

  const handlePress = () => {
    cleanupFunction();
    router.push(`/posts/${post.id}`);
  };

  return (
    <Card className="w-full" isPressable onPress={handlePress}>
      <CardHeader>
        <User
          avatarProps={{
            src: String(post.userProfileImage),
            showFallback: true,
            size: "sm",
            className: "text-tiny",
            name: `${post.userName}`,
          }}
          className="text-tiny"
          description={getPostDateString(post.createdAt)}
          name={post.userName}
        />
      </CardHeader>
      <CardBody className="overflow-visible px-3 pb-2 pt-0">
        <div className="pb-1">
          <p className="text-tiny text-default-600 whitespace-pre-line">
            {post.text ? `${post.text.slice(0, 80)}...` : null}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
