import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { authenticatedRequest, signToken } from "../utils/auth";
import { User } from "../constants/types";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

// @Route   POST /api/user/signup
// Creates and logs in a new user
export const registerUser = async (
  req: Request<{}, {}, User>,
  res: Response
) => {
  try {
    const user = await userService.createUser(req.body);
    const token = signToken({
      username: user.username,
      email: user.email,
      id: user.id,
    });
    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      domain: process.env.COOKIE_DOMAIN,
      sameSite: "lax",
    });
    res.status(201).json({ user, token });
  } catch (err: any) {
    // Check if the error is related to a duplicate entry
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

// @Route   POST /api/user/login
// Logs in an existing user
export const login = async (
  req: Request<{}, {}, { username: string; password: string }>,
  res: Response
) => {
  try {
    const user = await userService.getUserByUsername(req.body.username);
    if (!user) {
      return res.status(400).json({ error: "Invalid username" });
    }

    const isValidPassword = user.password === req.body.password;
    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = signToken({
      username: user.username,
      email: user.email,
      id: user.id,
    });
    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      domain: process.env.COOKIE_DOMAIN,
      sameSite: "lax",
    });
    res.status(200).json({ user, token });
  } catch (err: any) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

// @Route   GET /api/user/
// Gets the current user
export const getCurrentUser = async (
  req: authenticatedRequest,
  res: Response
) => {
  try {
    const user = await userService.getUserById(req.userId as number);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

// @Route   PUT /api/user/
// Updates the current user
export const updateCurrentUser = async (
  req: authenticatedRequest,
  res: Response
) => {
  try {
    const user = await userService.updateUser(req.userId as number, req.body);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err: any) {
    if (err instanceof PrismaClientValidationError) {
      return res.status(400).json({ error: "Invalid fields" });
    }
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

// @Route   DELETE /api/user/
// Deletes the current user
export const deleteCurrentUser = async (
  req: authenticatedRequest,
  res: Response
) => {
  try {
    const user = await userService.deleteUser(req.userId as number);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};
