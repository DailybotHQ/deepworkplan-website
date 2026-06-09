import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  EVENTS,
  setupOutboundTracking,
  trackEvent,
  trackScrollDepth,
} from '@/lib/analytics';

// ─── Helpers ───────────────────────────────────────────

/** Install a fresh Umami mock on window and return its track spy. */
function mockUmami(): ReturnType<typeof vi.fn> {
  const track = vi.fn();
  (window as unknown as { umami?: { track: unknown } }).umami = { track };
  return track;
}

/** Drive the scroll geometry happy-dom does not compute on its own. */
function setScrollGeometry(opts: {
  scrollY: number;
  scrollHeight: number;
  innerHeight: number;
}): void {
  Object.defineProperty(window, 'scrollY', {
    value: opts.scrollY,
    configurable: true,
  });
  Object.defineProperty(window, 'innerHeight', {
    value: opts.innerHeight,
    configurable: true,
  });
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    value: opts.scrollHeight,
    configurable: true,
  });
}

afterEach(() => {
  delete (window as unknown as { umami?: unknown }).umami;
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

// ─── EVENTS catalog (stable contract) ──────────────────

describe('EVENTS', () => {
  it('exposes the documented client event names', () => {
    expect(EVENTS.OUTBOUND_CLICK).toBe('outbound_click');
    expect(EVENTS.SCROLL_DEPTH).toBe('scroll_depth');
    expect(EVENTS.NAV_CLICK).toBe('nav_click');
    expect(EVENTS.CTA_CLICK).toBe('cta_click');
  });

  it('has unique, non-empty string values for every event', () => {
    const values = Object.values(EVENTS);
    expect(values.every((v) => typeof v === 'string' && v.length > 0)).toBe(
      true
    );
    expect(new Set(values).size).toBe(values.length);
  });
});

// ─── trackEvent ────────────────────────────────────────

describe('trackEvent', () => {
  it('forwards the event name and payload to umami.track', () => {
    const track = mockUmami();
    trackEvent(EVENTS.CTA_CLICK, { label: 'init', position: 1 });
    expect(track).toHaveBeenCalledTimes(1);
    expect(track).toHaveBeenCalledWith(EVENTS.CTA_CLICK, {
      label: 'init',
      position: 1,
    });
  });

  it('passes through with no payload', () => {
    const track = mockUmami();
    trackEvent(EVENTS.THEME_TOGGLE);
    expect(track).toHaveBeenCalledWith(EVENTS.THEME_TOGGLE, undefined);
  });

  it('degrades gracefully when umami is not loaded', () => {
    delete (window as unknown as { umami?: unknown }).umami;
    expect(() => trackEvent(EVENTS.NAV_CLICK)).not.toThrow();
  });
});

// ─── trackScrollDepth ──────────────────────────────────

describe('trackScrollDepth', () => {
  it('fires each depth milestone once, in order, then stops', () => {
    const track = mockUmami();
    // docHeight = 1000 - ... no: scrollHeight - innerHeight = 2000 - 1000 = 1000
    setScrollGeometry({ scrollY: 0, scrollHeight: 2000, innerHeight: 1000 });
    trackScrollDepth();

    const scrollTo = (y: number) => {
      Object.defineProperty(window, 'scrollY', {
        value: y,
        configurable: true,
      });
      window.dispatchEvent(new Event('scroll'));
    };

    scrollTo(250); // 25%
    scrollTo(250); // still 25% — must not double-fire
    scrollTo(500); // 50%
    scrollTo(750); // 75%
    scrollTo(1000); // 100%

    const depths = track.mock.calls
      .filter(([name]) => name === EVENTS.SCROLL_DEPTH)
      .map(([, data]) => (data as { depth: number }).depth);
    expect(depths).toEqual([25, 50, 75, 100]);
  });

  it('does nothing when the document is not scrollable (docHeight <= 0)', () => {
    const track = mockUmami();
    setScrollGeometry({ scrollY: 0, scrollHeight: 600, innerHeight: 1000 });
    trackScrollDepth();
    Object.defineProperty(window, 'scrollY', {
      value: 300,
      configurable: true,
    });
    window.dispatchEvent(new Event('scroll'));
    expect(track).not.toHaveBeenCalled();
  });
});

// ─── setupOutboundTracking ─────────────────────────────

describe('setupOutboundTracking', () => {
  function clickLink(attrs: Record<string, string>): void {
    const a = document.createElement('a');
    for (const [k, v] of Object.entries(attrs)) a.setAttribute(k, v);
    a.textContent = 'link';
    document.body.appendChild(a);
    a.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  }

  beforeEach(() => {
    // Idempotent by design (module-level flag); safe to call before each test.
    setupOutboundTracking();
  });

  it('tracks a click on an external link with host + path', () => {
    const track = mockUmami();
    clickLink({ href: 'https://example.com/pricing' });
    expect(track).toHaveBeenCalledWith(EVENTS.OUTBOUND_CLICK, {
      url: 'example.com/pricing',
    });
  });

  it('ignores internal, hash, and mailto links', () => {
    const track = mockUmami();
    clickLink({ href: '/methodology' });
    clickLink({ href: '#section' });
    clickLink({ href: 'mailto:hi@deepworkplan.com' });
    expect(track).not.toHaveBeenCalled();
  });

  it('skips links already instrumented with data-umami-event', () => {
    const track = mockUmami();
    clickLink({
      href: 'https://example.com/x',
      'data-umami-event': 'cta_click',
    });
    expect(track).not.toHaveBeenCalled();
  });

  it('degrades gracefully on an external click when umami is absent', () => {
    delete (window as unknown as { umami?: unknown }).umami;
    expect(() => clickLink({ href: 'https://example.com/y' })).not.toThrow();
  });
});
