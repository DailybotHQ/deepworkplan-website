---
title: "Deep Work Plan spesifikasyonu"
description: "Deep Work Plan metodolojisinin okunabilir spesifikasyonu: DWP biçimi, ajan protokolü, arketipler, dokümantasyon standardı ve eklenti mekanizması."
lastUpdated: 2026-05-30
---

## Deep Work Plan spesifikasyonu

Spesifikasyon, metodolojinin kesin, okunabilir tanımıdır — insanların ve ajanların paylaştığı yapılar ve protokoller. Normatif RFC-2119 terimleriyle, spec odaklı bir planın nasıl yapılandırıldığını ve bir ajanın ona karşı nasıl çalışması gerektiğini belirtir: plan doğruluk kaynağıdır, doğrulama kapıları ikilidir ve depo, bir ajanın ihtiyaç duyduğu harness’ı kendisi taşır. Sıralı belgeler hâlinde düzenlenmiştir:

- **Dokümantasyon standardı** — AI-first depo yapısı.
- **DWP spesifikasyonu** — plan yapısı, görev anatomisi ve yürütme döngüsü.
- **Ajan protokolü** — gerekli ajanlar arası davranış ve komut eşlemesi.
- **Arketipler** — bireysel depolar ile orkestratör merkezleri karşılaştırması.
- **Eklentiler** — isteğe bağlı yetenekleri katmanlamak için tercihe dayalı mekanizma; author alt skill’i (bir deponun kendi kitini büyütmesi için), dependency-upgrade gibi bakım eklentileri ve frontend design-system eklentisi (deponun gerçek tasarım token’larından akıl yürütülen bir `docs/DESIGN.md`) dahil.
- **Uyumluluk** — AI-first bir deponun normatif tanımı: bir deponun sahip OLMASI GEREKEN ve OLMALI olan yapılar, bir planı iyi biçimlendiren şey ve `/dwp-verify` ile nasıl nesnel biçimde doğrulanacağı.

- [Spesifikasyonu okuyun](/spec)
- [Metodolojiyi okuyun](/methodology)
