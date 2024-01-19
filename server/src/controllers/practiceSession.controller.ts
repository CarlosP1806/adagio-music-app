import { Request, Response } from "express";
import * as practiceSessionService from "../services/practiceSession.service";
import { authenticatedRequest } from "../utils/auth";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

// Return all the practice sessions from the requested user
export const getAllSessions = async (req: Request, res: Response) => {
  try {
    const practiceSessions = await practiceSessionService.getAllSessions();
    return res.status(200).json(practiceSessions);
  } catch (err: any) {
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export const createSession = async (
  req: authenticatedRequest,
  res: Response
) => {
  if (!req.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const userId = req.userId;
    const session = await practiceSessionService.createSession({
      ...req.body,
      userId,
    });
    return res.status(200).json(session);
  } catch (err: any) {
    if (err instanceof PrismaClientValidationError) {
      console.log(err);
      return res.status(400).json({ error: "Invalid fields" });
    }
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};
