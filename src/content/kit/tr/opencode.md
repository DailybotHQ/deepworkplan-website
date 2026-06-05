---
title: OpenCode
description: "Açık kaynak ajan OpenCode için DWP adaptörü; yerel AGENTS.md ve hash öneki ile markdown komut prosedürleri aracılığıyla tam destek sunar."
kind: adapter
lang: tr
order: 7
agent: OpenCode
support: full
prefix: '#'
---

# OpenCode adaptörü

Açık kaynak kodlama ajanı OpenCode, DWP'yi yerel AGENTS.md ve markdown komut prosedürleri aracılığıyla destekler.

## Destek düzeyi

**Tam** — OpenCode, AGENTS.md'yi yerel olarak okur ve her dwp-* komutunu kendi prosedür dosyasından çalıştırır.

## Kurulum

DWP, AGENTS.md ve komut prosedürlerini depoda sunar; OpenCode bunları proje bağlamı olarak keşfeder.

## Çağırma

`#` önekini kullanın:

```
#dwp-create <goal>
#dwp-execute
```

## Notlar

OpenCode, prosedür dosyalarını okur ve eksiksiz sıralı Deep Work Plan döngüsünü çalıştırır.
