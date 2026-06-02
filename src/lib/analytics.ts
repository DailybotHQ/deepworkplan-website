/**
 * Analytics utility for tracking custom events.
 * Uses Umami's event tracking API.
 * Gracefully degrades if analytics is not loaded.
 */

interface UmamiWindow extends Window {
  umami?: {
    track: (
      eventName: string,
      eventData?: Record<string, string | number>
    ) => void;
  };
}

/**
 * Centralized event name catalog.
 * All event names are defined here to ensure consistency across the codebase.
 */
export const EVENTS = {
  NAV_CLICK: 'nav_click',
  LANGUAGE_SWITCH: 'language_switch',
  MOBILE_MENU_TOGGLE: 'mobile_menu_toggle',
  THEME_TOGGLE: 'theme_toggle',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  CONTACT_FORM_ERROR: 'contact_form_error',
  SOCIAL_CLICK: 'social_click',
  OUTBOUND_CLICK: 'outbound_click',
  SCROLL_DEPTH: 'scroll_depth',
  AI_BOT_VISIT: 'ai_bot_visit',
} as const;

/**
 * Track a custom event via Umami.
 * @param eventName - Name of the event (e.g., 'nav_click', 'outbound_click')
 * @param eventData - Optional data payload
 */
export function trackEvent(
  eventName: string,
  eventData?: Record<string, string | number>
): void {
  const win = typeof window !== 'undefined' ? (window as UmamiWindow) : null;
  if (win?.umami) {
    win.umami.track(eventName, eventData);
  }
}

/**
 * Track scroll depth milestones (25%, 50%, 75%, 100%).
 * Each threshold fires only once per page load.
 * Uses a passive scroll listener for zero performance impact.
 */
export function trackScrollDepth(): void {
  if (typeof window === 'undefined') return;

  const thresholds = [25, 50, 75, 100];
  const fired = new Set<number>();

  function onScroll(): void {
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    const percent = Math.round((window.scrollY / docHeight) * 100);

    for (const threshold of thresholds) {
      if (percent >= threshold && !fired.has(threshold)) {
        fired.add(threshold);
        trackEvent(EVENTS.SCROLL_DEPTH, { depth: threshold });
      }
    }

    if (fired.size === thresholds.length) {
      window.removeEventListener('scroll', onScroll);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

/**
 * Set up global outbound link tracking via delegated click listener.
 * Fires 'outbound_click' for clicks on links pointing to external domains.
 * Skips links that already have data-umami-event attributes to avoid double-tracking.
 */
let outboundTrackingSetUp = false;

export function setupOutboundTracking(): void {
  if (typeof window === 'undefined' || outboundTrackingSetUp) return;
  outboundTrackingSetUp = true;

  document.addEventListener('click', (e: MouseEvent) => {
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>(
      'a[href]'
    );
    if (!link) return;

    // Skip links already tracked via data attributes
    if (link.hasAttribute('data-umami-event')) return;

    const href = link.getAttribute('href');
    if (
      !href ||
      href.startsWith('/') ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('javascript:')
    )
      return;

    try {
      const url = new URL(href, window.location.origin);
      if (url.hostname !== window.location.hostname) {
        trackEvent(EVENTS.OUTBOUND_CLICK, {
          url: url.hostname + url.pathname,
        });
      }
    } catch {
      // Invalid URL, skip
    }
  });
}
