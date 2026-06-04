---
title: Claude Code
description: "Claude Code için DWP adaptörü; yerel eğik çizgi komutları ve skill’ler aracılığıyla tam destek, eksiksiz özellik kümesi için alt ajanlar ve ekip ajanları dahil."
kind: adapter
lang: tr
order: 1
agent: Claude Code
support: full
prefix: /
---

# Claude Code adaptörü

Claude Code, yerel eğik çizgi komutları ve skill’ler aracılığıyla **tam** DWP desteğine sahiptir.

## Destek düzeyi

**Tam** — beş DWP komutunun tümü yerel Claude Code eğik çizgi komutlarına eşlenir.

## Kurulum

DWP, `.agents/skills/` altında skill’ler olarak gelir (`.claude/` sembolik bağı aracılığıyla çözümlenir). Claude Code bunları otomatik olarak keşfeder.

## Çağırma

`/` önekini kullanın:

```
/dwp-create <goal>
/dwp-execute
```

## Notlar

Claude Code skill’leri, alt ajanları ve ekip ajanlarını destekler — eksiksiz DWP özellik kümesi.
