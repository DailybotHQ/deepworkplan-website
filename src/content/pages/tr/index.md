---
title: "Deep Work Plan — yapay zeka kodlama ajanları için yapılandırılmış yürütme"
description: "Bağlam modellerden daha çok önemlidir. Deep Work Plan, herhangi bir depoyu, herhangi bir kodlama ajanının uzun soluklu işi bitirdiği yapılandırılmış bir ortama dönüştürür."
lastUpdated: 2026-09-10
---

## Modeller önemlidir. Bağlam daha çok önemlidir.

Deep Work Plan, herhangi bir depoyu yapılandırılmış bir ortama dönüştürür — bağlam, koruma bariyerleri ve kalıcı bir plan — herhangi bir kodlama ajanı burada hassas ve verimli çalışır ve uzun soluklu işi tamamlar.

Deep Work Plan (DWP), yapay zeka ajanlarıyla karmaşık yazılım işlerini planlamak ve yürütmek için açık, MIT lisanslı bir metodoloji ve kittir. Bir kurulum yöntemi seçmez ya da bir şablon kopyalamazsınız — init.md istemini kopyalayıp ajanınıza yapıştırırsınız:

> init.md istemini kopyalayıp kodlama ajanınıza — Claude Code, Cursor, Codex veya herhangi bir diğeri — yapıştırarak herhangi bir depoyu AI-first hale getirin.

> Deep Work Plan, deponun kendisinin harness haline geldiği spec odaklı geliştirmedir.

- [/init istemini açın](/init)
- [Metodolojiyi okuyun](/methodology)

---

## Sorun ve çözüm

Kısa hamlelerde kodlama ajanları etkileyicidir. Ona uzun soluklu bir misyon verin — bir göç, yeni bir alt sistem, onlarca dosyayı kapsayan bir yeniden yapılandırma — ve ajan sapar: bağlam dolar, önceki kararlar solur ve saatler süren iş yarı yolda kalır.

Deep Work Plan, spesifikasyon odaklı geliştirme ile yanıt verir: dayanıklı bir plan, atomik görevler ve ajanın geçmesi gereken doğrulama kapıları. İş doğrulanabilir kalır — ve her ajan oturumlar arasında sürdürebilir.

Ve bağlam, ajanınızın en kıt kaynağıdır. Bu yüzden harness token verimliliği için tasarlandı: talimatlar aşamalı yüklenir, doğrulama yalnızca değişene dokunur ve her görev kendi yerinde öğrenir — uzun soluklu iş ulaşılabilir kalır.
---

## İnsanlar dümen tutar. Ajanlar yürütür.

Neyin bitti sayılacağına ve sınırların nerede olacağına siz karar verirsiniz. Plan niyetinizi taşır; ajanlar saatleri çalışır — sürekli gözetim yok, yirmi dakikada bir düzeltme yok.

- Siz: niyet, kabul kriterleri, inceleme
- Ajanlar: yürütme, görev görev
- Plan: ikisi arasındaki sözleşme

[Metodolojiyi okuyun](/tr/methodology)

---

## Ajanların sapamayacağı bir plan.

Uzun görevler her modelin bağlamını doldurur. Ayrıntılar kayar ve ajan saptar. Yazılı bir plan — atomik görevler, doğrulama kapıları, sürdürülebilir durum — her turda geri döndüğü çıpadır.

1. Plan
2. Atomik görevler
3. Doğrulama kapıları
4. Tamamlanma
5. Devam ettirilebilir durum

[Çekirdek döngüyü görün](/tr/methodology)

---

## Bitti bir sözleşmedir, bir his değil.

Her görev, kabul kriterlerini ve geçmesi gereken kontrolleri adlandırır. Ajan kendini bitmiş hissedemez — geçmek zorundadır, aksi hâlde görev açık kalır.

- Testler geçer
- Tür denetimi geçer
- Kabul kriterleri karşılanır
- Yoksa görev açık kalır

