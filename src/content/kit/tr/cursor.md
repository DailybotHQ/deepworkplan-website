---
title: Cursor
description: "Cursor AI için DWP adaptörü; proje kuralları sistemi ve hash komut öneki aracılığıyla tam destek sunar, çünkü Cursor eğik çizgiyi kendisi için ayırır."
kind: adapter
lang: tr
order: 2
agent: Cursor
support: full
prefix: '#'
---

# Cursor adaptörü

Cursor, DWP’yi proje kuralları ve komut dosyaları aracılığıyla destekler.

## Destek düzeyi

**Tam** — DWP komutları Cursor’ın kurallar sistemi aracılığıyla çalışır.

## Kurulum

DWP komutları, proje altında markdown olarak bulunur. Cursor bunları kurallar sistemi aracılığıyla okur.

## Çağırma

`#` önekini kullanın (Cursor `/` işaretini yakalar):

```
#dwp-create <goal>
#dwp-execute
```

## Notlar

`#` kullanın, çünkü Cursor `/` işaretini kendi komutları için ayırır.
