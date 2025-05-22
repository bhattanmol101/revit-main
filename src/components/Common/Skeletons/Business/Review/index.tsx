import { Card, Skeleton } from "@heroui/react";

export default function BusinessReviewSkeleton({ count }: { count: number }) {
  return Array.from(Array(count), (e, i) => {
    return (
      <Card key={i} className="w-full space-y-3 p-4 pt-3 my-1.5" radius="lg">
        <div className="w-full flex items-center gap-3">
          <div>
            <Skeleton className="flex rounded-full w-12 h-12" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-4/5 rounded-lg" />
            <Skeleton className="h-2 w-3/5 rounded-lg" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="w-full rounded-lg">
            <div className="h-2 w-full rounded-lg bg-default-200" />
          </Skeleton>
        </div>
        <div className="space-y-2">
          <Skeleton className="w-full rounded-lg">
            <div className="h-2 w-full rounded-lg bg-default-200" />
          </Skeleton>
        </div>

        <div className="space-y-2" />

        <div className="flex flex-row gap-2">
          <Skeleton className="h-2 w-full rounded-lg" />
          <Skeleton className="h-2 w-full rounded-lg" />
        </div>
        <div className="flex flex-row gap-2">
          <Skeleton className="h-2 w-full rounded-lg" />
          <Skeleton className="h-2 w-full rounded-lg" />
        </div>
        <div className="flex flex-row gap-2">
          <Skeleton className="h-2 w-full rounded-lg" />
          <Skeleton className="h-2 w-full rounded-lg" />
        </div>
      </Card>
    );
  });
}
