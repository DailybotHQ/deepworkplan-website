import { describe, expect, it } from 'vitest';

// The CLI is an ESM module under cli/bin — imported directly (no @/ alias
// there). Every test injects the transport, so nothing touches the network.
import { run } from '../../../cli/bin/deepworkplan.mjs';

/** Minimal Response stand-in (the CLI only reads .ok/.status/.text()). */
class FakeResponse {
  ok: boolean;
  status: number;
  #body: string;

  constructor(status: number, body = '') {
    this.status = status;
    this.ok = status >= 200 && status < 300;
    this.#body = body;
  }

  text() {
    return Promise.resolve(this.#body);
  }
}

function makeIo() {
  const out: string[] = [];
  const err: string[] = [];
  return {
    stdout: { write: (chunk: string) => out.push(chunk) },
    stderr: { write: (chunk: string) => err.push(chunk) },
    outText: () => out.join(''),
    errText: () => err.join(''),
  };
}

/** fetch mock: a (url, init) inspector plus a route table. */
function makeFetch(routes: Record<string, { status?: number; body?: string }>) {
  const calls: { url: string; init?: RequestInit }[] = [];
  const fetchImpl = (url: string | URL, init?: RequestInit) => {
    const href = String(url);
    calls.push({ url: href, init });
    const route = routes[href];
    if (!route) {
      return Promise.resolve(new FakeResponse(404, 'not found'));
    }
    return Promise.resolve(
      new FakeResponse(route.status ?? 200, route.body ?? '')
    );
  };
  return { fetchImpl, calls };
}

describe('deepworkplan CLI — offline commands', () => {
  it('--help exits 0 and never touches the network', async () => {
    const io = makeIo();
    const { fetchImpl } = makeFetch({});
    const spy = { called: 0 };
    const guarded = () => {
      spy.called += 1;
      throw new Error('network must not be touched');
    };
    const code = await run(['--help'], {
      stdout: io.stdout,
      stderr: io.stderr,
      fetchImpl: guarded,
    });
    expect(code).toBe(0);
    expect(io.outText()).toContain('Usage:');
    expect(io.outText()).toContain('deepworkplan init');
    expect(spy.called).toBe(0);
    expect(fetchImpl).toBeDefined();
  });

  it('--version prints the package version offline', async () => {
    const io = makeIo();
    const code = await run(['--version'], {
      stdout: io.stdout,
      stderr: io.stderr,
      fetchImpl: (() => {
        throw new Error('no network');
      }) as unknown as typeof fetch,
    });
    expect(code).toBe(0);
    expect(io.outText().trim()).toBe('0.1.0');
  });

  it('no command prints help to stderr and exits 1', async () => {
    const io = makeIo();
    const code = await run([], { stdout: io.stdout, stderr: io.stderr });
    expect(code).toBe(1);
    expect(io.errText()).toContain('Usage:');
  });
});

describe('deepworkplan CLI — network commands (injected transport)', () => {
  it('init fetches /init.md with a markdown Accept header and prints the body', async () => {
    const io = makeIo();
    const { fetchImpl, calls } = makeFetch({
      'https://deepworkplan.com/init.md': {
        body: '# Init — adoption prompt\n',
      },
    });
    const code = await run(['init'], { ...io_options(io), fetchImpl });
    expect(code).toBe(0);
    expect(io.outText()).toContain('# Init — adoption prompt');
    expect(calls[0].init?.headers).toMatchObject({
      Accept: 'text/markdown',
      'User-Agent': 'deepworkplan-cli/0.1.0 (+https://deepworkplan.com)',
    });
  });

  it('sections formats each section as "path — name: description"', async () => {
    const io = makeIo();
    const { fetchImpl } = makeFetch({
      'https://deepworkplan.com/api/v1/sections.json': {
        body: JSON.stringify({
          apiVersion: 'v1',
          sections: [
            {
              name: 'Home',
              path: '/',
              description: 'Overview of the methodology.',
            },
            {
              name: 'Methodology',
              path: '/methodology',
              description: 'What DWP is.',
            },
          ],
        }),
      },
    });
    const code = await run(['sections'], { ...io_options(io), fetchImpl });
    expect(code).toBe(0);
    expect(io.outText()).toContain('/ — Home: Overview of the methodology.\n');
    expect(io.outText()).toContain(
      '/methodology — Methodology: What DWP is.\n'
    );
  });

  it('read resolves /es/developers to /es/developers.md', async () => {
    const io = makeIo();
    const { fetchImpl, calls } = makeFetch({
      'https://deepworkplan.com/es/developers.md': {
        body: '# Developers (es)\n',
      },
    });
    const code = await run(['read', '/es/developers'], {
      ...io_options(io),
      fetchImpl,
    });
    expect(code).toBe(0);
    expect(io.outText()).toContain('# Developers (es)');
    expect(calls[0].url).toBe('https://deepworkplan.com/es/developers.md');
  });

  it('read maps the root path to /index.md and strips trailing slashes', async () => {
    const io = makeIo();
    const { fetchImpl, calls } = makeFetch({
      'https://deepworkplan.com/index.md': { body: '# Home\n' },
    });
    await run(['read', '/'], { ...io_options(io), fetchImpl });
    expect(calls[0].url).toBe('https://deepworkplan.com/index.md');
  });

  it('read rejects traversal and relative paths with exit 1 (no fetch)', async () => {
    const io = makeIo();
    let fetched = 0;
    const fetchImpl = () => {
      fetched += 1;
      return Promise.resolve(new FakeResponse(200, ''));
    };
    for (const bad of [
      '../etc/passwd',
      'methodology',
      '/methodology/../secret',
    ]) {
      const code = await run(['read', bad], { ...io_options(io), fetchImpl });
      expect(code, bad).toBe(1);
    }
    expect(fetched).toBe(0);
    expect(io.errText()).toContain("Try 'deepworkplan --help'");
  });

  it('mcp tools/list builds the JSON-RPC envelope and POSTs it', async () => {
    const io = makeIo();
    const { fetchImpl, calls } = makeFetch({
      'https://deepworkplan.com/api/mcp': {
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, result: { tools: [] } }),
      },
    });
    const code = await run(['mcp', 'tools/list'], {
      ...io_options(io),
      fetchImpl,
    });
    expect(code).toBe(0);
    expect(calls[0].init?.method).toBe('POST');
    const sent = JSON.parse(String(calls[0].init?.body));
    expect(sent).toEqual({ jsonrpc: '2.0', id: 1, method: 'tools/list' });
    expect(io.outText()).toContain('"tools"');
  });

