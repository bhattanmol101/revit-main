import ProfileById from "@/src/components/Profile/id";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revit - Profile",

  // other metadata
  description: "This is Profile for Revit User",
};

export default function ProfileByIdPage() {
  return <ProfileById />;
}
