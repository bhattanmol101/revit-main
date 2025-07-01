"use client";

import { useParams, useRouter } from "next/navigation";
import { useSession } from "../Provider";
import { Business } from "@/src/types/business";
import { useEffect, useState } from "react";
import { fetchBusinessByIdAction } from "@/src/app/(site)/(home)/business/action";
import { Avatar, Spinner } from "@heroui/react";
import FnBForm from "../Forms/FnB";
import DefaultForm from "../Forms";
import { INDUSTRIES_MAPPER } from "@/src/utils/constants";
import { User } from "@/src/types/user";

export default function Revit() {
  const { user } = useSession();

  const { id } = useParams();

  if (!id) {
    return;
  }

  const router = useRouter();

  const [business, setBusiness] = useState<Business>();

  const [loading, setLoading] = useState<boolean>(true);

  const fetchBusiness = async () => {
    const resp = await fetchBusinessByIdAction(String(id));
    setLoading(false);
    if (resp.business) {
      setBusiness(resp.business);
    }
  };

  useEffect(() => {
    fetchBusiness();
  }, []);

  if (loading) {
    return (
      <Spinner className={`w-full self-center ${!user ? "pt-30" : "pt-15"}`} />
    );
  }

  if (!business) {
    return (
      <p className={`w-full text-center ${!user ? "pt-30" : "pt-15"}`}>
        Business not found, please try for a different business!
      </p>
    );
  }

  const next = () =>
    setTimeout(() => {
      if (user) {
        router.replace(`/business/${business.id}`);
        return;
      }
      router.replace("/");
    }, 3000);

  const revitForm = () => {
    switch (business.industry) {
      case "fnb":
        return <FnBForm user={user as User} business={business} next={next} />;
      default:
        return <DefaultForm />;
    }
  };

  return (
    <div
      className={`flex flex-col justify-center items-center w-full ${!user ? "pt-20" : "pt-5"}`}
    >
      <div className="w-[25vw] py-10">
        <div className="flex flex-row justify-center items-center bg-default-100 rounded-xl py-2">
          <Avatar
            showFallback
            className="sm:w-20 sm:h-20 h-20 w-20"
            src={String(business.logo)}
          />
          <div className="pl-5">
            <p className="sm:text-lg font-bold text-default-600">
              {business.name}
            </p>
            <p className="text-default-500 text-tiny">
              Owner: {business.ownerName}
            </p>
            <p className="text-default-500  text-tiny">
              Industry: {INDUSTRIES_MAPPER.get(business.industry)}
            </p>
          </div>
        </div>
        {revitForm()}
      </div>
    </div>
  );
}
