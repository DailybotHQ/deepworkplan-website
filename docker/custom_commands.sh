#!/bin/bash

# Container-installed Node must win over IDE-bundled Node (Cursor Server's
# ~/.cursor-server/bin/<commit>/node, VS Code Server's equivalent, etc.).
# /etc/profile.d/00-container-node-first.sh covers login shells; this guard
# covers non-login interactive shells that only source ~/.bashrc (editor
# terminals, `bash -i`, the agent shell tool, …). Idempotent.
if [ -x /usr/local/bin/node ]; then
  case "${PATH}" in
    /usr/local/bin:*) : ;;  # already at the front
    *) PATH="/usr/local/bin:${PATH}" ;;
  esac
  export PATH
fi

function print.success {
	GREEN="\033[0;32m"
  RESET="\033[0m"
  echo -e "${GREEN}$1${RESET}"
}

function print.error {
	RED="\033[0;31m"
  RESET="\033[0m"
  echo -e "${RED}$1${RESET}"
}

function check() {
  print.success "Running astro checks..."
	corepack pnpm run astro:check
	if [ $? != 0 ]; then
    echo ''
		print.error "⚠️ Astro checks failed, skipping astro checks..."
		return 1
	fi

	print.success "Running biome checks..."
	corepack pnpm run biome:check
}

function fix() {
  print.success "Running astro checks..."
	corepack pnpm run astro:check
	if [ $? != 0 ]; then
    echo ''
		print.error "⚠️ Astro checks failed, skipping astro checks..."
		return 1
	fi

	print.success "Running biome checks && apply automatic fixes..."
	corepack pnpm run biome:fix
}

function test() {
  print.success "Running tests..."
	corepack pnpm run test
}

# Astro 7 has no quiet/level option for build logs (the `logging` config key is
# gone; `--silent` hides errors too), so builds in this container filter the
# per-route lines ("21:38:52   ├─ /es/quickstart.md (+3ms)") — ~2700 lines
# across 17 languages — and keep banners, errors, and warnings. The pattern is
# deliberately pure ASCII ([^0-9]+ stands in for the ├─/└─ glyphs) so it works
# even when grep falls back to the C locale and byte-mode matching. It anchors
# on the exact "(+Nms)" ending, so the build-flake error text that Astro glues
# onto a route line ("...index.htmlENOENT: ...") is NOT matched and still
# prints.
_ASTROROUTE='^[0-9]{2}:[0-9]{2}:[0-9]{2} +[^0-9]+ /[^ ]+ \(\+[0-9]+ms\)( \(restored\)| \(cached\))? *$'

# This container's bind-mounted filesystem (virtiofs on Docker Desktop) races
# with astro build in two known-transient ways: rolldown's mkdir of
# dist/.prerender fails with EEXIST when a previous build left it behind, and
# page generation intermittently fails with ENOENT on the mkdir of a
# just-created parent dir. Both go away with a clean dist/ + retry, so builds
# retry up to 3 times — but ONLY when the failure matches these signatures; a
# real error (type error, missing dep, …) fails immediately with full output.
_ASTRO_FLAKE='(Could not create directory for output chunks|File exists \(os error 17\)|ENOENT: no such file or directory, mkdir)'

function _astro_build() {
	local log status attempt
	log="$(mktemp)"
	for attempt in 1 2 3; do
		rm -rf dist
		corepack pnpm run build 2>&1 | tee "$log" | grep -vE "$_ASTROROUTE"
		status=${PIPESTATUS[0]}
		if [ "$status" = 0 ]; then
			rm -f "$log"
			return 0
		fi
		if ! grep -qE "$_ASTRO_FLAKE" "$log"; then
			rm -f "$log"
			print.error "⚠️ Build failed with a real error (not the filesystem race) — not retrying."
			return "$status"
		fi
		print.error "⚠️ Build hit the known virtiofs race (attempt $attempt/3) — retrying with a clean dist/…"
	done
	rm -f "$log"
	print.error "⚠️ Build kept hitting the filesystem race after 3 attempts."
	return 1
}

function lighthouse() {
	print.success "Building site for Lighthouse audit..."
	_astro_build
	if [ $? != 0 ]; then
		print.error "⚠️ Build failed, skipping Lighthouse audit..."
		return 1
	fi
	print.success "Running Lighthouse audit..."
	corepack pnpm run lighthouse
}

function codecheck() {
	fix
	if [ $? != 0 ]; then
    echo ''
		print.error "⚠️ Biome checks failed..."
		return 1
	fi
	print.success "Checking Markdown parity (EN/ES)..."
	corepack pnpm run md:check
	if [ $? != 0 ]; then
		print.error "⚠️ Markdown parity check failed..."
		return 1
	fi
	print.success "Generating WebP images (skips if up to date)..."
	corepack pnpm run images:webp
	if [ $? != 0 ]; then
		print.error "⚠️ WebP generation failed..."
		return 1
	fi
	test
	if [ $? != 0 ]; then
		print.error "⚠️ Tests failed..."
		return 1
	fi
	lighthouse
}

function install() {
  print.success "Running pnpm install..."
	corepack pnpm install
}

# ================================
# Codex CLI with full permissions (bypass approvals and sandbox)
# ================================
# Usage:
#   codexx              - Start new session
#   codexx -c|--continue - Continue most recent session
#   codexx -l|--last    - Resume last session
#   codexx -r|--resume  - Interactive session selection
#   codexx -r <id>      - Resume specific session by ID
function codexx() {
	case "${1:-}" in
		-c|--continue)
			print.success "Continuing most recent Codex session..."
			shift
			command codex resume --last --dangerously-bypass-approvals-and-sandbox "$@"
			;;
		-l|--last)
			print.success "Resuming last Codex session..."
			shift
			command codex resume --last --dangerously-bypass-approvals-and-sandbox "$@"
			;;
		-r|--resume)
			shift
			if [[ -n "${1:-}" && "${1:0:1}" != "-" ]]; then
				# Resume specific session by ID
				local session_id="$1"
				shift
				print.success "Resuming Codex session: $session_id..."
				command codex resume "$session_id" --dangerously-bypass-approvals-and-sandbox "$@"
			else
				# Interactive session selection
				print.success "Selecting Codex session to resume..."
				command codex resume --all --dangerously-bypass-approvals-and-sandbox "$@"
			fi
			;;
		*)
			print.success "Starting new Codex session with full permissions..."
			command codex --dangerously-bypass-approvals-and-sandbox "$@"
			;;
	esac
}

# ================================
# Codex CLI via Azure OpenAI / Microsoft Foundry (GPT deployments).
# Uses Codex profile overlay ~/.codex/azure.config.toml (-p azure) so plain
# `codex` / `codexx` keep their default auth unchanged.
# Docs: https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/codex
# ================================
function _codex_azure_openai_env_or_die() {
	if [[ -z "${AZURE_OPENAI_API_KEY:-}" ]]; then
		print.error "AZURE_OPENAI_API_KEY is not set."
		echo "Add the same API Key as Cursor Azure OpenAI to docker/local/dwpwebsite/.env:"
		echo "  AZURE_OPENAI_API_KEY=..."
		echo "  AZURE_OPENAI_RESOURCE=dailybot-ai-prod-proj-resource"
		echo "  AZURE_OPENAI_MODEL_DAILY=gpt-5.4-mini-azure"
		echo "  AZURE_OPENAI_MODEL_REASONING=gpt-5.4-azure"
		return 1
	fi
	if [[ -z "${AZURE_OPENAI_RESOURCE:-}" && -z "${AZURE_OPENAI_BASE_URL:-}" ]]; then
		print.error "AZURE_OPENAI_RESOURCE (or AZURE_OPENAI_BASE_URL) is not set."
		echo "Add to docker/local/dwpwebsite/.env, e.g.:"
		echo "  AZURE_OPENAI_RESOURCE=dailybot-ai-prod-proj-resource"
		echo "  # or: AZURE_OPENAI_BASE_URL=https://….services.ai.azure.com/openai/v1"
		return 1
	fi
	if ! command -v codex >/dev/null 2>&1; then
		print.error "codex is not on PATH."
		echo "Rebuild the container so the pnpm global install runs:"
		echo "  corepack pnpm add -g @openai/codex"
		return 1
	fi
	return 0
}

