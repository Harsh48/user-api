// src/middlewares/monitor.ts
import { Request, Response, NextFunction } from "express";
import { monitorRequestDuration } from "../utils/metrics";

export const monitorRequests = (req: Request, res: Response, next: NextFunction) => {
  const end = monitorRequestDuration.startTimer({ method: req.method, route: req.path });

  res.on("finish", () => {
    end({ status: res.statusCode });
  });

  next();
};
