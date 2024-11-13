// src/services/cacheService.ts
import { LRUCache } from "lru-cache";
import { CACHE_MAX_ITEMS, CACHE_TTL } from "../config/cacheConfig";
import { monitorCacheHit, monitorCacheMiss } from "../utils/metrics";
import { User } from "../models/userModel";

class CacheService {
  // Store both the user data and a timestamp
  private cache = new LRUCache<number, { data: User; timestamp: number }>({ max: CACHE_MAX_ITEMS });
  private hitCount = 0;
  private missCount = 0;
  private totalResponseTime = 0;
  private requestCount = 0;

  constructor() {
    // Start background task to remove stale entries
    this.startPruneTask();
  }

  // Get method with hit/miss tracking and response time logging
  get(key: number): User | undefined {
    const start = Date.now();
    const entry = this.cache.get(key);
    const responseTime = Date.now() - start;

    this.totalResponseTime += responseTime;
    this.requestCount++;

    // Check if the entry is still valid
    if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
      this.hitCount++;
      monitorCacheHit.inc();
      return entry.data;
    } else if (entry) {
      // If the entry is expired, delete it
      this.cache.delete(key);
    }

    this.missCount++;
    monitorCacheMiss.inc();
    return undefined;
  }

  // Set method to add items to the cache with timestamp
  set(key: number, value: User) {
    this.cache.set(key, { data: value, timestamp: Date.now() });
  }

  // Method to get cache statistics
  get stats() {
    const averageResponseTime = this.requestCount > 0 ? this.totalResponseTime / this.requestCount : 0;
    return {
      size: this.cache.size,
      hits: this.hitCount,
      misses: this.missCount,
      averageResponseTime: averageResponseTime.toFixed(2) + " ms",
    };
  }

  // Method to reset the cache and statistics
  reset() {
    this.cache.clear();
    this.hitCount = 0;
    this.missCount = 0;
    this.totalResponseTime = 0;
    this.requestCount = 0;
  }

  // Background task to manually clear stale entries
  private startPruneTask() {
    setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of this.cache.entries()) {
        if (now - entry.timestamp >= CACHE_TTL) {
          this.cache.delete(key);
        }
      }
    }, 10000); // Runs every 10 seconds
  }
}

export default new CacheService();
