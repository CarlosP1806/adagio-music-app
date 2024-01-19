import type { PracticeSession } from "../constants/types";
import { db } from "../db/db.server";

// CRUD OPERATIONS

// Return a list of all practice sessions
export const getAllSessions = async (): Promise<PracticeSession[]> => {
  return db.practiceSession.findMany();
};

// Return a session by id
export const getSessionById = async (
  id: number
): Promise<PracticeSession | null> => {
  return db.practiceSession.findUnique({
    where: {
      id,
    },
  });
};

// Create a new practice session
export const createSession = async (
  session: PracticeSession
): Promise<PracticeSession> => {
  return db.practiceSession.create({
    data: session,
  });
};

// Update a practice session
export const updateSession = async (
  id: number,
  session: PracticeSession
): Promise<PracticeSession | null> => {
  return db.practiceSession.update({
    where: {
      id,
    },
    data: session,
  });
};

// Delete a practice session
export const deleteSession = async (id: number): Promise<PracticeSession> => {
  return db.practiceSession.delete({
    where: {
      id,
    },
  });
};

// UTILITY FUNCTIONS

// Return list of sessions by user
export const getSessionsByUser = async (
  userId: number
): Promise<PracticeSession[]> => {
  return db.practiceSession.findMany({
    where: {
      userId: userId,
    },
  });
};

// Validate that the session belongs to the user
export const validateUser = async (
  sessionId: number,
  userId: number
): Promise<boolean> => {
  const session = await db.practiceSession.findUnique({
    where: {
      id: sessionId,
    },
  });

  if (!session) {
    return false;
  }

  return session.userId === userId;
};
