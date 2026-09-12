---
title: "DWP v4: işe uygun planlar"
description: "Deep Work Plan v4, plan biçimini işe göre şekillendiriyor, tam tersini değil — Lite plan artık sınırlı kapsamlı görevler için eksiksiz, doğrudan çalıştırılabilir bir öneri ve ayrı taslak aşaması kaldırıldı."
date: 2026-09-11
version: "v4 · Lite öncelikli planlar"
kind: release
lang: tr
order: 2
featured: false
sourceLabel: "Skill release commit 3daab90"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/3daab90"
---

Bugün Deep Work Plan v4'ü yayınlıyoruz. Bu sürüm çeviklik ve çok yönlülükle ilgili: aynı metodoloji, sınırlı kapsamlı bir düzeltme için hafif hissettirmeli, ancak saatler ya da günler süren işler için de sağlam kalmalı; geliştiricinin yalnızca gerçek kapılara sahip olmak için "ciddi" formatı seçmesini gerektirmeden.

Sınırlı kapsamlı iş için plan oluşturmak artık inceleme için atılabilir bir taslak yazıp ardından ayrı bir nihai plan hazırlamak anlamına gelmiyor. `create` artık doğrudan bir **Lite plan** materyalize ediyor: her biri kendi kabul kriterlerine, doğrulama kapısına ve tamamlanma kaydına sahip, satır içi görev kayıtlarıyla kompakt, tamamen çalıştırılabilir bir öneri. Artık ayrı bir `.dwp/drafts/` aşaması yok — taslak ve plan, yazıldığı andan itibaren incelenebilir ve çalıştırılabilir aynı yapıt.

Tam görev dosyalı planlar tam olarak ait oldukları yerde kalıyor: daha uzun, daha riskli işler yine görev başına bir dosya, ayrı bir analiz kaydı ve aynı devam ettirilebilir durum katmanını alıyor. Bir gereksinim ya da doğrulama kapısı artık kompakt bir kayda sığmadığı her noktada bir Lite plan Full'a yükseltilebilir; hangi temsille başlanacağı ise bir tahminle değil, açık ve kayıtlı sinyallerle -görev sayısı, etkilenen yüzey, risk, geri alınabilirlik- belirleniyor.

Bu sürüm DWP `2.4.0` standardını izliyor. [Normatif spesifikasyonu](https://deepworkplan.com/spec) okuyun, [kiti](https://deepworkplan.com/kit/) inceleyin veya [`/init`](https://deepworkplan.com/init) ile benimsemeye başlayın.
