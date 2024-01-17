import { Router } from "express";
import * as fileService from "../services/fileStorage.service";
import {
  getRecording,
  uploadRecording,
} from "../controllers/recording.controller";

export const router = Router();

router
  .route("/upload")
  .post(fileService.upload.single("file"), uploadRecording);
router.route("/getFile/:fileName").get(getRecording);
