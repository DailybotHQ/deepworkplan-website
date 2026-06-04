---
title: "Deep Work Plan — yapay zeka kodlama ajanları için yapılandırılmış yürütme"
description: "Bağlam modellerden daha çok önemlidir. Deep Work Plan, herhangi bir depoyu, herhangi bir kodlama ajanının uzun soluklu işi bitirdiği yapılandırılmış bir ortama dönüştürür."
lastUpdated: 2026-06-03
---

## Modeller önemlidir. Bağlam daha çok önemlidir.

Deep Work Plan, herhangi bir depoyu yapılandırılmış bir ortama — bağlam, güvenlik bariyerleri ve kalıcı bir plan — dönüştürür; burada herhangi bir kodlama ajanı kesinlikle yürütür ve uzun soluklu işi bitirir.

Deep Work Plan (DWP), yapay zeka ajanlarıyla karmaşık yazılım işlerini planlamak ve yürütmek için açık, MIT lisanslı bir metodoloji ve kittir. Bir kurulum yöntemi seçmez ya da bir şablon kopyalamazsınız — ajanınıza tek bir satır verirsiniz:

> Bu depoyu AI-first yapmak için https://deepworkplan.com/init.md adresindeki yönergeleri okuyup izleyin.

> Deep Work Plan, deponun kendisinin harness haline geldiği spec odaklı geliştirmedir.

- [/init istemini açın](/init)
- [Metodolojiyi okuyun](/methodology)

---

## Sorun ve yanıt

Yapay zeka kodlama ajanları, kısa anlarda dikkat çekici ölçüde etkilidir. Uzun soluklu işlerde — bir geçiş, yeni bir alt sistem, onlarca dosyaya yayılan bir refactor — savrulurlar: bağlam dolar, kararlar unutulur ve birkaç saatlik görevler yarı yolda terk edilir.

Deep Work Plan buna **spec odaklı geliştirmeyle** yanıt verir: plan kalıcı doğruluk kaynağıdır ve ajanlar açık kabul kriterlerine ve doğrulama kapılarına karşı çalışır. Sapma düşer, iş doğrulanabilir kalır ve herhangi bir ajan onu oturumlar arasında sürdürebilir. Tek bir IDE ya da satıcıya bağlı spec odaklı araçların (GitHub Spec Kit, Amazon Kiro, Tessl) aksine, DWP araçtan bağımsız ve repo-native’dir.

Aynı zamanda taşınabilir hale getirilmiş **harness mühendisliğidir**. Bir ajan harness’ı, bir modelin etrafındaki iskeledir — bağlam, araçlar, kontrol döngüsü, güvenlik bariyerleri, sürdürülebilir durum — ve onu güvenilir kılan şeydir. Deep Work Plan o harness’ı deponun kendisine kurar; böylece herhangi bir ajan herhangi bir depoyu pilotlayabilir.

---

## Ne elde edersiniz

- Gerçek yığınınız ve komutlarınızdan akıl yürütülmüş, depo kökünde bir AGENTS.md.
- Kategorize edilmiş bir `docs/` ve modül başına dokümanlar.
- `.claude → .agents` sembolik bağıyla bir `.agents/` dizini (skill’ler, ajanlar, komutlar).
- Her ajan için bir kez kurulan Deep Work Plan skill’i — author alt skill’i dahil; böylece depo kendi skill’lerini, ajanlarını ve komutlarını büyütebilir, ayrıca dependency-upgrade gibi tercihe dayalı bakım eklentileri.
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
