---
title: Antigravity
description: "Antigravity için DWP adaptörü; hash komut öneki ile markdown komut prosedürleri aracılığıyla tam destek sunar ve eksiksiz Deep Work Plan döngüsünü yürütür."
kind: adapter
lang: tr
order: 6
agent: Antigravity
support: full
prefix: ‘#’
---

# Antigravity adaptörü

Antigravity, DWP’yi markdown komut prosedürleri aracılığıyla destekler.

## Destek düzeyi

**Tam** — her dwp-* komutu, yerel komut yüzeyi aracılığıyla kendi prosedür dosyasından çalışır.

## Kurulum

DWP komutları, ajanın çağrıldığında okuduğu markdown prosedürleri olarak bulunur.

## Çağırma

`#` önekini kullanın:

```
#dwp-create <goal>
#dwp-execute
```

## Notlar

Antigravity, prosedür dosyalarını okur ve eksiksiz sıralı Deep Work Plan döngüsünü çalıştırır.
