---
title: "DWP v6: aynı yöntem, daha sıkı sözleşme"
description: "Deep Work Plan v6, v5 metodolojisini korur ve daha sıkı bir yürütme yapısı ekler. Ajan sonuçlarının aşağı kalmaması ölçülmemiştir."
date: 2026-09-28
version: "v6 · Daha sıkı yapı"
kind: release
lang: tr
order: 0
featured: true
sourceLabel: "Yayımlanan v6 şema kümesi"
sourceUrl: "https://deepworkplan.com/schema/plan-manifest/v6.json"
sourceLinks:
  - label: "Plan manifest schema v6"
    url: "https://deepworkplan.com/schema/plan-manifest/v6.json"
  - label: "Plan snapshot schema v6"
    url: "https://deepworkplan.com/schema/plan-snapshot/v6.json"
  - label: "Plan contract schema v6"
    url: "https://deepworkplan.com/schema/plan-contract/v6.json"
  - label: "Journal event schema v6"
    url: "https://deepworkplan.com/schema/journal-event/v6.json"
  - label: "Context manifest schema v6"
    url: "https://deepworkplan.com/schema/context-manifest/v6.json"
---

Deep Work Plan v6, v5 metodolojisini, komut yüzeyini ve `.dwp/plans/` konumunu korur. Plan yetkisini, yürütme kanıtını, görev bağlamını, zamanlamayı ve canlı durumu temsil etmek için daha sıkı bir yapı ekler.

v6 şema kümesi kimlik bildirimini, sonuç ve yetki sözleşmesini, yalnızca eklemeli günlük olaylarını, görev bağlamı bildirimini ve canlı anlık görüntüyü tanımlar. v6 canlı görünümü anlık görüntüdür; bu nedenle `plan-state/v5.json`, v5 planlarının durum şeması olarak kalır ve `plan-state/v6.json` yoktur. Mevcut planlar kayıtlı nesillerini korur ve sessizce yeniden yazılmaz.

Mimari kararı GO’dur: v6 aynı metodolojiyi daha sıkı mühendislik yapısıyla korur. Bu, deneysel üstünlük iddiası değildir. Ajan sonuçlarının aşağı kalmaması ölçülmemiştir.

Yeni planlara en az üç basamaklı, monoton artan sayısal kimlikler verilir (örneğin `PLAN_001_add_payment_webhooks/`). Dondurulmuş v5 şemaları sayısal kimliği bir sözcük saydığı için v5 slug’ları 2–4, v6 slug’ları 2–5 sözcük içerir. Mevcut numarasız `PLAN_<slug>/` klasörleri okunabilir kalır ve hiçbir zaman yeniden adlandırılmaz. Numaralı planlar varsa `latest`, sayısal kimliği en yüksek olan planı gösterir.
