---
title: "Deep Work Plan kiti"
description: "Skill ve sekiz alt skill’i, komutlar, ajan adaptörleri, onboarding hazır ayarları, tercihe dayalı eklentiler ve örnekler — Deep Work Plan’i her yerde çalıştırılabilir kılan her şey."
lastUpdated: 2026-05-31
---

## Deep Work Plan kiti

Kit, metodolojiyi uygulamada çalıştırmak için ihtiyacınız olan her şeydir.
`DailybotHQ/deepworkplan-skill` üzerinden kurulur:

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

### Skill ve alt skill’leri

Deep Work Plan skill’i, bir yönlendirici ile sekiz alt skill’den oluşur:

- **create** — bir hedefi yapılandırılmış bir plana ayrıştırır (`/dwp-create`).
- **execute** — bir planı görev görev çalıştırır, her kapıyı doğrular (`/dwp-execute`).
- **refine** — tamamlanmış işi korurken görev ekler, çıkarır veya yeniden sıralar (`/dwp-refine`).
- **resume** — durumu yeniden oluşturur ve kesintiye uğramış bir planı sürdürür (`/dwp-resume`).
- **status** — değişiklik yapmadan ilerlemeyi raporlar (`/dwp-status`).
- **verify** — depo ve plan uyumluluğunu nesnel olarak denetler (`/dwp-verify`).
- **onboard** — bir depoyu AI-first hâle getirir (`/deepworkplan-onboard`).
- **author** — deponun kendi skill’lerini, ajanlarını ve komutlarını oluşturur veya geliştirir (`/skill-create`, `/agent-create`).

### Komutlar

İnce eğik çizgi komutları, alt skill’lere ve eklentilere yetki devreder:

- `dwp-create`, `dwp-execute`, `dwp-refine`, `dwp-resume`, `dwp-status`, `dwp-verify` — plan-yürüt-doğrula döngüsü.
- `skill-create`, `agent-create` — author alt skill’ine yetki devreder.
- `lib-upgrade` — dependency-upgrade eklentisine yetki devreder (yalnızca o eklenti kabul edildiğinde kurulur).

### Adaptörler

Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Google Gemini, OpenCode, Windsurf, Cline ve Antigravity için ince, ajan başına entegrasyonlar.

### Onboarding hazır ayarları

Onboarding akışının dokümanları, skill’leri ve doğrulama komutlarını uyarlamak için kullandığı, yığına özgü akıl yürütme kılavuzları — asla şablonlar değil. Altı hazır ayar: Django, Vue + Vite, Astro/Svelte, Node/TS servisi, Python paketi/CLI ve genel bir yedek.

### Eklentiler (tercihe dayalı)

Onboarding akışının bir depoya katmanlayabileceği isteğe bağlı yetenekler — asla AI-first temel hattının bir parçası değil:

- **Devcontainer** — kalıcı AI-CLI kimlik doğrulaması içeren, yeniden üretilebilir, yalıtılmış bir geliştirme konteyneri.
- **Dailybot** — Dailybot kullanan ekipler için en iyi çabayla ilerleme ve dönüm noktası raporlaması.
- **Dependency upgrade** — paket yöneticisinden bağımsız, gruplanmış, doğrulanmış, geri alınabilir yükseltmeler.

### Örnekler

İşlenmiş, önce-sonra anlatımları.

- [Kite göz atın](/kit)
- [Hızlı başlangıç](/quickstart)
- [Örnekleri görün](/examples)
