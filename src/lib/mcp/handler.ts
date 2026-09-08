/**
 * Stateless MCP (Model Context Protocol) request handler over JSON-RPC 2.0.
 *
 * Implements the Streamable HTTP server surface: a single POST endpoint that
 * accepts one JSON-RPC object per request (batching was removed in MCP
 * 2025-06-18), answers notifications with 202 + empty body, and never issues
 * server→client requests — the sanctioned stateless pattern (no session id).
 *
 * Dependency-free on purpose (bundled into functions/api/mcp.ts); use
 * relative imports only.
 */

import {
  errorResponse,
  isNotification,
  isValidRpcMessage,
  JsonRpcErrorCode,
  type JsonRpcId,
  successResponse,
} from './protocol';
import {
  ASSUMED_PROTOCOL_VERSION,
  LATEST_PROTOCOL_VERSION,
  SERVER_INSTRUCTIONS,
  SERVER_NAME,
  SITE_VERSION,
  SUPPORTED_PROTOCOL_VERSIONS,
} from './server-info';
import {
  type AssetTextFetcher,
  callTool,
  InvalidToolParamsError,
  TOOL_DEFINITIONS,
  UnknownToolError,
} from './tools';

export interface McpHandlerInput {
  /** Raw request body text. */
  bodyText: string;
  /** Value of the MCP-Protocol-Version request header, null when absent. */
  protocolVersionHeader: string | null;
  /** Injected static-asset reader (Cloudflare ASSETS binding in production). */
  fetchAssetText: AssetTextFetcher;
}

export interface McpHandlerOutput {
  /** HTTP status for the response. */
  status: number;
  /** Serialized JSON body, or null for an empty body (202 notifications). */
  body: string | null;
  /** Protocol version to echo in the MCP-Protocol-Version response header. */
  protocolVersion: string;
}

function isSupportedVersion(version: string): boolean {
  return (SUPPORTED_PROTOCOL_VERSIONS as readonly string[]).includes(version);
}

/** Pick the protocol version to answer with, per MCP negotiation rules. */
export function negotiateProtocolVersion(
  requested: string | undefined
): string {
  if (requested && isSupportedVersion(requested)) {
    return requested;
  }
  return LATEST_PROTOCOL_VERSION;
}

function json(
  status: number,
  payload: unknown,
  protocolVersion: string
): McpHandlerOutput {
  return { status, body: JSON.stringify(payload), protocolVersion };
}

/** 4xx envelope problems (unparseable body, malformed RPC, bad version header). */
function badRequest(
  code: number,
  message: string,
  protocolVersion: string
): McpHandlerOutput {
  return json(400, errorResponse(null, code, message), protocolVersion);
}

export async function handleMcpRequest(
  input: McpHandlerInput
): Promise<McpHandlerOutput> {
  // Spec: an invalid/unsupported MCP-Protocol-Version request header MUST be
  // rejected with 400 Bad Request. Absent header ⇒ assume 2025-03-26, except
  // for initialize, where the version is negotiated from params (clients only
  // start sending the header after initialize).
  const header = input.protocolVersionHeader;
  if (header !== null && header !== '' && !isSupportedVersion(header)) {
    return badRequest(
      JsonRpcErrorCode.INVALID_REQUEST,
      `Unsupported MCP-Protocol-Version '${header}'. Supported: ${SUPPORTED_PROTOCOL_VERSIONS.join(', ')}.`,
      LATEST_PROTOCOL_VERSION
    );
  }
  const headerVersion = header !== null && header !== '' ? header : null;
  const effectiveVersion = headerVersion ?? ASSUMED_PROTOCOL_VERSION;

  // Parse the body.
  let parsed: unknown;
  try {
    parsed = JSON.parse(input.bodyText);
  } catch {
    return badRequest(
      JsonRpcErrorCode.PARSE_ERROR,
      'Parse error: request body must be a single JSON-RPC 2.0 object.',
      effectiveVersion
    );
  }

  // Validate the envelope.
  if (!isValidRpcMessage(parsed)) {
    return badRequest(
      JsonRpcErrorCode.INVALID_REQUEST,
      'Invalid Request: expected a single JSON-RPC 2.0 object with jsonrpc, method, and (for calls) an id. Batching is not supported.',
      effectiveVersion
    );
  }

  const message = parsed;

  // Notifications always get 202 Accepted with no body — even unknown methods.
  if (isNotification(message)) {
    return { status: 202, body: null, protocolVersion: effectiveVersion };
  }

  const id: JsonRpcId = message.id ?? null;
  const { method } = message;

  try {
    switch (method) {
      case 'initialize': {
        const params =
          typeof message.params === 'object' && message.params !== null
            ? (message.params as { protocolVersion?: unknown })
            : {};
        const requested =
          typeof params.protocolVersion === 'string'
            ? params.protocolVersion
            : undefined;
        const negotiated = negotiateProtocolVersion(requested);
        const result = {
          protocolVersion: negotiated,
          capabilities: { tools: { listChanged: false } },
          serverInfo: { name: SERVER_NAME, version: SITE_VERSION },
          instructions: SERVER_INSTRUCTIONS,
        };
        return json(
          200,
          successResponse(id, result),
          headerVersion ?? negotiated
        );
      }

      case 'ping': {
        return json(200, successResponse(id, {}), effectiveVersion);
      }

      case 'tools/list': {
        return json(
          200,
          successResponse(id, { tools: TOOL_DEFINITIONS }),
          effectiveVersion
        );
      }

      case 'tools/call': {
        const params =
          typeof message.params === 'object' && message.params !== null
            ? (message.params as { name?: unknown; arguments?: unknown })
            : {};
        if (typeof params.name !== 'string' || params.name.length === 0) {
          return json(
            200,
            errorResponse(
              id,
              JsonRpcErrorCode.INVALID_PARAMS,
              "tools/call requires a string 'name' parameter."
            ),
            effectiveVersion
          );
        }
        const args = params.arguments ?? {};
        const result = await callTool(params.name, args, input.fetchAssetText);
        return json(200, successResponse(id, result), effectiveVersion);
      }

      default: {
        return json(
          200,
          errorResponse(
            id,
            JsonRpcErrorCode.METHOD_NOT_FOUND,
            `Method not found: ${method}`
          ),
          effectiveVersion
        );
      }
    }
  } catch (error) {
    if (
      error instanceof UnknownToolError ||
      error instanceof InvalidToolParamsError
    ) {
      // -32602 per the MCP spec's own examples for unknown/invalid tool input.
      return json(
        200,
        errorResponse(id, JsonRpcErrorCode.INVALID_PARAMS, error.message),
        effectiveVersion
      );
    }
    return json(
      200,
      errorResponse(
        id,
        JsonRpcErrorCode.INTERNAL_ERROR,
        'Internal error while handling the request.'
      ),
      effectiveVersion
    );
  }
}
