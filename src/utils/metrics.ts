// src/utils/metrics.ts
import client from "prom-client";
import { Request, Response } from "express";

export const monitorRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
});

export const monitorCacheHit = new client.Counter({
  name: "cache_hit_count",
  help: "Number of cache hits",
});

export const monitorCacheMiss = new client.Counter({
  name: "cache_miss_count",
  help: "Number of cache misses",
});

export const metricsEndpoint = async (_req: Request, res: Response) => {
  res.set("Content-Type", client.register.contentType);
  res.send(await client.register.metrics());
};