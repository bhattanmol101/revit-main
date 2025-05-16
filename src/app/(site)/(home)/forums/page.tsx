import Forum from "@/src/components/Forum";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revit - Forums",

  // other metadata
  description: "This is a revit forum",
};

export default function ForumPage() {
  return (
    <>
      <Forum />
    </>
  );
}
