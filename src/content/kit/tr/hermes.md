---
title: Hermes
description: "DWP'nin Hermes adaptörü: AgentSkills standardı skill yüklemesi, state.json'daki sonuç kayıtları aracılığıyla bölümsel bellek sinerjisi ve cron tabanlı plan devamı."
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

**Tam** — Hermes, `AGENTS.md`'yi okur ve skill'i AgentSkills standardı yüklemesi aracılığıyla yükler. Tüm DWP alt skill'leri kullanılabilir.

## Kurulum

Skill paketini çalışma alanının `.agents/skills/` dizinine kurun veya varsa platformun skill yöneticisini kullanın.

## Çağırma

Düz metin:

```
create a plan for <goal>
resume the open plan
```

## Bölümsel bellek sinerjisi

Hermes, geçmiş çalışmayı ilerideki oturumlar genelinde erişilebilir kılmak için ajan belleğini dizinler. DWP'nin `state.json` sonuç kayıtları tam da bu kullanım için tasarlanmıştır: tamamlanan her görev, nelerin `tried` (denendiğini), nelerin `failed` (başarısız olduğunu), nelerin `worked` (işe yaradığını) ve yapılandırılmış bir JSON alanında serbest biçimli notları taşır. Hermes, çalışma alanının `.dwp/plans/` durum dosyalarını dizinlediğinde, tamamlanmış planlar erişilebilir bölümsel bellek hâline gelir — bir ajan daha sonra belirli bir sorunun yalnızca bir planın çalıştığını değil, nasıl çözüldüğünü hatırlayabilir.

Bu, Hermes üzerindeki DWP planlarının iki şekilde kalıcı olduğu anlamına gelir: Markdown dosyaları insan tarafından okunabilir kayıttır ve `state.json` sonuç kayıtları makine tarafından dizinlenebilir bellektir. Bkz. [Plan durumu](/spec/plan-state#outcome-records-as-episodic-memory).

## Cron tabanlı devam

Cron zamanlamalı platformlarda, devam diğer otonom platformlarla aynı kalıbı izler: her zamanlanmış dönüş uyar, DWP Resume Protocol'ü çalıştırır, en fazla bir görev yürütür, `state.json`'u günceller ve verir. Plan, oturum değil, sürekliliğin birimidir.

Makine tarafından okunabilir durum katmanı (`manifest.json` + `state.json`), gözetimsiz yürütme için ZORUNLUDUR. Tam durma koşulu ve yükseltme protokolü için bkz. [Ajan protokolü](/spec/agent-protocol#execution-profiles).

## Notlar

Hermes ve OpenClaw, [Ajan protokolü](/spec/agent-protocol)'ndeki desteklenen ajanlar tablosunda yer alan otonom ajan platformlarıdır. Her ikisi de gözetimsiz yürütme profili altında çalışır ve her ikisi de ajan çalışma alanı arketipinin `state.json`-git günlüğü eşdeğerliğinden yararlanır.
