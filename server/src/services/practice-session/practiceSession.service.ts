import type { PracticeSession } from "../../constants/types";
import { db } from "../../db/db.server";

// Returns a list of all practice sessions
export const getAllSessions = async (): Promise<PracticeSession[]> => {
  return db.practiceSession.findMany({
    select: {
      id: true,
      startTime: true,
      endTime: true,
      satisfaction: true,
      userId: true,
    },
  });
};

// Returns list of sessions by user
export const getSessionsByUser = async (
  userId: number
): Promise<PracticeSession[]> => {
  return db.practiceSession.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      startTime: true,
      endTime: true,
      satisfaction: true,
      userId: true,
    },
  });
};
