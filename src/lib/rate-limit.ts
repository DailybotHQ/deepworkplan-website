/**
 * Rate-limit contract for the agent API (RFC 9331 header vocabulary).
 *
 * Every /api/* response carries `RateLimit-Limit`, `RateLimit-Remaining`,
 * `RateLimit-Reset`, and `RateLimit-Policy`; tripped requests additionally get
 * `Retry-After` and a 429 (wired in functions/_middleware.ts). The names are
 * deliberately the four hyphenated `RateLimit-*` headers of RFC 9331 (and its
 * predecessors) so scanners and agents find exactly what they probe for.
 *
 * Enforcement is a **fixed-window counter in per-isolate memory** — a
 * best-effort signal, not a platform-global guarantee: each Cloudflare Pages
 * isolate (and each PoP) counts independently, isolates are recycled, and
 * Cloudflare's own platform protections remain the real bound against abuse.
 * The headers' value is the real-time signal that lets well-behaved agents
 * self-throttle, which is what the agent-readiness scanners ask for.
 *
 * Dependency-free on purpose: functions/_middleware.ts imports this module at
 * the Cloudflare edge, where Astro imports and the `@/` alias don't exist.
 */

/** Advisory contract: 120 requests per rolling 60-second window per client. */
export const RATE_LIMIT = { limit: 120, windowMs: 60_000 } as const;

/** RFC 9331 policy grammar: quota parameters on the RateLimit-Policy header. */
export const RATE_LIMIT_POLICY = 'q=120; window=60; burst=0';

/**
 * Hard cap on tracked keys so a hostile crowd cannot grow the Map without
 * bound. On overflow the oldest window is dropped — those callers simply start
 * a fresh window (never blocks, never crashes; it is an advisory limiter).
 */
const MAX_TRACKED_KEYS = 10_000;

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  /** Requests left in the current window (0 when tripped). */
  remaining: number;
  /** Seconds until the window resets (integer, per RFC 9331; 0 when tripped). */
  resetSeconds: number;
}

interface WindowState {
  windowStart: number;
  count: number;
}

export interface RateLimiter {
  check(key: string): RateLimitResult;
}

/**
 * Fixed-window limiter with an injected clock (`now` returns epoch ms) so unit
 * tests never depend on the real clock.
 *
 * Security: the key is the caller identity used **only** as an in-memory
 * counter key — it is never logged and never persisted.
 */
export function createRateLimiter(now: () => number): RateLimiter {
  const windows = new Map<string, WindowState>();

  const check = (key: string): RateLimitResult => {
    const timestamp = now();
    let state = windows.get(key);

    // Roll the window when it has elapsed.
    if (state && timestamp - state.windowStart >= RATE_LIMIT.windowMs) {
      windows.delete(key);
      state = undefined;
    }

    if (!state) {
      // Bound memory: evict the oldest window before admitting a new key.
      if (windows.size >= MAX_TRACKED_KEYS) {
        let oldestKey: string | null = null;
        let oldestStart = Number.POSITIVE_INFINITY;
        for (const [k, s] of windows) {
          if (s.windowStart < oldestStart) {
            oldestStart = s.windowStart;
            oldestKey = k;
          }
        }
        if (oldestKey !== null) {
          windows.delete(oldestKey);
        }
      }
      state = { windowStart: timestamp, count: 0 };
      windows.set(key, state);
    }

    state.count += 1;
    const tripped = state.count > RATE_LIMIT.limit;
    const elapsed = timestamp - state.windowStart;
    const resetSeconds = Math.max(
      0,
      Math.ceil((RATE_LIMIT.windowMs - elapsed) / 1000)
    );

    return {
      allowed: !tripped,
      limit: RATE_LIMIT.limit,
      remaining: tripped ? 0 : RATE_LIMIT.limit - state.count,
      resetSeconds: tripped ? 0 : resetSeconds,
    };
  };

  return { check };
}

/** The four RFC 9331 header names, for CORS exposure lists. */
export const RATE_LIMIT_HEADER_NAMES = [
  'RateLimit-Limit',
  'RateLimit-Remaining',
  'RateLimit-Reset',
  'RateLimit-Policy',
  'Retry-After',
] as const;

/** Render the response headers for one result (all statuses). */
export function rateLimitHeaders(
  result: RateLimitResult
): Record<string, string> {
  return {
    'RateLimit-Limit': String(result.limit),
    'RateLimit-Remaining': String(result.remaining),
    'RateLimit-Reset': String(result.resetSeconds),
    'RateLimit-Policy': RATE_LIMIT_POLICY,
  };
}

/** Seconds to advertise in `Retry-After` on a 429. */
export function retryAfterSeconds(result: RateLimitResult): number {
  // On a tripped result resetSeconds is 0 by contract; the retry hint is the
  // full window from the tripped request's perspective, capped at the window
  // length so a late arrival cannot advertise a longer wait than one window.
  return result.resetSeconds > 0
    ? result.resetSeconds
    : Math.ceil(RATE_LIMIT.windowMs / 1000);
}
