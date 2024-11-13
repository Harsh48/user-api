// src/controllers/cacheController.ts
import { Request, Response } from "express";
import cacheService from "../services/cacheService";

export const getCacheStatus = (req: Request, res: Response) => {
  res.json(cacheService.stats);
};

export const clearCache = (req: Request, res: Response) => {
  cacheService.reset();
  res.json({ message: "Cache cleared" });
};