  it('mcp sends a raw JSON body verbatim', async () => {
    const io = makeIo();
    const { fetchImpl, calls } = makeFetch({
      'https://deepworkplan.com/api/mcp': {
        body: JSON.stringify({ jsonrpc: '2.0', id: 7, result: {} }),
      },
    });
    const raw =
      '{"jsonrpc":"2.0","id":7,"method":"tools/call","params":{"name":"read_page","arguments":{"path":"/init"}}}';
    const code = await run(['mcp', raw], { ...io_options(io), fetchImpl });
    expect(code).toBe(0);
    expect(JSON.parse(String(calls[0].init?.body)).method).toBe('tools/call');
  });

  it('mcp rejects a non-JSON, non-method argument with exit 1', async () => {
    const io = makeIo();
    const code = await run(['mcp', 'not-json-or-method'], {
      ...io_options(io),
    });
    expect(code).toBe(1);
    expect(io.errText()).toContain('neither a known method nor valid JSON');
  });

  it('open prints the URL without any network call', async () => {
    const io = makeIo();
    const code = await run(['open', '/spec'], {
      ...io_options(io),
      fetchImpl: (() => {
        throw new Error('open must not fetch');
      }) as unknown as typeof fetch,
    });
    expect(code).toBe(0);
    expect(io.outText().trim()).toBe('https://deepworkplan.com/spec');
  });

  it('unknown commands exit 1 with a help hint', async () => {
    const io = makeIo();
    const code = await run(['frobnicate'], { ...io_options(io) });
    expect(code).toBe(1);
    expect(io.errText()).toContain("unknown command 'frobnicate'");
  });
});

describe('deepworkplan CLI — errors and overrides', () => {
  it('an HTTP 500 exits 2 with the status and URL on stderr', async () => {
    const io = makeIo();
    const { fetchImpl } = makeFetch({
      'https://deepworkplan.com/init.md': { status: 500, body: 'boom' },
    });
    const code = await run(['init'], { ...io_options(io), fetchImpl });
    expect(code).toBe(2);
    expect(io.errText()).toContain(
      'error: HTTP 500 https://deepworkplan.com/init.md'
    );
  });

  it('a fetch rejection exits 2 with the cause on stderr', async () => {
    const io = makeIo();
    const fetchImpl = () => Promise.reject(new TypeError('fetch failed'));
    const code = await run(['init'], { ...io_options(io), fetchImpl });
    expect(code).toBe(2);
    expect(io.errText()).toContain('error:');
  });

  it('--api overrides the base URL', async () => {
    const io = makeIo();
    const { fetchImpl, calls } = makeFetch({
      'http://localhost:5555/init.md': { body: '# local\n' },
    });
    const code = await run(['--api', 'http://localhost:5555/', 'init'], {
      ...io_options(io),
      fetchImpl,
    });
    expect(code).toBe(0);
    expect(calls[0].url).toBe('http://localhost:5555/init.md');
  });

  it('DEEPWORKPLAN_API env overrides the base URL', async () => {
    const io = makeIo();
    const { fetchImpl, calls } = makeFetch({
      'http://localhost:9999/api/v1/sections.json': {
        body: JSON.stringify({
          sections: [{ name: 'Home', path: '/', description: '' }],
        }),
      },
    });
    const code = await run(['sections'], {
      ...io_options(io),
      fetchImpl,
      env: { DEEPWORKPLAN_API: 'http://localhost:9999' },
    });
    expect(code).toBe(0);
    expect(calls[0].url).toBe('http://localhost:9999/api/v1/sections.json');
  });
});

/** Spread helper: hand the fake streams to run(). */
function io_options(io: ReturnType<typeof makeIo>) {
  return { stdout: io.stdout, stderr: io.stderr };
}
