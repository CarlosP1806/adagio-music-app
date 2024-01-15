import type { User } from "../constants/types";
import { db } from "../db/db.server";

// Returns a list of all users
export const getAllUsers = async (): Promise<User[]> => {
  return db.user.findMany({
    select: {
      id: true,
      email: true,
      username: true,
      password: true,
      experience: true,
      instrument: true,
    },
  });
};

export const createUser = async (user: User): Promise<User> => {
  return db.user.create({
    data: {
      email: user.email,
      username: user.username,
      password: user.password,
      experience: user.experience,
      instrument: user.instrument,
    },
  });
};

export const getUserById = async (id: number): Promise<User | null> => {
  return db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      username: true,
      password: true,
      experience: true,
      instrument: true,
    },
  });
};

export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  return db.user.findUnique({
    where: {
      username: username,
    },
    select: {
      id: true,
      email: true,
      username: true,
      password: true,
      experience: true,
      instrument: true,
    },
  });
};
