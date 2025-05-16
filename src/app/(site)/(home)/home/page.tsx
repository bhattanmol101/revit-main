import Home from "@/src/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revit - All in one place for reviews",

  // other metadata
  description: "This is Home for Solid Pro",
};

export default function HomePage() {
  return <Home />;
}
