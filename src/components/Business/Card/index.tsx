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
          }}
          description={getPostDateString(business.createdAt)}
          name={business.name}
        />
      </CardHeader>
      <CardBody className="overflow-visible px-3 pt-0">
        <p className="text-small text-default-600 whitespace-pre-line">
          {business.description}
        </p>
      </CardBody>
    </Card>
  );
}
