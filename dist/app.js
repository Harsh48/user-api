"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cacheRoutes_1 = __importDefault(require("./routes/cacheRoutes"));
const rateLimiter_1 = require("./middlewares/rateLimiter");
const monitor_1 = require("./middlewares/monitor");
const errorHandler_1 = require("./middlewares/errorHandler");
const metrics_1 = require("./utils/metrics");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(monitor_1.monitorRequests);
app.use(rateLimiter_1.rateLimiter);
app.use(rateLimiter_1.burstLimiter);
app.use("/api", userRoutes_1.default);
app.use("/api", cacheRoutes_1.default);
app.get("/metrics", metrics_1.metricsEndpoint);
app.use(errorHandler_1.errorHandler);
exports.default = app;
