"use client";

import { Tabs, Tab } from "@heroui/tabs";
import React, { useEffect, useState } from "react";
import { Spinner } from "@heroui/spinner";
import { Post } from "@/src/types/post";
import PostCard from "../Post/Card";
import { useSession } from "../Provider";
import { getUserPostsAction } from "@/src/app/(site)/(home)/profile/action";
import ProfileDetails from "./Details";

function Profile() {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>();

  const fetchUserPosts = async () => {
    const postResp = await getUserPostsAction(user.id);

    setLoading(false);
    if (postResp.posts) {
      setPosts(postResp.posts);
    }
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

  console.log("User posts:", user);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="block sm:hidden">
        <ProfileDetails id={user.id} />
      </div>
      <Tabs aria-label="Options" fullWidth>
        <Tab
          key="posts"
          className="w-full flex flex-col items-center"
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

export default Profile;
