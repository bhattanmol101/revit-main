import { ForumPost, ForumT } from "@/src/types/forum";
import { create } from "zustand";

// State types
interface States {
  forums: ForumT[];
  feed: ForumPost[];
}

// Action types
interface Actions {
  setForums: (forums: ForumT[]) => void;
  setFeed: (posts: ForumPost[]) => void;
}

// useCounterStore
export const useForumStore = create<States & Actions>((set) => ({
  // States
  forums: [],
  feed: [],
  // Actions
  setForums: (forums: ForumT[]) => set(() => ({ forums: forums })),
  setFeed: (posts: ForumPost[]) => set(() => ({ feed: posts })),
}));
