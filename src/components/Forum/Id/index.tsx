"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Button, useDisclosure, Divider, Spinner } from "@heroui/react";
import { useParams } from "next/navigation";

import { ForumPost, Forum } from "@/src/types/forum";
import {
  addUserToForumAction,
  fetchForumByIdAction,
  getForumPostsAction,
} from "@/src/app/(site)/(home)/forums/action";
import { getJoingDateString } from "@/src/utils/date-utils";
import { StarIcon } from "../../Icons";
import { useForumStore } from "@/src/app/store/Forum/Feed";
import InfiniteScroll from "../../Common/InfiniteScroll";
import PostCard from "../../Post/Card";
import { Post } from "@/src/types/post";
import PostSkeleton from "../../Common/Skeletons/Post";
import ForumSkeleton from "../../Common/Skeletons/Forum";
import ForumPostCreateModal from "../Post/Create";
import ForumMenu from "./Menu";
import { useSession } from "../../Provider";
import ForumPostCard from "../Post";

export default function ForumById() {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const { id } = useParams();

  if (!id) {
    return;
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [forum, setForum] = useState<Forum>();
  const { feed, setFeed } = useForumStore((state) => state);
  const [loading, setLoading] = useState(true);
  const [feedLoading, setFeedLoading] = useState(true);
  const [page, setPage] = useState(0);

  const fetchForum = async () => {
    const resp = await fetchForumByIdAction(user.id, String(id));

    setLoading(false);
    if (resp.forum) {
      setForum(resp.forum);
    }
  };

  const fetchForumPosts = async () => {
    setFeedLoading(true);

    const resp = await getForumPostsAction(String(id), page);

    setFeedLoading(false);
    if (resp.posts.length) {
      if (page === 0) {
        setFeed(resp.posts);
      } else {
        setFeed([...feed, ...resp.posts]);
      }
    }
  };

  useEffect(() => {
    fetchForum();
  }, []);

  useEffect(() => {
    fetchForumPosts();
  }, [page]);

  if (loading) {
    return (
      <>
        <ForumSkeleton count={1} />
        <PostSkeleton count={1} />
      </>
    );
  }

  if (!forum) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p>Could not find the forum</p>
      </div>
    );
  }

  const onJoinForumPress = async () => {
    setForum({ ...forum, joined: 1 });
    await addUserToForumAction(user.id, String(id));
  };

  const renderPosts = (post: ForumPost, index: number) => {
    return (
      <InfiniteScroll
        key={post.id}
        render={<ForumPostCard post={post} />}
        isLast={index === feed.length - 1}
        setPage={() => setPage(page + 1)}
      />
    );
  };

  return (
    <div className="pt-3">
      <div className="flex flex-col sm:w-full w-screen p-3 bg-default-50 rounded-xl">
        <div className="flex flex-row justify-between items-start w-full">
          <div className="flex flex-row items-center ">
            <Avatar
              showFallback
              name={`${forum.name}`}
              className="sm:w-24 sm:h-24 h-20 w-20"
              src={String(forum.logo)}
            />
            <div className="pl-5">
              <p className="sm:text-xl font-bold text-default-600">
                {forum.name}
              </p>
              <p className="text-default-500 text-sm pt-1">
                Creator: {forum.userName}
              </p>
              <p className="text-default-500 text-tiny pt-0.5">
                Since: {getJoingDateString(new Date(forum.createdAt))}
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-2 p-2">
            {forum.adminId !== user.id &&
              (forum.joined === 0 ? (
                <Button
                  color="primary"
                  size="sm"
                  variant="bordered"
                  spinnerPlacement="end"
                  onPress={onJoinForumPress}
                >
                  Join
                </Button>
              ) : (
                <Button
                  size="sm"
                  spinnerPlacement="end"
                  variant="bordered"
                  onPress={onOpen}
                >
                  <div className="flex flex-row justify-center items-center">
                    <StarIcon
                      size={16}
                      className="stroke-primary text-primary font-black"
                    />
                    <p className="text-default-600 ml-1 mt-0.5">Revit</p>
                  </div>
                </Button>
              ))}
            <ForumMenu forum={forum} />
          </div>
        </div>
        <Divider className="my-3" />
        <p className="text-default-700 sm:text-sm text-sm px-2">
          {forum.description}
        </p>
      </div>
      {feedLoading && page === 0 && <PostSkeleton count={1} />}
      {feed.length
        ? feed.flatMap(renderPosts)
        : !feedLoading && (
            <div className="flex flex-col justify-center items-center py-3">
              <p>
                No reviews yet
                {forum.adminId !== user.id &&
                  (forum.joined
                    ? ", Be the first one to add a review."
                    : ", Join and add your review.")}
              </p>
            </div>
          )}

      {feedLoading && page !== 0 && (
        <Spinner className="w-full self-center my-2" />
      )}

      {isOpen && (
        <ForumPostCreateModal
          forum={forum}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </div>
  );
}
