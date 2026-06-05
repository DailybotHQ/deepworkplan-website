---
title: Generic
description: "Herhangi bir proje için yedek onboarding ön ayarı; build ve test komutlarını depodan saptayan, yığından bağımsız akıl yürütme ipuçları sunar."
kind: preset
lang: tr
order: 100
stack: Generic
---

# Generic ön ayarı

Yığına özgü hiçbir ön ayar uymadığında onboarding akışının kullandığı yedek akıl yürütme kılavuzu. Bu bir şablon değil, bir kontrol listesidir — saptanan gerçeklik kazanır.

## Neyin üzerine akıl yürütülmeli

- Gerçek build ve test komutlarını manifest, Makefile veya CI üzerinden saptayın — birebir kaydedin.
- Genel kuralları uygulayın; yığına özgü hiçbir varsayımda bulunmayın.
- Yalnızca deponun gerçek iş akışlarıyla eşleşen skill’leri, ajanları ve dokümanları üretin.

## Notlar

Django, Vue + Vite, Astro/Svelte, Node/TS servisi veya Python paketi/CLI seçeneklerinden hiçbiri eşleşmediğinde devreye giren yedek.
