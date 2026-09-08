/**
 * JSON-RPC 2.0 envelope types and error codes for the MCP server.
 *
 * Dependency-free on purpose: this module is bundled into the Cloudflare
 * Pages Function at functions/api/mcp.ts, where Astro imports and the `@/`
 * alias are not available. Import it with relative paths only.
 */

/** JSON-RPC 2.0 error codes used by this server. */
export const JsonRpcErrorCode = {
  PARSE_ERROR: -32700,
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL_ERROR: -32603,
} as const;

export type JsonRpcId = string | number | null;

export interface JsonRpcErrorObject {
  code: number;
  message: string;
  data?: unknown;
}

/** A valid client → server request (id present) or notification (id absent). */
export interface JsonRpcMessage {
  jsonrpc: '2.0';
  id?: JsonRpcId;
  method?: string;
  params?: unknown;
}

export interface JsonRpcSuccessResponse {
  jsonrpc: '2.0';
  id: JsonRpcId;
  result: unknown;
}

export interface JsonRpcErrorResponse {
  jsonrpc: '2.0';
  id: JsonRpcId;
  error: JsonRpcErrorObject;
}

export type JsonRpcResponse = JsonRpcSuccessResponse | JsonRpcErrorResponse;

export function successResponse(
  id: JsonRpcId,
  result: unknown
): JsonRpcSuccessResponse {
  return { jsonrpc: '2.0', id, result };
}

export function errorResponse(
  id: JsonRpcId,
  code: number,
  message: string,
  data?: unknown
): JsonRpcErrorResponse {
  const error: JsonRpcErrorObject = { code, message };
  if (data !== undefined) {
    error.data = data;
  }
  return { jsonrpc: '2.0', id, error };
}

/**
 * Structural validation of the JSON-RPC envelope beyond JSON parsing.
 * Batching (JSON arrays) was removed from MCP in 2025-06-18, so arrays are
 * rejected as Invalid Request.
 */
export function isValidRpcMessage(value: unknown): value is JsonRpcMessage {
  if (Array.isArray(value) || typeof value !== 'object' || value === null) {
    return false;
  }
  const msg = value as Record<string, unknown>;
  if (
    msg.jsonrpc !== '2.0' ||
    typeof msg.method !== 'string' ||
    msg.method.length === 0
  ) {
    return false;
  }
  if (
    'id' in msg &&
    msg.id !== null &&
    typeof msg.id !== 'string' &&
    typeof msg.id !== 'number'
  ) {
    return false;
  }
  return true;
}

export function isNotification(message: JsonRpcMessage): boolean {
  return message.id === undefined || message.id === null;
}
