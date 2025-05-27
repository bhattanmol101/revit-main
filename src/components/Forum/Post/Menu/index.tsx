import React, { Key } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";

import { useSession } from "@/src/components/Provider";
import { DeleteIcon, MenuIcon } from "@/src/components/Icons";
import { ForumPost } from "@/src/types/forum";
import { useForumStore } from "@/src/app/store/Forum/Feed";
import { deleteForumPostAction } from "@/src/app/(site)/(home)/forums/action";

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

  const { feed, setFeed } = useForumStore((state) => state);

  const onMenuAction = (key: Key) => {
    if (key == "delete") {
      deleteForumPostAction(post.id);

      const newFeed = feed.filter((item) => item.id !== post.id);

      setFeed(newFeed);
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
