import Home from "@/src/components/Home";
import Profile from "@/src/components/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revit - Profile",

  // other metadata
  description: "This is Profile for Revit User",
};

export default function HomePage() {
  return <Profile />;
}
