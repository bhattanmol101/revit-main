import { InsertProfile } from "@/db/schema/user";
import { UpdateUser, User } from "../types/user";
import { insertUserProfile, updateUserProfile } from "../repo/user";

export async function saveUserProfile(user: User) {
  try {
    // save the details in the profile table as well
    const profileUser: InsertProfile = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: new Date(user.createdAt),
      profileImage: user.profileImage,
    };
    await insertUserProfile(profileUser);

    return;
  } catch (e: any) {
    return e.message;
  }
}

export async function updateUser(userId: string, userRequest: UpdateUser) {
  try {
    await updateUserProfile(userId, userRequest);

    return { success: true, error: "" };
  } catch (e: any) {
    return {
      success: false,
      error: e.message,
    };
  }
}
