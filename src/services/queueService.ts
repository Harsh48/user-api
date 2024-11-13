// src/services/queueService.ts
import Queue from "bull";
import mockUsers from "../utils/mockData";
import cacheService from "./cacheService";
import { User } from "../models/userModel";

interface UserRequest {
  userId: number;
}

const userQueue = new Queue<UserRequest>("user-fetch-queue");

userQueue.process(async (job) => {
  const { userId } = job.data;
  await new Promise((resolve) => setTimeout(resolve, 200)); // Simulate delay

  const user: User | undefined = mockUsers[userId];
  
  // Only cache the user if it’s not already cached
  if (user && !cacheService.get(userId)) {
    cacheService.set(userId, user);
  }

  return user;
});

export default userQueue;
