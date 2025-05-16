import { createClient } from "@/supabase/client";

export const fetchUserAction = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) return null;

  return user;
};
