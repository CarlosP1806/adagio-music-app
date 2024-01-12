import { PracticeSession } from '@prisma/client';
import { db } from '../../db/db.server';

// @Route  GET /api/practice-session
// Returns a list of all practice sessions
export const getAllPracticeSessions = async (): Promise<PracticeSession[]> => {
  return db.practiceSession.findMany({
    select: {
      id: true,
      startTime: true,
      endTime: true,
      satisfaction: true,
    }
  });
};