import PostById from "@/src/components/Post/Id";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revit - Post",

  // other metadata
  description: "This is a revit post",
};

export default function PostByIdPage() {
  return (
    <>
      <PostById />
    </>
  );
}
