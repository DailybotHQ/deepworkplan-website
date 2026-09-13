#!/usr/bin/env node
/**
 * deepworkplan — official CLI for deepworkplan.com.
 *
 * A thin, read-only, zero-dependency client over the site's public agent API
 * (https://deepworkplan.com/openapi.json): the canonical /init adoption
 * prompt, the versioned /api/v1/ catalog, every page as source Markdown, and
 * the MCP server at /api/mcp. No telemetry, no shell-outs, no eval.
 *
 * The command core is exported (`run`) with an injectable transport so tests
 * exercise everything without network access.
 */

const PACKAGE_VERSION = '0.1.0';
const DEFAULT_BASE_URL = 'https://deepworkplan.com';
const USER_AGENT = `deepworkplan-cli/${PACKAGE_VERSION} (+https://deepworkplan.com)`;

const HELP = `deepworkplan — official CLI for deepworkplan.com

Usage:
  deepworkplan <command> [options]

Commands:
  init                    Print the canonical DWP adoption prompt (/init.md)
  sections                List the main site sections (from /api/v1/sections.json)
  read <path>             Print any page as source Markdown (e.g. /methodology,
                          /es/developers; the .md suffix is added for you)
  open [path]             Print the browser URL for a path (no network)
  mcp <method-or-body>    Call the MCP server at /api/mcp. Shorthand methods:
                          initialize, ping, tools/list; anything else is sent
                          as a raw JSON-RPC 2.0 body

Options:
  --api <base-url>        API base URL (default: ${DEFAULT_BASE_URL};
                          overridable via DEEPWORKPLAN_API)
  -h, --help              Show this help
  -V, --version           Print the CLI version

Exit codes:
  0  success
  1  usage error
  2  network or HTTP error

Examples:
  deepworkplan init
  deepworkplan sections
  deepworkplan read /es/developers
  deepworkplan mcp tools/list

Documentation: https://deepworkplan.com/developers
API contract:  https://deepworkplan.com/openapi.json
`;

/** Resolve a site path to its Markdown asset path (mirrors the site rules). */
function toMarkdownPath(pathname) {
  let clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (clean === '/') return '/index.md';
  if (clean.endsWith('/index')) return `${clean}.md`;
  return `${clean}.md`;
}

/** Build a JSON-RPC 2.0 envelope for the shorthand MCP methods. */
function mcpEnvelope(argument) {
  if (argument === 'initialize') {
    return {
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2025-06-18',
        capabilities: {},
        clientInfo: { name: 'deepworkplan-cli', version: PACKAGE_VERSION },
      },
    };
  }
  // ping and tools/list take no params.
  return { jsonrpc: '2.0', id: 1, method: argument };
}

async function fetchText(fetchImpl, url, init) {
  let response;
  try {
    response = await fetchImpl(url, init);
  } catch (cause) {
    return { ok: false, kind: 'network', message: String(cause?.cause ?? cause?.message ?? cause) };
  }
  if (!response.ok) {
    return { ok: false, kind: 'http', status: response.status };
  }
  return { ok: true, body: await response.text() };
}

/**
 * The CLI core. Returns the process exit code; never calls process.exit.
 *
 * @param {string[]} argv - command arguments (no node/script prefix)
 * @param {{fetchImpl?: typeof fetch, baseUrl?: string, stdout?: NodeJS.WriteStream,
 *          stderr?: NodeJS.WriteStream, env?: Record<string,string|undefined>}} options
 */
