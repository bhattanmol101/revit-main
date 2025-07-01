"use client";

import { useState } from "react";
import Stepper from "../../Common/Stepper";
import { addToast, Button, Form } from "@heroui/react";
import Step2 from "./Steps/Step2";
import { EMPTY_BUSINESS_REVIEW_ERROR_MESSAGE } from "@/src/utils/constants";
import { LeftIcon, RightIcon } from "../../Icons";
import { RevitForm } from "@/src/types/form";
import { BusinessReviewRequest } from "@/src/types/review";
import { addReviewToBusinessAction } from "@/src/app/(site)/revit/action";
import CommonForm from "../Common";

export default function FnBForm({ user, business, next }: RevitForm) {
  const [currentStep, setCurrentStep] = useState(0);

  const [form, setForm] = useState({
    rating: 0,
    name: user ? user.name : "",
    description: "",
    food: 0,
    ambiance: 0,
    service: 0,
    vibe: 0,
    servicePerson: "",
    pricePP: 0,
  });

  const [pageState, setPageState] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const NUMBER_OF_STEPS = 2;

  const goToNextStep = () =>
    setCurrentStep((prev) => (prev === NUMBER_OF_STEPS - 1 ? prev : prev + 1));

  const goToPreviousStep = () =>
    setCurrentStep((prev) => (prev <= 0 ? prev : prev - 1));

  const buttonName = () =>
    currentStep === NUMBER_OF_STEPS - 1 ? "Revit ⭐" : "Next";

  const fnbFormSteps = () => {
    switch (currentStep) {
      case 0:
        return <CommonForm formId="fnbForm" form={form} setForm={setForm} />;

      case 1:
        return <Step2 formId="fnbForm" form={form} setForm={setForm} />;

      default:
        return;
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (
      currentStep === 0 &&
      form.rating === 0 &&
      pageState.error !== EMPTY_BUSINESS_REVIEW_ERROR_MESSAGE
    ) {
      setPageState({
        ...pageState,
        error: EMPTY_BUSINESS_REVIEW_ERROR_MESSAGE,
      });
      addToast({
        title: "Give this business 0 rating?",
        description: EMPTY_BUSINESS_REVIEW_ERROR_MESSAGE,
        color: "warning",
        classNames: {
          base: "w-96",
          content: "w-96",
          wrapper: "w-96",
        },
      });
      return;
    }

    if (pageState.error === EMPTY_BUSINESS_REVIEW_ERROR_MESSAGE) {
      setPageState({
        ...pageState,
        error: "",
      });
    }

    if (currentStep < NUMBER_OF_STEPS - 1) {
      goToNextStep();
      return;
    }

    setPageState({
      ...pageState,
      loading: true,
    });

    const json = [];

    json.push({
      label: "food",
      value: form.food,
      type: "RATING",
    });
    json.push({
      label: "ambiance",
      value: form.ambiance,
      type: "RATING",
    });
    json.push({
      label: "service",
      value: form.service,
      type: "RATING",
    });
    json.push({
      label: "vibe",
      value: form.vibe,
      type: "RATING",
    });
    json.push({
      label: "servicePerson",
      value: form.servicePerson,
      type: "INPUT",
    });
    json.push({
      label: "pricePP",
      value: form.pricePP,
      type: "INPUT",
    });

    const businessReviewRequest: BusinessReviewRequest = {
      businessId: business.id,
      rating: form.rating,
      text: form.description,
      userId: user?.id,
      name: form.name,
      json: json,
    };

    const resp = await addReviewToBusinessAction(
      business.id,
      businessReviewRequest
    );
    setPageState({
      ...pageState,
      loading: false,
      success: resp.success,
      error: resp.error,
    });

    if (resp.success) {
      addToast({
        title: "Thank You",
        description:
          "You have successfully added your revit for this business.",
        color: "success",
      });
      next();
    } else {
      addToast({
        title: "Something went wrong!",
        description: "We could not process your request, please try again!",
        color: "danger",
      });
    }
  };

  return (
    <div className="flex flex-col w-full items-center py-10">
      <div className="mb-2">
        <Stepper currentStep={currentStep} numberOfSteps={NUMBER_OF_STEPS} />
      </div>
      <div className="h-[45vh] w-full">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Form id="fnbForm" onSubmit={onSubmit} className="w-full">
            {fnbFormSteps()}
          </Form>
        </div>
      </div>

      <div className="flex flex-row justify-end gap-4 w-full">
        <Button
          isDisabled={currentStep === 0 || pageState.loading}
          startContent={<LeftIcon size={16} />}
          onPress={goToPreviousStep}
        >
          Back
        </Button>
        <Button
          color="primary"
          type="submit"
          form="fnbForm"
          isLoading={pageState.loading}
          spinnerPlacement="end"
          endContent={
            currentStep !== NUMBER_OF_STEPS - 1 ? <RightIcon size={16} /> : null
          }
        >
          {buttonName()}
        </Button>
      </div>
    </div>
  );
}
