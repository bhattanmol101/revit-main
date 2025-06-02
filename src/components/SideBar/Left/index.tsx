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
    <div className="fixed w-3/12 px-10 pt-5">
      <div className="flex flex-col items-start gap-8">
        <div className="rounded-xl px-5 py-7 w-full flex flex-row items-center gap-4 bg-default-50">
          <Avatar
            className="w-14 h-12 rounded-full"
            src={profileImage}
            name={`${user.name}`}
            showFallback
          />
          <Button
            fullWidth
            startContent={<StarIcon />}
            variant="faded"
            radius="full"
            onPress={onPostOpen}
          >
            What do you want to review?
          </Button>
        </div>
        <Divider />
        <div className="flex flex-col w-full gap-8 bg-default-50 p-5 rounded-xl">
          <Button
            fullWidth
            startContent={<AddIcon />}
            variant="faded"
            radius="full"
            onPress={onForumOpen}
          >
            <p className="lg:text-sm text-tiny">Create a revit forum</p>
          </Button>
          <Button
            fullWidth
            startContent={<AddIcon />}
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
