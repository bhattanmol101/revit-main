"use client";

import { useState } from "react";
import Stepper from "../../Common/Stepper";
import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import ForumCreateFirst from "./Steps/First";
import ForumCreateSecond from "./Steps/Second";
import { ForumForm } from "@/src/types/form";
import { ForumRequest } from "@/src/types/forum";
import { useSession } from "../../Provider";
import { saveForumAction } from "@/src/app/(site)/(home)/forums/action";
import { useRouter } from "next/navigation";
import { ModalProps } from "@/src/types";

export default function ForumCreateModal(props: ModalProps) {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const router = useRouter();

  const { isOpen, onOpenChange } = props;

  const [currentStep, setCurrentStep] = useState(0);

  const [form, setForm] = useState<ForumForm>({
    name: "",
    description: "",
    industry: "",
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
    currentStep === NUMBER_OF_STEPS - 1 ? "Create" : "Next";

  const forumFormSteps = () => {
    switch (currentStep) {
      case 0:
        return <ForumCreateFirst form={form} setForm={setForm} />;

      case 1:
        return <ForumCreateSecond form={form} setForm={setForm} />;

      default:
        return;
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (currentStep < NUMBER_OF_STEPS - 1) {
      goToNextStep();
      return;
    }

    setPageState({
      ...pageState,
      loading: true,
    });

    let forumRequest: ForumRequest = {
      adminId: String(user.id),
      name: form.name,
      description: form.description,
      industry: form.industry,
    };

    const res = await saveForumAction(forumRequest, form.logo);

    setPageState({
      ...pageState,
      loading: false,
      success: res.success,
      error: res.error,
    });

    if (res.success) {
      router.replace(`/forums/${res.id}`);
      onOpenChange();
    }
  };

  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      shouldBlockScroll={false}
      isOpen={isOpen}
      scrollBehavior="inside"
      size="2xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className="border-b-1 border-default-200">
          Create your reivew forum
        </ModalHeader>
        <ModalBody className="min-h-[50vh] py-10 px-10 w-full">
          <div className="mb-16 flex flex-col items-center justify-center relative">
            <div className="absolute top-1">
              <Stepper
                currentStep={currentStep}
                numberOfSteps={NUMBER_OF_STEPS}
              />
            </div>
          </div>
          <Form id="createForum" onSubmit={onSubmit}>
            {forumFormSteps()}
          </Form>
        </ModalBody>
        <ModalFooter className="flex flex-row justify-end border-t-1 border-default-200">
          <Button
            isDisabled={currentStep === 0}
            onPress={goToPreviousStep}
            size="sm"
          >
            Back
          </Button>
          <Button
            color="primary"
            size="sm"
            type="submit"
            form="createForum"
            isLoading={pageState.loading}
            spinnerPlacement="end"
          >
            {buttonName()}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
