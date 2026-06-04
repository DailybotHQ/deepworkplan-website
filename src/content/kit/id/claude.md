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

## Pemanggilan

Gunakan prefix `/`:

```
/dwp-create <goal>
/dwp-execute
```

## Catatan

Claude Code mendukung skill, subagent, dan team agent — rangkaian fitur DWP yang lengkap.
