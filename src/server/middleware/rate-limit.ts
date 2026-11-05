import { createMiddleware } from "hono/factory";
import type { HonoEnv } from "../context";

type RateLimitRecord = {
  count: number;
  resetTime: number;
};

const ipRequestMap = new Map<string, RateLimitRecord>();

export function createRateLimiter(maxRequests = 60, windowMs = 60_000) {
  return createMiddleware<HonoEnv>(async (c, next) => {
    const ip =
      c.req.header("cf-connecting-ip") ??
      c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ??
      "127.0.0.1";

    const currentTime = Date.now();
    const existing = ipRequestMap.get(ip);

    if (!existing || currentTime > existing.resetTime) {
      ipRequestMap.set(ip, {
        count: 1,
        resetTime: currentTime + windowMs,
      });
      return await next();
    }

    if (existing.count >= maxRequests) {
      return c.json(
        {
          error: "Too many requests. Please wait before retrying.",
        },
        429,
      );
    }

    existing.count += 1;
    return await next();
  });
}
