"use client";

import { ForumT } from "@/src/types/forum";
import { getPostDateString } from "@/src/utils/date-utils";
import { routes } from "@/src/utils/routes";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { User } from "@heroui/user";
import { useRouter } from "next/navigation";

export default function ForumCard({ forum }: { forum: ForumT }) {
  const router = useRouter();

  const onPress = () => {
    router.push(`${routes.forums}/${forum.id}`);
  };

  return (
    <Card key={forum.id} className="w-full my-1" isPressable onPress={onPress}>
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
