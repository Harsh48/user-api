// src/services/userService.ts
import cacheService from "./cacheService";
import userQueue from "./queueService";
import mockUsers from "../utils/mockData";
import { User } from "../models/userModel";

class UserService {
  private pendingRequests: Map<number, Promise<User | undefined>> = new Map();

  async getUserById(userId: number): Promise<User | undefined> {
    // Check if the user is already cached
    let user = cacheService.get(userId);
    if (user) {
      return user; // Return the cached user if available
    }

    // If there's an existing request for this userId, return the pending Promise
    if (this.pendingRequests.has(userId)) {
      return this.pendingRequests.get(userId)!;
    }

    // Initiate a new request and add it to pendingRequests
    const fetchUserPromise = this.fetchUser(userId);
    this.pendingRequests.set(userId, fetchUserPromise);

    try {
      user = await fetchUserPromise;

      // Only cache the user if it’s not already cached by another request
      if (user && !cacheService.get(userId)) {
        cacheService.set(userId, user);
      }

      return user;
    } finally {
      this.pendingRequests.delete(userId);
    }
  }

  private async fetchUser(userId: number): Promise<User | undefined> {
    const job = await userQueue.add({ userId });
    return await job.finished();
  }

  createUser(id: number, name: string, email: string): User {
    const newUser = { id, name, email };
    mockUsers[id] = newUser;
    cacheService.set(id, newUser);
    return newUser;
  }
}

export default new UserService();
