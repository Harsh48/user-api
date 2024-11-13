// src/app.ts
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import cacheRoutes from "./routes/cacheRoutes";
import { rateLimiter, burstLimiter } from "./middlewares/rateLimiter";
import { monitorRequests } from "./middlewares/monitor";
import { errorHandler } from "./middlewares/errorHandler";
import { metricsEndpoint } from "./utils/metrics";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(monitorRequests);
app.use(rateLimiter);
app.use(burstLimiter);
app.use("/api", userRoutes);
app.use("/api", cacheRoutes);
app.get("/metrics", metricsEndpoint);


app.use(errorHandler);

export default app;
