import { describe, expect, it } from 'vitest';

import {
  createRateLimiter,
  RATE_LIMIT,
  RATE_LIMIT_HEADER_NAMES,
  RATE_LIMIT_POLICY,
  rateLimitHeaders,
  retryAfterSeconds,
} from '@/lib/rate-limit';

/** Deterministic clock — the module never touches Date.now on its own. */
function fakeClock(startMs = 1_000_000) {
  let t = startMs;
  return {
    now: () => t,
    advance: (ms: number) => {
      t += ms;
    },
  };
}

describe('createRateLimiter (fixed window, injected clock)', () => {
  it('allows the first request and reports the full window', () => {
    const clock = fakeClock();
    const limiter = createRateLimiter(clock.now);
    const result = limiter.check('client-a');
    expect(result).toEqual({
      allowed: true,
      limit: RATE_LIMIT.limit,
      remaining: RATE_LIMIT.limit - 1,
      resetSeconds: 60,
    });
  });

  it('decrements remaining on each request within the window', () => {
    const clock = fakeClock();
    const limiter = createRateLimiter(clock.now);
    expect(limiter.check('client-a').remaining).toBe(RATE_LIMIT.limit - 1);
    expect(limiter.check('client-a').remaining).toBe(RATE_LIMIT.limit - 2);
    expect(limiter.check('client-a').remaining).toBe(RATE_LIMIT.limit - 3);
  });

  it('computes resetSeconds from the window start', () => {
    const clock = fakeClock();
    const limiter = createRateLimiter(clock.now);
    limiter.check('client-a'); // window starts here
    clock.advance(10_000); // 10s into the window
    const result = limiter.check('client-a');
    expect(result.resetSeconds).toBe(50);
  });

  it('rolls the window after windowMs and resets the count', () => {
    const clock = fakeClock();
    const limiter = createRateLimiter(clock.now);
    limiter.check('client-a');
    limiter.check('client-a');
    clock.advance(RATE_LIMIT.windowMs + 1);
    const result = limiter.check('client-a');
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(RATE_LIMIT.limit - 1);
    expect(result.resetSeconds).toBe(60);
  });

  it('trips past the limit: allowed false, remaining 0, reset 0', () => {
    const clock = fakeClock();
    const limiter = createRateLimiter(clock.now);
    for (let i = 0; i < RATE_LIMIT.limit; i += 1) {
      expect(limiter.check('client-a').allowed).toBe(true);
    }
    const tripped = limiter.check('client-a');
    expect(tripped.allowed).toBe(false);
    expect(tripped.remaining).toBe(0);
    expect(tripped.resetSeconds).toBe(0);
    expect(retryAfterSeconds(tripped)).toBeGreaterThan(0);
  });

  it('keeps tripped callers blocked until the window rolls', () => {
    const clock = fakeClock();
    const limiter = createRateLimiter(clock.now);
    for (let i = 0; i < RATE_LIMIT.limit + 5; i += 1) {
      limiter.check('client-a');
    }
    expect(limiter.check('client-a').allowed).toBe(false);
    clock.advance(RATE_LIMIT.windowMs);
    expect(limiter.check('client-a').allowed).toBe(true);
  });

  it('isolates distinct keys', () => {
    const clock = fakeClock();
    const limiter = createRateLimiter(clock.now);
    for (let i = 0; i < RATE_LIMIT.limit; i += 1) {
      limiter.check('client-a');
    }
    expect(limiter.check('client-a').allowed).toBe(false);
    const other = limiter.check('client-b');
    expect(other.allowed).toBe(true);
    expect(other.remaining).toBe(RATE_LIMIT.limit - 1);
  });
});

describe('rateLimitHeaders', () => {
  it('renders exactly the four RFC 9331 header names as strings', () => {
    const clock = fakeClock();
    const limiter = createRateLimiter(clock.now);
    const headers = rateLimitHeaders(limiter.check('client-a'));
    expect(Object.keys(headers).sort()).toEqual(
      [
        'RateLimit-Limit',
        'RateLimit-Policy',
        'RateLimit-Remaining',
        'RateLimit-Reset',
      ].sort()
    );
    expect(headers['RateLimit-Limit']).toBe('120');
    expect(headers['RateLimit-Remaining']).toBe('119');
    expect(headers['RateLimit-Reset']).toBe('60');
    expect(headers['RateLimit-Policy']).toBe(RATE_LIMIT_POLICY);
  });

  it('exports the header names (plus Retry-After) for CORS exposure lists', () => {
    expect([...RATE_LIMIT_HEADER_NAMES]).toEqual([
      'RateLimit-Limit',
      'RateLimit-Remaining',
      'RateLimit-Reset',
      'RateLimit-Policy',
      'Retry-After',
    ]);
  });
});

describe('retryAfterSeconds', () => {
  it('returns the reset wait for a passing result', () => {
    const clock = fakeClock();
    const limiter = createRateLimiter(clock.now);
    limiter.check('client-a'); // window starts here
    clock.advance(30_000);
    expect(retryAfterSeconds(limiter.check('client-a'))).toBe(30);
  });

  it('advertises one full window when tripped (resetSeconds is 0)', () => {
    const clock = fakeClock();
    const limiter = createRateLimiter(clock.now);
    for (let i = 0; i < RATE_LIMIT.limit; i += 1) {
      limiter.check('client-a');
    }
    const tripped = limiter.check('client-a');
    expect(retryAfterSeconds(tripped)).toBe(RATE_LIMIT.windowMs / 1000);
  });
});

describe('memory bound', () => {
  it('evicts the oldest window when the key cap is reached', () => {
    const clock = fakeClock();
    const limiter = createRateLimiter(clock.now);
    // Fill the map to its cap with distinct keys.
    limiter.check('key-1');
    for (let i = 2; i <= 10_000; i += 1) {
      limiter.check(`key-${i}`);
    }
    // One more key forces eviction of the oldest window ('key-1').
    limiter.check('key-10001');
    // The evicted key starts a FRESH window (count 1), not its old count 2.
    const fresh = limiter.check('key-1');
    expect(fresh.allowed).toBe(true);
    expect(fresh.remaining).toBe(RATE_LIMIT.limit - 1);
  });
});