# Write ~/.codex/azure.config.toml + azure-models.json from .env (-p azure overlay).
# model_catalog_json replaces the bundled picker catalog so /model only lists
# the two Foundry deployments (same idea as OpenCode/Cline whitelists).
function _codex_sync_azure_config() {
	local codex_home="${CODEX_HOME:-${HOME}/.codex}"
	local profile_file="${codex_home}/azure.config.toml"
	local catalog_file="${codex_home}/azure-models.json"
	local resource="${AZURE_OPENAI_RESOURCE:-}"
	local base_url="${AZURE_OPENAI_BASE_URL:-}"
	local model_daily="${AZURE_OPENAI_MODEL_DAILY:-gpt-5.4-mini-azure}"
	local model_reasoning="${AZURE_OPENAI_MODEL_REASONING:-gpt-5.4-azure}"
	local default_model="${AZURE_OPENAI_DEFAULT_MODEL:-${model_daily}}"
	# Optional image-gen deployment name for Foundry header workaround (dummy ok).
	local image_deployment="${AZURE_OPENAI_IMAGE_DEPLOYMENT:-gpt-image-1}"

	mkdir -p "${codex_home}"

	if [[ -z "${base_url}" && -n "${resource}" ]]; then
		base_url="https://${resource}.services.ai.azure.com/openai/v1"
	fi

	python3 - "${profile_file}" "${catalog_file}" "${base_url}" "${default_model}" \
		"${model_daily}" "${model_reasoning}" "${image_deployment}" <<'PY'
from pathlib import Path
import copy
import json
import subprocess
import sys

profile_path = Path(sys.argv[1])
catalog_path = Path(sys.argv[2])
base_url, default_model, model_daily, model_reasoning, image_deployment = sys.argv[3:8]

def esc(value: str) -> str:
    return value.replace("\\", "\\\\").replace('"', '\\"')

# Clone full ModelInfo entries from the bundled catalog (Codex requires
# base_instructions / instructions_template). Prefer gpt-5.4-mini for daily
# and gpt-5.4 for reasoning; fall back to any bundled entry.
bundled = json.loads(
    subprocess.check_output(["codex", "debug", "models", "--bundled"], text=True)
)
by_slug = {m["slug"]: m for m in bundled["models"]}


def azure_model(slug: str, display_name: str, description: str, priority: int, template_slug: str) -> dict:
    template = by_slug.get(template_slug) or next(iter(by_slug.values()))
    entry = copy.deepcopy(template)
    entry["slug"] = slug
    entry["display_name"] = display_name
    entry["description"] = description
    entry["visibility"] = "list"
    entry["supported_in_api"] = True
    entry["priority"] = priority
    # Azure-safe: ChatGPT-only presets break Foundry (openai/codex#31882).
    entry["use_responses_lite"] = False
    entry["multi_agent_version"] = None
    entry["tool_mode"] = None
    entry["supports_search_tool"] = False
    entry["additional_speed_tiers"] = []
    entry["service_tiers"] = []
    return entry


# Preserve order: daily first, then reasoning; dedupe if env points both at same id.
ordered: list[tuple[str, str, str, int, str]] = [
    (
        model_daily,
        f"{model_daily} (daily)",
        "Azure Foundry daily coding deployment.",
        1,
        "gpt-5.4-mini",
    ),
    (
        model_reasoning,
        f"{model_reasoning} (reasoning)",
        "Azure Foundry reasoning deployment.",
        2,
        "gpt-5.4",
    ),
]
seen: set[str] = set()
models: list[dict] = []
for slug, display, desc, priority, template_slug in ordered:
    if slug in seen:
        continue
    seen.add(slug)
    models.append(azure_model(slug, display, desc, priority, template_slug))

catalog_path.write_text(json.dumps({"models": models}, indent=2) + "\n")

# Profile overlay only — does not rewrite ~/.codex/config.toml defaults.
# wire_api=responses is required for Foundry GPT-5.x with Codex.
# image_generation=false + http_headers avoid Foundry requiring an imagegen
# deployment on plain text turns (known Azure/Codex quirk).
content = f"""# Generated by docker/custom_commands.sh codex-azure — do not hand-edit.
# Sourced via: codex -p azure
# Models from AZURE_OPENAI_MODEL_DAILY / REASONING / DEFAULT_MODEL.

model = "{esc(default_model)}"
model_provider = "azure"
model_reasoning_effort = "medium"
model_catalog_json = "{esc(str(catalog_path))}"

[model_providers.azure]
name = "Azure OpenAI / Microsoft Foundry"
base_url = "{esc(base_url)}"
env_key = "AZURE_OPENAI_API_KEY"
wire_api = "responses"
http_headers = {{ "x-ms-oai-image-generation-deployment" = "{esc(image_deployment)}" }}

[features]
image_generation = false

# Available Foundry deployments for this profile (documentation for operators):
# - daily: {esc(model_daily)}
# - reasoning: {esc(model_reasoning)}
"""
profile_path.write_text(content)
PY
}

# Usage mirrors codexx; forces Azure Foundry profile (-p azure).
function codex-azure() {
	_codex_azure_openai_env_or_die || return 1
	_codex_sync_azure_config || return 1
	local daily="${AZURE_OPENAI_MODEL_DAILY:-gpt-5.4-mini-azure}"
	local reasoning="${AZURE_OPENAI_MODEL_REASONING:-gpt-5.4-azure}"
	local default_model="${AZURE_OPENAI_DEFAULT_MODEL:-${daily}}"

	# Ensure the env_key referenced by azure.config.toml is present in this process.
	export AZURE_OPENAI_API_KEY

	case "${1:-}" in
		-l|--last)
			print.success "Resuming last Codex session (Azure Foundry: ${default_model})..."
			shift
			codex -p azure resume --last --dangerously-bypass-approvals-and-sandbox "$@"
			;;
		-r|--resume)
			shift
			if [[ -n "${1:-}" && "${1:0:1}" != "-" ]]; then
				local session_id="$1"
				shift
				print.success "Resuming Codex session (Azure Foundry): $session_id..."
				codex -p azure resume "$session_id" --dangerously-bypass-approvals-and-sandbox "$@"
			else
				print.success "Selecting Codex session to resume (Azure Foundry)..."
				codex -p azure resume --all --dangerously-bypass-approvals-and-sandbox "$@"
			fi
			;;
		*)
			print.success "Starting Codex with Azure Foundry (${daily} / ${reasoning}, default ${default_model}) in full-permissions mode..."
			codex -p azure --dangerously-bypass-approvals-and-sandbox "$@"
			;;
	esac
}

# ================================
# Codex CLI via Z.AI GLM Coding Plan.
# Uses Codex profile overlay ~/.codex/glm.config.toml (-p glm) so plain
# `codex` / `codexx` / `codex-azure` keep their auth unchanged.
# Docs: https://docs.z.ai/devpack/tool/codex
# Endpoint must be Responses API: https://api.z.ai/api/v1 (not coding/paas/v4).
# ================================
function _codex_glm_env_or_die() {
	_zai_coding_env_or_die || return 1
	if ! command -v codex >/dev/null 2>&1; then
		print.error "codex is not on PATH."
		echo "Rebuild the container so the pnpm global install runs:"
		echo "  corepack pnpm add -g @openai/codex"
		return 1
	fi
	return 0
}

# Write ~/.codex/glm.config.toml + glm-models.json from .env (-p glm overlay).
# model_catalog_json restricts /model to our GLM ids (same idea as codex-azure).
function _codex_sync_glm_config() {
	local codex_home="${CODEX_HOME:-${HOME}/.codex}"
	local profile_file="${codex_home}/glm.config.toml"
	local catalog_file="${codex_home}/glm-models.json"
	local model_opus="${ZAI_DEFAULT_OPUS_MODEL:-glm-5.3}"
	local model_sonnet="${ZAI_DEFAULT_SONNET_MODEL:-glm-5.3}"
	local model_haiku="${ZAI_DEFAULT_HAIKU_MODEL:-glm-5.3-flash}"
	local default_model="${ZAI_CODEX_DEFAULT_MODEL:-${model_sonnet}}"
	# Official Codex Responses endpoint (not the OpenAI-compatible Coding Plan URL).
	local base_url="${ZAI_CODEX_BASE_URL:-https://api.z.ai/api/v1}"

	mkdir -p "${codex_home}"

	python3 - "${profile_file}" "${catalog_file}" "${base_url}" "${default_model}" \
		"${model_opus}" "${model_sonnet}" "${model_haiku}" <<'PY'
from pathlib import Path
import copy
import json
import subprocess
import sys

profile_path = Path(sys.argv[1])
catalog_path = Path(sys.argv[2])
base_url, default_model, model_opus, model_sonnet, model_haiku = sys.argv[3:8]

def esc(value: str) -> str:
    return value.replace("\\", "\\\\").replace('"', '\\"')

bundled = json.loads(
    subprocess.check_output(["codex", "debug", "models", "--bundled"], text=True)
)
by_slug = {m["slug"]: m for m in bundled["models"]}


def glm_model(slug: str, display_name: str, description: str, priority: int, template_slug: str) -> dict:
    template = by_slug.get(template_slug) or next(iter(by_slug.values()))
    entry = copy.deepcopy(template)
    entry["slug"] = slug
    entry["display_name"] = display_name
    entry["description"] = description
    entry["visibility"] = "list"
    entry["supported_in_api"] = True
    entry["priority"] = priority
    entry["default_reasoning_level"] = "max"
    # Keep vision if the template advertises it (GLM Coding Plan accepts images).
    entry["input_modalities"] = ["text", "image"]
    # Avoid ChatGPT-only presets against Z.AI Responses.
    entry["use_responses_lite"] = False
    entry["multi_agent_version"] = None
    entry["tool_mode"] = None
    entry["supports_search_tool"] = False
    entry["additional_speed_tiers"] = []
    entry["service_tiers"] = []
    return entry


# Same GLM aliases as claude-glm / opencode-glm (dedupe when opus == sonnet).
ordered: list[tuple[str, str, str, int, str]] = [
    (model_sonnet, f"{model_sonnet} (sonnet)", "Z.AI GLM Coding Plan — sonnet alias.", 1, "gpt-5.4"),
    (model_opus, f"{model_opus} (opus)", "Z.AI GLM Coding Plan — opus alias.", 2, "gpt-5.4"),
    (model_haiku, f"{model_haiku} (haiku)", "Z.AI GLM Coding Plan — haiku alias.", 3, "gpt-5.4-mini"),
]
seen: set[str] = set()
models: list[dict] = []
for slug, display, desc, priority, template_slug in ordered:
    if slug in seen:
        continue
    seen.add(slug)
    models.append(glm_model(slug, display, desc, priority, template_slug))

catalog_path.write_text(json.dumps({"models": models}, indent=2) + "\n")

# Profile overlay only — does not rewrite ~/.codex/config.toml defaults.
# env_key reads ZAI_CODING_API_KEY from the process (no key written to disk).
content = f"""# Generated by docker/custom_commands.sh codex-glm — do not hand-edit.
# Sourced via: codex -p glm
# Models from ZAI_DEFAULT_*_MODEL / ZAI_CODEX_DEFAULT_MODEL.
# Docs: https://docs.z.ai/devpack/tool/codex

model = "{esc(default_model)}"
model_provider = "ZAI"
model_reasoning_effort = "max"
model_catalog_json = "{esc(str(catalog_path))}"

[model_providers.ZAI]
name = "Z.AI GLM Coding Plan"
base_url = "{esc(base_url)}"
env_key = "ZAI_CODING_API_KEY"
wire_api = "responses"

# Available GLM models for this profile (documentation for operators):
# - opus/sonnet: {esc(model_opus)} / {esc(model_sonnet)}
# - haiku: {esc(model_haiku)}
"""
profile_path.write_text(content)
PY
}

