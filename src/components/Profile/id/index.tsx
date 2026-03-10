"use client";

import { Tabs, Tab } from "@heroui/tabs";
import React, { useEffect, useState } from "react";
import { Spinner } from "@heroui/spinner";
import { Post } from "@/src/types/post";
import PostCard from "../../Post/Card";
import { getUserPostsAction } from "@/src/app/(site)/(home)/profile/action";
import ProfileDetails from "../Details";
import { useParams } from "next/navigation";

function ProfileById() {
  const { id } = useParams();

  if (!id) {
    return;
  }

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>();

  const fetchUserPosts = async () => {
    const postResp = await getUserPostsAction(String(id));

    if (postResp.posts) {
      setPosts(postResp.posts);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  if (loading) {
    return <Spinner className="self-center w-full pt-2" size="sm" />;
  }

  const renderPosts = (post: Post) => {
    return <PostCard key={post.id} post={post} />;
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="block sm:hidden w-full mb-2">
        <ProfileDetails id={String(id)} />
      </div>
      <Tabs aria-label="Options" fullWidth>
        <Tab
          key="posts"
          className="w-full flex flex-col items-center text-tiny sm:text-sm"
          title="Posts"
        >
          {posts ? (
            posts.flatMap(renderPosts)
          ) : (
            <p className="text-tiny sm:text-sm text-center">No posts yet...</p>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}

export default ProfileById;
