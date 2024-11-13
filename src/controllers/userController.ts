// src/controllers/userController.ts
import { Request, Response } from "express";
import userService from "../services/userService";

export const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = await userService.getUserById(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
};

export const createUser = (req: Request, res: Response) => {
  const { id, name, email } = req.body;

  if (!id || !name || !email) {
    return res.status(400).json({ error: "Missing user information" });
  }

  const newUser = userService.createUser(id, name, email);
  res.status(201).json({ message: "User created", data: newUser });
};
