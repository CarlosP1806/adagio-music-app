import { Router } from "express";
import { router as practiceSessionRouter } from "./practiceSession.router";
import { router as userRouter } from "./user.router";

export const router = Router();

router.use("/practice-session", practiceSessionRouter);
router.use("/user", userRouter);
