import { Request, Response } from "express";
import * as practiceSessionService from "../../services/practice-session/practiceSession.service";

// Return all the practice sessions from the requested user
export const getAllSessions = async (req: Request, res: Response) => {
  try {
    const practiceSessions = await practiceSessionService.getAllSessions();
    return res.status(200).json(practiceSessions);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
