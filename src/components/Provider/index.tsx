"use client";

import { createClient } from "@/supabase/client";
import { Spinner } from "@heroui/react";
import { User } from "@supabase/supabase-js";
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

      if (!error) setUser(user);
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
