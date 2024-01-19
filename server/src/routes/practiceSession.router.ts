import { Router } from "express";
import {
  createSession,
  getAllSessions,
} from "../controllers/practiceSession.controller";
import { authMiddleware } from "../utils/auth";

export const router = Router();

// GET: List of all practice sessions
router.route("/").get(getAllSessions).post(authMiddleware, createSession);
