export const EXPERIENCE = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;

export type User = {
  id: number;
  email: string;
  password: string;
  username: string;
  experience: (typeof EXPERIENCE)[number];
  instrument: string;
};

export type UserSignupInputs = Omit<User, "id">;

export type UserIdentifier = Pick<User, "id" | "username">;