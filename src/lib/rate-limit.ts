import { LRUCache } from 'lru-cache';

interface RateLimitOptions {
  uniqueTokenPerInterval?: number;
  interval?: number;
  limit: number;
}

interface RateLimiter {
  check: (ip: string) => { success: boolean; remaining: number; reset: number };
}

function createRateLimiter(options: RateLimitOptions): RateLimiter {
  const tokenCache = new LRUCache<string, number[]>({
    max: options.uniqueTokenPerInterval ?? 500,
    ttl: options.interval ?? 60_000,
  });

  return {
    check(ip: string) {
      const now = Date.now();
      const windowStart = now - (options.interval ?? 60_000);
      const entries = (tokenCache.get(ip) ?? []).filter((t) => t > windowStart);

      if (entries.length >= options.limit) {
        return {
          success: false,
          remaining: 0,
          reset: Math.ceil((entries[0] + (options.interval ?? 60_000)) / 1000),
        };
      }

      entries.push(now);
      tokenCache.set(ip, entries);

      return {
        success: true,
        remaining: options.limit - entries.length,
        reset: Math.ceil((now + (options.interval ?? 60_000)) / 1000),
      };
    },
  };
}

/** 5 tentativas de login por IP a cada 15 minutos */
export const loginLimiter = createRateLimiter({
  limit: 5,
  interval: 15 * 60 * 1000,
  uniqueTokenPerInterval: 500,
});

/** 60 requests por minuto por IP */
export const apiLimiter = createRateLimiter({
  limit: 60,
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});
