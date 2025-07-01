"use client";

import { SearchBusiness } from "@/src/types/business";
import { getPostDateString } from "@/src/utils/date-utils";
import { routes } from "@/src/utils/routes";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { User } from "@heroui/user";
import { useRouter } from "next/navigation";

type SearchBusinessCardProps = {
  business: SearchBusiness;
  cleanupFunction: () => void;
};

export default function SearchBusinessCard({
  business,
  cleanupFunction,
}: SearchBusinessCardProps) {
  const router = useRouter();

  const onPress = () => {
    cleanupFunction();
    router.push(`${routes.business}/${business.id}`);
  };

  return (
    <Card key={business.id} className="w-full" isPressable onPress={onPress}>
      <CardHeader className="justify-between">
        <User
          avatarProps={{
            src: String(business.logo),
            showFallback: true,
            size: "sm",
            name: `${business.name}`,
          }}
          description={getPostDateString(business.createdAt)}
          name={business.name}
        />
      </CardHeader>
      <CardBody className="overflow-visible px-3 pt-0">
        <p className="text-tiny text-default-600 whitespace-pre-line">
          {business.description
            ? `${business.description.slice(0, 80)}...`
            : null}
        </p>
      </CardBody>
    </Card>
  );
}
