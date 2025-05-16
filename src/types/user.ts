export type SignupUser = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  profileImage?: string | null;
  bio?: string | null;
  dob?: Date | null;
  createdAt: Date;
};

export type UpdateUser = {
  name: string;
  profileImage: string;
  bio: string;
  dob: Date;
};
