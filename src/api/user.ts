import { InsertProfile } from "@/db/schema/user";
import { UpdateUser, User } from "../types/user";
import {
  fetchUserById,
  insertUserProfile,
  updateUserProfile,
} from "../repo/user";

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
    const id = await updateUserProfile(userId, userRequest);

    return id;
  } catch (e: any) {
    return null;
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await fetchUserById(userId);

    if (!user) {
      return null;
    }

    return user;
  } catch (e: any) {
    return null;
  }
}
