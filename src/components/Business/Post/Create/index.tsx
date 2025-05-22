"use client";

import { useSession } from "@/src/components/Provider";
import { PageState } from "@/src/types";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { useState } from "react";
import FileInputSlider from "../../../Common/File/Input/Slider";
import FileInput from "../../../Common/File/Input";
import { ImageIcon } from "@/src/components/Icons";
import { Alert } from "@heroui/react";
import { POST_MAX_FILE_LIMIT, POST_MAX_FILE_SIZE } from "@/src/utils/constants";
import { ForumPostRequest, ForumT } from "@/src/types/forum";
import { saveForumPostAction } from "@/src/app/(site)/(home)/forums/action";

type ForumPostCreateModalProps = {
  forum: ForumT;
  isOpen: boolean;
  onOpenChange: () => void;
};

export default function ForumPostCreateModal(props: ForumPostCreateModalProps) {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const { forum, isOpen, onOpenChange } = props;

  const [pageState, setPageState] = useState<PageState>({
    loading: false,
    success: false,
    error: "",
  });

  const [text, setText] = useState<string>("");

  const [files, setFiles] = useState<Blob[]>([]);

  const onFileChange = (e: any) => {
    e.preventDefault();
    setPageState({
      ...pageState,
      error: "",
    });

    if (e.target.files[0].size > POST_MAX_FILE_SIZE) {
      setPageState({
        ...pageState,
        error: "Please upload images smaller than 2 MB!",
      });
      return;
    }

    let newState = [...files];
    newState.push(...e.target.files);

    if (newState.length > POST_MAX_FILE_LIMIT) {
      setPageState({
        ...pageState,
        error: "You can only add 5 images to a post!",
      });
      return;
    }

    setFiles(newState);
  };

  const onFileRemove = (index: number) => {
    let newState = [...files];

    newState.splice(index, 1);
    setFiles(newState);
  };

  const onModalOpenChange = () => {
    if (!pageState.disabled) {
      onOpenChange();
    }
  };

  const onSubmit = async () => {
    if (text.length === 0 && files.length === 0) {
      setPageState({
        ...pageState,
        error: "Please add either description or photos to post!",
      });
      return;
    }

    setPageState({
      ...pageState,
      loading: true,
    });

    const req: ForumPostRequest = {
      userId: user.id,
      forumId: forum.id,
      text: text,
    };

    const res = await saveForumPostAction(req, files);

    setPageState({
      ...pageState,
      disabled: false,
      loading: false,
      success: res.success,
      error: res.error,
    });

    onOpenChange();
  };

  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      shouldBlockScroll={false}
      isOpen={isOpen}
      scrollBehavior="inside"
      size="2xl"
      onOpenChange={onModalOpenChange}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 border-b-1 border-default-200 text-default-700">
          Add a review to {forum.name} forum
        </ModalHeader>
        <ModalBody className="py-5">
          {pageState.error && (
            <Alert
              className="sm:mb-5 mb-2"
              color="warning"
              title={pageState.error}
            />
          )}
          <div className="pb-8">
            <Textarea
              aria-label="Description"
              className="col-span-12 md:col-span-6 mb-6 md:mb-0 whitespace-pre"
              minRows={6}
              maxRows={50}
              variant="underlined"
              placeholder="Tell about your review..."
              onValueChange={setText}
            />
            <FileInputSlider files={files} onFileRemove={onFileRemove} />
          </div>

          <div className="flex flex-row justify-between items-center gap-2 border-1 border-default-200 px-5 py-2 rounded-xl">
            <p>Add media</p>
            <FileInput
              accept="image/*"
              className=""
              handleFileUpload={onFileChange}
              icon={<ImageIcon size={22} />}
            />
            {/* <FileInput
              accept="video/*"
              className=""
              handleFileUpload={onFileChange}
              icon={<VideoIcon size={26} />}
            /> */}
          </div>
        </ModalBody>
        <ModalFooter className="border-t-1 border-default-200">
          <Button
            color="primary"
            isDisabled={pageState.disabled}
            isLoading={pageState.loading}
            spinnerPlacement="end"
            onPress={onSubmit}
          >
            Post
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
