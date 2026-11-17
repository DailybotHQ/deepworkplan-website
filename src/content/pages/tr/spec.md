---
title: "Deep Work Plan spesifikasyonu"
description: "Deep Work Plan metodolojisinin okunabilir spesifikasyonu: DWP biçimi, ajan protokolü, arketipler, dokümantasyon standardı ve eklenti mekanizması."
lastUpdated: 2026-09-28
---

## Deep Work Plan spesifikasyonu

**Güncel standart: DWP 8.0.0 (sürüm `v8.0.0`).** Korunan temel, v6 kayıt katmanını ve v7 uzantılarını içerir; yeni planlar varsayılan olarak `plan-contract/v8` kullanır. Mevcut v5, v6 ve v7 planları kayıtlı nesillerini korur ve yalnızca açık bir `refine migrate` ile taşınır. v8, `plan-manifest/v7` çizgisini korur ve `plan-contract/v8`, `journal-event/v8` ile `plan-snapshot/v8` ekler; v7 manifest ve journal-event şemaları mevcut planlar için desteklenmeye devam eder. [v7 manifest](https://deepworkplan.com/schema/plan-manifest/v7.json), [v8 sözleşme](https://deepworkplan.com/schema/plan-contract/v8.json), [v8 günlük olayı](https://deepworkplan.com/schema/journal-event/v8.json) ve [v8 anlık görüntüsü](https://deepworkplan.com/schema/plan-snapshot/v8.json).

Spesifikasyon, metodolojinin kesin, okunabilir tanımıdır — insanların ve ajanların paylaştığı yapılar ve protokoller. Normatif RFC-2119 terimleriyle, spec odaklı bir planın nasıl yapılandırıldığını ve bir ajanın ona karşı nasıl çalışması gerektiğini belirtir: plan doğruluk kaynağıdır, doğrulama kapıları ikilidir ve depo, bir ajanın ihtiyaç duyduğu harness'ı kendisi taşır. Sıralı belgeler hâlinde düzenlenmiştir:

- **Kayıt katmanı** — kanıt destekli kayıt katmanı: sözleşme, günlük, kanıt sınıfları (iddia edilen vs gözlemlenen), onaylar ve makbuzlar.
- **Kaynaklar ve yetenekler** — sınırlı yürütme: bağlam bildirimi, kaynak zarfı, ana bilgisayar yetenekleri ve eklenti kaydı.
- **Delegasyon** — çoklu ajan ve sürü yürütmesi: paralel güvenli worktree ler, delegasyon olayları ve dönem bazlı liderlik devri.
- **Plan durumu** — makine tarafından okunabilir durum katmanı: v6/v7 de günlüğün türetilmiş anlık görüntüsü (`ledger.py project`), eski v5 katmanı ve uzlaştırma.
- **DWP spesifikasyonu** — plan yapısı, görev anatomisi, yürütme döngüsü, kahverengi alan değişiklikleri için Delta bölümü, DWP Resume Protocol, orantılı titizlik kademeleri (micro/standard/deep) ve makine tarafından okunabilir plan durum katmanı.
- **Ajan protokolü** — gerekli ajanlar arası davranış, komut eşlemesi, desteklenen ajanlar (OpenClaw ve Hermes dahil) ve yürütme profilleri (etkileşimli ve gözetimsiz); durma koşulları ve zamanlanmış devam.
- **Arketipler** — bireysel depolar, orkestratör merkezleri ve ajan çalışma alanı (otonom bir ajanın uzun ömürlü evi: OpenClaw çalışma alanı, Hermes servis dizini, bulut ajanı birimi); sınıflandırma sezgisel kuralı ve kuruluma almanın nasıl farklılaştığı.
- **Eklentiler** — isteğe bağlı yetenekleri katmanlamak için tercihe dayalı mekanizma; author alt skill'i (bir deponun kendi kitini büyütmesi için), dependency-upgrade gibi bakım eklentileri ve design-system eklentisi (deponun gerçek tasarım kaynağından akıl yürütülen, görsel UI, CLI çıktısı ve konuşma yüzeyleri için profiller içeren bir `docs/DESIGN.md`) dahil.
- **Uyumluluk** — AI-first bir deponun normatif tanımı: bir deponun sahip OLMASI GEREKEN ve OLMALI olan yapılar, bir planı iyi biçimlendiren şey ve `/dwp-verify` ile nasıl nesnel biçimde doğrulanacağı.
- **Plan durumu** — makine tarafından okunabilir durum katmanı: `manifest.json` ve `state.json`, kapı kayıtları, bölümsel bellek olarak sonuç kayıtları, uzlaştırma (Markdown kazanır) ve katmanın ne zaman gerekli olduğu.

- [Spesifikasyonu okuyun](/spec)
- [Metodolojiyi okuyun](/methodology)
