import React, { Key } from "react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

import { useSession } from "@/src/components/Provider";
import { DeleteIcon, MenuIcon, StarIcon } from "@/src/components/Icons";
import { Business } from "@/src/types/business";

type BusinessMenuProps = {
  business: Business;
  onRevitOpen: () => void;
  onRevitQROpen: () => void;
};

function BusinessMenu({
  business,
  onRevitOpen,
  onRevitQROpen,
}: BusinessMenuProps) {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const onMenuAction = (key: Key) => {
    if (key == "delete") {
      //Delete
    }
  };

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
          key="qr"
          onPress={onRevitQROpen}
          hidden={user.id !== business.adminId}
        >
          <div className="flex flex-row items-center">
            <p className="text-default-600 ml-1 mt-0.5">Get Revit QR</p>
          </div>
        </DropdownItem>
        <DropdownItem
          key="revit"
          onPress={onRevitOpen}
          hidden={user.id === business.adminId}
        >
          <div className="flex flex-row items-center">
            <StarIcon
              size={16}
              className="stroke-primary text-primary font-black"
            />
            <p className="text-default-600 ml-1 mt-0.5">Revit</p>
          </div>
        </DropdownItem>

        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          hidden={user.id !== business.adminId}
          startContent={<DeleteIcon size={16} />}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default BusinessMenu;
