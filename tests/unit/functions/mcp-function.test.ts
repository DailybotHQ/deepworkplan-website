// @vitest-environment node
// The Pages Function runs in workerd, not a DOM: these tests drive real
// Request/ReadableStream objects (stream bodies with duplex: 'half'), which
// happy-dom does not fully implement.
import { describe, expect, it } from 'vitest';

import { MAX_BODY_BYTES } from '@/lib/mcp/handler';
import { onRequestPost } from '../../../functions/api/mcp';

// ─── Fake ASSETS binding (no test below reaches tools/call) ───────────────

const FAKE_ENV = {
  ASSETS: {
    fetch: async (): Promise<Response> =>
      new Response('not found', { status: 404 }),
  },
};

const CONTEXT_URL = 'https://deepworkplan.com/api/mcp';

function makeContext(request: Request): {
  request: Request;
  env: typeof FAKE_ENV;
} {
  return { request, env: FAKE_ENV };
}

/** Endless 16 KiB-per-pull stream that counts how often it was pulled. */
function endlessStream() {
  let pulls = 0;
  const stream = new ReadableStream<Uint8Array>({
    pull(controller) {
      pulls += 1;
      controller.enqueue(new Uint8Array(16 * 1024));
    },
  });
  return { stream, pullCount: () => pulls };
}

describe('onRequestPost — request body size gate', () => {
  it('rejects a Content-Length over the cap with 413 before reading the body', async () => {
    const { stream, pullCount } = endlessStream();
    const request = new Request(CONTEXT_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'content-length': String(MAX_BODY_BYTES + 1024),
      },
      body: stream,
      duplex: 'half',
    });
    expect(Number(request.headers.get('content-length'))).toBe(
      MAX_BODY_BYTES + 1024
    );
    // Let the stream's construction-time prefetch (a single pull on a
    // microtask) settle before counting.
    await new Promise((resolve) => setTimeout(resolve, 0));
    const pullsBefore = pullCount();
    const response = await onRequestPost(makeContext(request));
    expect(response.status).toBe(413);
    const body = await response.json();
    // Same JSON-RPC error shape the handler emits for oversized bodies.
    expect(body.jsonrpc).toBe('2.0');
    expect(body.id).toBeNull();
    expect(body.error.code).toBe(-32600);
    expect(body.error.message).toMatch(/64 KiB/);
    // The gate answered from the header alone — the body was never read
    // (a stream may prefetch one chunk at construction; nothing more).
    expect(pullCount()).toBe(pullsBefore);
  });

  it('rejects a headerless (chunked) body once the cap is exceeded, without draining the stream', async () => {
    const { stream, pullCount } = endlessStream();
    const request = new Request(CONTEXT_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: stream,
      duplex: 'half',
    });
    expect(request.headers.get('content-length')).toBeNull();

    const response = await onRequestPost(makeContext(request));
    expect(response.status).toBe(413);
    const body = await response.json();
    expect(body.error.message).toMatch(/64 KiB/);
    // The read stops after a handful of 16 KiB chunks (80 KiB crosses the
    // 64 KiB cap) instead of draining the endless stream.
    expect(pullCount()).toBeLessThanOrEqual(6);
  });

  it('accepts a small headerless body through the capped stream path', async () => {
    const payload = JSON.stringify({
      jsonrpc: '2.0',
      id: 7,
      method: 'tools/list',
    });
    const request = new Request(CONTEXT_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(payload));
          controller.close();
        },
      }),
      duplex: 'half',
    });

    const response = await onRequestPost(makeContext(request));
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.result.tools.map((t: { name: string }) => t.name)).toEqual([
      'get_init_prompt',
      'list_site_sections',
      'read_page',
    ]);
  });

  it('accepts an ordinary Content-Length body through the handler', async () => {
    const bodyText = JSON.stringify({
      jsonrpc: '2.0',
      id: 8,
      method: 'ping',
    });
    const request = new Request(CONTEXT_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'content-length': String(bodyText.length),
      },
      body: bodyText,
    });

    const response = await onRequestPost(makeContext(request));
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.result).toEqual({});
  });
});
