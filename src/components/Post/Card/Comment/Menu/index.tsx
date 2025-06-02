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
import { Review } from "@/src/types/review";
import { deletePostReviewByIdAction } from "@/src/app/(site)/(home)/posts/action";

function PostReviewMenu({
  review,
  setHidden,
}: {
  review: Review;
  setHidden: (hidden: boolean) => void;
}) {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const onMenuAction = (key: Key) => {
    if (key == "delete") {
      deletePostReviewByIdAction(review.id);
      setHidden(true);
    }
  };

  return (
    <Dropdown size="sm" shouldBlockScroll={false}>
      <DropdownTrigger>
        <Button
          isIconOnly
          aria-label="menu"
          className="hidden sm:flex p-0 m-0"
          isDisabled={!user}
          size="sm"
          variant="light"
          onPress={() => {}}
        >
          <MenuIcon size={18} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" onAction={onMenuAction}>
        {user.id === review.userId ? (
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            startContent={<DeleteIcon size={16} />}
          >
            Delete
          </DropdownItem>
        ) : null}
      </DropdownMenu>
    </Dropdown>
  );
}

export default PostReviewMenu;
