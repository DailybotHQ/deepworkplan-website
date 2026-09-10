/**
 * MCP tool surface for deepworkplan.com — read-only, zero-auth.
 *
 * All tool execution goes through an injected `fetchAssetText` (backed by
 * Cloudflare `ASSETS` binding in production, a fake in unit tests) so this
 * module has no Astro imports and stays bundleable into functions/.
 */

export interface McpInputSchema {
  type: 'object';
  properties: Record<
    string,
    { type: string; description: string; enum?: string[] }
  >;
  required?: string[];
  additionalProperties: false;
}

export interface McpToolDefinition {
  name: string;
  title: string;
  description: string;
  inputSchema: McpInputSchema;
}

/** Resolves site-relative asset paths to their text content (or null). */
export type AssetTextFetcher = (assetPath: string) => Promise<string | null>;

export interface McpToolResult {
  content: { type: 'text'; text: string }[];
  isError: boolean;
}

/** Thrown when tools/call names a tool this server does not expose. */
export class UnknownToolError extends Error {
  constructor(name: string) {
    super(`Unknown tool: ${name}`);
    this.name = 'UnknownToolError';
  }
}

/** Thrown when tools/call params are structurally invalid. */
export class InvalidToolParamsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidToolParamsError';
  }
}

export const SITE_SECTIONS: {
  name: string;
  path: string;
  description: string;
}[] = [
  {
    name: 'Home',
    path: '/',
    description: 'Overview of the Deep Work Plan methodology.',
  },
  {
    name: 'Methodology',
    path: '/methodology',
    description: 'What DWP is, its principles, and how to adopt it.',
  },
  {
    name: 'Specification',
    path: '/spec',
    description:
      'The normative DWP standard: task anatomy, validation gates, completion protocol.',
  },
  {
    name: 'Kit',
    path: '/kit',
    description:
      'Presets, adapters, and commands for installing DWP into a repository.',
  },
  {
    name: 'Examples',
    path: '/examples',
    description: 'Worked examples of the methodology in practice.',
  },
  {
    name: 'Quickstart',
    path: '/quickstart',
    description: 'Get DWP running in a repository quickly.',
  },
  {
    name: 'Compare',
    path: '/compare',
    description:
      'Deep Work Plan next to spec-driven tools, agent frameworks and vendor plan modes — each on its own terms, with sources and a review date.',
  },
  {
    name: 'FAQ',
    path: '/faq',
    description:
      'Answers to the questions people ask: what DWP does, how gates and resumption work, how it compares, how to adopt it.',
  },
  {
    name: 'Init / Adoption',
    path: '/init',
    description: 'Canonical adoption endpoint — make any repository AI-first.',
  },
  {
    name: 'Developers',
    path: '/developers',
    description:
      'Agent & developer surface: API, MCP server, OpenAPI spec, zero-auth access.',
  },
  {
    name: 'Trust',
    path: '/trust',
    description: 'Trust & provenance: checksums, licensing, verification.',
  },
  {
    name: 'About',
    path: '/about',
    description: 'What DWP is and who maintains it (Dailybot).',
  },
  {
    name: 'Contact',
    path: '/contact',
    description: 'How to engage with the project on GitHub.',
  },
  {
    name: 'Privacy',
    path: '/privacy',
    description: 'Privacy policy for deepworkplan.com.',
  },
];

export const TOOL_DEFINITIONS: McpToolDefinition[] = [
  {
    name: 'get_init_prompt',
    title: 'Get the canonical DWP adoption prompt',
    description:
      'Return the canonical /init.md adoption prompt — a self-contained instruction that makes any repository AI-first with Deep Work Plan (install the skill, onboard the repo, then plan and execute long-horizon work).',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: 'list_site_sections',
    title: 'List the sections of deepworkplan.com',
    description:
      'List the main sections of deepworkplan.com (methodology, specification, kit, examples, init, developers) with their paths and one-line descriptions.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: 'read_page',
    title: 'Read any page as source Markdown',
    description:
      'Fetch any page of deepworkplan.com as native source Markdown (not HTML-to-Markdown conversion). Accepts a site-relative path such as /init, /es/methodology/01-manifesto, or /developers. Use list_site_sections first to discover paths.',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description:
            'Site-relative page path, e.g. /init or /es/methodology/01-manifesto.',
        },
      },
      required: ['path'],
      additionalProperties: false,
    },
  },
];

