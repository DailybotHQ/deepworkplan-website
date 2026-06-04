---
title: "Vaka çalışması: bu web sitesi"
description: "deepworkplan.com’un kendisinin Deep Work Plan üzerinde nasıl çalıştığı — belgelediği metodolojiyle AI-first hâle getirilmiş gerçek bir üretim Astro deposunun gerçek anlatımı."
kind: example
lang: tr
order: 2
---

# Vaka çalışması: bu web sitesi

Okumakta olduğunuz site, belgelediği metodoloji üzerinde çalışır. Deep Work Plan’i kendi üzerinde uygular (dogfooding): aynı skill, aynı `/init` akışı, başka herhangi bir deponun kullanacağı aynı `.dwp/` planları. Bu varsayımsal değil, gerçek bir anlatımdır.

## Önce

Çoğu depo gibi bu da ajanlar için tasarlanmamıştı. Bağlam insanların kafasında ve dağınık notlarda yaşıyordu, bir ajanın okuyabileceği tek bir doğru kaynak yoktu ve yeni bir ajanı onboarding etmek, her oturumda projeyi yeniden anlatmak demekti. Uzun soluklu iş savrulup gidiyordu.

## DWP’nin benimsenmesi

Depo, doğrulama geçitleri bulunan atomik görevlere ayrıştırılmış tek bir Deep Work Plan ile AI-first hâle getirildi:

1. Deep Work Plan skill’ini, `skills-lock.json` ile sabitlenmiş bir referans kurulumu olarak kurun.
2. Deponun gerçek yığınından akıl yürütülmüş bir `AGENTS.md`, `docs/` ağacı ve modül başına dokümanlar üretmek için onboarding’i çalıştırın.
3. Ajanlar arası `.agents/` kitini kurun — ince `dwp-*` komut yönlendiricileri ve diskteki gerçeklikle eşleşen bir katalog.
4. Planlar ve taslaklar için gitignore’lu `.dwp/` çalışma alanını iskeletleyin.
5. Uyumluluğu `/dwp-verify` ile doğrulayın.

Her görev, tamamlandı olarak işaretlenmeden önce deponun gerçek geçitlerine — `biome`, `astro:check`, test takımı, üretim build’i ve ajan uç noktası eşitlik denetimi — karşı doğrulandı.

## Sonra

Depo artık kendi spesifikasyonuna göre AI-first: akıl yürütülmüş bir `AGENTS.md`, kategorize edilmiş bir `docs/` ağacı, ajanlar arası bir `.agents/` kiti ve gitignore’lu bir `.dwp/` çalışma alanı. Herhangi bir ajan — Claude Code, Cursor, Codex, Gemini, Copilot — onu açabilir, harness’ı okuyabilir ve oturum başına el tutma olmadan uzun soluklu planları yürütebilir.

## Sonuç

Metodoloji kendini kendi kaynağı üzerinde kanıtlar: bu site, sizinkini inşa etmenizi söylediği yöntemle inşa edilir ve sürdürülür — [`/init.md`](/init.md) izlenerek. Standart burada, üretimde işe yarıyorsa, sizin deponuz için de işe yarar.
