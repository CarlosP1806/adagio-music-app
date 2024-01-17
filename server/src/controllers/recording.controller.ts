import * as fileService from "../services/fileStorage.service";
import { Request, Response } from "express";

export const uploadRecording = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const file = req.file;
  try {
    await fileService.uploadFile(file);
    res.status(200).json({ message: "File uploaded" });
  } catch (err) {
    res.status(500).json({ message: "File not uploaded boo" });
  }
};

export const getRecording = async (req: Request, res: Response) => {
  const { fileName } = req.params;
  try {
    const url = await fileService.getFileURL(fileName);
    res.json({ url });
  } catch (err) {
    res.status(403).send("Access denied");
  }
};
