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
// src/services/queueService.ts
const bull_1 = __importDefault(require("bull"));
const mockData_1 = __importDefault(require("../utils/mockData"));
const cacheService_1 = __importDefault(require("./cacheService"));
const userQueue = new bull_1.default("user-fetch-queue");
userQueue.process((job) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = job.data;
    yield new Promise((resolve) => setTimeout(resolve, 200)); // Simulate delay
    const user = mockData_1.default[userId];
    if (user) {
        cacheService_1.default.set(userId, user);
    }
    return user;
}));
exports.default = userQueue;
