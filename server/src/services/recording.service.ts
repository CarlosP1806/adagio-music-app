import type { Recording } from "../constants/types";
import { db } from "../db/db.server";

// Returns a list of all recordings
export const getAllRecordings = async (): Promise<Recording[]> => {
  return db.recording.findMany();
};

// Returns a recording by id
export const getRecordingById = async (
  id: number
): Promise<Recording | null> => {
  return db.recording.findUnique({
    where: {
      id: id,
    },
  });
};

// Create a new recording
export const createRecording = async (
  recording: Recording
): Promise<Recording> => {
  return db.recording.create({
    data: {
      filename: recording.filename,
      date: recording.date,
      userId: recording.userId,
      alias: recording.alias,
    },
  });
};

// Validate that the recording belongs to the user
export const validateUser = async (
  recordingId: number,
  userId: number
): Promise<boolean> => {
  const recording = await db.recording.findUnique({
    where: {
      id: recordingId,
    },
  });

  if (!recording) {
    return false;
  }

  return recording.userId === userId;
};

// Get a unique identifier for a recording stored in Google Cloud
export const getRecordingIdentifier = (
  userId: number,
  recordingId: number,
  filename: string
) => {
  return userId.toString() + "_" + recordingId.toString() + "_" + filename;
};
