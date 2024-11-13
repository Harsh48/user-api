"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const asyncWrapper_1 = require("../utils/asyncWrapper");
const router = express_1.default.Router();
router.get("/users/:id", (0, asyncWrapper_1.asyncWrapper)(userController_1.getUserById));
router.post("/users", (0, asyncWrapper_1.asyncWrapper)(userController_1.createUser));
exports.default = router;