# Usage mirrors codexx / codex-azure; forces Z.AI GLM profile (-p glm).
function codex-glm() {
	_codex_glm_env_or_die || return 1
	_codex_sync_glm_config || return 1
	local opus="${ZAI_DEFAULT_OPUS_MODEL:-glm-5.3}"
	local sonnet="${ZAI_DEFAULT_SONNET_MODEL:-glm-5.3}"
	local haiku="${ZAI_DEFAULT_HAIKU_MODEL:-glm-5.3-flash}"
	local default_model="${ZAI_CODEX_DEFAULT_MODEL:-${sonnet}}"

	# Ensure the env_key referenced by glm.config.toml is present in this process.
	export ZAI_CODING_API_KEY

	case "${1:-}" in
		-l|--last)
			print.success "Resuming last Codex session (Z.AI GLM: ${default_model})..."
			shift
			codex -p glm resume --last --dangerously-bypass-approvals-and-sandbox "$@"
			;;
		-r|--resume)
			shift
			if [[ -n "${1:-}" && "${1:0:1}" != "-" ]]; then
				local session_id="$1"
				shift
				print.success "Resuming Codex session (Z.AI GLM): $session_id..."
				codex -p glm resume "$session_id" --dangerously-bypass-approvals-and-sandbox "$@"
			else
				print.success "Selecting Codex session to resume (Z.AI GLM)..."
				codex -p glm resume --all --dangerously-bypass-approvals-and-sandbox "$@"
			fi
			;;
		*)
			print.success "Starting Codex with Z.AI GLM (${opus} / ${sonnet} / ${haiku}, default ${default_model}) in full-permissions mode..."
			codex -p glm --dangerously-bypass-approvals-and-sandbox "$@"
			;;
	esac
}

# ================================
# Claude Code with full permissions (skip all permission prompts)
# ================================
# Usage:
#   claudex                - Start new session
#   claudex -c|--continue  - Continue most recent session
#   claudex -r|--resume    - Interactive session selection
#   claudex -r <id>        - Resume specific session by ID
function claudex() {
	# Works when running as dev-user (non-root) which is the default in devcontainer
	case "${1:-}" in
		-c|--continue)
			print.success "Continuing most recent Claude Code session..."
			shift
			claude --continue --dangerously-skip-permissions "$@"
			;;
		-r|--resume)
			shift
			if [[ -n "${1:-}" && "${1:0:1}" != "-" ]]; then
				# Resume specific session by ID
				local session_id="$1"
				shift
				print.success "Resuming Claude Code session: $session_id..."
				claude --resume "$session_id" --dangerously-skip-permissions "$@"
			else
				# Interactive session selection
				print.success "Selecting Claude Code session to resume..."
				claude --resume --dangerously-skip-permissions "$@"
			fi
			;;
		*)
			print.success "Starting new Claude Code session with full permissions..."
			claude --dangerously-skip-permissions "$@"
			;;
	esac
}

# ================================
# Claude Code via Z.AI GLM Coding Plan (does not change default `claude` / Anthropic auth).
# Requires ZAI_CODING_API_KEY in docker/local/dwpwebsite/.env (survives rebuilds).
# Model aliases (Opus/Sonnet/Haiku) are remapped to GLM only for this process — not in settings.json.
# Docs: https://docs.z.ai/devpack/quick-start · https://docs.z.ai/devpack/latest-model
# ================================
function _zai_coding_env_or_die() {
	if [[ -z "${ZAI_CODING_API_KEY:-}" ]]; then
		print.error "ZAI_CODING_API_KEY is not set."
		echo "Add it to docker/local/dwpwebsite/.env (Coding Plan key from https://z.ai/manage-apikey/apikey-list),"
		echo "then open a new shell or re-source your custom_commands file."
		echo "Optional one-time wizard: chelper   (or: pnpm dlx @z_ai/coding-helper)"
		return 1
	fi
	return 0
}

# Build env for a single Claude Code invocation against Z.AI (process-scoped only).
function _zai_claude_run() {
	local -a claude_args=("$@")
	local opus_model="${ZAI_DEFAULT_OPUS_MODEL:-glm-5.3}"
	local sonnet_model="${ZAI_DEFAULT_SONNET_MODEL:-glm-5.3}"
	local haiku_model="${ZAI_DEFAULT_HAIKU_MODEL:-glm-5.3-flash}"
	local timeout_ms="${ZAI_CODING_API_TIMEOUT_MS:-3000000}"
	# Optional 1M context: set models to e.g. glm-5.3[1m] and ZAI_CODING_AUTO_COMPACT_WINDOW=1000000
	local compact_window="${ZAI_CODING_AUTO_COMPACT_WINDOW:-}"

	if [[ -n "${compact_window}" ]]; then
		ANTHROPIC_AUTH_TOKEN="${ZAI_CODING_API_KEY}" \
			ANTHROPIC_BASE_URL="https://api.z.ai/api/anthropic" \
			API_TIMEOUT_MS="${timeout_ms}" \
			ANTHROPIC_DEFAULT_OPUS_MODEL="${opus_model}" \
			ANTHROPIC_DEFAULT_SONNET_MODEL="${sonnet_model}" \
			ANTHROPIC_DEFAULT_HAIKU_MODEL="${haiku_model}" \
			CLAUDE_CODE_AUTO_COMPACT_WINDOW="${compact_window}" \
			claude "${claude_args[@]}"
	else
		ANTHROPIC_AUTH_TOKEN="${ZAI_CODING_API_KEY}" \
			ANTHROPIC_BASE_URL="https://api.z.ai/api/anthropic" \
			API_TIMEOUT_MS="${timeout_ms}" \
			ANTHROPIC_DEFAULT_OPUS_MODEL="${opus_model}" \
			ANTHROPIC_DEFAULT_SONNET_MODEL="${sonnet_model}" \
			ANTHROPIC_DEFAULT_HAIKU_MODEL="${haiku_model}" \
			claude "${claude_args[@]}"
	fi
}

function claude-glm() {
	_zai_coding_env_or_die || return 1
	print.success "Starting Claude Code with Z.AI GLM (${ZAI_DEFAULT_OPUS_MODEL:-glm-5.3} / ${ZAI_DEFAULT_SONNET_MODEL:-glm-5.3}) with full permissions..."

	# Always run with full permissions (--dangerously-skip-permissions)
	_zai_claude_run --dangerously-skip-permissions "$@"
}

# ================================
# OpenCode via Azure OpenAI / Microsoft Foundry (GPT deployments).
# Does not change default `opencode` auth. Writes Azure provider into the
# persisted ~/.config/opencode/opencode.json from .env, then launches OpenCode.
# Docs: https://opencode.ai/docs/providers/#azure-openai
# ================================
function _azure_openai_keys_or_die() {
	if [[ -z "${AZURE_OPENAI_API_KEY:-}" ]]; then
		print.error "AZURE_OPENAI_API_KEY is not set."
		echo "Add the same API Key as Cursor Azure OpenAI to docker/local/dwpwebsite/.env:"
		echo "  AZURE_OPENAI_API_KEY=..."
		echo "  AZURE_OPENAI_RESOURCE=dailybot-ai-prod-proj-resource"
		echo "  AZURE_OPENAI_MODEL_DAILY=gpt-5.4-mini-azure"
		echo "  AZURE_OPENAI_MODEL_REASONING=gpt-5.4-azure"
		return 1
	fi
	if [[ -z "${AZURE_OPENAI_RESOURCE:-}" && -z "${AZURE_OPENAI_BASE_URL:-}" ]]; then
		print.error "AZURE_OPENAI_RESOURCE (or AZURE_OPENAI_BASE_URL) is not set."
		echo "Add to docker/local/dwpwebsite/.env, e.g.:"
		echo "  AZURE_OPENAI_RESOURCE=dailybot-ai-prod-proj-resource"
		echo "  # or: AZURE_OPENAI_BASE_URL=https://….services.ai.azure.com/openai/v1"
		return 1
	fi
	return 0
}

function _azure_openai_env_or_die() {
	_azure_openai_keys_or_die || return 1
	if ! command -v opencode >/dev/null 2>&1; then
		print.error "opencode is not on PATH."
		echo "Rebuild the container so the official installer runs:"
		echo "  curl -fsSL https://opencode.ai/install | bash"
		return 1
	fi
	return 0
}

