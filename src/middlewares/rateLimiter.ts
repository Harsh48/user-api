// src/middlewares/rateLimiter.ts
import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Too many requests from this IP, please try again later.",
});

export const burstLimiter = rateLimit({
  windowMs: 10 * 1000,
  max: 5,
  message: "Too many requests in a short time, please slow down.",
});
