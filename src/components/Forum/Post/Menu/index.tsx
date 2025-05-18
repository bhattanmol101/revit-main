import React, { Key } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";

import { useFeedStore } from "@/src/app/store/Feed";
import { useSession } from "@/src/components/Provider";
import { deletePostAction } from "@/src/app/(site)/(home)/home/action";
import { DeleteIcon, MenuIcon } from "@/src/components/Icons";
import { ForumPost } from "@/src/types/forum";

function ForumPostCardMenu({
  post,
  onModalChange,
}: {
  post: ForumPost;
  onModalChange?: () => void;
}) {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const { feed, setFeed } = useFeedStore((state) => state);

  const onMenuAction = (key: Key) => {
    if (key == "delete") {
      deletePostAction(post.id);

      const newFeed = feed.filter((item) => item.id !== post.id);

      setFeed(newFeed);

      onModalChange && onModalChange();
    }
  };

  if (user.id !== post.userId) {
    return;
  }

  return (
    <Dropdown size="sm" shouldBlockScroll={false}>
      <DropdownTrigger>
        <Button
          isIconOnly
          aria-label="menu"
          className="hidden sm:flex"
          isDisabled={!user}
          size="sm"
          variant="light"
          onPress={() => {}}
        >
          <MenuIcon size={24} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" onAction={onMenuAction}>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          startContent={<DeleteIcon size={16} />}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default ForumPostCardMenu;
