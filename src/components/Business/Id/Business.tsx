"use client";

import { Avatar, Button, Divider, useDisclosure } from "@heroui/react";
import { getJoingDateString } from "@/src/utils/date-utils";
import { ContactIcon, LocationIcon, StarIcon, WebsiteIcon } from "../../Icons";
import { useSession } from "../../Provider";
import { Business } from "@/src/types/business";
import Script from "next/script";
import { fetchQRCodeAction } from "@/src/app/(site)/(home)/business/action";
import { INDUSTRIES_MAPPER } from "@/src/utils/constants";
import BusinessMenu from "./Menu";
import { useState } from "react";
import QRModal from "./QR";

export default function BusinessDetails({ business }: { business: Business }) {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const {
    isOpen: isQROpen,
    onOpen: onQROpen,
    onOpenChange: onQROpenChange,
  } = useDisclosure();

  const [qrLoading, setQRLoading] = useState(false);
  const [qrImage, setQRImage] = useState<Blob>();

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
  };

  const handleTallyClick = () => {
    Tally.openPopup(business.formId, options);
  };

  const onGenerateQRPress = async () => {
    setQRLoading(true);
    if (!business.formURL) {
      setQRLoading(false);
      return;
    }

    const formURL = `${business.formURL}?businessId=${business.id}`;
    const resp = await fetchQRCodeAction(formURL);

    setQRImage(resp);
    setQRLoading(false);
    onQROpen();
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
            {user.id !== business.adminId ? (
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
            ) : (
              <Button
                size="sm"
                spinnerPlacement="end"
                variant="bordered"
                onPress={onGenerateQRPress}
              >
                <div className="flex flex-row justify-center items-center">
                  <p className="text-default-600 ml-1 mt-0.5">Get Revit QR</p>
                </div>
              </Button>
            )}

            <BusinessMenu business={business} />
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
      <Script src="https://tally.so/widgets/embed.js" />
      {qrImage && isQROpen && (
        <QRModal
          image={qrImage}
          isOpen={isQROpen}
          onOpenChange={onQROpenChange}
        />
      )}
    </div>
  );
}
