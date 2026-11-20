---
title: "DWP v8: spec-first, kapalı döngü"
description: "Deep Work Plan v8 spec-first planları, harness olarak depoyu, Loop engineering'i ve ölçülen verimliliği birleştirir; döngü onaylı planları tamamlar."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: tr
order: 0
featured: true
sourceLabel: "Skill v8.0.0 sürümü"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
sourceLinks:
  - label: "Skill v8.0.0 sürümü"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
  - label: "Skill v8.0.1 sürümü"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.1"
  - label: "Skill v8.0.6 sürümü"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.6"
  - label: "LOOP_ENGINEERING.md (v8 normatif)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/spec/LOOP_ENGINEERING.md"
  - label: "Belirtim okuyucusunda Loop engineering"
    url: "https://deepworkplan.com/spec/loop-engineering"
  - label: "plan-contract/v8 şeması"
    url: "https://deepworkplan.com/schema/plan-contract/v8.json"
  - label: "journal-event/v8 şeması"
    url: "https://deepworkplan.com/schema/journal-event/v8.json"
  - label: "plan-snapshot/v8 şeması"
    url: "https://deepworkplan.com/schema/plan-snapshot/v8.json"
  - label: "Plan kuyruğu yazıcısı (shared/queue.py)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/shared/queue.py"
  - label: "Skill v7.11.0 sürümü"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill v7.12.0 sürümü"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill v7.12.2 sürümü"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "herdr-peers v2.1.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.1.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
  - label: "coding-agents-kit v1.5.2"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.5.2"
  - label: "devcontainer-kit v1.3.0"
    url: "https://github.com/DailybotHQ/devcontainer-kit/releases/tag/v1.3.0"
---

Deep Work Plan v8 dört fikri bir araya getirir: spec-first geliştirme, ajan harness'i olarak depo, Loop engineering ve ölçülen verimlilik. Çalışma cümlesi şöyledir: “Spec-first, loop-closed: depo harness'tir ve plan tamamlanana kadar kendi başına ilerler.”

## Dört sütun

1. **Spec-first.** Plan ve belirtimi, açık kabul ölçütleri ve doğrulama kapılarıyla kalıcı doğruluk kaynağıdır.
2. **Depo harness'tir.** Bağlam, araçlar, denetim kuralları ve devam ettirilebilir durum kodla birlikte bulunur; farklı ajanlar aynı depoda çalışabilir.
3. **Loop engineering.** Onaylanmış plan, kaydedilmiş yaşam döngüsünü tamamlanana kadar izleyebilir.
4. **Ölçülen verimlilik.** Verimlilik, yayımlanmış ölçüm yolu ile akış başına talimat baytları cinsinden raporlanır; token yüzdeleri çıkarımla üretilmez.

## Loop engineering ne demektir

Plan bir lideri ve sıralı halefleri kaydeder. Bir insan isteğe bağlı Herdr daemon'ını `herdr-peers autopilot --loop` ile başlatır; uyarılar yeni yetki vermeden liderden devam etmesini ister. Lider yoksa döngü, listelenmiş bir halefin devralmasını isteyebilir. Plan olayları paketin Dailybot bildiricisine ulaşabilir; fleet görünümü etkin makinelerdeki ajanları ve planları gösterir. Daemon'ı başlatma sorumluluğu insandadır ve Herdr addon'ı isteğe bağlıdır.

## Mekanizmaları içeren sürümler

Paketin v7.11.0 sağlamlaştırması ve v7.12.x plan kaydı ve bildirim sürümleri plan tarafındaki mekanizmaları sağlar. herdr-peers v1.3.x döngü, raporlama ve fleet görünümü ekler; v2.0.0 protocol 2 brain'ini ve kuyruk tüketicisini ekler. coding-agents-kit v1.3.0 pick-v2 başlatma sözleşmesini, v1.4.0 doğrulanmış güncelleyiciyi sağlar. herdr-peers v2.1.0 v8 yapılandırılmış blocker'larını okur; coding-agents-kit v1.5.0 yalnızca bildirilen token'ları ölçer. Paket 8.0.0 addon tanımlayıcıları herdr-peers v2.1.0, coding-agents-kit v1.5.0 ve devcontainer-kit v1.3.0 sürümlerini sabitler. Etiketli sürümler yukarıda bağlantılıdır. Paket bu isteğe bağlı addon'lar olmadan da çalışır.

## v8 sözleşmesi

8.0.0 sürümü DWP standardı 8.0.0'ı uygular. Yeni planlar `plan-contract/v8` ile oluşturulur; v7, v6 ve v5 planları kaydedilmiş nesillerini korur ve yalnızca açık `refine migrate` ile taşınır. v8 planları `plan-manifest/v7` çizgisini korur; mevcut planlar için `journal-event/v7` desteklenmeye devam eder. Normatif kaynak `LOOP_ENGINEERING.md` ve yayımlanmış üç şemadır.

- **`autonomy` bloğu.** `plan-contract/v8` içindeki isteğe bağlı, kapalı blok planın döngü yetkisini kaydeder: `stall_budget` (1–10, varsayılan 3), `promptable` panoları (varsayılan yalnızca lider), `notify` hedefleri (varsayılan yok), `brain` (varsayılan `false`) ve `queue` (`prompt-lead`, `launch` veya `none`, varsayılan `none`). Blok yoksa tüm varsayılanlar geçerlidir ve çözüm sorumlusu insandır.
- **Yapılandırılmış blocker'lar.** Bir blocker, `journal-event/v8` içindeki `blocker` olayıdır; yalnızca ledger helper üzerinden oluşturulur ve çözülür. Görev, neden, tek satır `needs`, zorunlu C1–C7 sınıfı ve isteğe bağlı resolver içerir. C1, C2, C5 ve C6 için `resolver: lead` reddedilir; döngü yalnızca planın kendisinin `resolver: lead` olarak işaretlediği blocker için liderden çözüm ister. `state.json`, etkin blocker ve türetilmiş `blocked` durumuyla `plan-snapshot/v8` olur; `PROGRESS.md` hedef, geçerli görev, sonraki eylem ve ihtiyaçlardan oluşan dört satırlı başlıkla başlar.
- **Plan kuyruğu.** `.dwp/queue.json` (`dwp-queue-v1`) yalnızca paketin `shared/queue.py` dosyası veya bir insan tarafından yazılır; onayda `create` plan ekler ve Herdr daemon'ı kuyruğu yalnızca okur. Kuyruk en fazla 64 plan tutar ve plan `parallel: true` ayarlamadıkça depo başına aynı anda tek plan çalıştırır. Bozuk kuyruk yaşam döngüsünü kesintiye uğratmaz.

Son v7 sürümü **7.12.2** idi.

Yüklü skill sürümü: **8.0.6**.
