import Businesses from "@/src/components/Business";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Revit - Business",

  // other metadata
  description: "This is a revit business page",
};

function BusinessPage() {
  return (
    <>
      <Businesses />
    </>
  );
}

export default BusinessPage;
