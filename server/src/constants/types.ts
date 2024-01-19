export const EXPERIENCE = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;

export type User = {
  id: number;
  email: string;
  password: string;
  username: string;
  experience: (typeof EXPERIENCE)[number];
  instrument: string;
};

export type PracticeSession = {
  id: number;
  startTime: Date;
  endTime: Date;
  userId: number;
  duration: number;
  satisfactionScore: number;
  comfortScore: number;
  difficultyScore: number;
  techniqueScore: number;
  musicalityScore: number;
};

export type Recording = {
  id: number;
  filename: string;
  date: Date;
  userId: number;
  alias: string;
};