# Sync Azure provider block into ~/.config/opencode/opencode.json from .env.
function _opencode_sync_azure_config() {
	local config_dir="${HOME}/.config/opencode"
	local config_file="${config_dir}/opencode.json"
	local resource="${AZURE_OPENAI_RESOURCE:-}"
	local base_url="${AZURE_OPENAI_BASE_URL:-}"
	local api_key="${AZURE_OPENAI_API_KEY}"
	local model_daily="${AZURE_OPENAI_MODEL_DAILY:-gpt-5.4-mini-azure}"
	local model_reasoning="${AZURE_OPENAI_MODEL_REASONING:-gpt-5.4-azure}"
	local default_model="${AZURE_OPENAI_DEFAULT_MODEL:-${model_daily}}"

	mkdir -p "${config_dir}"

	# If only resource is set, build the Foundry OpenAI v1 base URL.
	if [[ -z "${base_url}" && -n "${resource}" ]]; then
		base_url="https://${resource}.services.ai.azure.com/openai/v1"
	fi

	python3 - "${config_file}" "${api_key}" "${resource}" "${base_url}" \
		"${model_daily}" "${model_reasoning}" "${default_model}" <<'PY'
import json
import sys
from pathlib import Path

config_path = Path(sys.argv[1])
api_key, resource, base_url, model_daily, model_reasoning, default_model = sys.argv[2:8]

data = {}
if config_path.exists():
    try:
        data = json.loads(config_path.read_text())
    except json.JSONDecodeError:
        data = {}

data["$schema"] = "https://opencode.ai/config.json"
provider = data.setdefault("provider", {})
azure = provider.setdefault("azure", {})
options = azure.setdefault("options", {})
options["apiKey"] = api_key
if resource:
    options["resourceName"] = resource
if base_url:
    options["baseURL"] = base_url

# Only expose the deployments we configure — hide the rest of the Azure catalog.
# Declare image input explicitly: OpenCode defaults custom/Azure models to
# text-only and strips vision before the API call (same model works in
# Codex/Cline without this gate).
azure["whitelist"] = [model_daily, model_reasoning]
vision = {
    "attachment": True,
    "modalities": {"input": ["text", "image"], "output": ["text"]},
}
models = azure.setdefault("models", {})
models[model_daily] = {
    "id": model_daily,
    "name": f"{model_daily} (daily)",
    **vision,
}
models[model_reasoning] = {
    "id": model_reasoning,
    "name": f"{model_reasoning} (reasoning)",
    **vision,
}
# Drop stale custom entries that are no longer in the whitelist.
for key in list(models):
    if key not in (model_daily, model_reasoning):
        del models[key]
data["model"] = f"azure/{default_model}"

config_path.write_text(json.dumps(data, indent=2) + "\n")
PY
}

function opencodex() {
	print.success "Starting OpenCode with full permissions (--auto)..."
	# Official flag: auto-approve permission prompts that are not explicitly denied.
	# Do NOT use OPENCODE_PERMISSION='"allow"' — OpenCode treats that string as
	# char-indexed keys (permission[0]="a") and crashes on TUI start.
	opencode --auto "$@"
}

function opencode-azure() {
	_azure_openai_env_or_die || return 1
	_opencode_sync_azure_config || return 1
	local daily="${AZURE_OPENAI_MODEL_DAILY:-gpt-5.4-mini-azure}"
	local reasoning="${AZURE_OPENAI_MODEL_REASONING:-gpt-5.4-azure}"
	print.success "Starting OpenCode with Azure OpenAI (${daily} / ${reasoning}) in full-permissions mode (--auto)..."
	AZURE_RESOURCE_NAME="${AZURE_OPENAI_RESOURCE:-${AZURE_RESOURCE_NAME:-}}" \
		AZURE_API_KEY="${AZURE_OPENAI_API_KEY}" \
		opencode --auto "$@"
}

# Sync Z.AI Coding Plan (GLM) into ~/.config/opencode/opencode.json — same model
# env vars as claude-glm. Uses the built-in zai-coding-plan provider
# (OpenAI-compatible Coding endpoint), not Anthropic env vars.
# Docs: https://docs.z.ai/devpack/tool/opencode · https://opencode.ai/docs/providers
function _opencode_sync_zai_config() {
	local config_dir="${HOME}/.config/opencode"
	local config_file="${config_dir}/opencode.json"
	local api_key="${ZAI_CODING_API_KEY}"
	local model_opus="${ZAI_DEFAULT_OPUS_MODEL:-glm-5.3}"
	local model_sonnet="${ZAI_DEFAULT_SONNET_MODEL:-glm-5.3}"
	local model_haiku="${ZAI_DEFAULT_HAIKU_MODEL:-glm-5.3-flash}"
	local default_model="${ZAI_OPENCODE_DEFAULT_MODEL:-${model_sonnet}}"
	# Coding Plan OpenAI-compatible endpoint (not /api/anthropic, not /api/paas/v4).
	local base_url="${ZAI_CODING_BASE_URL:-https://api.z.ai/api/coding/paas/v4}"

	if ! command -v opencode >/dev/null 2>&1; then
		print.error "opencode is not on PATH."
		echo "Rebuild the container so the official installer runs:"
		echo "  curl -fsSL https://opencode.ai/install | bash"
		return 1
	fi

	mkdir -p "${config_dir}"

	python3 - "${config_file}" "${api_key}" "${base_url}" \
		"${model_opus}" "${model_sonnet}" "${model_haiku}" "${default_model}" <<'PY'
import json
import sys
from pathlib import Path

config_path = Path(sys.argv[1])
api_key, base_url, model_opus, model_sonnet, model_haiku, default_model = sys.argv[2:8]

data = {}
if config_path.exists():
    try:
        data = json.loads(config_path.read_text())
    except json.JSONDecodeError:
        data = {}

data["$schema"] = "https://opencode.ai/config.json"
provider = data.setdefault("provider", {})
zai = provider.setdefault("zai-coding-plan", {})
options = zai.setdefault("options", {})
options["apiKey"] = api_key
options["baseURL"] = base_url

# Same GLM aliases as claude-glm (dedupe when opus == sonnet).
whitelist = []
for model_id in (model_opus, model_sonnet, model_haiku):
    if model_id not in whitelist:
        whitelist.append(model_id)
zai["whitelist"] = whitelist

models = zai.setdefault("models", {})
# OpenCode defaults custom models to text-only; declare vision so image
# attachments are not stripped client-side (same fix as opencode-azure).
vision = {
    "attachment": True,
    "modalities": {"input": ["text", "image"], "output": ["text"]},
}
models[model_opus] = {
    "id": model_opus,
    "name": f"{model_opus} (opus)",
    **vision,
}
models[model_sonnet] = {
    "id": model_sonnet,
    "name": f"{model_sonnet} (sonnet)",
    **vision,
}
models[model_haiku] = {
    "id": model_haiku,
    "name": f"{model_haiku} (haiku)",
    **vision,
}
for key in list(models):
    if key not in whitelist:
        del models[key]

data["model"] = f"zai-coding-plan/{default_model}"

config_path.write_text(json.dumps(data, indent=2) + "\n")
PY
}

function opencode-glm() {
	_zai_coding_env_or_die || return 1
	_opencode_sync_zai_config || return 1
	local opus="${ZAI_DEFAULT_OPUS_MODEL:-glm-5.3}"
	local sonnet="${ZAI_DEFAULT_SONNET_MODEL:-glm-5.3}"
	local haiku="${ZAI_DEFAULT_HAIKU_MODEL:-glm-5.3-flash}"
	print.success "Starting OpenCode with Z.AI GLM Coding Plan (${opus} / ${sonnet} / ${haiku}) in full-permissions mode (--auto)..."
	# Built-in provider also reads ZHIPU_API_KEY; keep it in sync with our .env key name.
	ZHIPU_API_KEY="${ZAI_CODING_API_KEY}" \
		ZAI_API_KEY="${ZAI_CODING_API_KEY}" \
		opencode --auto "$@"
}

# ================================
# xAI / Grok (console.x.ai API credits)
# Primary: pix / opencode-xai / cline-xai (full permissions)
# Also: codex-xai (xAI Responses API)
# Docs: https://docs.x.ai/developers/quickstart · https://opencode.ai/docs/providers/
# ================================
function _xai_env_or_die() {
	if [[ -z "${XAI_API_KEY:-}" ]]; then
		print.error "XAI_API_KEY is not set."
		echo "Add your key from https://console.x.ai/ to docker/local/dwpwebsite/.env:"
		echo "  XAI_API_KEY=..."
		echo "  # optional: XAI_MODEL_DAILY=grok-4.3"
		echo "  # optional: XAI_MODEL_REASONING=grok-4.6"
		return 1
	fi
	return 0
}

function _opencode_sync_xai_config() {
	local config_dir="${HOME}/.config/opencode"
	local config_file="${config_dir}/opencode.json"
	local api_key="${XAI_API_KEY}"
	local base_url="${XAI_BASE_URL:-https://api.x.ai/v1}"
	local model_daily="${XAI_MODEL_DAILY:-grok-4.3}"
	local model_reasoning="${XAI_MODEL_REASONING:-grok-4.6}"
	local default_model="${XAI_DEFAULT_MODEL:-${model_daily}}"

	if ! command -v opencode >/dev/null 2>&1; then
		print.error "opencode is not on PATH."
		echo "Rebuild the container so the official installer runs:"
		echo "  curl -fsSL https://opencode.ai/install | bash"
		return 1
	fi

	mkdir -p "${config_dir}"

	python3 - "${config_file}" "${api_key}" "${base_url}" \
		"${model_daily}" "${model_reasoning}" "${default_model}" <<'PY'
import json
import sys
from pathlib import Path

config_path = Path(sys.argv[1])
api_key, base_url, model_daily, model_reasoning, default_model = sys.argv[2:7]

data = {}
if config_path.exists():
    try:
        data = json.loads(config_path.read_text())
    except json.JSONDecodeError:
        data = {}

data["$schema"] = "https://opencode.ai/config.json"
provider = data.setdefault("provider", {})
xai = provider.setdefault("xai", {})
options = xai.setdefault("options", {})
options["apiKey"] = api_key
options["baseURL"] = base_url

whitelist = []
for model_id in (model_daily, model_reasoning):
    if model_id not in whitelist:
        whitelist.append(model_id)
xai["whitelist"] = whitelist

vision = {
    "attachment": True,
    "modalities": {"input": ["text", "image"], "output": ["text"]},
}
models = xai.setdefault("models", {})
models[model_daily] = {
    "id": model_daily,
    "name": f"{model_daily} (daily)",
    **vision,
}
models[model_reasoning] = {
    "id": model_reasoning,
    "name": f"{model_reasoning} (reasoning)",
    **vision,
}
for key in list(models):
    if key not in whitelist:
        del models[key]

data["model"] = f"xai/{default_model}"
config_path.write_text(json.dumps(data, indent=2) + "\n")
PY
}

