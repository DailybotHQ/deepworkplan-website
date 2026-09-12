---
title: "DWP v3: token verimliliği baştan tasarlanmış hâliyle"
description: "Deep Work Plan v3, çalışma ortamını bağlam maliyeti etrafında yeniden kuruyor — kademeli bilgi açığa çıkarma, yalnızca etkilenen yüzeyin doğrulanması ve tek zorunlu bir nihai inceleme — ve aynı zamanda güven ile uygunluk tabanını yükseltiyor."
date: 2026-09-10
version: "v3 · Token verimliliği"
kind: release
lang: tr
order: 3
featured: false
sourceLabel: "Skill release commit d050474"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/d050474bea3a2b7675ce851efb377833b4960367"
---

Bugün Deep Work Plan v3'ü yayınlıyoruz. Bağlam, bir ajanın en kıt kaynağıdır ve bu sürüm bunu gayri resmi bir vaat olarak değil, bir mühendislik problemi olarak ele alıyor: sıkıştırılan şey iskelet, asla talimatlar değil.

`GUIDE.md`, her ajanın baştan sona okuduğu bir belge olmaktan çıkıp bir yönlendirme dizini hâline geliyor; böylece bir ajan yalnızca o adımda gerçekten ihtiyaç duyduğu rehberliği yüklüyor. Doğrulama kapıları artık her değişiklikte tüm test paketini yeniden çalıştırmak yerine her görevin etkilenen yüzeyinden seçiliyor ve bir geliştirici zaten ne istediğini biliyorsa plan oluşturma, ara incelemeyi atlayarak doğrudan güven moduna geçebiliyor. Bunların hiçbiri kapıları zayıflatmıyor: yalnızca tekrarlanan okumayı, gereksiz bağlam yüklemesini ve gerçekte değişenle örtüşmeyen doğrulama işini ortadan kaldırıyor.

Verimlilik çalışmasının yanı sıra bu sürüm güven tabanını da yükseltiyor. Tek bir zorunlu nihai inceleme, bir planı önceden sonlandıran üç kapanış görevinin yerini alıyor, yerel AI Diff Reviewer incelemesi zorunlu bir temel bileşen hâline geliyor ve uygunluk artık sıfır isteğe bağlı eklentiyle başlıyor — güvenlik ve köken bilgisi isteğe bağlı bir cila değil, birer gerekliliktir. `AGENTS.md`, deponun DWP standardı kökenini kayıt altına alıyor ve eski planlar, sessizce yeniden yazılmak yerine kayıtlı biçimlerini açık bir geçiş yoluyla koruyor.

Bu sürüm DWP `2.3.0` standardını izliyor. Talimat yükü ve tekrar oynatma davranışı, uydurulmuş bir tasarruf yüzdesi olarak değil, herkese açık bir değerlendirme kaydına göre ölçülüyor.

[Token verimliliği mimarisini](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/adr/0001-token-efficiency-architecture.md) ve [değerlendirme kaydını](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/evaluations/token-efficiency.md) okuyun ya da [normatif spesifikasyonu](https://deepworkplan.com/spec) ve [kiti](https://deepworkplan.com/kit/) inceleyin.
