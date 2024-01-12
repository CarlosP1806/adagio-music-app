import { Router, Request, Response } from "express";
import * as practiceSessionController from "../controllers/practice-session/practiceSession.controller";

export const router = Router();

// GET: List of all practice sessions
router.get("/", async (req: Request, res: Response) => {
  try {
    const practiceSessions =
      await practiceSessionController.getAllPracticeSessions();
    return res.status(200).json(practiceSessions);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});
