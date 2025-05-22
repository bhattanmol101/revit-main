"use client";

import { useState } from "react";
import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { ForumForm } from "@/src/types/form";
import { ForumRequest } from "@/src/types/forum";
import { useSession } from "../../../Provider";
import { saveForumAction } from "@/src/app/(site)/(home)/forums/action";
import { useRouter } from "next/navigation";
import { ModalProps } from "@/src/types";
import Script from "next/script";

export default function BusinessReviewCreateModal(props: ModalProps) {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const { isOpen, onOpenChange } = props;

  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      shouldBlockScroll={false}
      isOpen={false}
      scrollBehavior="inside"
      size="2xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className="border-b-1 border-default-200">
          Please share your review
        </ModalHeader>
        <ModalBody className="min-h-[50vh] py-10 px-5 w-full">
          <div data-tf-live="01JVW24NNXMGY5S5S0NY0M9P99"></div>
          <script src="//embed.typeform.com/next/embed.js"></script>
        </ModalBody>
      </ModalContent>

      <Script src="//embed.typeform.com/next/embed.js" />
    </Modal>
  );
}
