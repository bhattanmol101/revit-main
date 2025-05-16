import { Metadata } from "next";
import Signin from "@/src/components/Auth/Signin";

export const metadata: Metadata = {
  title: "Login Page - Revit",

  // other metadata
  description: "This is Login page for Revit",
};

export default function SigninPage() {
  return <Signin />;
}
