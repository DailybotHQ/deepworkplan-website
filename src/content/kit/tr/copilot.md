---
title: GitHub Copilot
description: "GitHub Copilot için DWP adaptörü; AGENTS.md ve hash komut öneki ile markdown komut prosedürleri aracılığıyla tam destek sunar."
kind: adapter
lang: tr
order: 4
agent: GitHub Copilot
support: full
prefix: ‘#’
---

# GitHub Copilot adaptörü

GitHub Copilot, DWP’yi AGENTS.md ve markdown komut prosedürleri aracılığıyla destekler.

## Destek düzeyi

**Tam** — Copilot, AGENTS.md ve dwp-* prosedür dosyalarını okur ve her komutu bunlar üzerinden çalıştırır.

## Kurulum

DWP, AGENTS.md ve komut prosedürlerini depoda sunar; Copilot bunları depo bağlamı olarak okur.

## Çağırma

`#` önekini kullanın:

```
#dwp-create <goal>
#dwp-execute
```

## Notlar

Copilot, prosedür dosyalarını okur ve eksiksiz sıralı Deep Work Plan döngüsünü çalıştırır.
