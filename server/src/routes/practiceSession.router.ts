import { Router } from "express";
import { getAllSessions } from "../controllers/practiceSession.controller";

export const router = Router();

// GET: List of all practice sessions
router.route("/").get(getAllSessions);
