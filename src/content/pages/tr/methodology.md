---
title: "Deep Work Plan metodolojisi"
description: "Manifestodan arketiplere beş bölüm: Deep Work Plan metodolojisinin ardındaki ilkeler, çekirdek döngü, şablonlar, skill’ler ve uyarlamalar."
lastUpdated: 2026-05-30
---

## Deep Work Plan metodolojisi

Deep Work Plan (DWP), yapay zeka kodlama ajanlarıyla yapılandırılmış, otonom mühendislik işi yürütmek için açık, çerçeveden bağımsız bir metodolojidir. Belirsiz bir hedefi, bir ajanın bağlamını kaybetmeden yürütebileceği, duraklatabileceği, sürdürebileceği ve hakkında rapor verebileceği gözden geçirilebilir bir plana dönüştürür.

DWP iki temel direğe dayanır.

**Spec odaklı geliştirme.** Bir sohbet dökümünü doğruluk kaynağı olarak ele almak yerine, önce *neyin* doğru olması gerektiğini yazarsınız — hedef, kapsam, kabul kriterleri ve bittiğini kanıtlayan denetimler — ve ajan bu spesifikasyona karşı çalışır. DWP’de plan, spesifikasyonun *kendisidir*: plan → atomik görevler → doğrulama kapıları → tamamlama. Spesifikasyonu önce yazmak sapmayı azaltır (ajan, belirtilmiş ölçütlere göre değerlendirilir), işi doğrulanabilir kılar (her kapı ya geçer ya kalır) ve kaldığı yerden sürdürülebilir yapar (spesifikasyon herhangi bir oturumdan ya da ajandan daha uzun ömürlüdür). Araçtan bağımsız ve repo-native olarak, GitHub Spec Kit, Amazon Kiro ve Tessl gibi araca bağlı spec odaklı sistemlerden ayrışır.

**Harness mühendisliği — depo, harness haline gelir.** Bir dil modeli tek başına yalnızca bir metin tahmin edicidir; onu güvenilir bir mühendise dönüştüren, etrafını saran *harness*’tır — bağlam, araçlar, bir kontrol döngüsü, güvenlik bariyerleri ve kalıcı durum. Harness mühendisliği, o iskeleyi kasıtlı olarak tasarlamaktır. DWP’nin duruşu, onun bir araçta değil, depoda yaşaması gerektiğidir: bağlam olarak `AGENTS.md` + `docs/`, araçlar olarak `.agents/` kiti, kontrol döngüsü olarak plan, güvenlik bariyerleri olarak doğrulama kapıları ve durum olarak gitignore’lanmış `.dwp/`. Her parça depoda bir dosya olduğu için harness taşınabilirdir — böylece herhangi bir ajan herhangi bir depoyu pilotlayabilir.

Metodoloji beş bölümde açıklanır:

1. **Manifesto** — bir Deep Work Plan’in ne olduğu ve yapılandırılmış yürütmenin neden önemli olduğu.
2. **Çekirdek döngü** — her görevi yürüten plan-yürüt-doğrula döngüsü.
3. **Şablonlar** — ajanların ve insanların paylaştığı plan ve görev yapıları.
4. **Skill’ler ve ajanlar** — komutların ve ajan rollerinin nasıl bir araya geldiği, yaşayan kit (bir deponun author alt skill’i aracılığıyla kendi skill’lerini nasıl büyüttüğü) ve dependency-upgrade gibi tercihe dayalı bakım eklentileri.
5. **Arketipler** — metodolojiyi bireysel depolara ve orkestratör merkezlerine uyarlamak.

- [Metodolojiyi okuyun](/methodology)
- [Spesifikasyonu okuyun](/spec)
- [Kite göz atın](/kit)
