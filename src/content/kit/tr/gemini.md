---
title: Google Gemini
description: "Google Gemini için DWP adaptörü; sıralı iş akışını yürüten markdown komut prosedürleri ve hash öneki aracılığıyla kısmi destek sunar."
kind: adapter
lang: tr
order: 5
agent: Google Gemini
support: partial
prefix: '#'
---

# Google Gemini adaptörü

Google Gemini, DWP’yi markdown komut prosedürleri aracılığıyla destekler.

## Destek düzeyi

**Kısmi** — temel komutlar prosedür dosyaları aracılığıyla çalışır.

## Kurulum

DWP komutları, ajanın okuduğu markdown prosedürleri olarak bulunur.

## Çağırma

`#` önekini kullanın:

```
#dwp-create <goal>
#dwp-execute
```

## Notlar

Gemini, prosedür dosyalarını okur ve sıralı DWP iş akışını yürütür.
