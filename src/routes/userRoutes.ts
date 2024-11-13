// src/routes/userRoutes.ts
import express from "express";
import { getUserById, createUser } from "../controllers/userController";
import { asyncWrapper } from "../utils/asyncWrapper";

const router = express.Router();

router.get("/users/:id", asyncWrapper(getUserById));
router.post("/users", asyncWrapper(createUser));

export default router;
