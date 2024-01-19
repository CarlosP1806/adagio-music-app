import { Router } from "express";
import {
  createSession,
  deleteSession,
  getAllSessions,
  updateSession,
} from "../controllers/practiceSession.controller";
import { authMiddleware } from "../utils/auth";

export const router = Router();

router.route("/").get(getAllSessions).post(authMiddleware, createSession);
router
  .route("/:id")
  .put(authMiddleware, updateSession)
  .delete(authMiddleware, deleteSession);
