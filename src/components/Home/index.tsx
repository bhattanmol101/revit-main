"use client";

import { useEffect, useState } from "react";
import PostCard from "../Post/Card";
import { Post } from "@/src/types/post";
import { getUserFeedAction } from "@/src/app/(site)/(home)/home/action";
import { useSession } from "../Provider";
import PostSkeleton from "../Common/Skeletons/Post";
import { Spinner } from "@heroui/react";
import InfiniteScroll from "../Common/InfiniteScroll";
import { useFeedStore } from "@/src/app/store/Feed";

export default function Home() {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const { feed, setFeed } = useFeedStore((state) => state);
  const [page, setPage] = useState(0);

  const [loading, setLoading] = useState<boolean>(true);

  const fetchPosts = async () => {
    const resp = await getUserFeedAction(user.id, page);

    if (resp.posts) {
      if (page === 0) {
        setFeed(resp.posts);
      } else {
        setFeed([...feed, ...resp.posts]);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  if (loading) {
    if (page === 0) {
      return <PostSkeleton count={2} />;
    }
  }

  if (!feed.length) {
    <p className="text-center mt-2 text-default-500 text-sm">
      No posts yet...
    </p>;
  }

  const renderPosts = (post: Post, index: number) => {
    return (
      <InfiniteScroll
        key={post.id}
        render={<PostCard post={post} />}
        isLast={index === feed.length - 1}
        setPage={() => setPage(page + 1)}
      />
    );
  };

  return (
    <div className="w-full">
      {/* {globalState.auth && (
        <div className="w-full flex flex-col sm:hidden mt-2">
          <Button
            fullWidth={true}
            radius="full"
            size="sm"
            type="submit"
            variant="shadow"
            onPress={onPostModalOpen}
          >
            <p className="text-sm">Want something reviewed...?</p>
          </Button>
          <Divider className="w-[98vw] mt-2" />
        </div>
      )} */}

      {feed.flatMap(renderPosts)}
      {loading && page != 0 && <Spinner className="w-full self-center my-2" />}
    </div>
  );
}
