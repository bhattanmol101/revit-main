"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Button, useDisclosure, Divider, Spinner } from "@heroui/react";
import { useParams } from "next/navigation";

import { ForumPostFeed, ForumT } from "@/src/types/forum";
import {
  fetchForumByIdAction,
  getForumPostsAction,
} from "@/src/app/(site)/(home)/forums/action";
import { getJoingDateString } from "@/src/utils/date-utils";
import { EditIcon } from "../../Icons";

export default function ForumById() {
  const { id } = useParams();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [loading, setLoading] = useState(true);

  const [forum, setForum] = useState<ForumT>();

  const [posts, setPosts] = useState<ForumPostFeed[]>();

  useEffect(() => {
    const fetchForum = async () => {
      const resp = await fetchForumByIdAction(String(id));

      setLoading(false);
      if (resp.forum) {
        setForum(resp.forum);
      }

      const posts = await getForumPostsAction(String(id), 0);

      if (posts) {
        setPosts(posts);
      }
    };

    fetchForum();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!forum) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p>Could not find the forum</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:w-full w-screen pt-3">
      <div className="flex flex-row justify-between items-start w-full px-2">
        <div className="flex flex-row items-center ">
          <Avatar
            showFallback
            className="sm:w-24 sm:h-24 h-20 w-20"
            src={String(forum.logo)}
          />
          <div className="pl-5">
            <p className="sm:text-xl font-bold">{forum.name}</p>
            <p className="text-default-600 sm:text-sm text-sm">
              Since: {getJoingDateString(new Date(forum.createdAt))}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 p-2">
          <Button
            color="primary"
            size="sm"
            spinnerPlacement="end"
            variant="flat"
          >
            Join
          </Button>
          <Button
            color="primary"
            size="sm"
            spinnerPlacement="end"
            variant="flat"
            onPress={onOpen}
          >
            Revit
          </Button>
          <Button
            isIconOnly
            color="default"
            size="sm"
            spinnerPlacement="end"
            onPress={onOpen}
          >
            <EditIcon size={20} />
          </Button>
        </div>
      </div>
      <Divider className="my-3" />
      <p className="text-default-700 sm:text-sm text-sm px-2">
        {forum.description}
      </p>
      <Divider className="mt-3 mb-1" />
      {/* {posts.loading && <Spinner size="sm" />}
      {posts &&
        posts.map((post: any) => (
          <FeedItemCard
            key={post.id}
            post={post}
            onFeedModalOpen={onOpenChange}
          />
        ))}
      <ForumPostModal
        forumId={id}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      /> */}
    </div>
  );
}
