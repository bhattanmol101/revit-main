"use client";

import { Business } from "@/src/types/business";
import { getPostDateString } from "@/src/utils/date-utils";
import { routes } from "@/src/utils/routes";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { User } from "@heroui/user";
import { useRouter } from "next/navigation";

export default function BusinessCard({ business }: { business: Business }) {
  const router = useRouter();

  const onPress = () => {
    router.push(`${routes.business}/${business.id}`);
  };

  return (
    <Card
      key={business.id}
      className="w-full my-1"
      isPressable
      onPress={onPress}
    >
      <CardHeader className="justify-between">
        <User
          avatarProps={{
            src: String(business.logo),
            showFallback: true,
            name: `${business.name}`,
            className: "h-8 w-8 sm:h-10 sm:w-10",
          }}
          classNames={{
            name: "text-tiny sm:text-sm",
          }}
          description={getPostDateString(business.createdAt)}
          name={business.name}
        />
      </CardHeader>
      <CardBody className="overflow-visible px-3 pt-0">
        <p className="text-tiny sm:text-small text-default-600 whitespace-pre-line">
          {business.description}
        </p>
      </CardBody>
    </Card>
  );
}
