"use client";

import { Forum } from "@/src/types/forum";
import { getJoingDateString } from "@/src/utils/date-utils";
import { routes } from "@/src/utils/routes";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/react";
import { User } from "@heroui/user";
import { useRouter } from "next/navigation";

export default function ForumCard({ forum }: { forum: Forum }) {
  const router = useRouter();

  const onPress = () => {
    router.push(`${routes.forums}/${forum.id}`);
  };

  return (
    <Card key={forum.id} className="w-full my-1" isPressable onPress={onPress}>
      <CardHeader className="justify-between">
        <User
          avatarProps={{
            src: String(forum.logo),
            showFallback: true,
            name: `${forum.name}`,
            className: "h-8 w-8 sm:h-10 sm:w-10",
          }}
          classNames={{
            name: "text-tiny sm:text-sm",
          }}
          description={`Since: ${getJoingDateString(forum.createdAt)}`}
          name={forum.name}
        />
      </CardHeader>
      <Divider className="mb-1" />
      <CardBody className="overflow-visible px-3 pt-0">
        <p className="sm:text-small text-tiny text-default-600 whitespace-pre-line">
          {forum.description}
        </p>
      </CardBody>
    </Card>
  );
}
