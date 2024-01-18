import { Router } from "express";
import * as fileService from "../services/fileStorage.service";
import {
  getRecording,
  uploadRecording,
} from "../controllers/recording.controller";
import { authMiddleware } from "../utils/auth";

export const router = Router();

router
  .route("/upload")
  .post(authMiddleware, fileService.upload.single("file"), uploadRecording);
router.route("/:id").get(authMiddleware, getRecording);
