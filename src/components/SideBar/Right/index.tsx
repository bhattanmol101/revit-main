"use client";

import { useParams, usePathname } from "next/navigation";
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
import { fetchBusinessByIdAction } from "@/src/app/(site)/(home)/business/action";
import { Business } from "@/src/types/business";
import BusinessDetails from "../../Business/Id/Business";

const RightSideBar = () => {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const pathName = usePathname();

  const { id } = useParams();

  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const [post, setPost] = useState<Post>();
  const [forums, setForums] = useState<ForumT[]>([]);
  const [business, setBusiness] = useState<Business>();

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

  const fetchBusiness = async () => {
    if (!id) {
      return;
    }
    if (!business) {
      setLoading(true);
      const resp = await fetchBusinessByIdAction(String(id));

      setLoading(false);
      if (resp.business) {
        setBusiness(resp.business);
      }
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
      case pathName.includes(`${routes.business}/`):
        fetchBusiness();
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
            {post && renderPost(post)}
          </div>
        );
      case pathName.includes(routes.forums):
        return (
          <div className="flex flex-col items-center mt-3 w-full">
            {forums.length ? forums.flatMap(renderForum) : <></>}
          </div>
        );
      case pathName.includes(`${routes.business}/`):
        return (
          <div className="flex flex-col items-center w-full">
            {business ? (
              <BusinessDetails business={business} />
            ) : (
              <p>Could not find the business, Please try again!</p>
            )}
          </div>
        );
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
        {title && (
          <div className="rounded-xl px-5 py-3 w-full flex flex-row gap-4 bg-default-50 text-default-600 text-sm">
            <p>{title}</p>
          </div>
        )}

        {loading && <Spinner className="self-center" size="sm" />}
        {!loading && handleRender()}
      </div>
    </div>
  );
};

export default RightSideBar;