[Şartnamayı okuyun](/tr/spec)

---

## Depo, harness’tir.

Bağlam, araçlar, koruma bariyerleri ve durum; herhangi bir ajanın okuyabileceği düz dosyalar olarak deponuzda yaşar. Kilitlenme yok, dış beyin yok — bağlam sıfırlamalarını atlatır.

- Diskte kalıcı spesifikasyon
- His değil doğrulama kapıları
- Bağlam sıfırlamalarını atlatır

**SPEC · TASKS · CHECKS · STATE · TOOLS**

[Onboarding çıktısını görün](/tr/quickstart)
---

## Ne elde edersiniz

- Gerçek yığınınız ve komutlarınızdan akıl yürütülmüş, depo kökünde bir AGENTS.md.
- Kategorize edilmiş bir `docs/` ve modül başına dokümanlar.
- `.claude → .agents` sembolik bağıyla bir `.agents/` dizini (skill’ler, ajanlar, komutlar).
- Her ajan için bir kez kurulan Deep Work Plan skill’i — author alt skill’i dahil; böylece depo kendi skill’lerini, ajanlarını ve komutlarını büyütebilir, ayrıca dependency-upgrade ve kullanıcıya dönük herhangi bir arayüz yüzeyi için design-system eklentisi gibi tercihe dayalı eklentiler.
- Gitignore’lanmış bir `.dwp/` klasöründe uzun soluklu, kaldığı yerden sürdürülebilir planlar.

---

## Çalıştırdığınızda ne olur

1. **Ajanınız [/init.md](/init.md) dosyasını açar** — onboarding istemini ve bağlandığı metodolojiyi, spesifikasyonu ve kiti okur.
2. **Deep Work Plan skill’ini kurar** — her depoda aynı olan motor: yönlendirici ve alt skill’leri (create, execute, refine, resume, status, verify, onboard, author); Claude Code, Cursor, Codex, Gemini ve Copilot için.
3. **Deponuzu uyarlar** — gerçek yığınınız hakkında akıl yürüterek (asla kopyala-yapıştır yapmadan), AGENTS.md, `docs/`, modül başına README dosyaları, akıl yürütülmüş bir `.agents/` kiti ve gitignore’lanmış bir `.dwp/` yazar. Deponuz harness haline gelir.
4. **Planlar ve yürütürsünüz** — uzun soluklu Deep Work Plan’ler, açık kabul kriterlerine ve doğrulama kapılarına karşı adım adım, saatlerce otonom biçimde çalıştırılır.

Skill, her yerde aynı şekilde kurulan yeniden kullanılabilir motordur; uyarlanan şey deponuzdur. Kurulum mekaniği (Skills CLI, OpenClaw veya git clone) [/init.md](/init.md) isteminde ve [hızlı başlangıçta](/quickstart) yer alır.

---

## Metodoloji, spesifikasyon ve kit

- [Metodolojiyi okuyun](/methodology) — DWP’nin ne olduğu, ilkeleri, iş akışı ve nasıl benimsenir.
- [Spesifikasyonu okuyun](/spec) — görev anatomisi, doğrulama kapıları, tamamlama protokolü, arketipler ve eklentiler.
- [Kiti keşfedin](/kit) — DWP’yi bir depoya kurmak için hazır ayarlar, adaptörler ve komutlar.
- [Örnekleri görün](/examples) — gerçek mühendislik işinin önce-sonra anlatımları.

---

## Onu kim inşa eder

Deep Work Plan, [Dailybot](https://www.dailybot.com) bünyesindeki gerçek mühendislik işinden doğdu ve Dailybot ile açık kaynak topluluğu tarafından birlikte sürdürülüyor.

- [Metodoloji hakkında](/about)
- [Topluluk ve iletişim](/contact)
- [GitHub deposu](https://github.com/DailybotHQ/deepworkplan-website)
