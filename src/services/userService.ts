// src/services/userService.ts
import cacheService from "./cacheService";
import userQueue from "./queueService";
import mockUsers from "../utils/mockData";
import { User } from "../models/userModel";

class UserService {
  // Map to track ongoing requests for each user ID
  private pendingRequests: Map<number, Promise<User | undefined>> = new Map();

  // Retrieve user by ID, handling concurrent requests for the same ID
  async getUserById(userId: number): Promise<User | undefined> {
    // Check if the user is already cached
    let user = cacheService.get(userId);
    if (user) {
      return user; // Return the cached user if available
    }

    // If there's an existing request for this userId, return the pending Promise
    if (this.pendingRequests.has(userId)) {
      return this.pendingRequests.get(userId)!; // Return the existing promise
    }

    // If not, create a new request and store the Promise in pendingRequests
    const fetchUserPromise = this.fetchUser(userId);
    this.pendingRequests.set(userId, fetchUserPromise);

    try {
      user = await fetchUserPromise;
      if (user) {
        cacheService.set(userId, user); // Cache the result if the user is found
      }
      return user;
    } finally {
      // Remove the request from pendingRequests regardless of success or failure
      this.pendingRequests.delete(userId);
    }
  }

  // Helper function to fetch the user from mock data or queue
  private async fetchUser(userId: number): Promise<User | undefined> {
    // Simulate database call with queue
    const job = await userQueue.add({ userId });
    return await job.finished();
  }

  // Create a new user and cache it
  createUser(id: number, name: string, email: string): User {
    const newUser = { id, name, email };
    mockUsers[id] = newUser; // Add to mock data
    cacheService.set(id, newUser); // Cache the new user
    return newUser;
  }
}

export default new UserService();
