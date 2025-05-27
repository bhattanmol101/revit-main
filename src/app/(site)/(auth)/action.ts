import { createClient } from "@/supabase/client";

export const fetchUserAction = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) return null;

  if (!user) return null;

  return {
    id: user.id,
    email: user.user_metadata.email,
    name: user.user_metadata.name,
    createdAt: new Date(user.created_at),
  };
};