function textResult(text: string, isError = false): McpToolResult {
  return { content: [{ type: 'text', text }], isError };
}

function notFoundResult(path: string): McpToolResult {
  return textResult(
    `No page found at ${path}. Try list_site_sections to discover valid paths, or see https://deepworkplan.com/sitemap-index.xml and https://deepworkplan.com/llms.txt.`,
    true
  );
}

/**
 * Validate a caller-supplied page path: must be site-relative (no scheme, no
 * protocol-relative form, no traversal sequences — including percent-encoded
 * ones like %2e%2e — and no query/fragment). Returns the decoded path.
 */
export function sanitizePagePath(input: string): string | null {
  if (typeof input !== 'string' || input.length === 0 || input.length > 512) {
    return null;
  }
  // Decode percent-escapes BEFORE validating so encoded traversal
  // (`/%2e%2e/`) and encoded schemes are rejected by the same rules. A
  // remaining '%' after one decode means the input was double-encoded —
  // reject it too: page slugs never contain a literal percent sign.
  let decoded: string;
  try {
    decoded = decodeURIComponent(input);
  } catch {
    return null;
  }
  if (decoded.includes('%')) {
    return null;
  }
  if (decoded.includes('://') || decoded.startsWith('//')) {
    return null;
  }
  if (decoded.includes('..') || decoded.includes('\\')) {
    return null;
  }
  const path = decoded.startsWith('/') ? decoded : `/${decoded}`;
  if (/[?#$\s]/.test(path)) {
    return null;
  }
  return path;
}

/**
 * Map a page path to the Markdown asset that backs it — mirrors
 * resolveMarkdownPath in functions/_middleware.ts.
 *   /                → /index.md
 *   /about           → /about.md
 *   /about/          → /about.md
 *   /methodology/x   → /methodology/x.md
 */
export function resolveMarkdownAssetPath(pathname: string): string {
  let clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (clean === '/') {
    return '/index.md';
  }
  if (clean.endsWith('/index')) {
    return `${clean}.md`;
  }
  return `${clean}.md`;
}

export async function callTool(
  name: string,
  args: unknown,
  fetchAssetText: AssetTextFetcher
): Promise<McpToolResult> {
  switch (name) {
    case 'get_init_prompt': {
      const markdown = await fetchAssetText('/init.md');
      if (markdown === null) {
        return textResult(
          'The /init.md adoption prompt is temporarily unavailable. Fetch https://deepworkplan.com/init.md directly.',
          true
        );
      }
      return textResult(markdown);
    }
    case 'list_site_sections': {
      const lines = SITE_SECTIONS.map(
        (s) => `- ${s.name} (${s.path}): ${s.description}`
      );
      lines.push(
        '- llms.txt (/llms.txt): LLM guidance index for the whole site.'
      );
      lines.push(
        '- Sitemap (/sitemap-index.xml): machine-readable list of every page.'
      );
      return textResult(lines.join('\n'));
    }
    case 'read_page': {
      if (typeof args !== 'object' || args === null || Array.isArray(args)) {
        throw new InvalidToolParamsError(
          "tools/call 'arguments' must be an object for read_page."
        );
      }
      const { path } = args as { path?: unknown };
      if (typeof path !== 'string' || path.length === 0) {
        throw new InvalidToolParamsError(
          "read_page requires a string 'path' argument, e.g. '/init'."
        );
      }
      const sanitized = sanitizePagePath(path);
      if (sanitized === null) {
        throw new InvalidToolParamsError(
          `Invalid path '${path}'. Use a site-relative path such as '/init' or '/es/methodology/01-manifesto' — no absolute URLs or traversal.`
        );
      }
      const assetPath = resolveMarkdownAssetPath(sanitized);
      const markdown = await fetchAssetText(assetPath);
      if (markdown === null) {
        return notFoundResult(sanitized);
      }
      return textResult(markdown);
    }
    default:
      throw new UnknownToolError(name);
  }
}
