"use client";

import { Alert, Button, Divider, Form, Input, Slider } from "@heroui/react";
import Image from "next/image";
import { GoogleIcon } from "../Icons";

import logo from "../../../public/images/logo/revit-logo.svg";
import { useState } from "react";
import { SignupUser } from "@/src/types/user";
import { signUpAction } from "@/src/app/(site)/(auth)/signup/action";
import {
  validateEmail,
  validateEmpty,
  validatePassword,
} from "@/src/utils/validators";

const Signup = () => {
  const [pageState, setPageState] = useState({
    disabled: true,
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

    const res = await signUpAction(data);

    setPageState({
      ...pageState,
      disabled: false,
      loading: false,
      success: res.success,
      error: res.error,
    });
  };
  return (
    <>
      <section>
        {/* <!-- ===== SignUp Form Start ===== --> */}
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
          <div className="flex flex-col items-center justify-center rounded-2xl md:ml-10 w-full md:w-[28rem]">
            {!pageState.disabled && (
              <Alert
                className="sm:mb-5 mb-2"
                color={pageState.success ? "success" : "danger"}
                title={
                  pageState.success
                    ? "Thanks for signing up! Please check your email for verification link."
                    : pageState.error
                }
              />
            )}
            <Button
              color="default"
              fullWidth={true}
              startContent={<GoogleIcon size={22} />}
            >
              Signup with Google
            </Button>
            <div className="my-6 flex flex-row items-center justify-center sm:my-10">
              <Divider className="mr-5 w-36" />
              <span className="text-gray-500">OR</span>
              <Divider className="ml-5 w-36" />
            </div>
            <Form
              className="flex flex-col gap-2 sm:gap-4 w-full"
              validationBehavior="native"
              onSubmit={onSubmit}
            >
              <Input
                errorMessage="Please enter a valid name"
                label="Name"
                variant="faded"
                name="name"
                placeholder="Ram Bhat"
                type="text"
                validate={validateEmpty}
              />
              <Input
                errorMessage="Please enter a valid email"
                label="Email"
                variant="faded"
                name="email"
                placeholder="user@aeradron.com"
                type="email"
                validate={validateEmail}
              />
              <Input
                errorMessage="Please enter a valid password"
                label="Password"
                name="password"
                variant="faded"
                placeholder="Password123"
                validate={validatePassword}
                type="password"
              />
              <Button
                className="mt-2"
                color="primary"
                fullWidth={true}
                spinnerPlacement="end"
                isLoading={pageState.loading}
                type="submit"
              >
                Signup
              </Button>
            </Form>
            <Divider className="my-5" />
            <p className="text-center">
              Already have an account?{" "}
              <a className="text-primary text-lg" href="/signin">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </section>
      {/* <!-- ===== SignUp Form End ===== --> */}
    </>
  );
};

export default Signup;
