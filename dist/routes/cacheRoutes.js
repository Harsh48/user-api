"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/cacheRoutes.ts
const express_1 = __importDefault(require("express"));
const cacheController_1 = require("../controllers/cacheController");
const router = express_1.default.Router();
router.get("/cache-status", cacheController_1.getCacheStatus);
router.delete("/cache", cacheController_1.clearCache);
exports.default = router;
