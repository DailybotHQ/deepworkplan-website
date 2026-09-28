---
title: deepworkplan-onboard
description: "Bir deponun yığını ve arketipi üzerine akıl yürüterek onu AI-first hâle getirir; uyarlanmış bir AGENTS.md, docs/, .agents/ ve gitignore’lu bir .dwp/ üretir."
kind: command
lang: tr
order: 6
usage: /deepworkplan-onboard
---

# deepworkplan-onboard

Bir depoyu AI-first, spec-driven bir kod tabanına dönüştürün. Bu, Deep Work Plan skill’inin onboard alt skill’idir.

## Ne yapar

`deepworkplan-onboard`, **gerçek** depoyu inceler — diller, çerçeveler, paket yöneticisi, build/test/lint komutları, modüller, test kuralı, dağıtım biçimi — ve ona uyarlanmış artefaktlar üretir. Akıl yürütür; asla bir şablonu kopyalamaz veya bir yer tutucu bırakmaz.

## Kullanım

```
/deepworkplan-onboard
```

## Davranış

1. Keşif — gerçek yığını ve doğrulama komutlarını saptayın; en yakın onboarding ön ayarıyla eşleştirin.
2. Arketip — bireysel depo ya da orkestratör merkezi olarak sınıflandırın.
3. Gerçek bir Hızlı Komutlar bloğuyla `AGENTS.md` ve `CLAUDE.md` sembolik bağını üretin.
4. `docs/` (mimari, standartlar, test, güvenlik ve daha fazlası) ile modül başına dokümanları üretin.
5. `.agents/` (ajanlar, ince `dwp-*` komutları, yığına uygun skill’ler, katalog) ile `.claude → .agents` üretin.
6. Skill’i kurun ve gitignore’lu bir `.dwp/` (planlar, taslaklar) ile bir `tmp/` karalama alanı iskeletleyin.
7. Gerekli AI Diff Reviewer yerel incelemesini kurun, isteğe bağlı eklentileri önerin, ardından kendi kendini denetleyin.

## Notlar

Bir depo, sıfır isteğe bağlı eklentiyle tümüyle uyumludur; AI Diff Reviewer yerel incelemesi 2.3.0 standardından itibaren temelin bir parçasıdır. Saptanan gerçeklik her zaman ön ayar varsayımlarına üstün gelir.

## v6 şema başvuruları

v6 planları için makine tarafından okunabilir şema kataloğu bu sabit URL’lerde yayımlanır. v6 canlı görünümü bir anlık görüntüdür; `plan-state/v6.json` yoktur. Mevcut v5 planları v5 durum şemasını kullanmaya devam eder ve eski planlar sessizce yeniden yazılmaz.

- **Plan manifest:** https://deepworkplan.com/schema/plan-manifest/v6.json
- **Plan snapshot (v6 live projection):** https://deepworkplan.com/schema/plan-snapshot/v6.json
- **Plan contract:** https://deepworkplan.com/schema/plan-contract/v6.json
- **Journal event:** https://deepworkplan.com/schema/journal-event/v6.json
- **Context manifest:** https://deepworkplan.com/schema/context-manifest/v6.json

Yeni planlara en az üç basamaklı, monoton artan sayısal kimlikler verilir (örneğin `PLAN_001_add_payment_webhooks/`). Dondurulmuş v5 şemaları sayısal kimliği bir sözcük saydığı için v5 slug’ları 2–4, v6 slug’ları 2–5 sözcük içerir. Mevcut numarasız `PLAN_<slug>/` klasörleri okunabilir kalır ve hiçbir zaman yeniden adlandırılmaz. Numaralı planlar varsa `latest`, sayısal kimliği en yüksek olan planı gösterir.
