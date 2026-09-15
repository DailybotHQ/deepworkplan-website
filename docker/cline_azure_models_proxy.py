#!/usr/bin/env python3
"""Local Azure OpenAI proxy that filters GET /models to a whitelist.

Cline's openai-compatible picker always GETs {baseUrl}/models and shows every
id Azure returns (hundreds). OpenCode supports provider.whitelist; Cline does
not. This tiny reverse proxy keeps chat/completions intact while returning only
the deployments listed in CLINE_AZURE_MODEL_WHITELIST.
"""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

UPSTREAM = os.environ["CLINE_AZURE_UPSTREAM"].rstrip("/")
API_KEY = os.environ["CLINE_AZURE_API_KEY"]
WHITELIST = [
	m.strip()
	for m in os.environ.get("CLINE_AZURE_MODEL_WHITELIST", "").split(",")
	if m.strip()
]
HOST = os.environ.get("CLINE_AZURE_PROXY_HOST", "127.0.0.1")
PORT = int(os.environ.get("CLINE_AZURE_PROXY_PORT", "0"))


class Handler(BaseHTTPRequestHandler):
	protocol_version = "HTTP/1.1"

	def log_message(self, format: str, *args: object) -> None:
		return

	def do_GET(self) -> None:
		if self.path.split("?", 1)[0].rstrip("/").endswith("/models"):
			self._filtered_models()
			return
		self._proxy()

	def do_POST(self) -> None:
		self._proxy()

	def do_PUT(self) -> None:
		self._proxy()

	def do_DELETE(self) -> None:
		self._proxy()

	def do_OPTIONS(self) -> None:
		self._proxy()

	def _filtered_models(self) -> None:
		payload = {
			"object": "list",
			"data": [{"id": model_id, "object": "model"} for model_id in WHITELIST],
		}
		body = json.dumps(payload).encode("utf-8")
		self.send_response(200)
		self.send_header("Content-Type", "application/json")
		self.send_header("Content-Length", str(len(body)))
		self.send_header("Connection", "close")
		self.end_headers()
		self.wfile.write(body)

	def _proxy(self) -> None:
		length = int(self.headers.get("Content-Length", "0") or "0")
		body = self.rfile.read(length) if length > 0 else None
		url = f"{UPSTREAM}{self.path}"
		headers = {
			key: value
			for key, value in self.headers.items()
			if key.lower()
			not in {
				"host",
				"content-length",
				"connection",
				"transfer-encoding",
			}
		}
		# Prefer Azure api-key; keep caller Authorization if present.
		headers.setdefault("api-key", API_KEY)
		if "Authorization" not in headers and "authorization" not in {
			k.lower() for k in headers
		}:
			headers["Authorization"] = f"Bearer {API_KEY}"

		request = urllib.request.Request(
			url, data=body, headers=headers, method=self.command
		)
		try:
			with urllib.request.urlopen(request, timeout=600) as response:
				resp_body = response.read()
				self.send_response(response.status)
				for key, value in response.headers.items():
					if key.lower() in {
						"transfer-encoding",
						"connection",
						"content-encoding",
						"content-length",
					}:
						continue
					self.send_header(key, value)
				self.send_header("Content-Length", str(len(resp_body)))
				self.send_header("Connection", "close")
				self.end_headers()
				self.wfile.write(resp_body)
		except urllib.error.HTTPError as error:
			resp_body = error.read()
			self.send_response(error.code)
			self.send_header("Content-Type", error.headers.get("Content-Type", "application/json"))
			self.send_header("Content-Length", str(len(resp_body)))
			self.send_header("Connection", "close")
			self.end_headers()
			self.wfile.write(resp_body)
		except Exception as error:  # noqa: BLE001 - surface upstream failures to Cline
			msg = json.dumps({"error": {"message": str(error)}}).encode("utf-8")
			self.send_response(502)
			self.send_header("Content-Type", "application/json")
			self.send_header("Content-Length", str(len(msg)))
			self.send_header("Connection", "close")
			self.end_headers()
			self.wfile.write(msg)


def main() -> int:
	if not UPSTREAM or not API_KEY:
		print("CLINE_AZURE_UPSTREAM and CLINE_AZURE_API_KEY are required", file=sys.stderr)
		return 1
	if not WHITELIST:
		print("CLINE_AZURE_MODEL_WHITELIST is empty", file=sys.stderr)
		return 1

	server = ThreadingHTTPServer((HOST, PORT), Handler)
	bound_port = server.server_address[1]
	# Parent reads this single line to learn the ephemeral port.
	print(bound_port, flush=True)
	try:
		server.serve_forever()
	except KeyboardInterrupt:
		pass
	return 0


if __name__ == "__main__":
	raise SystemExit(main())
