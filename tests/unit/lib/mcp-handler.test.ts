import { describe, expect, it } from 'vitest';

import { handleMcpRequest, negotiateProtocolVersion } from '@/lib/mcp/handler';
import {
  ASSUMED_PROTOCOL_VERSION,
  LATEST_PROTOCOL_VERSION,
} from '@/lib/mcp/server-info';
import {
  resolveMarkdownAssetPath,
  sanitizePagePath,
  TOOL_DEFINITIONS,
} from '@/lib/mcp/tools';

// ─── Fake asset fetcher (stands in for the Cloudflare ASSETS binding) ─────

const FAKE_ASSETS: Record<string, string> = {
  '/init.md': '# Init — adoption prompt\n\nYou are an AI coding agent…',
  '/index.md': '# Home\n\nDeep Work Plan overview.',
  '/about.md': '# About\n\nWho maintains DWP.',
  '/es/methodology/01-manifesto.md': '# Manifiesto\n\nContenido.',
};

const fetchAssetText = async (path: string): Promise<string | null> =>
  path in FAKE_ASSETS ? FAKE_ASSETS[path] : null;

function rpc(body: unknown, header: string | null = null) {
  return handleMcpRequest({
    bodyText: JSON.stringify(body),
    protocolVersionHeader: header,
    fetchAssetText,
  });
}

function parseBody(output: { body: string | null }): any {
  return JSON.parse(output.body as string);
}

// ─── negotiateProtocolVersion ───────────────────────────

describe('negotiateProtocolVersion', () => {
  it('echoes a supported requested version', () => {
    expect(negotiateProtocolVersion('2025-03-26')).toBe('2025-03-26');
    expect(negotiateProtocolVersion('2025-06-18')).toBe('2025-06-18');
  });

  it('falls back to the latest supported version for unknown or absent requests', () => {
    expect(negotiateProtocolVersion('1999-01-01')).toBe(
      LATEST_PROTOCOL_VERSION
    );
    expect(negotiateProtocolVersion(undefined)).toBe(LATEST_PROTOCOL_VERSION);
  });
});

// ─── Path helpers ───────────────────────────────────────

describe('sanitizePagePath', () => {
  it('normalizes site-relative paths', () => {
    expect(sanitizePagePath('init')).toBe('/init');
    expect(sanitizePagePath('/es/methodology/01-manifesto')).toBe(
      '/es/methodology/01-manifesto'
    );
  });

  it('rejects absolute URLs, traversal, and query/fragment characters', () => {
    expect(sanitizePagePath('https://evil.example.com/x')).toBeNull();
    expect(sanitizePagePath('//evil.example.com/x')).toBeNull();
    expect(sanitizePagePath('/../etc/passwd')).toBeNull();
    expect(sanitizePagePath('/a\\b')).toBeNull();
    expect(sanitizePagePath('/page?x=1')).toBeNull();
    expect(sanitizePagePath('')).toBeNull();
  });

  it('rejects percent-encoded traversal and double-encoded input', () => {
    expect(sanitizePagePath('/%2e%2e/etc/passwd')).toBeNull();
    expect(sanitizePagePath('/%252e%252e/etc')).toBeNull();
    expect(sanitizePagePath('/page%20name')).toBeNull();
  });

  it('still accepts harmless percent-encoded characters', () => {
    expect(sanitizePagePath('/caf%C3%A9')).toBe('/café');
  });
});

describe('resolveMarkdownAssetPath', () => {
  it('maps page paths to their markdown assets like the edge middleware', () => {
    expect(resolveMarkdownAssetPath('/')).toBe('/index.md');
    expect(resolveMarkdownAssetPath('/about')).toBe('/about.md');
    expect(resolveMarkdownAssetPath('/about/')).toBe('/about.md');
    expect(resolveMarkdownAssetPath('/methodology/x')).toBe(
      '/methodology/x.md'
    );
  });
});

