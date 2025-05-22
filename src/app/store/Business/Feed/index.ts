import { Business } from "@/src/types/business";
import { BusinessReview } from "@/src/types/review";
import { create } from "zustand";

// State types
interface States {
  businesses: Business[];
  feed: BusinessReview[];
}

// Action types
interface Actions {
  setBusinesses: (businesses: Business[]) => void;
  setFeed: (reviews: BusinessReview[]) => void;
}

// useCounterStore
export const useBusinessStore = create<States & Actions>((set) => ({
  // States
  businesses: [],
  feed: [],
  // Actions
  setBusinesses: (businesses: Business[]) =>
    set(() => ({ businesses: businesses })),
  setFeed: (reviews: BusinessReview[]) => set(() => ({ feed: reviews })),
}));
