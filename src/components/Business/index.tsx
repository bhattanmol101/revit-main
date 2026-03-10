"use client";

import { useEffect, useState } from "react";
import { useSession } from "../Provider";
import { Business } from "@/src/types/business";
import { fetchUserBusinessesAction } from "@/src/app/(site)/(home)/business/action";
import BusinessCard from "./Card";
import BusinessSkeleton from "../Common/Skeletons/Business";
import { Tab, Tabs } from "@heroui/react";

export default function Businesses() {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const [businesses, setBusinesses] = useState<Business[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const renderBusiness = (business: Business) => {
    return <BusinessCard key={business.id} business={business} />;
  };

  const fetchUserBusinesses = async () => {
    const resp = await fetchUserBusinessesAction(user.id);
    setLoading(false);
    if (resp.businesses) {
      setBusinesses(resp.businesses);
    }
  };

  useEffect(() => {
    fetchUserBusinesses();
  }, []);

  if (loading) {
    return <BusinessSkeleton count={3} />;
  }

  if (businesses.length === 0) {
    return (
      <p className="text-center mt-2 text-tiny sm:text-sm">
        You don't have any businesses.
        <br />
        Please create one or search for a business you want to review.
      </p>
    );
  }
  return (
    <div>
      <Tabs aria-label="Options" fullWidth>
        <Tab
          key="business"
          className="w-full flex flex-col items-center text-tiny sm:text-sm"
          title="Your Businesses"
        >
          {businesses.flatMap(renderBusiness)}
        </Tab>
      </Tabs>
    </div>
  );
}
