"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Slider } from "@heroui/slider";
import { Divider } from "@heroui/divider";
import { Form } from "@heroui/form";
import Image from "next/image";
import { motion } from "framer-motion";

import logo from "../../../public/images/logo/revit-logo.svg";
import { GoogleIcon } from "@/src/components/Icons";
import { useState } from "react";
import { SignupUser } from "@/src/types/user";
import {
  signInAction,
  signInWithGoogleAction,
} from "@/src/app/(site)/(auth)/signin/action";
import { useRouter } from "next/navigation";
import { useSession } from "../Provider";
import { fetchUserAction } from "@/src/app/(site)/(auth)/action";

export default function Signin() {
  const router = useRouter();

  const { setUser } = useSession();

  const [pageState, setPageState] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setPageState({
      ...pageState,
      loading: true,
    });

    const data = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as SignupUser;

    const res = await signInAction(data);

    setPageState({
      ...pageState,
      loading: false,
      success: res.success,
      error: res.error,
    });

    if (res.success) {
      const user = await fetchUserAction();
      if (user) {
        setUser(user);
        router.replace("/");
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center py-28 md:flex-row md:justify-center md:py-0">
      <div className="flex flex-col items-center justify-center pb-10 text-center sm:pb-0 md:mr-30">
        <div className="hidden pb-6 sm:pb-12 md:block">
          <Image
            priority
            alt="logo"
            className="h-16 sm:h-full"
            height={100}
            src={logo}
          />
        </div>
        <div>
          <span className="bg-gradient-to-r from-[#FF705B] to-[#FFB457] bg-clip-text text-3xl font-bold text-transparent md:text-6xl">
            Review&nbsp;
          </span>
          <span className="bg-gradient-to-r from-[#FF72E1] to-[#F54C7A] bg-clip-text text-3xl font-bold text-transparent md:text-6xl">
            Everything
          </span>
        </div>
        <Slider
          aria-label="Volume"
          className="max-w-sm py-4 sm:py-7"
          color="primary"
          defaultValue={2}
          maxValue={5}
          minValue={0}
          size="md"
          step={0.1}
        />
        <p className="text-small md:text-base">
          Find ratings, reviews for what you need &
          <br />
          review anything you want.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center rounded-2xl md:ml-10">
        <Button
          color="default"
          fullWidth={true}
          startContent={<GoogleIcon size={22} />}
          onPress={signInWithGoogleAction}
        >
          Login with Google
        </Button>
        <div className="my-6 flex flex-row items-center justify-center sm:my-10">
          <Divider className="mr-5 w-36" />
          <span className="text-gray-500">OR</span>
          <Divider className="ml-5 w-36" />
        </div>
        <div className="w-full md:w-[28rem]">
          <Form
            className="flex flex-col gap-2 sm:gap-4"
            validationBehavior="native"
            onSubmit={onSubmit}
          >
            <Input
              errorMessage="Please enter a valid email"
              label="Email"
              variant="faded"
              name="email"
              placeholder="user@aeradron.com"
              type="email"
            />
            <Input
              errorMessage="Please enter a valid password"
              label="Password"
              name="password"
              variant="faded"
              placeholder="Password123"
              type="password"
            />
            <Button
              className="mt-2"
              color="primary"
              fullWidth={true}
              spinnerPlacement="end"
              type="submit"
              isLoading={pageState.loading}
            >
              Login
            </Button>
          </Form>
          <Divider className="my-5" />
          <p className="text-center">
            Don't have an account?{" "}
            <a className="text-primary text-lg" href="/signup">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
