import { Request, Response } from "express";
import * as practiceSessionService from "../services/practiceSession.service";
import { authenticatedRequest } from "../utils/auth";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

// Route  GET /api/practice-session
// Return all the practice sessions
export const getAllSessions = async (req: Request, res: Response) => {
  try {
    const practiceSessions = await practiceSessionService.getAllSessions();
    return res.status(200).json(practiceSessions);
  } catch (err: any) {
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

// Route  POST /api/practice-session/
// Create a new practice session for the logged in user
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

// Route  PUT /api/practice-session/:id
// Update a practice session
export const updateSession = async (
  req: authenticatedRequest,
  res: Response
) => {
  if (!req.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const userId = req.userId;
    const sessionId = parseInt(req.params.id);

    const isOwner = await practiceSessionService.validateUser(
      sessionId,
      userId
    );
    if (!isOwner) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const session = await practiceSessionService.updateSession(
      sessionId,
      req.body
    );

    res.status(200).json(session);
  } catch (err: any) {
    if (err instanceof PrismaClientValidationError) {
      return res.status(400).json({ error: "Invalid fields" });
    }
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

// Route  DELETE /api/practice-session/:id
// Delete a practice session
export const deleteSession = async (
  req: authenticatedRequest,
  res: Response
) => {
  if (!req.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const userId = req.userId;
    const sessionId = parseInt(req.params.id);

    const isOwner = await practiceSessionService.validateUser(
      sessionId,
      userId
    );
    if (!isOwner) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const session = await practiceSessionService.deleteSession(sessionId);

    res.status(200).json(session);
  } catch (err: any) {
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};
