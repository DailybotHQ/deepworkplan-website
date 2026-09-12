/**
 * Deprecation contract for the agent API: which paths are deprecated, when
 * they go away, and where to migrate. The mechanism ships before it is
 * needed — the map is empty today, so every request is a no-op.
 *
 * Semantics (policy documented on /developers and in openapi.json):
 *   - Breaking changes ship only in a new /api/v{N+1}/ family.
 *   - A deprecated endpoint answers with `Deprecation` (RFC 9745),
 *     `Sunset` (RFC 8594, HTTP-date of removal) and a
 *     `Link: <url>; rel="deprecation"` header, at least 180 days before
 *     the Sunset date.
 *
 * Dependency-free on purpose: functions/_middleware.ts imports this module at
 * the Cloudflare edge, where Astro imports and the `@/` alias don't exist.
 */

export interface DeprecationEntry {
  /** HTTP-date (RFC 7231 IMF-fixdate) when the endpoint is removed. */
  sunset: string;
  /** Migration target documented for agents. */
  link: string;
  /** When deprecation started (epoch seconds) — rendered as Deprecation true@<t>. */
  deprecatedSince: number;
}

/** Headers rendered from one entry. */
function headersFor(entry: DeprecationEntry): Record<string, string> {
  return {
    Deprecation: `true@${entry.deprecatedSince}`,
    Sunset: entry.sunset,
    Link: `<${entry.link}>; rel="deprecation"`,
  };
}

/**
 * Deprecated paths. Empty today — add entries when an endpoint is retired.
 * Keys are exact pathnames or wildcard prefixes ending in `/*`.
 */
export const DEPRECATED_PATHS: ReadonlyMap<string, DeprecationEntry> = new Map(
  []
);

/**
 * Deprecation headers for a request path, or null when the path is current.
 *
 * Matching: exact pathname first, then the longest `prefix/*` key whose
 * prefix (with its trailing slash) the pathname starts with. The map is
 * injectable so tests can exercise the header shape without touching the
 * (empty) production map.
 */
export function deprecationHeadersFor(
  pathname: string,
  map: ReadonlyMap<string, DeprecationEntry> = DEPRECATED_PATHS
): Record<string, string> | null {
  const exact = map.get(pathname);
  if (exact) {
    return headersFor(exact);
  }
  let bestKey: string | null = null;
  let bestEntry: DeprecationEntry | null = null;
  for (const [key, entry] of map) {
    if (!key.endsWith('/*')) continue;
    const prefix = key.slice(0, -1); // "…/*" -> "…/" (keeps the slash)
    if (pathname.startsWith(prefix)) {
      if (bestKey === null || key.length > bestKey.length) {
        bestKey = key;
        bestEntry = entry;
      }
    }
  }
  return bestEntry ? headersFor(bestEntry) : null;
}
