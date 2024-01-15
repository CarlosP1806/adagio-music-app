import { Router } from "express";
import {
  getCurrentUser,
  login,
  registerUser,
} from "../controllers/user.controller";
import { authMiddleware } from "../utils/auth";

export const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(login);
router.route("/me").get(authMiddleware, getCurrentUser);
