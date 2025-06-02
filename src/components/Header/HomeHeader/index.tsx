"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

import menuData from "./menuData";
import { useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Spinner,
} from "@heroui/react";
import { SearchIcon } from "../../Icons";
import { useSession } from "../../Provider";
import { logoutUserAction } from "@/src/app/(site)/(home)/profile/action";
import { useEffect, useRef, useState } from "react";
import {
  searchBusinessByTextAction,
  searchForumByTextAction,
  searchPostByTextAction,
} from "@/src/app/(site)/(home)/search/action";
import { SearchPost } from "@/src/types/post";
import { Forum, SearchForum } from "@/src/types/forum";
import { Business, SearchBusiness } from "@/src/types/business";
import SearchPostCard from "../../Search/Post";
import ForumCard from "../../Forum/Card";
import SearchForumCard from "../../Search/Forum";
import SearchBusinessCard from "../../Search/Business";

const HomeHeader = () => {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const router = useRouter();

  const pathUrl = usePathname();

  const ref = useRef<HTMLDivElement>(null);

  const [searchTitle, setSearchTitle] = useState("posts");
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [posts, setPosts] = useState<SearchPost[]>();
  const [forums, setForums] = useState<SearchForum[]>();
  const [businesses, setBusinesses] = useState<SearchBusiness[]>();

  const handleTopNavClick = (pathUrl: string) => {
    router.push(pathUrl);
  };

  const handleProfilePress = () => {
    router.push("/profile");
  };

  const handleLogoutPress = async () => {
    const res = await logoutUserAction();

    if (res.success) {
      router.replace("/signin");
    }
  };

  const handleSearchInput = async (value: string) => {
    setSearch(value);
    if (value.length < 3) {
      setShowSearch(false);
      return;
    }
    !showSearch && setShowSearch(true);

    setSearching(true);

    switch (true) {
      case pathUrl.includes("forums"):
        setSearchTitle("forums");
        const fResp = await searchForumByTextAction(value);
        setSearching(false);
        if (fResp.success) {
          setForums(fResp.forums);
        }
        break;
      case pathUrl.includes("business"):
        setSearchTitle("business");
        const bResp = await searchBusinessByTextAction(value);
        setSearching(false);
        if (bResp.success) {
          setBusinesses(bResp.businesses);
        }
        break;
      default:
        setSearchTitle("posts");
        const resp = await searchPostByTextAction(value);
        setSearching(false);
        if (resp.success) {
          setPosts(resp.posts);
        }
        break;
    }
  };

  const profileImage = user.profileImage
    ? `${user.profileImage}?width=70&height=70`
    : "";

  const renderSearch = () => {
    if (searching) {
      return;
    }
    switch (true) {
      case pathUrl.includes("forums"):
        if (!forums || forums.length === 0) {
          return <p className="text-sm">No forums found, try again!</p>;
        }
        return forums.flatMap((item) => (
          <SearchForumCard
            key={item.id}
            forum={item}
            cleanupFunction={cleanupFunction}
          />
        ));
      case pathUrl.includes("business"):
        if (!businesses || businesses.length === 0) {
          return <p className="text-sm">No businesses found, try again!</p>;
        }
        return businesses.flatMap((item) => (
          <SearchBusinessCard
            key={item.id}
            business={item}
            cleanupFunction={cleanupFunction}
          />
        ));
      default:
        if (!posts || posts.length === 0) {
          return <p className="text-sm">No posts found, try again!</p>;
        }
        return posts.flatMap((item) => (
          <SearchPostCard
            key={item.id}
            post={item}
            cleanupFunction={cleanupFunction}
          />
        ));
    }
  };

  const cleanupFunction = () => {
    setShowSearch(false);
    setSearch("");
    setSearching(false);
    setPosts(undefined);
    setForums(undefined);
    setBusinesses(undefined);
  };

  useEffect(() => {
    const handleOutSideClick = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        cleanupFunction();
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  useEffect(() => {
    switch (true) {
      case pathUrl.includes("forums"):
        setSearchTitle("forums");
        break;
      case pathUrl.includes("business"):
        setSearchTitle("business");
        break;
      default:
        setSearchTitle("posts");
        break;
    }
  }, [pathUrl]);

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
        <div className="relative" ref={ref}>
          <Input
            classNames={{
              base: "sm:w-[22rem] h-11",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder={`Type to search ${searchTitle}...`}
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
            value={search}
            onValueChange={handleSearchInput}
          />
          {showSearch && (
            <div className="bg-default-100 h-96 absolute mt-1 w-full rounded-xl py-2 px-1 flex flex-col items-center overflow-y-auto">
              {searching && <Spinner size="sm" />}
              <div className="flex flex-col gap-1 w-full items-center">
                {renderSearch()}
              </div>
            </div>
          )}
        </div>
        <Dropdown placement="bottom-end" shouldBlockScroll={false}>
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform hover:cursor-pointer"
              color="secondary"
              name={`${user.name}`}
              src={profileImage}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              key="profile"
              className="h-14 gap-2"
              onPress={handleProfilePress}
            >
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user.email}</p>
            </DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onPress={handleLogoutPress}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default HomeHeader;
