"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import menuData from "./menuData";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { HomeIcon, SearchIcon } from "../../Icons";

const HomeHeader = () => {
  const router = useRouter();

  const pathUrl = usePathname();

  const handleTopNavClick = (pathUrl: string) => {
    router.push(pathUrl);
  };

  return (
    <Navbar isBordered maxWidth="2xl">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Image
            src="/images/logo/revit-app-logo.svg"
            alt="logo"
            width={50}
            height={30}
          />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex" justify="center">
        {menuData.map((menuItem, key) => (
          <NavbarItem
            key={key}
            className={`w-24 pt-3 h-full
              ${pathUrl.includes(menuItem.path) && "border-b-1"}`}
          >
            <div
              className="flex flex-col items-center hover:text-default-900 cursor-pointer"
              color="foreground"
              onClick={() => handleTopNavClick(menuItem.path)}
            >
              {menuItem.icon}
              <p
                className={`text-[10px] ${pathUrl.includes(menuItem.path) && "text-default-900"}`}
              >
                {menuItem.title}
              </p>
            </div>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "sm:max-w-[20rem] h-11",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        <Dropdown placement="bottom-end" shouldBlockScroll={false}>
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform hover:cursor-pointer"
              color="secondary"
              name="Jason Hughes"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default HomeHeader;
