import * as fileService from "../services/fileStorage.service";
import * as recordingService from "../services/recording.service";
import { Response } from "express";
import { authenticatedRequest } from "../utils/auth";

export const uploadRecording = async (
  req: authenticatedRequest,
  res: Response
) => {
  if (!req.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const file = req.file;
  const recordingData = {
    ...req.body,
    filename: file.originalname,
    userId: req.userId,
  };

  try {
    const recording = await recordingService.createRecording(recordingData);

    // Set the name to a unique identifier to store securely on Google Cloud
    file.originalname = recordingService.getRecordingIdentifier(
      req.userId,
      recording.id,
      recording.filename
    );
    await fileService.uploadFile(file);

    res.status(200).json(recording);
  } catch (err) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export const getRecording = async (
  req: authenticatedRequest,
  res: Response
) => {
  const { id } = req.params;
  if (!req.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const isValid = await recordingService.validateUser(
      parseInt(id),
      req.userId
    );
    if (!isValid) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const recording = await recordingService.getRecordingById(parseInt(id));
    if (!recording) {
      res.status(404).json({ error: "Recording not found" });
      return;
    }

    const cloudName = recordingService.getRecordingIdentifier(
      req.userId,
      recording.id,
      recording.filename
    );

    const url = await fileService.getFileURL(cloudName);
    res.json({ data: recording, url });
  } catch (err) {
    res.status(400).json({ error: "An unexpected error occurred" });
  }
};
