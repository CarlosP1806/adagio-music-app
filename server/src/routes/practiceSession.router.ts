import { Router } from "express";
import {
  createSession,
  deleteSession,
  getAllSessions,
  updateSession,
} from "../controllers/practiceSession.controller";
import { authMiddleware } from "../utils/auth";
import { 
  createSessionNote, 
  deleteSessionNote, 
  getSessionNotes, 
  updateSessionNote 
} from "../controllers/note.controller";

export const router = Router();

router.route("/").get(getAllSessions).post(authMiddleware, createSession);
router
  .route("/:id")
  .put(authMiddleware, updateSession)
  .delete(authMiddleware, deleteSession);
router
  .route("/:id/note")
  .get(authMiddleware, getSessionNotes)
  .post(authMiddleware, createSessionNote);
router
  .route("/:id/note/:noteId")
  .delete(authMiddleware, deleteSessionNote)
  .put(authMiddleware, updateSessionNote);
