"use client";

import { fetchUserById } from "@/src/repo/user";
import { User } from "@/src/types/user";
import { createClient } from "@/supabase/client";
import { Spinner } from "@heroui/react";
import { createContext, useContext, useEffect, useState } from "react";

type MaybeUser = User | null;

type UserContext = {
  user: MaybeUser;
  setUser: (user: User) => void;
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
      const supabase = createClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!error && user) {
        setUser({
          id: user.id,
          email: user.user_metadata.email,
          name: user.user_metadata.name,
          createdAt: new Date(user.created_at),
        });
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
