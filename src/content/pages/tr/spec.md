---
title: "Deep Work Plan spesifikasyonu"
description: "Deep Work Plan metodolojisinin okunabilir spesifikasyonu: DWP biçimi, ajan protokolü, arketipler, dokümantasyon standardı ve eklenti mekanizması."
lastUpdated: 2026-05-30
---

## Deep Work Plan spesifikasyonu

Spesifikasyon, metodolojinin kesin, okunabilir tanımıdır — insanların ve ajanların paylaştığı yapılar ve protokoller. Normatif RFC-2119 terimleriyle, spec odaklı bir planın nasıl yapılandırıldığını ve bir ajanın ona karşı nasıl çalışması gerektiğini belirtir: plan doğruluk kaynağıdır, doğrulama kapıları ikilidir ve depo, bir ajanın ihtiyaç duyduğu harness'ı kendisi taşır. Sıralı belgeler hâlinde düzenlenmiştir:

- **Dokümantasyon standardı** — AI-first depo yapısı.
- **DWP spesifikasyonu** (v1.2) — plan yapısı, görev anatomisi, yürütme döngüsü, kahverengi alan değişiklikleri için Delta bölümü, DWP Resume Protocol, orantılı titizlik kademeleri (micro/standard/deep) ve makine tarafından okunabilir plan durum katmanı.
- **Ajan protokolü** (v1.2) — gerekli ajanlar arası davranış, komut eşlemesi, desteklenen ajanlar (OpenClaw ve Hermes dahil) ve yürütme profilleri (etkileşimli ve gözetimsiz); durma koşulları ve zamanlanmış devam.
- **Arketipler** (v1.1) — bireysel depolar, orkestratör merkezleri ve ajan çalışma alanı (otonom bir ajanın uzun ömürlü evi: OpenClaw çalışma alanı, Hermes servis dizini, bulut ajanı birimi); sınıflandırma sezgisel kuralı ve kuruluma almanın nasıl farklılaştığı.
- **Eklentiler** — isteğe bağlı yetenekleri katmanlamak için tercihe dayalı mekanizma; author alt skill'i (bir deponun kendi kitini büyütmesi için), dependency-upgrade gibi bakım eklentileri ve frontend design-system eklentisi (deponun gerçek tasarım token'larından akıl yürütülen bir `docs/DESIGN.md`) dahil.
- **Uyumluluk** — AI-first bir deponun normatif tanımı: bir deponun sahip OLMASI GEREKEN ve OLMALI olan yapılar, bir planı iyi biçimlendiren şey ve `/dwp-verify` ile nasıl nesnel biçimde doğrulanacağı.
- **Plan durumu** — makine tarafından okunabilir durum katmanı: `manifest.json` ve `state.json`, kapı kayıtları, bölümsel bellek olarak sonuç kayıtları, uzlaştırma (Markdown kazanır) ve katmanın ne zaman gerekli olduğu.

- [Spesifikasyonu okuyun](/spec)
- [Metodolojiyi okuyun](/methodology)
