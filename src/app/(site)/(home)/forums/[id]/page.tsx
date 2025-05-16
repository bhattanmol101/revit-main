import ForumById from "@/src/components/Forum/Id";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revit - Forums",

  // other metadata
  description: "This is a revit forum",
};

export default function ForumByIdPage() {
  return (
    <>
      <ForumById />
    </>
  );
}
