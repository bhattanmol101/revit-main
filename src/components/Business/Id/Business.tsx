"use client";

import { Avatar, Button, Divider, Spinner, useDisclosure } from "@heroui/react";
import { getJoingDateString } from "@/src/utils/date-utils";
import { ContactIcon, LocationIcon, StarIcon, WebsiteIcon } from "../../Icons";
import { useSession } from "../../Provider";
import { Business } from "@/src/types/business";
import Script from "next/script";
import {
  fetchBusinessByIdAction,
  fetchQRCodeAction,
} from "@/src/app/(site)/(home)/business/action";
import { INDUSTRIES_MAPPER, REVITAPP_URL } from "@/src/utils/constants";
import BusinessMenu from "./Menu";
import { useEffect, useState } from "react";
import QRModal from "./QR";
import RevitModal from "../../Revit/Modal";

export default function BusinessDetails({
  businessId,
}: {
  businessId: string;
}) {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const [loading, setLoading] = useState<boolean>();
  const [business, setBusiness] = useState<Business>();

  const {
    isOpen: isRevitOpen,
    onOpen: onRevitOpen,
    onOpenChange: onRevitOpenChange,
  } = useDisclosure();

  const {
    isOpen: isQROpen,
    onOpen: onQROpen,
    onOpenChange: onQROpenChange,
  } = useDisclosure();

  const [qrLoading, setQRLoading] = useState(false);
  const [qrImage, setQRImage] = useState<Blob>();

  // const options: any = {
  //   layout: "modal",
  //   width: 800,
  //   overlay: true,
  //   hideTitle: true,
  //   autoClose: true,
  //   emoji: {
  //     text: "🚀",
  //     animation: "wave",
  //   },
  //   hiddenFields: {
  //     businessId: business.id,
  //     userId: user.id,
  //   },
  // };

  // const handleTallyClick = () => {
  //   Tally.openPopup(business.formId, options);
  // };

  const onGenerateQRPress = async () => {
    setQRLoading(true);

    const formURL = `${REVITAPP_URL}/revit/${businessId}`;
    const resp = await fetchQRCodeAction(formURL);

    setQRImage(resp);
    setQRLoading(false);
    onQROpen();
  };

  const fetchBusiness = async () => {
    if (!businessId) {
      return;
    }
    if (!business) {
      setLoading(true);
      const resp = await fetchBusinessByIdAction(String(businessId));

      setLoading(false);
      if (resp.business) {
        setBusiness(resp.business);
      }
    }
  };

  useEffect(() => {
    fetchBusiness();
  }, []);

  if (loading) {
    return <Spinner className="w-full self-center" size="sm" />;
  }

  if (!business) {
    return (
      <p className="text-tiny sm:text-sm">
        Could not find the business, Please try again!
      </p>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col w-full p-3 bg-default-50 rounded-xl">
        <div className="flex flex-row justify-between items-start w-full">
          <div className="flex flex-row items-center ">
            <Avatar
              showFallback
              className="lg:w-24 lg:h-24 h-14 w-14"
              src={String(business.logo)}
            />
            <div className="lg:pl-5 pl-2">
              <p className="lg:text-xl text-sm font-bold text-default-600">
                {business.name}
              </p>
              <p className="text-default-500 lg:text-sm text-tiny">
                {INDUSTRIES_MAPPER.get(business.industry)}
              </p>
              <p className="text-default-500 lg:text-sm text-tiny">
                Since: {getJoingDateString(new Date(business.createdAt))}
              </p>
            </div>
          </div>

          <BusinessMenu
            business={business}
            onRevitOpen={onRevitOpen}
            onRevitQROpen={onGenerateQRPress}
          />
        </div>
        <Divider className="my-3" />
        <div className="flex lg:flex-row flex-col justify-evenly lg:items-center lg:px-4 gap-1">
          {business.website && (
            <div className="flex flex-row items-center gap-2">
              <WebsiteIcon size={22} className="h-4 lg:h-6" />
              <p className="text-default-600 lg:text-sm text-tiny">
                {business.website}
              </p>
            </div>
          )}
          <div className="flex flex-row items-center gap-2">
            <LocationIcon size={22} className="h-4 lg:h-6" />
            <p className="text-default-600 lg:text-sm text-tiny">
              {business.location}
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <ContactIcon size={22} className="h-4 lg:h-6" />
            <p className="text-default-600 lg:text-sm text-tiny">
              {business.contact}
            </p>
          </div>
        </div>
        <Divider className="my-3" />
        <p className="text-default-700 sm:text-sm text-tiny px-2 whitespace-pre-line">
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
      {isRevitOpen && (
        <RevitModal
          business={business}
          isOpen={isRevitOpen}
          onOpenChange={onRevitOpenChange}
        />
      )}
    </div>
  );
}
