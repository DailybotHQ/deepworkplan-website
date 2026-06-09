---
title: Bulut ajanları
description: "DWP'nin bulut ve arka plan ajanları adaptörü: Claude Code uzak görevleri, Codex cloud, Jules-class — kalıcı bir .dwp/ planına karşı yürütülen geçici oturumlar."
kind: adapter
lang: tr
order: 12
agent: Cloud agents
support: full
prefix: plain text
---

# Bulut ajanları adaptörü

Bulut ve arka plan ajanları — Claude Code uzak görevleri, OpenAI Codex cloud, Jules-class ajanlar ve benzer asenkron yürütme ortamları — tasarım gereği geçicidir: bir oturum başlar, sınırlı bir süre çalışır ve sona erer. DWP, kalıcı yapıyı oturum değil plan yaparak bu kısıtlamayı bir avantaja dönüştürür.

## Temel kavrayış

Deponun `.dwp/` dizini, **kalıcı spec ve durum katmanıdır**. Bulut oturumları ise **geçici yürütücülerdir**. Plan, yürütücüye ne yapılacağını söyler; `state.json` nereden devam edeceğini söyler. Oturum herhangi bir şey olabilir — farklı bir model, farklı bir sağlayıcı, yeni bir konteyner — ve plan tam kaldığı yerden devam eder.

## Destek düzeyi

**Tam** — depoyu okuyan, `AGENTS.md`'yi izleyen ve kabuk komutları yürütebilen herhangi bir bulut ajanı, platforma özgü bir adaptör olmadan DWP'yi destekler.

## Uyan-devam et-ver döngüsü

Her bulut ajanı dönüşü şu kalıbı izler:

1. **Uyan** — oturum başlar (bir cron zamanlaması, bir CI olayı veya kullanıcı eylemi tarafından tetiklenir).
2. **DWP Resume Protocol'ü çalıştır** — plan README'sini oku, kontrol noktasını bul, `state.json`'u Markdown ile uzlaştır, ek yeri incele, duman testi yürüt. Bkz. [DWP spesifikasyonu](/spec/dwp-specification#the-dwp-resume-protocol).
3. **Engellenmiş durumu kontrol et** — `state.json.blocked` ayarlıysa, nedeni raporla ve yürütmeden ver.
4. **Sonraki atomik görevi yürüt** — bir görev, tam doğrulama kapısını geçerek.
5. **Durum katmanını güncelle** — `state.json`'u yeni görev durumu, kapı kayıtları, sonuç kaydı ve commit karması ile atomik olarak yeniden yaz.
6. **Ver** — oturum temiz bir şekilde sona erer; sonraki dönüş güncellenmiş durumdan devam eder.

## Gereksinimler

- Plan, makine tarafından okunabilir durum katmanını (`manifest.json` + `state.json`) TAŞIMAK ZORUNDADIR. Onsuz, geçici bir oturumun devam pozisyonunu güvenilir biçimde belirleyecek yolu yoktur. Bkz. [Plan durumu](/spec/plan-state).
- Plan, herhangi bir gözetimsiz bulut dönüşünden önce bir insan tarafından onaylanmış OLMALIDIR. Plan onayı, kontrol noktasıdır.
- Ajan sınırlı yetki altında çalışır: kapsamı GENİŞLETMEMELİ, planın açıkça yetkilendirmediği yıkıcı işlemler GERÇEKLEŞTİRMEMELİ ve mevcut görevin talimatlarının ötesinde DOĞAÇLAMA YAPMAMALIDIR. Bkz. [Ajan protokolü](/spec/agent-protocol#execution-profiles).

## Notlar

Bulut ajanı oturumları, gözetimsiz yürütme profilinin aşırı durumudur: sıfır oturum sürekliliği, maksimum plan kalıcılığı. DWP'nin `.dwp/` dizini özellikle bunu çalıştırmak için tasarlanmıştır — bir ajanın taze bir checkout'tan bir çalışma grubunu başlatmak, sürdürmek ve tamamlamak için ihtiyaç duyduğu tüm durum, herhangi bir oturumun okuyabileceği düz Markdown ve JSON dosyalarında yaşar.
