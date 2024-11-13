"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCache = exports.getCacheStatus = void 0;
const cacheService_1 = __importDefault(require("../services/cacheService"));
const getCacheStatus = (req, res) => {
    res.json(cacheService_1.default.stats);
};
exports.getCacheStatus = getCacheStatus;
const clearCache = (req, res) => {
    cacheService_1.default.reset();
    res.json({ message: "Cache cleared" });
};
exports.clearCache = clearCache;
