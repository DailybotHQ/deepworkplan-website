---
title: Claude Code
description: "Adapter DWP untuk Claude Code, dengan dukungan penuh melalui slash command dan skill native, termasuk subagent dan team agent untuk seluruh rangkaian fitur."
kind: adapter
lang: id
order: 1
agent: Claude Code
support: full
prefix: /
---

# Adapter Claude Code

Claude Code memiliki dukungan DWP **penuh** melalui slash command dan skill native.

## Tingkat dukungan

**Penuh** — kelima command DWP dipetakan ke slash command native Claude Code.

## Instalasi

DWP hadir sebagai skill di bawah `.agents/skills/` (di-resolve melalui symlink `.claude/`). Claude Code menemukannya secara otomatis.

Opsional: [coding-agents-kit](/kit/agentkit) dapat memasang CLI ini dan menjalankannya dengan `ak claude`. Penginstal resmi dari vendor juga sama baiknya.

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install claude
```

## Pemanggilan

Gunakan prefix `/`:

```
/dwp-create <goal>
/dwp-execute
```

## Catatan

Claude Code mendukung skill, subagent, dan team agent — rangkaian fitur DWP yang lengkap.
