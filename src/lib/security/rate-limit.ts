export interface RateLimitOptions {
  limit: number;
  windowMs: number;
  trustedProxyHops?: number;
}

const memoryStore = new Map<string, { count: number; resetAt: number }>();

export function getClientIp(req: Request, trustedProxyHops = 1): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (!forwardedFor) {
    return "127.0.0.1";
  }

  const ips = forwardedFor.split(",").map((ip) => ip.trim());
  const index = Math.max(0, ips.length - trustedProxyHops);
  return ips[index] || "127.0.0.1";
}

export function checkRateLimit(
  key: string,
  options: RateLimitOptions = {
    limit: 60,
    windowMs: 60000,
    trustedProxyHops: 1,
  },
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = memoryStore.get(key);

  if (!entry || entry.resetAt <= now) {
    const resetAt = now + options.windowMs;
    memoryStore.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      remaining: options.limit - 1,
      resetAt,
    };
  }

  if (entry.count >= options.limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: options.limit - entry.count,
    resetAt: entry.resetAt,
  };
}
