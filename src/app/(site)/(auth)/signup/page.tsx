import Signup from "@/src/components/Auth/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup Page - Revit",

  // other metadata
  description: "This is Signup page for Revit",
};

export default function SignupPage() {
  return <Signup />;
}
