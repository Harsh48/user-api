"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monitorRequests = void 0;
const metrics_1 = require("../utils/metrics");
const monitorRequests = (req, res, next) => {
    const end = metrics_1.monitorRequestDuration.startTimer({ method: req.method, route: req.path });
    res.on("finish", () => {
        end({ status: res.statusCode });
    });
    next();
};
exports.monitorRequests = monitorRequests;
