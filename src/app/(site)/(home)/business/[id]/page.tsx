import BusinessReviews from "@/src/components/Business/Id";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revit - Business",

  // other metadata
  description: "This is a revit business page",
};

export default function BusinessPage() {
  return (
    <>
      <BusinessReviews />
    </>
  );
}
