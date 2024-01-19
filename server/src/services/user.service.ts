import type { User } from "../constants/types";
import { db } from "../db/db.server";

// CRUD OPERATIONS

// Returns a list of all users
export const getAllUsers = async (): Promise<User[]> => {
  return db.user.findMany();
};

// Returns a user by id
export const getUserById = async (id: number): Promise<User | null> => {
  return db.user.findUnique({
    where: {
      id,
    },
  });
};

// Creates a new user
export const createUser = async (user: User): Promise<User> => {
  return db.user.create({
    data: user,
  });
};

// Updates a user
export const updateUser = async (
  id: number,
  user: User
): Promise<User | null> => {
  return db.user.update({
    where: {
      id,
    },
    data: user,
  });
};

// Deletes a user
export const deleteUser = async (id: number): Promise<User> => {
  return db.user.delete({
    where: {
      id,
    },
  });
};

// UTILITY FUNCTIONS

// Returns a user by username
export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  return db.user.findUnique({
    where: {
      username: username,
    },
  });
};
