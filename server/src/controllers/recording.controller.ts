import * as fileService from "../services/fileStorage.service";
import { NextFunction, Request, Response } from "express";

export const uploadRecording = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  if (!req.file.buffer) {
    return res.status(500).send("File buffer is empty");
  }

  const file = req.file;

  const blob = fileService.bucket.file(file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on("error", (err) => {
    next(err);
  });

  blobStream.on("finish", () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = `https://storage.googleapis.com/${fileService.bucket.name}/${blob.name}`;
    res
      .status(200)
      .json({ message: "File uploaded successfully", url: publicUrl });
  });

  // Stream the file to Google Cloud Storage
  blobStream.end(file.buffer);
};

export const getRecording = async (req: Request, res: Response) => {
  const { fileName } = req.params;
  try {
    const options = {
      version: "v4" as any,
      action: "read" as any,
      expires: Date.now() + 15 * 60 * 1000, // URL valid for 15 minutes
    };
    const url = await fileService.bucket.file(fileName).getSignedUrl(options);
    res.json({ url });
  } catch (err) {
    res.status(403).send("Access denied");
  }
};
