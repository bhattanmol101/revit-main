import React, { Key } from "react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

import { useSession } from "@/src/components/Provider";
import { DeleteIcon, MenuIcon } from "@/src/components/Icons";
import { Forum } from "@/src/types/forum";
import { useRouter } from "next/navigation";
import { deleteForumAction } from "@/src/app/(site)/(home)/forums/action";

function ForumMenu({ forum }: { forum: Forum }) {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const router = useRouter();

  const onMenuAction = (key: Key) => {
    if (key == "delete") {
      deleteForumAction(forum.id);
      router.replace("/forums");
    }
  };

  if (user.id !== forum.adminId) {
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
          <MenuIcon className="h-5 sm:h-8" size={24} />
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

export default ForumMenu;
