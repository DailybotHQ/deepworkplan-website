---
title: Google Gemini
description: "Google Gemini için DWP adaptörü; hash komut öneki ile markdown komut prosedürleri aracılığıyla tam destek sunar ve eksiksiz Deep Work Plan döngüsünü çalıştırır."
kind: adapter
lang: tr
order: 5
agent: Google Gemini
support: full
prefix: ‘#’
---

# Google Gemini adaptörü

Google Gemini, DWP’yi markdown komut prosedürleri aracılığıyla destekler.

## Destek düzeyi

**Tam** (Kurulum testli) — her dwp-* komutu kendi prosedür dosyasından çalışır. Yol, otomatik test paketleriyle onaylanmıştır; davranışsal iş akışları sıralı tabanda çalışır. Araç çalıştırma ve çalışma alanı dosya erişimi gerektirir.

## Kurulum

DWP komutları, ajanın çağrıldığında okuduğu markdown prosedürleri olarak bulunur.

## Çağırma

`#` önekini kullanın:

```
#dwp-create <goal>
#dwp-execute
```

## Notlar

Gemini, prosedür dosyalarını okur ve eksiksiz sıralı Deep Work Plan döngüsünü çalıştırır.