export async function run(argv, options = {}) {
  const fetchImpl = options.fetchImpl ?? fetch;
  const baseUrl = (
    options.baseUrl ??
    options.env?.DEEPWORKPLAN_API ??
    DEFAULT_BASE_URL
  ).replace(/\/+$/, '');
  const stdout = options.stdout ?? process.stdout;
  const stderr = options.stderr ?? process.stderr;

  const write = (stream, text) => {
    stream.write(text);
  };
  const usageError = (message) => {
    write(stderr, `deepworkplan: ${message}\nTry 'deepworkplan --help' for usage.\n`);
    return 1;
  };
  const httpError = (message, url) => {
    write(stderr, `error: ${message} ${url}\n`);
    return 2;
  };

  // Global flags (anywhere in argv).
  const positional = [];
  let cliBaseUrl = null;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      write(stdout, HELP);
      return 0;
    }
    if (arg === '--version' || arg === '-V') {
      write(stdout, `${PACKAGE_VERSION}\n`);
      return 0;
    }
    if (arg === '--api') {
      const next = argv[i + 1];
      if (!next) return usageError('--api requires a base URL');
      cliBaseUrl = next;
      i += 1;
      continue;
    }
    positional.push(arg);
  }

  const effectiveBase = (cliBaseUrl ?? baseUrl).replace(/\/+$/, '');
  const [command, ...rest] = positional;

  if (!command) {
    write(stderr, HELP);
    return 1;
  }

  if (command === 'init') {
    const result = await fetchText(fetchImpl, `${effectiveBase}/init.md`, {
      headers: { Accept: 'text/markdown', 'User-Agent': USER_AGENT },
    });
    if (!result.ok) {
      return httpError(result.kind === 'http' ? `HTTP ${result.status}` : result.message, `${effectiveBase}/init.md`);
    }
    write(stdout, result.body);
    return 0;
  }

  if (command === 'sections') {
    const url = `${effectiveBase}/api/v1/sections.json`;
    const result = await fetchText(fetchImpl, url, {
      headers: { Accept: 'application/json', 'User-Agent': USER_AGENT },
    });
    if (!result.ok) {
      return httpError(result.kind === 'http' ? `HTTP ${result.status}` : result.message, url);
    }
    let doc;
    try {
      doc = JSON.parse(result.body);
    } catch {
      return httpError('invalid JSON from', url);
    }
    for (const section of doc.sections ?? []) {
      write(stdout, `${section.path} — ${section.name}: ${section.description ?? ''}\n`);
    }
    return 0;
  }

  if (command === 'read') {
    const path = rest[0];
    if (!path || !path.startsWith('/') || path.includes('..')) {
      return usageError('read requires a site path starting with "/" and no ".." (e.g. /methodology)');
    }
    const url = `${effectiveBase}${toMarkdownPath(path)}`;
    const result = await fetchText(fetchImpl, url, {
      headers: { Accept: 'text/markdown', 'User-Agent': USER_AGENT },
    });
    if (!result.ok) {
      return httpError(result.kind === 'http' ? `HTTP ${result.status}` : result.message, url);
    }
    write(stdout, result.body);
    return 0;
  }

  if (command === 'open') {
    const path = rest[0] ?? '/';
    if (!path.startsWith('/') || path.includes('..')) {
      return usageError('open requires a site path starting with "/" and no ".."');
    }
    write(stdout, `${effectiveBase}${path}\n`);
    return 0;
  }

  if (command === 'mcp') {
    const argument = rest[0];
    if (!argument) {
      return usageError('mcp requires a shorthand method (initialize, ping, tools/list) or a JSON-RPC body');
    }
    let body;
    if (argument === 'initialize' || argument === 'ping' || argument === 'tools/list') {
      body = mcpEnvelope(argument);
    } else {
      try {
        body = JSON.parse(argument);
      } catch {
        return usageError('mcp argument is neither a known method nor valid JSON');
      }
    }
    const url = `${effectiveBase}/api/mcp`;
    const result = await fetchText(fetchImpl, url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': USER_AGENT,
      },
      body: JSON.stringify(body),
    });
    if (!result.ok) {
      return httpError(result.kind === 'http' ? `HTTP ${result.status}` : result.message, url);
    }
    write(stdout, `${JSON.stringify(JSON.parse(result.body), null, 2)}\n`);
    return 0;
  }

  return usageError(`unknown command '${command}'`);
}

/** Entry point: delegate to run() with real process I/O; set exitCode, never exit(). */
export async function main() {
  process.exitCode = await run(process.argv.slice(2), {});
}

// Run only when executed as a script (not when imported by tests).
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  await main();
}