function opencode-xai() {
	_xai_env_or_die || return 1
	_opencode_sync_xai_config || return 1
	local daily="${XAI_MODEL_DAILY:-grok-4.3}"
	local reasoning="${XAI_MODEL_REASONING:-grok-4.6}"
	print.success "Starting OpenCode with xAI Grok (${daily} / ${reasoning}) in full-permissions mode (--auto)..."
	XAI_API_KEY="${XAI_API_KEY}" opencode --auto "$@"
}

function _cline_sync_xai_auth() {
	local base_url="${XAI_BASE_URL:-https://api.x.ai/v1}"
	local model_daily="${XAI_MODEL_DAILY:-grok-4.3}"
	local model_reasoning="${XAI_MODEL_REASONING:-grok-4.6}"
	local default_model="${XAI_DEFAULT_MODEL:-${model_daily}}"

	if ! command -v cline >/dev/null 2>&1; then
		print.error "cline is not on PATH."
		echo "Rebuild the container so the pnpm global install runs:"
		echo "  corepack pnpm add -g cline"
		return 1
	fi

	print.success "Syncing Cline xAI auth (openai-compatible → ${base_url})..."
	cline auth \
		-p openai \
		-b "${base_url}" \
		-k "${XAI_API_KEY}" \
		-m "${default_model}" || return 1

	# Soft-limit picker favorites in Cline models.json (Cline still lists /models).
	python3 - "${HOME}/.cline/data/settings/models.json" "${model_daily}" "${model_reasoning}" <<'PY' || true
import json
import sys
from pathlib import Path

path = Path(sys.argv[1])
daily, reasoning = sys.argv[2], sys.argv[3]
path.parent.mkdir(parents=True, exist_ok=True)
data = {"version": 1, "providers": {}}
if path.exists():
    try:
        data = json.loads(path.read_text())
    except json.JSONDecodeError:
        data = {"version": 1, "providers": {}}
data["version"] = 1
providers = data.setdefault("providers", {})
models = {}
for slug, label in ((daily, "daily"), (reasoning, "reasoning")):
    models[slug] = {"id": slug, "name": f"{slug} ({label})"}
providers["openai-compatible"] = {"models": models}
path.write_text(json.dumps(data, indent=2) + "\n")
PY
}

# Cline via xAI (openai-compatible provider) — kept for users who prefer Cline UI
function cline-xai() {
	_xai_env_or_die || return 1
	_cline_sync_xai_auth || return 1
	local daily="${XAI_MODEL_DAILY:-grok-4.3}"
	local reasoning="${XAI_MODEL_REASONING:-grok-4.6}"
	local default_model="${XAI_DEFAULT_MODEL:-${daily}}"

	print.success "Starting Cline with xAI Grok (${daily} / ${reasoning}) in full-permissions mode (--yolo)..."

	case "${1:-}" in
		-c|--continue)
			print.success "Continuing most recent Cline xAI session..."
			shift
			cline --yolo -P openai -m "${default_model}" -k "${XAI_API_KEY}" --continue "$@"
			;;
		*)
			# Base URL is persisted by `cline auth -b`; do not pass -b on run (not a run flag).
			cline --yolo -P openai -m "${default_model}" -k "${XAI_API_KEY}" "$@"
			;;
	esac
}

# ================================
# Official Grok CLI (xAI) — recommended
# ================================
# Usage:
#   grokx                  - Start new session
#   grokx "your prompt"    - Run a one-shot prompt
#   grokx -c|--continue    - Continue most recent session
#   grokx -r|--resume      - Interactive session picker
function grokx() {
	_xai_env_or_die || return 1

	# The official xAI Grok CLI is installed via the entrypoint (https://x.ai/cli/install.sh)
	if ! command -v grok >/dev/null 2>&1; then
		print.error "grok CLI not found."
		echo "Run: curl -fsSL https://x.ai/cli/install.sh | bash"
		echo "Or rebuild the container."
		return 1
	fi

	local daily="${XAI_MODEL_DAILY:-grok-4.3}"
	local reasoning="${XAI_MODEL_REASONING:-grok-4.6}"
	local default_model="${XAI_DEFAULT_MODEL:-${daily}}"

	print.success "Starting official Grok CLI (xAI) with ${default_model}..."

	case "${1:-}" in
		-c|--continue)
			print.success "Continuing most recent Grok session..."
			shift
			XAI_API_KEY="${XAI_API_KEY}" grok --continue "$@"
			;;
		-r|--resume)
			print.success "Selecting Grok session to resume..."
			shift
			XAI_API_KEY="${XAI_API_KEY}" grok --resume "$@"
			;;
		*)
			XAI_API_KEY="${XAI_API_KEY}" grok "$@"
			;;
	esac
}

function _pi_sync_xai_config() {
	local base_url="${XAI_BASE_URL:-https://api.x.ai/v1}"
	local model_daily="${XAI_MODEL_DAILY:-grok-4.3}"
	local model_reasoning="${XAI_MODEL_REASONING:-grok-4.6}"

	local provider_json
	provider_json="$(python3 - "${base_url}" "${model_daily}" "${model_reasoning}" <<'PY'
import json
import sys

base_url, model_daily, model_reasoning = sys.argv[1:4]
models = []
seen = set()
for slug, name, ctx in (
    (model_daily, f"{model_daily} (daily)", 1000000),
    (model_reasoning, f"{model_reasoning} (reasoning)", 500000),
):
    if slug in seen:
        continue
    seen.add(slug)
    models.append({
        "id": slug,
        "name": name,
        "reasoning": True,
        "input": ["text", "image"],
        "contextWindow": ctx,
        "maxTokens": 131072,
    })
print(json.dumps({
    "baseUrl": base_url,
    "api": "openai-completions",
    "apiKey": "$XAI_API_KEY",
    "compat": {
        "supportsDeveloperRole": False,
        "supportsReasoningEffort": True,
    },
    "models": models,
}))
PY
)"
	_pi_upsert_provider "xai-grok" "${provider_json}"
}

# Usage: pix [-c|--continue] [-r|--resume] [args...]
# pix = base Pi but always with full permissions (recommended)
# Does NOT set any provider by default (lets Pi use its own default or what is in ~/.pi/agent/models.json)
function pix() {
	_pi_env_or_die || return 1
	print.success "Starting Pi (pix) with full permissions (--approve)..."

	case "${1:-}" in
		-c|--continue)
			print.success "Continuing last Pi session..."
			shift
			pi -c --approve "$@"
			;;
		-r|--resume)
			print.success "Selecting Pi session to resume..."
			shift
			pi -r --approve "$@"
			;;
		*)
			# Pi uses --approve (-a) to trust project-local files and auto-approve permission prompts
			pi --approve "$@"
			;;
	esac
}

# pi-xai = Pi using xAI Grok provider with full permissions
function pi-xai() {
	_pi_env_or_die || return 1
	_xai_env_or_die || return 1
	_pi_sync_xai_config || return 1
	local daily="${XAI_MODEL_DAILY:-grok-4.3}"
	local reasoning="${XAI_MODEL_REASONING:-grok-4.6}"
	local default_model="${XAI_DEFAULT_MODEL:-${daily}}"
	local models_cycle="xai-grok/${daily}"
	if [[ "${daily}" != "${reasoning}" ]]; then
		models_cycle+=",xai-grok/${reasoning}"
	fi

	export XAI_API_KEY

	print.success "Starting Pi (pi-xai) with xAI Grok (${default_model}) in full permissions mode..."

	case "${1:-}" in
		-c|--continue)
			print.success "Continuing last Pi session (xAI Grok)..."
			shift
			pi -c --approve --provider xai-grok --model "${default_model}" --models "${models_cycle}" "$@"
			;;
		-r|--resume)
			print.success "Selecting Pi session to resume (xAI Grok)..."
			shift
			pi -r --approve --provider xai-grok --model "${default_model}" --models "${models_cycle}" "$@"
			;;
		*)
			pi --approve --provider xai-grok --model "${default_model}" --models "${models_cycle}" "$@"
			;;
	esac
}

# Codex via xAI Responses API (https://api.x.ai/v1) — profile overlay -p xai.
function _codex_sync_xai_config() {
	local codex_home="${CODEX_HOME:-${HOME}/.codex}"
	local profile_file="${codex_home}/xai.config.toml"
	local catalog_file="${codex_home}/xai-models.json"
	local base_url="${XAI_BASE_URL:-https://api.x.ai/v1}"
	local model_daily="${XAI_MODEL_DAILY:-grok-4.3}"
	local model_reasoning="${XAI_MODEL_REASONING:-grok-4.6}"
	local default_model="${XAI_DEFAULT_MODEL:-${model_daily}}"

	mkdir -p "${codex_home}"

	python3 - "${profile_file}" "${catalog_file}" "${base_url}" "${default_model}" \
		"${model_daily}" "${model_reasoning}" <<'PY'
from pathlib import Path
import copy
import json
import subprocess
import sys

profile_path = Path(sys.argv[1])
catalog_path = Path(sys.argv[2])
base_url, default_model, model_daily, model_reasoning = sys.argv[3:7]

def esc(value: str) -> str:
    return value.replace("\\", "\\\\").replace('"', '\\"')

bundled = json.loads(
    subprocess.check_output(["codex", "debug", "models", "--bundled"], text=True)
)
by_slug = {m["slug"]: m for m in bundled["models"]}
template = by_slug.get("gpt-5.4") or next(iter(by_slug.values()))

models = []
seen = set()
for slug, display, priority in (
    (model_daily, f"{model_daily} (daily)", 1),
    (model_reasoning, f"{model_reasoning} (reasoning)", 2),
):
    if slug in seen:
        continue
    seen.add(slug)
    entry = copy.deepcopy(template)
    entry["slug"] = slug
    entry["display_name"] = display
    entry["description"] = "xAI Grok model via console.x.ai API credits."
    entry["visibility"] = "list"
    entry["supported_in_api"] = True
    entry["priority"] = priority
    entry["input_modalities"] = ["text", "image"]
    entry["use_responses_lite"] = False
    entry["multi_agent_version"] = None
    entry["tool_mode"] = None
    entry["supports_search_tool"] = False
    entry["additional_speed_tiers"] = []
    entry["service_tiers"] = []
    models.append(entry)

catalog_path.write_text(json.dumps({"models": models}, indent=2) + "\n")

content = f"""# Generated by docker/custom_commands.sh codex-xai — do not hand-edit.
# Sourced via: codex -p xai
# Docs: https://docs.x.ai/developers/quickstart

model = "{esc(default_model)}"
model_provider = "xai"
model_reasoning_effort = "medium"
model_catalog_json = "{esc(str(catalog_path))}"

[model_providers.xai]
name = "xAI Grok"
base_url = "{esc(base_url)}"
env_key = "XAI_API_KEY"
wire_api = "responses"
"""
profile_path.write_text(content)
PY
}

