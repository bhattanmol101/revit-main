"use client";

import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Tabs, Tab } from "@heroui/tabs";
import { useDisclosure } from "@heroui/modal";
import React, { useEffect, useState } from "react";
import { Divider } from "@heroui/divider";
import { Spinner } from "@heroui/spinner";
import { useRouter } from "next/navigation";
import { User } from "@/src/types/user";
import { Post } from "@/src/types/post";
import { EditIcon } from "../Icons";
import { getJoingDateString, getPostDateString } from "@/src/utils/date-utils";
import PostCard from "../Post/Card";
import EditProfileModal from "./Edit";
import { useSession } from "../Provider";
import {
  fetchUserProfileAction,
  getUserPostsAction,
} from "@/src/app/(site)/(home)/profile/action";
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

  return (
    <div className="flex flex-col items-center w-full">
      <ProfileDetails />
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
