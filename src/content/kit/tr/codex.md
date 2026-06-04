---
title: OpenAI Codex
description: "OpenAI Codex için DWP adaptörü; markdown komut prosedürleri ve hash öneki aracılığıyla kısmi destek sunar; ekip ajanı özellikleri kullanılamaz."
kind: adapter
lang: tr
order: 3
agent: OpenAI Codex
support: partial
prefix: '#'
---

# OpenAI Codex adaptörü

OpenAI Codex, DWP’yi markdown komut prosedürleri aracılığıyla destekler.

## Destek düzeyi

**Kısmi** — temel komutlar çalışır; gelişmiş özellikler (ekip ajanları) kullanılamaz.

## Kurulum

DWP komutları, ajanın çağrıldığında okuduğu markdown prosedürleri olarak bulunur.

## Çağırma

`#` önekini kullanın:

```
#dwp-create <goal>
#dwp-execute
```

## Notlar

Ekip ajanı özellikleri yalnızca Claude’a özgüdür; Codex sıralı iş akışını destekler.
