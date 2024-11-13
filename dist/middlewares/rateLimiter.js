"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.burstLimiter = exports.rateLimiter = void 0;
// src/middlewares/rateLimiter.ts
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 10,
    message: "Too many requests from this IP, please try again later.",
});
exports.burstLimiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 1000,
    max: 5,
    message: "Too many requests in a short time, please slow down.",
});
