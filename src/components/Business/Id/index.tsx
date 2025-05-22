"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Button, useDisclosure, Divider, Spinner } from "@heroui/react";
import { useParams } from "next/navigation";

import { ForumPost, ForumT } from "@/src/types/forum";
import {
  addUserToForumAction,
  fetchForumByIdAction,
  getForumPostsAction,
} from "@/src/app/(site)/(home)/forums/action";
import { getJoingDateString } from "@/src/utils/date-utils";
import { ContactIcon, LocationIcon, StarIcon, WebsiteIcon } from "../../Icons";
import { useForumStore } from "@/src/app/store/Forum/Feed";
import InfiniteScroll from "../../Common/InfiniteScroll";
import PostCard from "../../Post/Card";
import { Post } from "@/src/types/post";
import PostSkeleton from "../../Common/Skeletons/Post";
import ForumSkeleton from "../../Common/Skeletons/Forum";
import ForumPostCreateModal from "../Post/Create";
import ForumMenu from "./Menu";
import { useSession } from "../../Provider";
import {
  fetchBusinessByIdAction,
  fetchBusinessReviewsAction,
} from "@/src/app/(site)/(home)/business/action";
import { Business } from "@/src/types/business";
import { useBusinessStore } from "@/src/app/store/Business/Feed";
import { BusinessReview } from "@/src/types/review";
import BusinessReviewCard from "../Review";
import BusinessReviewSkeleton from "../../Common/Skeletons/Business/Review";

export default function BusinessReviews() {
  const { user } = useSession();
  if (!user) {
    return;
  }

  const { id } = useParams();
  if (!id) {
    return;
  }

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);

  const { feed, setFeed } = useBusinessStore((state) => state);

  const fetchBusinessReviews = async () => {
    const resp = await fetchBusinessReviewsAction(String(id));

    setLoading(false);

    if (resp.reviews) {
      setFeed(resp.reviews);
    }
  };

  useEffect(() => {
    fetchBusinessReviews();
  }, []);

  if (loading) {
    return <BusinessReviewSkeleton count={3} />;
  }

  const renderPosts = (review: BusinessReview) => {
    return <BusinessReviewCard review={review} key={review.id} />;
  };

  return (
    <div className="w-full">
      {feed.length ? (
        feed.map(renderPosts)
      ) : (
        <div className="flex flex-col justify-center items-center py-3">
          <p>No reviews yet, Be the first one to revit.</p>
        </div>
      )}
    </div>
  );
}
