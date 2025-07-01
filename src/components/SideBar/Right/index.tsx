"use client";

import { useParams, usePathname } from "next/navigation";
import { useSession } from "../../Provider";
import { fetchTopForumsAction } from "@/src/app/(site)/(home)/forums/action";
import { Forum } from "@/src/types/forum";
import ForumCard from "../../Forum/Card";
import { useEffect, useState } from "react";
import { routes } from "@/src/utils/routes";
import { Spinner } from "@heroui/react";
import { getTopPostsAction } from "@/src/app/(site)/(home)/home/action";
import { Post } from "@/src/types/post";
import { fetchBusinessByIdAction } from "@/src/app/(site)/(home)/business/action";
import { Business } from "@/src/types/business";
import BusinessDetails from "../../Business/Id/Business";
import { User } from "@/src/types/user";
import { fetchUserProfileAction } from "@/src/app/(site)/(home)/profile/action";
import ProfileDetails from "../../Profile/Details";
import RightPostCard from "../../Post/Card/Right";
import LeftSideBar from "../Left";

const RightSideBar = () => {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const pathName = usePathname();

  const { id } = useParams();

  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const [post, setPost] = useState<Post[]>();
  const [forums, setForums] = useState<Forum[]>([]);

  const fetchTopPost = async () => {
    if (!post) {
      setLoading(true);
      const resp = await getTopPostsAction("");

      if (resp.post) {
        setPost(resp.post);
      }
      setLoading(false);
    }
  };

  const fetchTopForums = async () => {
    if (!forums.length) {
      setLoading(true);
      const resp = await fetchTopForumsAction("");

      if (resp.forums) {
        setForums(resp.forums);
      }
      setLoading(false);
    }
  };

  const handlePathNameUpdate = async () => {
    switch (true) {
      case pathName.includes(routes.home):
        fetchTopPost();
        setTitle("Top Reviews");
        break;
      case pathName.includes(routes.forums):
        fetchTopForums();
        setTitle("Top Forums to Join");
        break;
      case pathName === routes.business:
        setTitle("");
        break;
      default:
        console.log("default");
    }
  };

  useEffect(() => {
    handlePathNameUpdate();
  }, [pathName]);

  const handleRender = () => {
    switch (true) {
      case pathName.includes(routes.home):
        return (
          <div className="flex flex-col items-center mt-3 w-full">
            {post && post.flatMap(renderPost)}
          </div>
        );
      case pathName.includes(routes.forums):
        return (
          <div className="flex flex-col items-center mt-3 w-full">
            {forums.length ? forums.flatMap(renderForum) : <></>}
          </div>
        );
      case pathName === routes.business:
        return null;
      case pathName.includes(`${routes.business}/`):
        return (
          <div className="flex flex-col items-center w-full">
            <BusinessDetails businessId={String(id)} />
          </div>
        );
      case pathName.includes(`${routes.profile}`):
        return (
          <div className="flex flex-col items-center w-full">
            <ProfileDetails id={String(id)} />
          </div>
        );
      default:
        console.log("default");
    }
  };

  const renderForum = (forum: Forum) => {
    return <ForumCard key={forum.id} forum={forum} />;
  };

  const renderPost = (post: Post) => {
    return <RightPostCard key={post.id} post={post} />;
  };

  return (
    <div className="fixed w-4/12 lg:py-5 pt-1 lg:pr-20 pr-4">
      <div className="flex flex-col items-start">
        <div className="w-full block lg:hidden">
          <LeftSideBar />
        </div>
        {title && (
          <div className="rounded-xl px-5 py-3 w-full bg-default-50 text-default-600 text-sm font-semibold">
            <p>{title}</p>
          </div>
        )}

        {loading && <Spinner className="self-center mt-2" size="sm" />}
        {!loading && handleRender()}
      </div>
    </div>
  );
};

export default RightSideBar;
