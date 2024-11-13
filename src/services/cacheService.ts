// src/services/cacheService.ts
import { LRUCache } from "lru-cache";
import { CACHE_MAX_ITEMS, CACHE_TTL } from "../config/cacheConfig";
import { monitorCacheHit, monitorCacheMiss } from "../utils/metrics";
import { User } from "../models/userModel";

class CacheService {
  private cache = new LRUCache<number, User>({ max: CACHE_MAX_ITEMS, ttl: CACHE_TTL });
  private hitCount = 0;
  private missCount = 0;
  private totalResponseTime = 0;
  private requestCount = 0;

  // Get method with internal response time tracking and hit/miss logging
  get(key: number): User | undefined {
    // Start timing the cache access
    const start = Date.now();
    
    // Attempt to retrieve the user from the cache
    const result = this.cache.get(key);
    
    // Calculate response time and add it to the total response time
    const responseTime = Date.now() - start;
    this.totalResponseTime += responseTime;
    this.requestCount++;

    // Track hit or miss
    if (result) {
      this.hitCount++;
      monitorCacheHit.inc();
    } else {
      this.missCount++;
      monitorCacheMiss.inc();
    }

    return result;
  }

  // Set method to add items to the cache
  set(key: number, value: User) {
    this.cache.set(key, value);
  }

  // Method to get cache statistics including average response time
  get stats() {
    const averageResponseTime = this.requestCount > 0 ? this.totalResponseTime / this.requestCount : 0;
    return {
      size: this.cache.size,
      hits: this.hitCount,
      misses: this.missCount,
      averageResponseTime: averageResponseTime.toFixed(2) + " ms"
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
}

export default new CacheService();
