import type { Note } from "../constants/types";
import { db } from "../db/db.server";

// CRUD OPERATIONS

// Return a list of all notes
export const getAllNotes = async (): Promise<Note[]> => {
  return db.note.findMany();
};

// Return a note by id
export const getNoteById = async (id: number): Promise<Note | null> => {
  return db.note.findUnique({
    where: {
      id,
    },
  });
};

// Create a new note
export const createNote = async (note: Note): Promise<Note> => {
  return db.note.create({
    data: note,
  });
};

// Update a note
export const updateNote = async (
  id: number,
  note: Note
): Promise<Note | null> => {
  return db.note.update({
    where: {
      id,
    },
    data: note,
  });
};

// Delete a note
export const deleteNote = async (id: number): Promise<Note> => {
  return db.note.delete({
    where: {
      id,
    },
  });
};

// UTILITY FUNCTIONS

// Return list of notes by session
export const getNotesBySession = async (sessionId: number): Promise<Note[]> => {
  return db.note.findMany({
    where: {
      sessionId,
    },
  });
};

// Return the notes of a list of sessions
export const getNotesBySessions = async (
  sessionIds: number[]
): Promise<Note[]> => {
  return db.note.findMany({
    where: {
      sessionId: {
        in: sessionIds,
      },
    },
  });
};