function codex-xai() {
	_xai_env_or_die || return 1
	if ! command -v codex >/dev/null 2>&1; then
		print.error "codex is not on PATH."
		return 1
	fi
	_codex_sync_xai_config || return 1
	local daily="${XAI_MODEL_DAILY:-grok-4.3}"
	local reasoning="${XAI_MODEL_REASONING:-grok-4.6}"
	local default_model="${XAI_DEFAULT_MODEL:-${daily}}"
	export XAI_API_KEY

	case "${1:-}" in
		-l|--last)
			print.success "Resuming last Codex session (xAI Grok: ${default_model})..."
			shift
			codex -p xai resume --last --dangerously-bypass-approvals-and-sandbox "$@"
			;;
		-r|--resume)
			shift
			if [[ -n "${1:-}" && "${1:0:1}" != "-" ]]; then
				local session_id="$1"
				shift
				print.success "Resuming Codex session (xAI Grok): $session_id..."
				codex -p xai resume "$session_id" --dangerously-bypass-approvals-and-sandbox "$@"
			else
				print.success "Selecting Codex session to resume (xAI Grok)..."
				codex -p xai resume --all --dangerously-bypass-approvals-and-sandbox "$@"
			fi
			;;
		*)
			print.success "Starting Codex with xAI Grok (${daily} / ${reasoning}, default ${default_model}) in full-permissions mode..."
			codex -p xai --dangerously-bypass-approvals-and-sandbox "$@"
			;;
	esac
}

# ================================
# Pi Coding Agent (https://pi.dev/) via Azure Foundry / Z.AI GLM.
# Writes custom providers into ~/.pi/agent/models.json so /model only lists
# our configured deployments (same idea as OpenCode/Codex whitelists).
# Docs: https://pi.dev/docs/latest/providers · https://pi.dev/docs/latest/models
# ================================
function _pi_env_or_die() {
	if ! command -v pi >/dev/null 2>&1; then
		print.error "pi is not on PATH."
		echo "Rebuild the container so the pnpm global install runs:"
		echo "  corepack pnpm add -g --ignore-scripts @earendil-works/pi-coding-agent"
		return 1
	fi
	return 0
}

# Merge-safe write of one provider block into ~/.pi/agent/models.json.
function _pi_upsert_provider() {
	local provider_id="$1"
	local provider_json="$2"
	local agent_dir="${HOME}/.pi/agent"
	local models_file="${agent_dir}/models.json"
	mkdir -p "${agent_dir}"
	python3 - "${models_file}" "${provider_id}" "${provider_json}" <<'PY'
import json
import sys
from pathlib import Path

path = Path(sys.argv[1])
provider_id = sys.argv[2]
provider = json.loads(sys.argv[3])

data = {}
if path.exists():
    try:
        data = json.loads(path.read_text())
    except json.JSONDecodeError:
        data = {}
providers = data.setdefault("providers", {})
providers[provider_id] = provider
path.write_text(json.dumps(data, indent=2) + "\n")
PY
}

function _pi_sync_azure_config() {
	local resource="${AZURE_OPENAI_RESOURCE:-}"
	local base_url="${AZURE_OPENAI_BASE_URL:-}"
	local model_daily="${AZURE_OPENAI_MODEL_DAILY:-gpt-5.4-mini-azure}"
	local model_reasoning="${AZURE_OPENAI_MODEL_REASONING:-gpt-5.4-azure}"

	if [[ -z "${base_url}" && -n "${resource}" ]]; then
		base_url="https://${resource}.services.ai.azure.com/openai/v1"
	fi

	local provider_json
	provider_json="$(python3 - "${base_url}" "${model_daily}" "${model_reasoning}" <<'PY'
import json
import sys

base_url, model_daily, model_reasoning = sys.argv[1:4]
models = []
seen = set()
for slug, name, ctx in (
    (model_daily, f"{model_daily} (daily)", 400000),
    (model_reasoning, f"{model_reasoning} (reasoning)", 1100000),
):
    if slug in seen:
        continue
    seen.add(slug)
    models.append({
        "id": slug,
        "name": name,
        "reasoning": True,
        "input": ["text", "image"],
        "contextWindow": ctx,
        "maxTokens": 128000,
    })
print(json.dumps({
    "baseUrl": base_url,
    "api": "azure-openai-responses",
    "apiKey": "$AZURE_OPENAI_API_KEY",
    "models": models,
}))
PY
)"
	_pi_upsert_provider "azure-foundry" "${provider_json}"
}

function _pi_sync_glm_config() {
	local base_url="${ZAI_CODING_BASE_URL:-https://api.z.ai/api/coding/paas/v4}"
	local model_opus="${ZAI_DEFAULT_OPUS_MODEL:-glm-5.3}"
	local model_sonnet="${ZAI_DEFAULT_SONNET_MODEL:-glm-5.3}"
	local model_haiku="${ZAI_DEFAULT_HAIKU_MODEL:-glm-5.3-flash}"

	local provider_json
	provider_json="$(python3 - "${base_url}" "${model_opus}" "${model_sonnet}" "${model_haiku}" <<'PY'
import json
import sys

base_url, model_opus, model_sonnet, model_haiku = sys.argv[1:5]
models = []
seen = set()
for slug, name in (
    (model_sonnet, f"{model_sonnet} (sonnet)"),
    (model_opus, f"{model_opus} (opus)"),
    (model_haiku, f"{model_haiku} (haiku)"),
):
    if slug in seen:
        continue
    seen.add(slug)
    models.append({
        "id": slug,
        "name": name,
        "reasoning": True,
        "input": ["text", "image"],
        "contextWindow": 1000000,
        "maxTokens": 131072,
    })
print(json.dumps({
    "baseUrl": base_url,
    "api": "openai-completions",
    "apiKey": "$ZAI_CODING_API_KEY",
    "compat": {
        "supportsDeveloperRole": False,
        "supportsReasoningEffort": False,
    },
    "models": models,
}))
PY
)"
	_pi_upsert_provider "zai-glm" "${provider_json}"
}

# Usage: pi-azure [-c|--continue] [-r|--resume] [args...]
function pi-azure() {
	_pi_env_or_die || return 1
	_azure_openai_keys_or_die || return 1
	_pi_sync_azure_config || return 1
	local daily="${AZURE_OPENAI_MODEL_DAILY:-gpt-5.4-mini-azure}"
	local reasoning="${AZURE_OPENAI_MODEL_REASONING:-gpt-5.4-azure}"
	local default_model="${AZURE_OPENAI_DEFAULT_MODEL:-${daily}}"
	local models_cycle="azure-foundry/${daily}"
	if [[ "${daily}" != "${reasoning}" ]]; then
		models_cycle+=",azure-foundry/${reasoning}"
	fi

	export AZURE_OPENAI_API_KEY
	# Pi also accepts RESOURCE_NAME / BASE_URL for the built-in provider; keep in sync.
	export AZURE_OPENAI_RESOURCE_NAME="${AZURE_OPENAI_RESOURCE:-${AZURE_OPENAI_RESOURCE_NAME:-}}"
	if [[ -n "${AZURE_OPENAI_BASE_URL:-}" ]]; then
		export AZURE_OPENAI_BASE_URL
	fi

	case "${1:-}" in
		-c|--continue)
			print.success "Continuing last Pi session (Azure Foundry: ${default_model})..."
			shift
			pi -c --provider azure-foundry --model "${default_model}" --models "${models_cycle}" "$@"
			;;
		-r|--resume)
			print.success "Selecting Pi session to resume (Azure Foundry)..."
			shift
			pi -r --provider azure-foundry --model "${default_model}" --models "${models_cycle}" "$@"
			;;
		*)
			print.success "Starting Pi with Azure Foundry (${daily} / ${reasoning}, default ${default_model}) in full permissions mode..."
			pi --approve --provider azure-foundry --model "${default_model}" --models "${models_cycle}" "$@"
			;;
	esac
}

