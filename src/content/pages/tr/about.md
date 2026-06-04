---
title: "Metodoloji hakkında"
description: "Deep Work Plan, yapay zeka kodlama ajanlarıyla ciddi mühendislik işleri için açık, çerçeveden bağımsız bir metodolojidir. Nereden geldiği ve onu kimin sürdürdüğü."
lastUpdated: 2026-05-30
---

## Nedir

Deep Work Plan (DWP) bir ürün değil, bir metodolojidir. Bir hedefi üzerinde uzlaşılmış bir plana nasıl dönüştüreceğinizi, o planı atomik ve bağımsız olarak doğrulanabilir görevlere nasıl ayıracağınızı ve her görevi bir denetimle biten odaklı bir döngüde nasıl çalıştıracağınızı tanımlar.

Spec odaklı bir metodolojidir: plan kalıcı doğruluk kaynağıdır ve ajanlar açık kabul kriterlerine ve doğrulama kapılarına karşı çalışır. GitHub Spec Kit, Amazon Kiro veya Tessl gibi araca bağlı spec odaklı sistemlerin aksine, DWP araçtan bağımsız ve repo-native’dir. Aynı zamanda taşınabilir hale getirilmiş harness mühendisliğidir — bir ajanı güvenilir kılan bağlam, güvenlik bariyerleri ve sürdürülebilir durum, deponun kendisine kurulur (AGENTS.md, docs, `.agents/` skill yuvası, DWP skill’i); böylece herhangi bir ajan herhangi bir depoyu pilotlayabilir.

Hangi yapay zeka ajanını ya da yığını kullandığınız konusunda kasıtlı olarak bağımsızdır — adaptörler, aynı çekirdek döngüyü Claude, Cursor, Copilot, Codex, Gemini ve daha fazlasına çevirir. Plan, görevler ve çalışma günlüğünün tümü düz Markdown’dır; böylece iş okunabilir, gözden geçirilebilir ve sürüm denetimli kalır.

---

## Çekirdek ilkeler

- **Yürütmeden önce plan** — Plan üzerinde uzlaşılana kadar hiç kod yazılmaz. Plan, sizinle ajan arasında bir sözleşmedir. [Metodolojiyi okuyun](/methodology)
- **Görevler atomiktir** — Her görev, tek başına yürütülüp doğrulanabilecek ve ardından atomik olarak commit edilebilecek biçimde kapsamlanır. [Spesifikasyonu görün](/spec)
- **Her şeyi doğrulayın** — Her görev, bir sonraki başlamadan önce açık bir denetimle biter ve ilerleme git’te kaydedilir. [Kiti keşfedin](/kit)

---

## Bir bakışta

- Açık metodoloji, MIT lisanslı
- Çerçeveden ve ajandan bağımsız
- Dailybot ve topluluk tarafından sürdürülür
- Bir spesifikasyon, komutlar, adaptörler, hazır ayarlar ve örnekler içerir
- Yalnızca Markdown — çalışma zamanı yok, bağımlılık kilidi yok
- Herhangi bir depoyu AI-first, ajan-pilotlanabilir bir kod tabanına dönüştürür

---

## Onu kim sürdürür

Deep Work Plan, [Dailybot](https://www.dailybot.com) bünyesindeki gerçek mühendislik işinden doğdu ve şimdi Dailybot ile açık kaynak topluluğu tarafından birlikte sürdürülüyor. Metodoloji, spesifikasyon ve kit, MIT lisansı altında yayımlanır — kullanması, uyarlaması ve üzerine inşa etmesi serbest.

- [Metodolojiyi okuyun](/methodology)
- [Hızlı başlangıç](/quickstart)
- [GitHub deposu](https://github.com/DailybotHQ/deepworkplan-website)
