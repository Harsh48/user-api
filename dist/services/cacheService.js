"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/cacheService.ts
const lru_cache_1 = require("lru-cache");
const cacheConfig_1 = require("../config/cacheConfig");
const metrics_1 = require("../utils/metrics");
class CacheService {
    constructor() {
        // Initialize LRU cache with ttl and max items
        this.cache = new lru_cache_1.LRUCache({
            max: cacheConfig_1.CACHE_MAX_ITEMS,
            ttl: cacheConfig_1.CACHE_TTL,
        });
        this.hitCount = 0;
        this.missCount = 0;
    }
    // Get method with hit/miss tracking
    get(key) {
        const result = this.cache.get(key);
        if (result) {
            this.hitCount++;
            metrics_1.monitorCacheHit.inc();
        }
        else {
            this.missCount++;
            metrics_1.monitorCacheHit.inc();
        }
        return result;
    }
    // Set method to add items to the cache
    set(key, value) {
        this.cache.set(key, value);
    }
    // Method to get cache statistics
    get stats() {
        return {
            size: this.cache.size,
            hits: this.hitCount,
            misses: this.missCount,
        };
    }
    // Method to reset the cache and stats
    reset() {
        this.cache.clear();
        this.hitCount = 0;
        this.missCount = 0;
    }
}
exports.default = new CacheService();
