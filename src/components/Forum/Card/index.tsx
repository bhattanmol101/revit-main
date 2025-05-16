"use client";

import { ForumT } from "@/src/types/forum";
import { getPostDateString } from "@/src/utils/date-utils";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { User } from "@heroui/user";

export default function ForumCard({ forum }: { forum: ForumT }) {
  return (
    <Card className="w-full my-1">
      <CardHeader className="justify-between">
        <User
          avatarProps={{
            src: String(forum.userProfileImage),
            showFallback: true,
          }}
          description={getPostDateString(forum.createdAt)}
          name={forum.userName}
        />
      </CardHeader>
      <CardBody className="overflow-visible px-3 pt-0">
        <p className="text-small text-default-600 whitespace-pre-line">
          {forum.description}
        </p>
      </CardBody>
    </Card>
  );
}
