/**
 * In-memory fixed-window limiter keyed by IP. On serverless this is per-instance
 * (resets on cold start, not shared across lambdas) — a speed bump, not a wall. It
 * sits alongside the honeypot and the unique-email constraint. Upgrade path: Upstash
 * Redis or similar.
 */
type Entry = { count: number; reset: number };

const buckets = new Map<string, Entry>();

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now > entry.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  entry.count += 1;
  if (entry.count > limit) {
    return { ok: false, retryAfter: Math.ceil((entry.reset - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

// Opportunistic cleanup so the map can't grow unbounded on a long-lived instance.
if (typeof setInterval === "function") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of buckets) {
      if (now > entry.reset) buckets.delete(key);
    }
  }, 5 * 60_000).unref?.();
}
