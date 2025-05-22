"use client";

import { Avatar, Button, Divider, useDisclosure } from "@heroui/react";
import { getJoingDateString } from "@/src/utils/date-utils";
import { ContactIcon, LocationIcon, StarIcon, WebsiteIcon } from "../../Icons";
import { useSession } from "../../Provider";
import { Business } from "@/src/types/business";
import Script from "next/script";
import { saveReviewForBusinessAction } from "@/src/app/(site)/(home)/business/action";
import { BusinessReviewRequest } from "@/src/types/review";
import { onTallySubmitHandler } from "@/src/utils/utils";
import { INDUSTRIES_MAPPER } from "@/src/utils/constants";
import BusinessReviewCreateModal from "../Review/Create";

export default function BusinessDetails({ business }: { business: Business }) {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleFnBReview = (review: any) => {
    const businessReview: BusinessReviewRequest = {
      businessId: business.id,
      rating: review.rating,
      text: review.text,
      userId: user.id,
      userName: review.name ? review.name : user.name,
      json: review.json,
    };

    saveReviewForBusinessAction(business.id, businessReview);
  };

  const options: any = {
    layout: "modal",
    width: 800,
    overlay: true,
    hideTitle: true,
    autoClose: true,
    emoji: {
      text: "🚀",
      animation: "wave",
    },
    hiddenFields: {
      businessId: business.id,
      userId: user.id,
    },
    onSubmit: (payload: any) => {
      onTallySubmitHandler(payload, handleFnBReview);
    },
  };

  const handleTallyClick = () => {
    Tally.openPopup(business.formId, options);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:w-full w-screen p-3 bg-default-50 rounded-xl">
        <div className="flex flex-row justify-between items-start w-full">
          <div className="flex flex-row items-center ">
            <Avatar
              showFallback
              className="sm:w-24 sm:h-24 h-20 w-20"
              src={String(business.logo)}
            />
            <div className="pl-5">
              <p className="sm:text-xl font-bold text-default-600">
                {business.name}
              </p>
              <p className="text-default-500 sm:text-sm text-tiny">
                {INDUSTRIES_MAPPER.get(business.industry)}
              </p>
              <p className="text-default-500 sm:text-sm text-tiny">
                Since: {getJoingDateString(new Date(business.createdAt))}
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-2 p-2">
            <Button
              size="sm"
              spinnerPlacement="end"
              variant="bordered"
              onPress={handleTallyClick}
            >
              <div className="flex flex-row justify-center items-center">
                <StarIcon
                  size={16}
                  className="stroke-primary text-primary font-black"
                />
                <p className="text-default-600 ml-1 mt-0.5">Revit</p>
              </div>
            </Button>

            {/* <ForumMenu forum={forum} /> */}
          </div>
        </div>
        <Divider className="my-3" />
        <div className="flex flex-row justify-evenly items-center px-4">
          {business.website && (
            <div className="flex flex-row items-center gap-2">
              <WebsiteIcon size={22} />
              <p className="text-default-600 sm:text-sm text-sm">
                {business.website}
              </p>
            </div>
          )}
          <div className="flex flex-row items-center gap-2">
            <LocationIcon size={22} />
            <p className="text-default-600 sm:text-sm text-sm">
              {business.location}
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <ContactIcon size={22} />
            <p className="text-default-600 sm:text-sm text-sm">
              {business.contact}
            </p>
          </div>
        </div>
        <Divider className="my-3" />
        <p className="text-default-700 sm:text-sm text-sm px-2">
          {business.description}
        </p>
      </div>
      {
        <BusinessReviewCreateModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      }
      {<Script src="https://tally.so/widgets/embed.js" />}
    </div>
  );
}
