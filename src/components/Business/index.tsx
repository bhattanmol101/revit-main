"use client";

import { ForumT } from "@/src/types/forum";
import { Key, useEffect, useState } from "react";
import ForumCard from "./Card";
import {
  fetchUserCreatedForumsAction,
  fetchUserJoinedForumsAction,
} from "@/src/app/(site)/(home)/forums/action";
import { Tab, Tabs } from "@heroui/react";
import { useSession } from "../Provider";
import ForumSkeleton from "../Common/Skeletons/Forum";

export default function Business() {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const [adminForums, setAdminForums] = useState<ForumT[]>([]);
  const [joinedForums, setJoinedForums] = useState<ForumT[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [selected, setSelected] = useState<string>("admin");

  const onSelectionChange = (key: Key) => {
    setSelected(key.toString());
  };

  const renderForum = (forums: ForumT[]) => {
    if (loading) {
      return <ForumSkeleton count={3} />;
    }
    return forums.length ? (
      forums.flatMap((forum: ForumT) => (
        <ForumCard key={forum.id} forum={forum} />
      ))
    ) : (
      <p className="text-center pt-2">
        No forums available please create or search to join one.
      </p>
    );
  };

  let tabs = [
    {
      id: "admin",
      label: "Your Forums",
      content: renderForum(adminForums),
    },
    {
      id: "joined",
      label: "Joined Forums",
      content: renderForum(joinedForums),
    },
  ];

  const fetchAdminForums = async () => {
    const resp = await fetchUserCreatedForumsAction(user.id);
    setLoading(false);
    if (resp.forums) {
      setAdminForums(resp.forums);
    }
  };

  const fetchJoinedForums = async () => {
    const resp = await fetchUserJoinedForumsAction(user.id);

    if (resp.forums) {
      setJoinedForums(resp.forums);
    }
  };

  const fetchForums = async () => {
    await Promise.all([fetchAdminForums(), fetchJoinedForums()]);
  };

  useEffect(() => {
    fetchForums();
  }, []);

  return (
    <>
      <Tabs
        fullWidth
        aria-label="Forums"
        items={tabs}
        variant="bordered"
        selectedKey={selected}
        onSelectionChange={onSelectionChange}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {item.content}
          </Tab>
        )}
      </Tabs>
    </>
  );
}
