---
title: OpenAI Codex
description: "OpenAI Codex için DWP adaptörü; hash komut öneki ile markdown komut prosedürleri aracılığıyla tam destek sunar ve eksiksiz Deep Work Plan döngüsünü çalıştırır."
kind: adapter
lang: tr
order: 3
agent: OpenAI Codex
support: full
prefix: ‘#’
---

# OpenAI Codex adaptörü

OpenAI Codex, DWP’yi markdown komut prosedürleri aracılığıyla destekler.

## Destek düzeyi

**Tam** — her dwp-* komutu kendi prosedür dosyasından çalışır.

## Kurulum

DWP komutları, ajanın çağrıldığında okuduğu markdown prosedürleri olarak bulunur; kurallar `.codex/` altına kurulur.

İsteğe bağlı: [coding-agents-kit](/kit/agentkit) bu CLI’yi kurabilir ve `ak codex` ile başlatabilir. Sağlayıcının kendi resmi kurulum aracı da aynı şekilde çalışır.

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install codex
```

## Çağırma

`#` önekini kullanın:

```
#dwp-create <goal>
#dwp-execute
```

## Notlar

Codex, prosedür dosyalarını okur ve eksiksiz sıralı Deep Work Plan döngüsünü çalıştırır.
