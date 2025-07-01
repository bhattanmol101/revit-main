"use client";

import { useSession } from "../../Provider";
import { Avatar, Button, Divider, useDisclosure } from "@heroui/react";
import { AddIcon, StarIcon } from "../../Icons";
import ForumCreateModal from "../../Forum/Create";
import PostCreateModal from "../../Post/Create";
import BusinessCreateModal from "../../Business/Create";

const LeftSideBar = () => {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const {
    isOpen: isPostOpen,
    onOpen: onPostOpen,
    onOpenChange: onPostOpenChange,
  } = useDisclosure();

  const {
    isOpen: isForumOpen,
    onOpen: onForumOpen,
    onOpenChange: onForumOpenChange,
  } = useDisclosure();

  const {
    isOpen: isBusinessOpen,
    onOpen: onBusinessOpen,
    onOpenChange: onBusinessOpenChange,
  } = useDisclosure();

  const profileImage = user.profileImage
    ? `${user.profileImage}?width=50&height=50`
    : "";

  return (
    <div className="lg:fixed lg:w-3/12 w-full pb-4 lg:pb-0">
      <div className="flex flex-col items-start lg:gap-8 gap-1">
        <div className="rounded-xl lg:px-5 lg:py-7 px-3 py-4 w-full flex flex-row items-center gap-4 bg-default-50">
          <Avatar
            className="lg:w-14 lg:h-12 lg:block hidden rounded-full"
            src={profileImage}
            name={`${user.name}`}
            showFallback
          />
          <Button
            fullWidth
            startContent={<StarIcon className="h-4 lg:h-5" />}
            variant="faded"
            radius="full"
            onPress={onPostOpen}
          >
            <p className="lg:text-sm text-tiny">Want to share a review?</p>
          </Button>
        </div>
        <Divider className="lg:block hidden" />
        <div className="flex flex-col w-full lg:gap-8 gap-3 bg-default-50 lg:p-5 p-3 rounded-xl">
          <Button
            fullWidth
            startContent={<AddIcon className="h-4 lg:h-5" />}
            variant="faded"
            radius="full"
            onPress={onForumOpen}
          >
            <p className="lg:text-sm text-tiny">Create a revit forum</p>
          </Button>
          <Button
            fullWidth
            startContent={<AddIcon className="h-4 lg:h-5" />}
            variant="faded"
            radius="full"
            onPress={onBusinessOpen}
          >
            <p className="lg:text-sm text-tiny">Grow business on revit</p>
          </Button>
        </div>
      </div>

      {isPostOpen && (
        <PostCreateModal isOpen={isPostOpen} onOpenChange={onPostOpenChange} />
      )}

      {isForumOpen && (
        <ForumCreateModal
          isOpen={isForumOpen}
          onOpenChange={onForumOpenChange}
        />
      )}
      {isBusinessOpen && (
        <BusinessCreateModal
          isOpen={isBusinessOpen}
          onOpenChange={onBusinessOpenChange}
        />
      )}
    </div>
  );
};

export default LeftSideBar;
