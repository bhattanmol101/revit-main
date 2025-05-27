"use client";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { useSession } from "../../../Provider";
import Script from "next/script";
import { Business } from "@/src/types/business";

type BusinessReviewCreateModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  business: Business;
};

export default function BusinessReviewCreateModal(
  props: BusinessReviewCreateModalProps
) {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const { business, isOpen, onOpenChange } = props;

  const tallySrc = `https://tally.so/embed/np96AV?businessId=${business.id}&userId=${user.id}&alignLeft=1&hideTitle=1&emojiText=👋&emojiAnimation=wave&showOnce=false`;

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
          Please share your review
        </ModalHeader>
        <ModalBody className="min-h-[50vh] px-5 w-full">
          <iframe
            data-tally-src={tallySrc}
            loading="lazy"
            width="100%"
            height="700"
            frameBorder="0"
            title="Food & Beverage Review"
          ></iframe>

          <Script
            src="https://tally.so/widgets/embed.js"
            strategy="lazyOnload"
            onLoad={() => {
              Tally.loadEmbeds();
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
