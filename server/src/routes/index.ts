import { Router } from "express";
import { router as practiceSessionRouter } from "./practiceSession.router";

export const router = Router();

router.use("/practice-session", practiceSessionRouter);
