---
title: Cline
description: "Açık kaynak ajan Cline için DWP adaptörü; markdown kuralları ve hash öneki ile komut prosedürleri aracılığıyla tam destek sunar."
kind: adapter
lang: tr
order: 9
agent: Cline
support: full
prefix: '#'
---

# Cline adaptörü

Açık kaynak kodlama ajanı Cline, DWP'yi markdown kuralları ve komut prosedürleri aracılığıyla destekler.

## Destek düzeyi

**Tam** — Cline, markdown kurallarını okur ve her dwp-* komutunu kendi prosedür dosyasından çalıştırır.

## Kurulum

DWP komutları, ajanın Cline'ın kuralları aracılığıyla okuduğu markdown prosedürleri olarak bulunur.

## Çağırma

`#` önekini kullanın:

```
#dwp-create <goal>
#dwp-execute
```

## Notlar

Cline, prosedür dosyalarını okur ve eksiksiz sıralı Deep Work Plan döngüsünü çalıştırır.
