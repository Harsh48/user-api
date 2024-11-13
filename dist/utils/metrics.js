"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsEndpoint = exports.monitorCacheMiss = exports.monitorCacheHit = exports.monitorRequestDuration = void 0;
// src/utils/metrics.ts
const prom_client_1 = __importDefault(require("prom-client"));
exports.monitorRequestDuration = new prom_client_1.default.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["method", "route", "status"],
});
exports.monitorCacheHit = new prom_client_1.default.Counter({
    name: "cache_hit_count",
    help: "Number of cache hits",
});
exports.monitorCacheMiss = new prom_client_1.default.Counter({
    name: "cache_miss_count",
    help: "Number of cache misses",
});
const metricsEndpoint = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.set("Content-Type", prom_client_1.default.register.contentType);
    res.send(yield prom_client_1.default.register.metrics());
});
exports.metricsEndpoint = metricsEndpoint;
