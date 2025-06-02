"use client";

import { fetchUserAction } from "@/src/app/(site)/(auth)/action";
import { fetchBusinessByIdAction } from "@/src/app/(site)/(home)/business/action";
import { User } from "@/src/types/user";
import { createClient } from "@/supabase/client";
import { Spinner } from "@heroui/react";
import { createContext, useContext, useEffect, useState } from "react";

type MaybeUser = User | null;

type UserContext = {
  user: MaybeUser;
  setUser: (user: MaybeUser) => void;
};

// @ts-ignore
const Context = createContext<UserContext>();

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<MaybeUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const user = await fetchUserAction();

      if (user) {
        setUser(user);
      }
      setLoading(false);
    };

    getUser();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Context.Provider value={{ user, setUser }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSession = () => useContext(Context);
