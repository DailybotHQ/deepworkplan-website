/**
 * Server identity for the deepworkplan.com MCP surface.
 *
 * Shared by the HTTP MCP server (src/lib/mcp/handler.ts → functions/api/mcp.ts)
 * and the browser WebMCP registration (src/components/WebMcp.astro reads the
 * same name). `SITE_VERSION` is kept in sync with package.json by
 * scripts/stamp-versions.mjs (runs as part of `prebuild`).
 *
 * This module must stay dependency-free (no Astro imports, no aliases) because
 * it is bundled into the Cloudflare Pages Function at functions/api/mcp.ts.
 */
export const SERVER_NAME = 'deep-work-plan-site';

/** Keep in sync with package.json — stamped automatically by prebuild. */
export const SITE_VERSION = '5.0.1';

/**
 * MCP protocol revisions this server understands. A client may negotiate any
 * of these via `initialize` params or the `MCP-Protocol-Version` header; any
 * other requested version is answered with the newest supported one.
 */
export const SUPPORTED_PROTOCOL_VERSIONS = [
  '2025-03-26',
  '2025-06-18',
] as const;

/**
 * Version responded when the client requests an unsupported/unknown revision.
 * Per spec negotiation the server replies with the latest version it supports.
 */
export const LATEST_PROTOCOL_VERSION = '2025-06-18';

/**
 * Version assumed when a request carries no `MCP-Protocol-Version` header
 * (spec: absent header ⇒ server SHOULD assume 2025-03-26).
 */
export const ASSUMED_PROTOCOL_VERSION = '2025-03-26';

export const SERVER_INSTRUCTIONS =
  'Read-only agent surface for deepworkplan.com, the Deep Work Plan (DWP) methodology site. ' +
  'Use get_init_prompt to fetch the canonical instruction that makes any repository AI-first with DWP, ' +
  'list_site_sections to map the site, and read_page to fetch any page as source Markdown. ' +
  'Full guidance: https://deepworkplan.com/llms.txt — developer surface: https://deepworkplan.com/developers';
