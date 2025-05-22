"use client";

import { useSession } from "@/src/components/Provider";

export default function BusinessReviewPage() {
  const { user } = useSession();
  if (!user) {
    return;
  }

  return (
    <div className="pt-4 pb-8 px-5 bg-default-50 rounded-xl">
      <p className="pb-6 font-bold text-default-600 text-lg">
        Thank you for your review
      </p>
    </div>
  );
}
