---
title: Windsurf
description: "Windsurf için DWP adaptörü; kurallar sistemi ve hash komut öneki ile markdown komut prosedürleri aracılığıyla tam destek sunar."
kind: adapter
lang: tr
order: 8
agent: Windsurf
support: full
prefix: '#'
---

# Windsurf adaptörü

Windsurf, DWP'yi kurallar sistemi ve markdown komut prosedürleri aracılığıyla destekler.

## Destek düzeyi

**Tam** — Windsurf, proje kurallarını okur ve her dwp-* komutunu kendi prosedür dosyasından çalıştırır.

## Kurulum

DWP komutları, ajanın Windsurf'un kurallar sistemi aracılığıyla okuduğu markdown prosedürleri olarak bulunur.

## Çağırma

`#` önekini kullanın:

```
#dwp-create <goal>
#dwp-execute
```

## Notlar

Windsurf, prosedür dosyalarını okur ve eksiksiz sıralı Deep Work Plan döngüsünü çalıştırır.
