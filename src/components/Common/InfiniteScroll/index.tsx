"use client";

import { JSX, useEffect, useRef } from "react";

type InfiniteScrollProps = {
  render: JSX.Element;
  isLast: boolean;
  setPage: () => void;
};

export default function InfiniteScroll({
  render,
  isLast,
  setPage,
}: InfiniteScrollProps) {
  const postRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!postRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        setPage();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(postRef.current);
  }, [isLast]);

  return <div ref={postRef}>{render}</div>;
}
