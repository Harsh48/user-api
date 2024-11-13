// src/routes/cacheRoutes.ts
import express from "express";
import { getCacheStatus, clearCache } from "../controllers/cacheController";

const router = express.Router();

router.get("/cache-status", getCacheStatus);
router.delete("/cache", clearCache);

export default router;