// ─── initialize / ping / tools/list ─────────────────────

describe('handleMcpRequest — initialize', () => {
  it('returns server info, tools capability, and instructions', async () => {
    const out = await rpc({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: { protocolVersion: '2025-06-18' },
    });
    expect(out.status).toBe(200);
    const { result } = parseBody(out);
    expect(result.protocolVersion).toBe('2025-06-18');
    expect(result.capabilities).toEqual({ tools: { listChanged: false } });
    expect(result.serverInfo.name).toBe('deep-work-plan-site');
    expect(result.serverInfo.version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(typeof result.instructions).toBe('string');
    expect(out.protocolVersion).toBe('2025-06-18');
  });

  it('answers an unsupported requested version with the latest supported one', async () => {
    const out = await rpc({
      jsonrpc: '2.0',
      id: 2,
      method: 'initialize',
      params: { protocolVersion: '1999-01-01' },
    });
    expect(parseBody(out).result.protocolVersion).toBe(LATEST_PROTOCOL_VERSION);
  });

  it('assumes 2025-03-26 when no MCP-Protocol-Version header is sent', async () => {
    const out = await rpc({ jsonrpc: '2.0', id: 3, method: 'ping' });
    expect(out.protocolVersion).toBe(ASSUMED_PROTOCOL_VERSION);
  });
});

describe('handleMcpRequest — ping', () => {
  it('returns an empty result', async () => {
    const out = await rpc({ jsonrpc: '2.0', id: 4, method: 'ping' });
    expect(out.status).toBe(200);
    expect(parseBody(out).result).toEqual({});
  });
});

describe('handleMcpRequest — tools/list', () => {
  it('exposes the three read-only tools with input schemas', async () => {
    const out = await rpc({ jsonrpc: '2.0', id: 5, method: 'tools/list' });
    const { tools } = parseBody(out).result;
    expect(tools.map((t: { name: string }) => t.name)).toEqual([
      'get_init_prompt',
      'list_site_sections',
      'read_page',
    ]);
    for (const tool of tools) {
      expect(tool.inputSchema.type).toBe('object');
      expect(tool.inputSchema.additionalProperties).toBe(false);
    }
    expect(TOOL_DEFINITIONS).toHaveLength(3);
  });
});

// ─── tools/call ─────────────────────────────────────────

describe('handleMcpRequest — tools/call', () => {
  it('get_init_prompt returns the /init.md adoption prompt', async () => {
    const out = await rpc({
      jsonrpc: '2.0',
      id: 6,
      method: 'tools/call',
      params: { name: 'get_init_prompt', arguments: {} },
    });
    const { result } = parseBody(out);
    expect(result.isError).toBe(false);
    expect(result.content[0].type).toBe('text');
    expect(result.content[0].text).toContain('adoption prompt');
  });

  it('get_init_prompt reports an execution error (isError) when the asset is unavailable', async () => {
    const out = await handleMcpRequest({
      bodyText: JSON.stringify({
        jsonrpc: '2.0',
        id: 7,
        method: 'tools/call',
        params: { name: 'get_init_prompt', arguments: {} },
      }),
      protocolVersionHeader: null,
      fetchAssetText: async () => null,
    });
    const { result } = parseBody(out);
    expect(result.isError).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('list_site_sections lists sections including the agent surface', async () => {
    const out = await rpc({
      jsonrpc: '2.0',
      id: 8,
      method: 'tools/call',
      params: { name: 'list_site_sections', arguments: {} },
    });
    const text = parseBody(out).result.content[0].text as string;
    expect(text).toContain('/methodology');
    expect(text).toContain('/developers');
    expect(text).toContain('/llms.txt');
  });

  it('read_page fetches any page as markdown, including localized paths', async () => {
    const out = await rpc({
      jsonrpc: '2.0',
      id: 9,
      method: 'tools/call',
      params: {
        name: 'read_page',
        arguments: { path: '/es/methodology/01-manifesto' },
      },
    });
    const { result } = parseBody(out);
    expect(result.isError).toBe(false);
    expect(result.content[0].text).toContain('Manifiesto');
  });

  it('read_page returns isError with recovery hints for unknown pages', async () => {
    const out = await rpc({
      jsonrpc: '2.0',
      id: 10,
      method: 'tools/call',
      params: { name: 'read_page', arguments: { path: '/does-not-exist' } },
    });
    const { result } = parseBody(out);
    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('sitemap-index.xml');
  });

  it('unknown tools map to -32602 with the spec-style message', async () => {
    const out = await rpc({
      jsonrpc: '2.0',
      id: 11,
      method: 'tools/call',
      params: { name: 'destroy_everything', arguments: {} },
    });
    const body = parseBody(out);
    expect(out.status).toBe(200);
    expect(body.error.code).toBe(-32602);
    expect(body.error.message).toBe('Unknown tool: destroy_everything');
  });

  it('missing tool name maps to -32602', async () => {
    const out = await rpc({
      jsonrpc: '2.0',
      id: 12,
      method: 'tools/call',
      params: {},
    });
    expect(parseBody(out).error.code).toBe(-32602);
  });

  it('unsafe paths (absolute URL, traversal) are rejected as invalid params', async () => {
    for (const path of ['https://evil.example.com', '/../../etc/passwd']) {
      const out = await rpc({
        jsonrpc: '2.0',
        id: 13,
        method: 'tools/call',
        params: { name: 'read_page', arguments: { path } },
      });
      expect(parseBody(out).error.code).toBe(-32602);
    }
  });
});

// ─── Envelope / protocol edge cases ─────────────────────

describe('handleMcpRequest — protocol edge cases', () => {
  it('notifications (no id) get 202 with an empty body — even unknown methods', async () => {
    for (const method of ['notifications/initialized', 'not/a/real/method']) {
      const out = await rpc({ jsonrpc: '2.0', method });
      expect(out.status).toBe(202);
      expect(out.body).toBeNull();
    }
  });

  it('an explicit id: null is a call, not a notification — it gets a response with id null', async () => {
    const out = await rpc({ jsonrpc: '2.0', id: null, method: 'ping' });
    expect(out.status).toBe(200);
    const body = parseBody(out);
    expect(body.id).toBeNull();
    expect(body.result).toEqual({});
  });

  it('unparseable bodies get HTTP 400 with -32700 and id null', async () => {
    const out = await handleMcpRequest({
      bodyText: '{not json',
      protocolVersionHeader: null,
      fetchAssetText,
    });
    expect(out.status).toBe(400);
    const body = parseBody(out);
    expect(body.id).toBeNull();
    expect(body.error.code).toBe(-32700);
  });

  it('batches (arrays) and malformed envelopes get HTTP 400 with -32600', async () => {
    for (const bad of [
      [{ jsonrpc: '2.0', id: 1, method: 'ping' }],
      { id: 1, method: 'ping' },
      { jsonrpc: '1.0', id: 1, method: 'ping' },
      { jsonrpc: '2.0', id: 1 },
    ]) {
      const out = await rpc(bad);
      expect(out.status).toBe(400);
      expect(parseBody(out).error.code).toBe(-32600);
    }
  });

  it('an unsupported MCP-Protocol-Version header is rejected with 400', async () => {
    const out = await rpc(
      { jsonrpc: '2.0', id: 1, method: 'ping' },
      '1999-01-01'
    );
    expect(out.status).toBe(400);
    expect(parseBody(out).error.message).toContain('1999-01-01');
  });

  it('unknown methods with an id get -32601 at HTTP 200', async () => {
    const out = await rpc({ jsonrpc: '2.0', id: 42, method: 'resources/list' });
    expect(out.status).toBe(200);
    expect(parseBody(out).error.code).toBe(-32601);
  });
});
