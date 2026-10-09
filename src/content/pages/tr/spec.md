---
title: "Deep Work Plan spesifikasyonu"
description: "Deep Work Plan metodolojisinin okunabilir spesifikasyonu: DWP biçimi, ajan protokolü, arketipler, dokümantasyon standardı ve eklenti mekanizması."
lastUpdated: 2026-09-28
---

## Deep Work Plan spesifikasyonu

**Güncel standart: v7 (DWP 7.0.0).** Aşağıdaki belgeler korunan temeldir; v6 sözleşme, yalnızca eklemeli günlük, görev bağlamı, kaynak denetimleri ve yaşam döngüsü kurallarını ekledi; v7 ise bu kayıt katmanını korurken isteğe bağlı bir `parallel_safe` görev işaretçisi, bir `delegation` günlük olayı, `.dwp/config.json` eklenti kaydı ve eklentilerin sağladığı yetenekler ekler. [v7 manifesto şemasını](https://deepworkplan.com/schema/plan-manifest/v7.json), [sözleşme şemasını](https://deepworkplan.com/schema/plan-contract/v7.json) ve [canlı anlık görüntü şemasını](https://deepworkplan.com/schema/plan-snapshot/v6.json) (v6 ile ortak) okuyun. Mevcut v5 ve v6 planları kendi kurallarını korur. Güncel 7.x paketi yeni planları varsayılan olarak v7 ile oluşturur. Mevcut planlar kayıtlı nesillerini korur; geçiş açık bir istek gerektirir.

Spesifikasyon, metodolojinin kesin, okunabilir tanımıdır — insanların ve ajanların paylaştığı yapılar ve protokoller. Normatif RFC-2119 terimleriyle, spec odaklı bir planın nasıl yapılandırıldığını ve bir ajanın ona karşı nasıl çalışması gerektiğini belirtir: plan doğruluk kaynağıdır, doğrulama kapıları ikilidir ve depo, bir ajanın ihtiyaç duyduğu harness'ı kendisi taşır. Sıralı belgeler hâlinde düzenlenmiştir:

- **Dokümantasyon standardı** — AI-first depo yapısı.
- **DWP spesifikasyonu** — plan yapısı, görev anatomisi, yürütme döngüsü, kahverengi alan değişiklikleri için Delta bölümü, DWP Resume Protocol, orantılı titizlik kademeleri (micro/standard/deep) ve makine tarafından okunabilir plan durum katmanı.
- **Ajan protokolü** — gerekli ajanlar arası davranış, komut eşlemesi, desteklenen ajanlar (OpenClaw ve Hermes dahil) ve yürütme profilleri (etkileşimli ve gözetimsiz); durma koşulları ve zamanlanmış devam.
- **Arketipler** — bireysel depolar, orkestratör merkezleri ve ajan çalışma alanı (otonom bir ajanın uzun ömürlü evi: OpenClaw çalışma alanı, Hermes servis dizini, bulut ajanı birimi); sınıflandırma sezgisel kuralı ve kuruluma almanın nasıl farklılaştığı.
- **Eklentiler** — isteğe bağlı yetenekleri katmanlamak için tercihe dayalı mekanizma; author alt skill'i (bir deponun kendi kitini büyütmesi için), dependency-upgrade gibi bakım eklentileri ve design-system eklentisi (deponun gerçek tasarım kaynağından akıl yürütülen, görsel UI, CLI çıktısı ve konuşma yüzeyleri için profiller içeren bir `docs/DESIGN.md`) dahil.
- **Uyumluluk** — AI-first bir deponun normatif tanımı: bir deponun sahip OLMASI GEREKEN ve OLMALI olan yapılar, bir planı iyi biçimlendiren şey ve `/dwp-verify` ile nasıl nesnel biçimde doğrulanacağı.
- **Plan durumu** — makine tarafından okunabilir durum katmanı: `manifest.json` ve `state.json`, kapı kayıtları, bölümsel bellek olarak sonuç kayıtları, uzlaştırma (Markdown kazanır) ve katmanın ne zaman gerekli olduğu.

- [Spesifikasyonu okuyun](/spec)
- [Metodolojiyi okuyun](/methodology)
