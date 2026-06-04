---
title: Antigravity
description: "Antigravity için DWP adaptörü; sıralı iş akışını yürüten markdown komut prosedürleri ve hash öneki aracılığıyla kısmi destek sunar."
kind: adapter
lang: tr
order: 6
agent: Antigravity
support: partial
prefix: '#'
---

# Antigravity adaptörü

Antigravity, DWP’yi markdown komut prosedürleri aracılığıyla destekler.

## Destek düzeyi

**Kısmi** — temel komutlar prosedür dosyaları aracılığıyla çalışır.

## Kurulum

DWP komutları, ajanın çağrıldığında okuduğu markdown prosedürleri olarak bulunur.

## Çağırma

`#` önekini kullanın:

```
#dwp-create <goal>
#dwp-execute
```

## Notlar

Antigravity, prosedür dosyalarını okur ve sıralı DWP iş akışını yürütür.
