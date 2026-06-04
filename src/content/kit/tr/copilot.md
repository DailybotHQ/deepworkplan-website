---
title: GitHub Copilot
description: "GitHub Copilot için DWP adaptörü; markdown komut prosedürleri ve hash öneki aracılığıyla kısmi destek sunar; bazı otomasyonlar elle yapılır."
kind: adapter
lang: tr
order: 4
agent: GitHub Copilot
support: partial
prefix: '#'
---

# GitHub Copilot adaptörü

GitHub Copilot, DWP’yi markdown komut prosedürleri aracılığıyla destekler.

## Destek düzeyi

**Kısmi** — temel komutlar prosedür dosyaları aracılığıyla çalışır; bazı otomasyonlar elle yapılır.

## Kurulum

DWP komutları, depoda markdown prosedürleri olarak bulunur.

## Çağırma

`#` önekini kullanın:

```
#dwp-create <goal>
#dwp-execute
```

## Notlar

Copilot, prosedür dosyalarını okur ancak Claude Code’a kıyasla daha az özerk yürütme yapar.
