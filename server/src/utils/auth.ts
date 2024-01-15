import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET;

interface payloadInterface {
  username: string;
  email: string;
  id: number;
}

export interface authenticatedRequest extends Request {
  userId?: number;
}

export const authMiddleware = async (
  req: authenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.auth_token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(token, SECRET as string) as payloadInterface;
    req.userId = payload.id;
  } catch (err: any) {
    return res.status(401).json({ error: "Invalid token" });
  }

  next();
};

export const signToken = ({ username, email, id }: payloadInterface) => {
  const payload = { username, email, id };
  return jwt.sign(payload, SECRET as string);
};
