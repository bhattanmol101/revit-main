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
import { BusinessReview } from "@/src/types/review";
import { removeBusinessReviewAction } from "@/src/app/(site)/(home)/business/action";
import { useBusinessStore } from "@/src/app/store/Business/Feed";

function BusinessReviewMenu({ review }: { review: BusinessReview }) {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const { feed, setFeed } = useBusinessStore((state) => state);

  const onMenuAction = (key: Key) => {
    if (key == "delete") {
      removeBusinessReviewAction(review.id);
      const newFeed = feed.filter((item) => item.id !== review.id);

      setFeed(newFeed);
    }
  };

  if (user.id !== review.userId) {
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

export default BusinessReviewMenu;
