"use client";

import { usePathname } from "next/navigation";
import { useSession } from "../../Provider";
import { fetchTopForumsAction } from "@/src/app/(site)/(home)/forums/action";
import { ForumT } from "@/src/types/forum";
import ForumCard from "../../Forum/Card";
import { useEffect, useState } from "react";
import { routes } from "@/src/utils/routes";
import { Spinner } from "@heroui/react";
import { getTopPostsAction } from "@/src/app/(site)/(home)/home/action";
import { Post } from "@/src/types/post";
import PostCard from "../../Post/Card";

const RightSideBar = () => {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const pathName = usePathname();

  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const [post, setPost] = useState<Post>();
  const [forums, setForums] = useState<ForumT[]>([]);

  getTopPostsAction;

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
    if (!forums) {
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
        return post && renderPost(post);
      case pathName.includes(routes.forums):
        return forums.length ? forums.flatMap(renderForum) : <></>;
      default:
        console.log("default");
    }
  };

  const renderForum = (forum: ForumT) => {
    return <ForumCard key={forum.id} forum={forum} />;
  };

  const renderPost = (post: Post) => {
    return <PostCard post={post} />;
  };

  return (
    <div className="fixed w-4/12 py-5 pr-20">
      <div className="flex flex-col items-start">
        <div className="rounded-xl px-5 py-3 w-full flex flex-row gap-4 bg-default-50 text-default-600 text-sm">
          <p>{title}</p>
        </div>
        <div className="flex flex-col items-center mt-3 w-full">
          {loading && <Spinner className="self-center" size="sm" />}
          {handleRender()}
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
