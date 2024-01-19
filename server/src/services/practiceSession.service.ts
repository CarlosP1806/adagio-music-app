import type { PracticeSession } from "../constants/types";
import { db } from "../db/db.server";

// Return a list of all practice sessions
export const getAllSessions = async (): Promise<PracticeSession[]> => {
  return db.practiceSession.findMany();
};

// Create a new practice session
export const createSession = async (
  session: PracticeSession
): Promise<PracticeSession> => {
  return db.practiceSession.create({
    data: session,
  });
};

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
