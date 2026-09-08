/**
 * Cloudflare Pages Function — MCP server (Streamable HTTP, stateless).
 *
 * POST   /api/mcp  JSON-RPC 2.0: initialize, ping, tools/list, tools/call.
 *                  Notifications get 202 + empty body. One object per request
 *                  (batching was removed from MCP in 2025-06-18).
 * OPTIONS /api/mcp CORS preflight.
 * Other methods → 405 + Allow (this server never initiates requests, so there
 *                  is no session to delete and no SSE stream to open).
 *
 * All protocol logic lives in src/lib/mcp/ (unit-tested there); this file is a
 * thin adapter. Imports MUST stay relative — the Pages Functions bundler does
 * not resolve the `@/` alias.
 */
import { handleMcpRequest } from '../../src/lib/mcp/handler';
import { buildApiError } from '../../src/lib/agent-recovery';

interface AssetsFetcher {
  fetch(request: Request | string): Promise<Response>;
}

interface Env {
  ASSETS: AssetsFetcher;
}

type PagesFunctionHandler = (context: {
  request: Request;
  env: Env;
}) => Promise<Response>;

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, MCP-Protocol-Version, Authorization',
  'Access-Control-Expose-Headers': 'MCP-Protocol-Version',
  'Access-Control-Max-Age': '86400',
};

function jsonResponse(
  status: number,
  body: string,
  extra: Record<string, string> = {}
): Response {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      ...CORS_HEADERS,
      ...extra,
    },
  });
}

function methodNotAllowed(allow: string, withBody = true): Response {
  if (!withBody) {
    return new Response(null, {
      status: 405,
      headers: { Allow: allow, ...CORS_HEADERS },
    });
  }
  return jsonResponse(
    405,
    JSON.stringify(
      buildApiError(
        'method_not_allowed',
        'The MCP endpoint only accepts POST (JSON-RPC 2.0) and OPTIONS (CORS preflight).',
        'Streamable HTTP clients should POST JSON-RPC messages; this server is stateless and exposes no SSE stream or session.'
      )
    ),
    { Allow: allow }
  );
}

/** Read a static Markdown asset through the Pages ASSETS binding. */
function makeAssetFetcher(env: Env, origin: string) {
  return async (assetPath: string): Promise<string | null> => {
    try {
      const response = await env.ASSETS.fetch(new Request(new URL(assetPath, origin).toString()));
      if (!response.ok) {
        return null;
      }
      return await response.text();
    } catch {
      return null;
    }
  };
}

export const onRequestPost: PagesFunctionHandler = async (context) => {
  const contentType = context.request.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return jsonResponse(
      415,
      JSON.stringify(
        buildApiError(
          'unsupported_media_type',
          'The MCP endpoint requires Content-Type: application/json.',
          'POST a single JSON-RPC 2.0 object, e.g. {"jsonrpc":"2.0","id":1,"method":"tools/list"}.'
        )
      )
    );
  }

  const url = new URL(context.request.url);
  const output = await handleMcpRequest({
    bodyText: await context.request.text(),
    protocolVersionHeader: context.request.headers.get('mcp-protocol-version'),
    fetchAssetText: makeAssetFetcher(context.env, url.origin),
  });

  // 202 Accepted for notifications: empty body, no Content-Type (spec).
  if (output.body === null) {
    return new Response(null, {
      status: output.status,
      headers: { ...CORS_HEADERS },
    });
  }

  return jsonResponse(output.status, output.body, {
    'MCP-Protocol-Version': output.protocolVersion,
  });
};

export const onRequestGet: PagesFunctionHandler = async () => methodNotAllowed('POST, OPTIONS');

export const onRequestDelete: PagesFunctionHandler = async () => methodNotAllowed('POST, OPTIONS');

export const onRequestPut: PagesFunctionHandler = async () => methodNotAllowed('POST, OPTIONS');

export const onRequestPatch: PagesFunctionHandler = async () => methodNotAllowed('POST, OPTIONS');

export const onRequestHead: PagesFunctionHandler = async () => methodNotAllowed('POST, OPTIONS', false);

export const onRequestOptions: PagesFunctionHandler = async () =>
  new Response(null, { status: 204, headers: CORS_HEADERS });
