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
// src/services/userService.ts
const cacheService_1 = __importDefault(require("./cacheService"));
const queueService_1 = __importDefault(require("./queueService"));
const mockData_1 = __importDefault(require("../utils/mockData"));
class UserService {
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = cacheService_1.default.get(userId);
            if (!user) {
                const job = yield queueService_1.default.add({ userId });
                user = yield job.finished();
            }
            return user;
        });
    }
    createUser(id, name, email) {
        const newUser = { id, name, email };
        mockData_1.default[id] = newUser;
        cacheService_1.default.set(id, newUser);
        return newUser;
    }
}
exports.default = new UserService();
