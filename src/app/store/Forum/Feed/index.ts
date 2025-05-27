import { ForumPost, Forum } from "@/src/types/forum";
import { create } from "zustand";

// State types
interface States {
  forums: Forum[];
  feed: ForumPost[];
}

// Action types
interface Actions {
  setForums: (forums: Forum[]) => void;
  setFeed: (posts: ForumPost[]) => void;
}

// useCounterStore
export const useForumStore = create<States & Actions>((set) => ({
  // States
  forums: [],
  feed: [],
  // Actions
  setForums: (forums: Forum[]) => set(() => ({ forums: forums })),
  setFeed: (posts: ForumPost[]) => set(() => ({ feed: posts })),
}));