# Usage: pi-glm [-c|--continue] [-r|--resume] [args...]
function pi-glm() {
	_pi_env_or_die || return 1
	_zai_coding_env_or_die || return 1
	_pi_sync_glm_config || return 1
	local opus="${ZAI_DEFAULT_OPUS_MODEL:-glm-5.3}"
	local sonnet="${ZAI_DEFAULT_SONNET_MODEL:-glm-5.3}"
	local haiku="${ZAI_DEFAULT_HAIKU_MODEL:-glm-5.3-flash}"
	local default_model="${ZAI_PI_DEFAULT_MODEL:-${sonnet}}"
	local models_cycle=""
	local id
	for id in "${sonnet}" "${opus}" "${haiku}"; do
		if [[ -z "${models_cycle}" ]]; then
			models_cycle="zai-glm/${id}"
		elif [[ ",${models_cycle}," != *",zai-glm/${id},"* ]]; then
			models_cycle+=",zai-glm/${id}"
		fi
	done

	export ZAI_CODING_API_KEY
	# Built-in `zai` provider reads ZAI_API_KEY; keep both in sync for tooling.
	export ZAI_API_KEY="${ZAI_CODING_API_KEY}"

	case "${1:-}" in
		-c|--continue)
			print.success "Continuing last Pi session (Z.AI GLM: ${default_model})..."
			shift
			pi -c --provider zai-glm --model "${default_model}" --models "${models_cycle}" "$@"
			;;
		-r|--resume)
			print.success "Selecting Pi session to resume (Z.AI GLM)..."
			shift
			pi -r --provider zai-glm --model "${default_model}" --models "${models_cycle}" "$@"
			;;
		*)
			print.success "Starting Pi with Z.AI GLM (${opus} / ${sonnet} / ${haiku}, default ${default_model}) in full permissions mode..."
			pi --approve --provider zai-glm --model "${default_model}" --models "${models_cycle}" "$@"
			;;
	esac
}

# ================================
# Cline CLI with full permissions
# ================================
function clinex() {
	if ! command -v cline >/dev/null 2>&1; then
		print.error "cline is not on PATH."
		echo "Rebuild the container so the pnpm global install runs:"
		echo "  corepack pnpm add -g cline"
		return 1
	fi

	print.success "Starting Cline with full permissions (--yolo)..."
	cline --yolo "$@"
}

function _cline_azure_openai_env_or_die() {
	if [[ -z "${AZURE_OPENAI_API_KEY:-}" ]]; then
		print.error "AZURE_OPENAI_API_KEY is not set."
		echo "Add the same API Key as Cursor Azure OpenAI to docker/local/dwpwebsite/.env:"
		echo "  AZURE_OPENAI_API_KEY=..."
		echo "  AZURE_OPENAI_RESOURCE=dailybot-ai-prod-proj-resource"
		echo "  AZURE_OPENAI_MODEL_DAILY=gpt-5.4-mini-azure"
		echo "  AZURE_OPENAI_MODEL_REASONING=gpt-5.4-azure"
		return 1
	fi
	if [[ -z "${AZURE_OPENAI_RESOURCE:-}" && -z "${AZURE_OPENAI_BASE_URL:-}" ]]; then
		print.error "AZURE_OPENAI_RESOURCE (or AZURE_OPENAI_BASE_URL) is not set."
		echo "Add to docker/local/dwpwebsite/.env, e.g.:"
		echo "  AZURE_OPENAI_RESOURCE=dailybot-ai-prod-proj-resource"
		echo "  # or: AZURE_OPENAI_BASE_URL=https://….services.ai.azure.com/openai/v1"
		return 1
	fi
	if ! command -v cline >/dev/null 2>&1; then
		print.error "cline is not on PATH."
		echo "Rebuild the container so the pnpm global install runs:"
		echo "  corepack pnpm add -g cline"
		return 1
	fi
	return 0
}

function _cline_sync_azure_auth() {
	local base_url="${AZURE_OPENAI_BASE_URL:-}"
	local resource="${AZURE_OPENAI_RESOURCE:-}"
	local model_daily="${AZURE_OPENAI_MODEL_DAILY:-gpt-5.4-mini-azure}"
	local model_reasoning="${AZURE_OPENAI_MODEL_REASONING:-gpt-5.4-azure}"
	local default_model="${AZURE_OPENAI_DEFAULT_MODEL:-${model_daily}}"
	local proxy_base=""

	if [[ -z "${base_url}" && -n "${resource}" ]]; then
		base_url="https://${resource}.services.ai.azure.com/openai/v1"
	fi

	# Cline's openai-compatible picker GETs {baseUrl}/models and lists every Azure
	# id (no provider.whitelist like OpenCode). Proxy /models to only our deployments.
	proxy_base="$(_cline_ensure_azure_models_proxy "${base_url}" "${model_daily}" "${model_reasoning}")" || return 1

	print.success "Syncing Cline Azure auth (openai-compatible via local models whitelist proxy)..."
	# Do NOT use openai-native against Azure Foundry: it hits /responses and advertises
	# tools:[{type:"image_generation"}], which Azure rejects without
	# x-ms-oai-image-generation-deployment. openai-compatible uses chat completions.
	cline auth \
		--provider openai \
		--apikey "${AZURE_OPENAI_API_KEY}" \
		--modelid "${default_model}" \
		--baseurl "${proxy_base}"

	_cline_sync_azure_models_json "${model_daily}" "${model_reasoning}" || true
}

# Start (or reuse) the local Azure models filter proxy. Prints the proxy base URL.
function _cline_ensure_azure_models_proxy() {
	local upstream="$1"
	local model_daily="$2"
	local model_reasoning="$3"
	local state_dir="${HOME}/.cline/data"
	local port_file="${state_dir}/azure-models-proxy.port"
	local pid_file="${state_dir}/azure-models-proxy.pid"
	local proxy_script="/app/docker/cline_azure_models_proxy.py"
	local port=""
	local pid=""

	mkdir -p "${state_dir}"

	if [[ -f "${port_file}" && -f "${pid_file}" ]]; then
		port="$(cat "${port_file}" 2>/dev/null || true)"
		pid="$(cat "${pid_file}" 2>/dev/null || true)"
		if [[ -n "${port}" && -n "${pid}" ]] && kill -0 "${pid}" 2>/dev/null; then
			if curl -fsS "http://127.0.0.1:${port}/models" >/dev/null 2>&1; then
				echo "http://127.0.0.1:${port}"
				return 0
			fi
		fi
	fi

	# Stop a stale proxy if needed.
	if [[ -n "${pid}" ]] && kill -0 "${pid}" 2>/dev/null; then
		kill "${pid}" 2>/dev/null || true
	fi

	CLINE_AZURE_UPSTREAM="${upstream}" \
		CLINE_AZURE_API_KEY="${AZURE_OPENAI_API_KEY}" \
		CLINE_AZURE_MODEL_WHITELIST="${model_daily},${model_reasoning}" \
		python3 "${proxy_script}" >"${port_file}.tmp" 2>"${state_dir}/azure-models-proxy.log" &
	pid=$!
	echo "${pid}" >"${pid_file}"

	# First stdout line is the bound port.
	for _ in 1 2 3 4 5 6 7 8 9 10; do
		if [[ -s "${port_file}.tmp" ]]; then
			port="$(head -n1 "${port_file}.tmp" | tr -d '[:space:]')"
			if [[ "${port}" =~ ^[0-9]+$ ]]; then
				mv "${port_file}.tmp" "${port_file}"
				break
			fi
		fi
		if ! kill -0 "${pid}" 2>/dev/null; then
			print.error "Azure models whitelist proxy failed to start."
			echo "See ${state_dir}/azure-models-proxy.log"
			return 1
		fi
		sleep 0.1
	done

	if [[ -z "${port}" || ! "${port}" =~ ^[0-9]+$ ]]; then
		print.error "Azure models whitelist proxy did not publish a port."
		kill "${pid}" 2>/dev/null || true
		return 1
	fi

	echo "http://127.0.0.1:${port}"
}

# Persist the same two models in models.json (metadata / fallback registry).
function _cline_sync_azure_models_json() {
	local model_daily="$1"
	local model_reasoning="$2"
	local models_file="${HOME}/.cline/data/settings/models.json"

	mkdir -p "$(dirname "${models_file}")"
	python3 - "${models_file}" "${model_daily}" "${model_reasoning}" <<'PY'
import json
import sys
from pathlib import Path

path = Path(sys.argv[1])
daily, reasoning = sys.argv[2], sys.argv[3]
data = {"version": 1, "providers": {}}
if path.exists():
    try:
        data = json.loads(path.read_text())
    except json.JSONDecodeError:
        data = {"version": 1, "providers": {}}

data["version"] = 1
providers = data.setdefault("providers", {})
providers["openai-compatible"] = {
    "models": {
        daily: {"id": daily, "name": f"{daily} (daily)"},
        reasoning: {"id": reasoning, "name": f"{reasoning} (reasoning)"},
    }
}
path.write_text(json.dumps(data, indent=2) + "\n")
PY
}

function cline-azure() {
	_cline_azure_openai_env_or_die || return 1
	_cline_sync_azure_auth || return 1
	local daily="${AZURE_OPENAI_MODEL_DAILY:-gpt-5.4-mini-azure}"
	local reasoning="${AZURE_OPENAI_MODEL_REASONING:-gpt-5.4-azure}"
	print.success "Starting Cline with Azure OpenAI (${daily} / ${reasoning}) in full-permissions mode (--yolo)..."
	print.success "Model picker whitelist: ${daily}, ${reasoning}"
	cline --yolo -P openai -m "${AZURE_OPENAI_DEFAULT_MODEL:-${daily}}" -k "${AZURE_OPENAI_API_KEY}" "$@"
}

# ================================
# Cursor CLI agent (interactive mode with full permissions)
# ================================
# Usage:
#   cursorx              - Start new session
#   cursorx -l|--list    - List available sessions
#   cursorx -r|--resume  - Resume last session
#   cursorx -r <id>      - Resume specific session by ID
function cursorx() {
	# Cursor CLI uses 'agent' command with --force to bypass all approval prompts
	case "${1:-}" in
		-l|--list)
			print.success "Listing Cursor CLI sessions..."
			shift
			agent ls "$@"
			;;
		-r|--resume)
			shift
			if [[ -n "${1:-}" && "${1:0:1}" != "-" ]]; then
				# Resume specific session by ID
				local session_id="$1"
				shift
				print.success "Resuming Cursor CLI session: $session_id..."
				agent --resume="$session_id" --force "$@"
			else
				# Resume last session
				print.success "Resuming last Cursor CLI session..."
				agent resume --force "$@"
			fi
			;;
		*)
			print.success "Starting new Cursor CLI session with full permissions..."
			agent --force "$@"
			;;
	esac
}

