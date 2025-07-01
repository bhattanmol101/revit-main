"use client";

import { SearchForum } from "@/src/types/forum";
import { getJoingDateString } from "@/src/utils/date-utils";
import { routes } from "@/src/utils/routes";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { User } from "@heroui/user";
import { useRouter } from "next/navigation";

type SearchForumCardProps = {
  forum: SearchForum;
  cleanupFunction: () => void;
};

export default function SearchForumCard({
  forum,
  cleanupFunction,
}: SearchForumCardProps) {
  const router = useRouter();

  const onPress = () => {
    cleanupFunction();
    router.push(`${routes.forums}/${forum.id}`);
  };

  return (
    <Card key={forum.id} className="w-full" isPressable onPress={onPress}>
      <CardHeader className="justify-between">
        <User
          avatarProps={{
            src: String(forum.logo),
            showFallback: true,
            size: "sm",
            name: `${forum.name}`,
          }}
          description={`Since: ${getJoingDateString(forum.createdAt)}`}
          name={forum.name}
        />
      </CardHeader>
      <CardBody className="overflow-visible px-3 pt-0">
        <p className="text-tiny text-default-600 whitespace-pre-line">
          {forum.description ? `${forum.description.slice(0, 80)}...` : null}
        </p>
      </CardBody>
    </Card>
  );
}
