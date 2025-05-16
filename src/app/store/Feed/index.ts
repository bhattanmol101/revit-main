import { Post } from "@/src/types/post";
import { create } from "zustand";

// State types
interface States {
  feed: Post[];
}

// Action types
interface Actions {
  setFeed: (posts: Post[]) => void;
}

// useCounterStore
export const useFeedStore = create<States & Actions>((set) => ({
  // States
  feed: [],
  // Actions
  setFeed: (posts: Post[]) => set(() => ({ feed: posts })),
}));
