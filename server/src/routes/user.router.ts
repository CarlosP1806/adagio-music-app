import { Router } from "express";
import {
  deleteCurrentUser,
  getCurrentUser,
  login,
  registerUser,
  updateCurrentUser,
} from "../controllers/user.controller";
import { authMiddleware } from "../utils/auth";

export const router = Router();

router
  .route("/")
  .get(authMiddleware, getCurrentUser)
  .put(authMiddleware, updateCurrentUser)
  .delete(authMiddleware, deleteCurrentUser);
router.route("/signup").post(registerUser);
router.route("/login").post(login);
