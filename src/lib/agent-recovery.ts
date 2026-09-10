/**
 * Agent recovery payloads: structured JSON errors for API paths and a
 * Markdown 404 body that points agents (and their crawlers) at the site map,
 * llms.txt, and the developer surface.
 *
 * Dependency-free on purpose: functions/_middleware.ts imports this module at
 * the Cloudflare edge, where Astro imports and the `@/` alias don't exist.
 */

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    hint?: string;
    docs?: string;
  };
}

export const API_DOCS_URL = 'https://deepworkplan.com/developers';
export const OPENAPI_URL = 'https://deepworkplan.com/openapi.json';

export function buildApiError(
  code: string,
  message: string,
  hint?: string,
  docs: string = OPENAPI_URL
): ApiErrorBody {
  const error: ApiErrorBody['error'] = { code, message };
  if (hint) {
    error.hint = hint;
  }
  if (docs) {
    error.docs = docs;
  }
  return { error };
}

/** True for every path under the /api namespace (with or without slash). */
export function isApiPath(pathname: string): boolean {
  return pathname === '/api' || pathname.startsWith('/api/');
}

/** Recovery links shown on 404s — every target exists on the live site. */
export const RECOVERY_LINKS: { label: string; path: string }[] = [
  { label: 'Home', path: '/' },
  { label: 'Sitemap (every page)', path: '/sitemap-index.xml' },
  { label: 'llms.txt (LLM guidance index)', path: '/llms.txt' },
  { label: 'llms-full.txt (detailed index)', path: '/llms-full.txt' },
  { label: 'Developers & agent surface', path: '/developers' },
  { label: 'Methodology', path: '/methodology' },
  { label: 'Specification', path: '/spec' },
  { label: 'Kit', path: '/kit' },
  { label: 'Examples', path: '/examples' },
  { label: 'Quickstart', path: '/quickstart' },
  { label: 'Compare with alternatives', path: '/compare' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Init / adoption prompt', path: '/init' },
];

/**
 * Markdown body served for 404 responses to clients that accept Markdown
 * (Accept: text/markdown). Short on purpose: the goal is recovery, not prose.
 */
export function buildAgentRecoveryMarkdown(
  origin = 'https://deepworkplan.com'
): string {
  const lines: string[] = [
    '# 404 — Not Found',
    '',
    'This path does not exist on deepworkplan.com. The links below list every page and the machine-readable indexes.',
    '',
    '## Where to look next',
    '',
  ];
  for (const link of RECOVERY_LINKS) {
    lines.push(`- [${link.label}](${origin}${link.path})`);
  }
  lines.push('');
  lines.push(`OpenAPI spec: ${OPENAPI_URL}`);
  lines.push(`Developer portal: ${API_DOCS_URL}`);
  lines.push('');
  return lines.join('\n');
}