# Check if running inside Docker container
function check_devcontainer() {
	if [[ -f /.dockerenv ]] || [[ -n "${REMOTE_CONTAINERS:-}" ]] || [[ -n "${CODESPACES:-}" ]]; then
		print.success "✅ Running inside Docker container"
		echo ""
		echo "All development commands are available:"
		echo "  • check, fix, test, lighthouse, codecheck, install"
		return 0
	else
		print.error "❌ NOT running inside Docker container"
		echo ""
		echo "⚠️  WARNING: This project requires a Docker container environment."
		echo "   Commands like 'check', 'fix', 'test', etc."
		echo "   only work inside the Docker container."
		echo ""
		echo "   To work with this project:"
		echo "   1. Start Docker services: cd docker/local && bash docker.sh up"
		echo "   2. Access the container: bash docker.sh bash dwpwebsite"
		echo "   3. Or use VS Code Dev Containers if configured"
		return 1
	fi
}

# ================================
# Git-aware Bash Prompt
# ================================

# Function to get current git branch
function git_branch() {
    local branch
    if branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null); then
        if [[ "$branch" == "HEAD" ]]; then
            branch='detached*'
        fi
        echo "$branch"
    fi
}

# Function to get git status indicators
function git_status_indicator() {
    local git_status
    git_status=$(git status --porcelain 2>/dev/null)

    if [[ -n "$git_status" ]]; then
        echo "*"  # Asterisk for uncommitted changes
    fi
}

# Speed up `git status` on macOS bind mounts (caches the untracked-files walk).
# Repo-local; do not enable core.fsmonitor — unreliable through this mount.
if git rev-parse --git-dir >/dev/null 2>&1; then
    git config core.untrackedcache true
fi

# Cached git dirty state for the prompt. `git status` costs ~0.4s on the
# macOS bind mount even with core.untrackedCache, so refresh at most every
# 5 seconds instead of on every prompt redraw.
__GIT_DIRTY_CACHE=""
__GIT_DIRTY_REPO=""
__GIT_DIRTY_TS=-10

# Custom PS1 prompt with colors and git info
function set_bash_prompt() {
    local exit_code=$?

    # Color codes
    local yellow="\[\033[0;33m\]"
    local red="\[\033[0;31m\]"
    local green="\[\033[0;32m\]"
    local white="\[\033[0;37m\]"
    local reset="\[\033[0m\]"

    # Get git branch and status
    local git_info=""
    local repo_root
    repo_root=$(git rev-parse --show-toplevel 2>/dev/null)
    if [[ -n "$repo_root" ]]; then
        local branch
        branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)

        if [[ "$branch" == "HEAD" ]]; then
            branch='detached*'
        fi

        if [[ "$repo_root" != "$__GIT_DIRTY_REPO" ]] || (( SECONDS - __GIT_DIRTY_TS >= 5 )); then
            if [[ -n $(git status --porcelain 2>/dev/null) ]]; then
                __GIT_DIRTY_CACHE=1
            else
                __GIT_DIRTY_CACHE=0
            fi
            __GIT_DIRTY_REPO="$repo_root"
            __GIT_DIRTY_TS=$SECONDS
        fi

        if [[ "$__GIT_DIRTY_CACHE" == 1 ]]; then
            git_info=" ${red}(${branch}*)${reset}"
        else
            git_info=" ${green}(${branch})${reset}"
        fi
    fi

    # Build the prompt - simple format: path (git) $
    PS1="${yellow}\w${reset}${git_info}${white} \$ ${reset}"
}

# Set the custom prompt
PROMPT_COMMAND=set_bash_prompt

# ================================
# SSH
# ================================

# Re-mirror the host's SSH keys/config into the container.
#
# The entrypoint runs this on every container start. Run it by hand when a key
# or a `Host` entry is added on the host WHILE the container is already
# running — without it the container keeps the snapshot taken at boot.
function ssh-sync() {
  if [ ! -x /usr/local/bin/sync-host-ssh ]; then
    print.error "sync-host-ssh not found — rebuild the container image."
    return 1
  fi
  /usr/local/bin/sync-host-ssh "${HOME}" || return 1
  print.success "Host SSH material is in sync. Keys available:"
  ls -1 "${HOME}"/.ssh/id_* 2>/dev/null | grep -v '\.pub$' | sed 's|.*/|  • |'
}

# ================================
# Useful Git Aliases
# ================================

alias gs='git status'
alias ga='git add .'
alias gc='git commit -am'
alias gp='git push -u origin HEAD'
alias gl='git log --oneline --graph --decorate --all -20'
alias gd='git diff'
alias gb='git for-each-ref --sort=-committerdate refs/heads/ --format="%(HEAD) %(color:yellow)%(refname:short)%(color:reset) - %(color:green)%(committerdate:relative)%(color:reset) - %(color:blue)%(authorname)%(color:reset)"'
alias gbd='git branch -D'
alias gco='git checkout'
alias gcob='git checkout -b'
alias gpl='git pull origin HEAD'
alias grc='git rm -r --cached .'
alias help='show_welcome'

# Welcome message
function show_welcome() {
    echo ""
    print.success "🚀 deepworkplan.com Development Container"
    echo ""

    # Check container status
    check_devcontainer
    echo ""

    echo "Useful commands:"
    echo "  • check_devcontainer  - Check if running inside Docker container (CRITICAL)"
    echo "  • help                 - Show this message"
    echo "  • check                - Run astro and biome checks"
    echo "  • fix                  - Run checks and apply automatic fixes"
    echo "  • test                 - Run tests"
    echo "  • lighthouse           - Build site + run Lighthouse audit"
    echo "  • codecheck            - Run all checks (fix + md:check + images:webp + test + lighthouse)"
    echo "  • install              - Run pnpm install"
    echo ""
    echo "AI Assistant commands:"
    echo "  • claude            - Claude Code CLI (Anthropic)"
    echo "  • codex             - Codex CLI"
    echo "  • agent             - Cursor CLI agent (or cursorx alias)"
    echo "  • chelper           - Z.AI Coding Tool Helper wizard"
    echo "  • cline             - Cline CLI (official pnpm global install)"
    echo "  • clinex            - Cline CLI with full permissions"
    echo "  • cline-azure      - Cline via Azure OpenAI / Foundry with full permissions"
    echo "  • opencode          - OpenCode CLI (official install; /connect for providers)"
    echo "  • opencodex         - OpenCode CLI with full permissions"
    echo "  • opencode-azure    - OpenCode via Azure OpenAI / Foundry with full permissions"
    echo "  • opencode-glm      - OpenCode via Z.AI GLM with full permissions"
    echo "  • opencode-xai      - OpenCode via xAI Grok with full permissions"
    echo "  • pi                - Pi Coding Agent (https://pi.dev/)"
    echo "  • pix               - Pi base with full permissions (recommended, supports -c / -r)"
    echo "  • pi-azure          - Pi via Azure OpenAI / Foundry with full permissions"
    echo "  • pi-glm            - Pi via Z.AI GLM with full permissions"
    echo "  • pi-xai            - Pi using xAI Grok with full permissions"
    echo "  • herdr             - Herdr agent terminal runtime (https://herdr.dev/)"
    echo "  • cline-xai         - Cline via xAI Grok (openai-compatible provider)"
    echo "  • grokx             - Official Grok CLI (xAI) — recommended (supports -c / -r)"
    echo "  • codex-xai         - Codex via xAI Grok (Responses API) with full permissions"
  echo ""
  echo "  • claude-glm        - Claude Code via Z.AI GLM with full permissions (recommended)"
    echo "      -c, --continue  Continue most recent session"
    echo "      -r, --resume    Interactive session selection"
    echo "      -r <id>         Resume specific session by ID"
    echo ""
    echo "  • codexx            - Codex with full permissions (bypass approvals and sandbox)"
    echo "      -c, --continue  Continue most recent session"
    echo "      -l, --last      Resume last session"
    echo "      -r, --resume    Interactive session selection"
    echo "      -r <id>         Resume specific session by ID"
    echo ""
    echo "  • codex-azure      - Codex via Azure OpenAI / Foundry with full permissions"
    echo "  • codex-glm        - Codex via Z.AI GLM Coding Plan with full permissions"
    echo "      -l, --last      Resume last session"
    echo "      -r, --resume    Interactive session selection"
    echo "      -r <id>         Resume specific session by ID"
    echo ""
    echo "  • claudex           - Claude Code with full permissions (skip all permission prompts)"
    echo "      -c, --continue  Continue most recent session"
    echo "      -r, --resume    Interactive session selection"
    echo "      -r <id>         Resume specific session by ID"
    echo ""
    echo "  • cursorx           - Cursor CLI agent (interactive mode)"
    echo "      -l, --list      List available sessions"
    echo "      -r, --resume    Resume last session"
    echo "      -r <id>         Resume specific session by ID"
    echo ""
    echo "SSH:"
    echo "  • ssh-sync         - Re-mirror the host's SSH keys/config into the container"
    echo ""
    echo "Git shortcuts:"
    echo "  • gs   - git status"
    echo "  • ga   - git add ."
    echo "  • gc   - git commit"
    echo "  • gp   - git push -u origin HEAD"
    echo "  • gpl  - git pull origin HEAD"
    echo "  • gl   - git log (pretty)"
    echo "  • gd   - git diff"
    echo "  • gb   - git branch"
    echo "  • gbd  - git branch -D"
    echo "  • gco  - git checkout"
    echo "  • gcob - git checkout -b"
    echo "  • grc  - git rm -r --cached . (reset cache, useful after updating .gitignore)"
    echo ""
}

# Show welcome message only for interactive shells
if [[ $- == *i* ]]; then
    show_welcome
fi
