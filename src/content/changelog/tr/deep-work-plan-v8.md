---
title: "DWP v8: spec-first, kapalı döngü"
description: "Deep Work Plan v8 spec-first planları, harness olarak depoyu, Loop engineering'i ve ölçülen verimliliği birleştirir; döngü onaylı planları tamamlar."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: tr
order: 0
featured: true
sourceLabel: "Etiketli sürümler ve v8 sözleşme taslağı"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
sourceLinks:
  - label: "Skill release v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill release v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill release v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
---

Deep Work Plan v8 spec-first geliştirme, ajan harness'i olarak depo, Loop engineering ve ölçülen verimliliği bir araya getirir. Çalışma cümlesi: “Spec-first, kapalı döngü: depo harness'tir ve plan tamamlanana kadar kendi kendine yürür.”

## Dört temel ilke

1. **Spec-first:** plan ve şartname açık kabul ölçütleriyle kalıcı doğruluk kaynağıdır. 2. **Depo harness'tir:** bağlam, araçlar, kontrol ve sürdürülebilir durum kodla birliktedir. 3. **Loop engineering:** onaylı plan kaydedilmiş döngüsünü tamamlar. 4. **Ölçülen verimlilik:** yayımlanmış ölçüm yoluyla akış başına talimat baytı; token yüzdesi tahmin edilmez.

## Loop engineering ne demektir?

Plan lideri ve sıralı halefleri kaydeder. İnsan isteğe bağlı Herdr daemon'ını herdr-peers autopilot --loop ile başlatır; hatırlatmalar yeni yetki vermeden devam ister. Lider yoksa listelenmiş halef devralabilir. Olaylar Dailybot bildirimine ulaşabilir; fleet etkin makinelerde ajanları ve planları gösterir. Daemon'ı insan başlatır; Herdr isteğe bağlıdır.

## Mekanizmayı taşıyan sürümler

Paket v7.11.0 sağlamlaştırması ve v7.12.x plan kaydı ile bildirim sürümleri plan mekanizmalarını sağlar. herdr-peers v1.3.x döngü, rapor ve fleet görünümü ekler; v2.0.0 protocol 2 brain ve kuyruk tüketicisini ekler. coding-agents-kit v1.3.0 pick-v2 sözleşmesini, v1.4.0 doğrulanmış güncelleyiciyi sağlar. Sürümler yukarıda etiketlidir; addon'lar isteğe bağlıdır.

## v8 sözleşmesi — RE-VERIFY AT 8.0.0

origin/feat/v8-line taslağı plan-contract/v8'e autonomy ekler: duraklama bütçesi, uyarı panelleri, bildirim hedefleri, brain izni ve kuyruk davranışı. .dwp/queue.json için dwp-queue-v1 de tanımlar; paketin yazdığı kuyruğu Herdr okur. Bu geçici iddialar yayımdan önce etiketli 8.0.0 çıktılarıyla doğrulanmalıdır.
