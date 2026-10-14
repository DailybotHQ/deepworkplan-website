---
title: Hermes
description: "Hermes için DWP adaptörü: AgentSkills standardıyla skill yükleme, plan sonuçlarından epizodik bellek ve cron ile yürütülen plan devamlılığı."
kind: adapter
lang: tr
order: 11
agent: Hermes
support: full
prefix: plain text
---

# Hermes adaptörü

Hermes, skill'leri AgentSkills standardı aracılığıyla yükleyen ve oturumlar genelinde bölümsel belleği koruyan otonom bir ajan platformudur. DWP her iki yüzeyle de entegre olur: skill paketi, diğer AgentSkills uyumlu paketlerle aynı şekilde `.agents/skills/` dizininden yüklenir ve `state.json`'un sonuç kayıtları doğrudan Hermes'in bellek dizinine beslenir.

## Destek düzeyi

**Tam** (Belgelenmiş) — Hermes, `AGENTS.md` dosyasını okur ve beceriyi AgentSkills standart yüklemesiyle yükler. Tüm DWP alt becerileri mevcuttur.

## Kurulum

Skill paketini çalışma alanının `.agents/skills/` dizinine kurun veya varsa platformun skill yöneticisini kullanın.

## Çağırma

Düz metin:

```
create a plan for <goal>
resume the open plan
```

## Bölümsel bellek sinerjisi

v6 ve v7 planlarında, DWP'nin deterministik doğrulama makbuzları (`outcomes.py receipt`) ve sonuç kayıtları doğrudan Hermes'in bellek indeksine beslenir: tamamlanan her görev denenen, başarısız olan ve çalışan şeyleri yapılandırılmış bir JSON şemasında taşır. Tamamlanan planlar alınabilir epizodik bellek haline gelir — bir ajan bir sorunun nasıl çözüldüğünü hatırlayabilir.

Kısa ömürlü oturumlar olayları `journal.ndjson` dosyasına ekler ve durum dosyalarını manuel olarak yeniden yazmak yerine `ledger.py project` aracılığıyla `state.json` dosyasını yansıtır. Bkz. [Plan durumu](/spec/plan-state#outcome-records-as-episodic-memory).

## Cron tabanlı devam

Cron zamanlamalı platformlarda, devam diğer otonom platformlarla aynı kalıbı izler: her zamanlanmış dönüş uyar, DWP Resume Protocol'ü çalıştırır, en fazla bir görev yürütür, `state.json`'u günceller ve verir. Plan, oturum değil, sürekliliğin birimidir.

Makine tarafından okunabilir durum katmanı (`manifest.json` + `state.json`), gözetimsiz yürütme için ZORUNLUDUR. Tam durma koşulu ve yükseltme protokolü için bkz. [Ajan protokolü](/spec/agent-protocol#execution-profiles).

## Notlar

Hermes ve OpenClaw, [Ajan protokolü](/spec/agent-protocol)'ndeki desteklenen ajanlar tablosunda yer alan otonom ajan platformlarıdır. Her ikisi de gözetimsiz yürütme profili altında çalışır ve her ikisi de ajan çalışma alanı arketipinin `state.json`-git günlüğü eşdeğerliğinden yararlanır.
