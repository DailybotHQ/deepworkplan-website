---
title: "Deep Work Plan kiti"
description: "Skill ve dokuz alt skill'i, komutlar, ajan adaptörleri, onboarding hazır ayarları, tercihe dayalı eklentiler ve örnekler — Deep Work Plan'i her yerde çalıştırılabilir kılan her şey."
lastUpdated: 2026-10-09
---

## Deep Work Plan kiti

Kit, metodolojiyi uygulamada çalıştırmak için ihtiyacınız olan her şeydir.
`DailybotHQ/deepworkplan-skill` üzerinden kurulur:

```bash
npx skills add DailybotHQ/deepworkplan-skill@v6.0.2 --skill deepworkplan
```

Güncel 6.x paketi yeni planları varsayılan olarak v6 ile oluşturur. Mevcut planlar kayıtlı nesillerini korur; geçiş açık bir istek gerektirir.

### Skill ve alt skill'leri

Deep Work Plan skill'i, bir yönlendirici ile dokuz alt skill'den oluşur:

- **create** — bir hedefi yapılandırılmış bir plana ayrıştırır (`/dwp-create`).
- **execute** — bir planı görev görev çalıştırır, her kapıyı doğrular (`/dwp-execute`).
- **refine** — tamamlanmış işi korurken görev ekler, çıkarır veya yeniden sıralar (`/dwp-refine`).
- **resume** — durumu yeniden oluşturur ve kesintiye uğramış bir planı sürdürür (`/dwp-resume`).
- **status** — değişiklik yapmadan ilerlemeyi raporlar (`/dwp-status`).
- **verify** — depo ve plan uyumluluğunu nesnel olarak denetler (`/dwp-verify`).
- **onboard** — bir depoyu AI-first hâle getirir (`/deepworkplan-onboard`).
- **author** — deponun kendi skill'lerini, ajanlarını ve komutlarını oluşturur veya geliştirir (`/skill-create`, `/agent-create`).
- **upgrade** — yüklü bir skill'i güvenli biçimde yeni bir sürüme taşır (`/dwp-upgrade`).

### Komutlar

İnce eğik çizgi komutları, alt skill'lere ve eklentilere yetki devreder:

- `dwp-create`, `dwp-execute`, `dwp-refine`, `dwp-resume`, `dwp-status`, `dwp-verify` — plan-yürüt-doğrula döngüsü.
- `skill-create`, `agent-create` — author alt skill'ine yetki devreder.
- `lib-upgrade` — dependency-upgrade eklentisine yetki devreder (yalnızca o eklenti kabul edildiğinde kurulur).

### Adaptörler

Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Google Gemini, OpenCode, Windsurf, Cline, Antigravity, OpenClaw, Hermes ve bulut/arka plan ajanları (Claude Code uzak görevleri, Codex cloud, Jules-class) için ince, ajan başına entegrasyonlar. OpenClaw ve Hermes, kalp atışı veya cron zamanlamasıyla yönlendirilen gözetimsiz yürütme profili altında planları çalıştıran otonom ajan platformlarıdır.

### Onboarding hazır ayarları

Onboarding akışının dokümanları, skill'leri ve doğrulama komutlarını uyarlamak için kullandığı, yığına özgü akıl yürütme kılavuzları — asla şablonlar değil. Altı hazır ayar: Django, Vue + Vite, Astro/Svelte, Node/TS servisi, Python paketi/CLI ve genel bir yedek.

### Eklentiler (tercihe dayalı)

Onboarding akışının bir depoya katmanladığı yetenekler. Dördü isteğe bağlıdır ve asla AI-first temel hattının bir parçası değildir; AI Diff Reviewer yerel incelemesi 2.3.0 standardından itibaren gereklidir:

- **Devcontainer** — kalıcı AI-CLI kimlik doğrulaması içeren, yeniden üretilebilir, yalıtılmış bir geliştirme konteyneri.
- **Dailybot** — Dailybot kullanan ekipler için en iyi çabayla ilerleme ve dönüm noktası raporlaması.
- **Dependency upgrade** — paket yöneticisinden bağımsız, gruplanmış, doğrulanmış, geri alınabilir yükseltmeler.
- **Design system** — deponun gerçek tasarım kaynağından akıl yürütülen, arayüz kapsamlı bir `DESIGN.md` (`docs/DESIGN.md` konumunda, `AGENTS.md`'den başvurulan); görsel UI, stilize CLI çıktısı ve konuşma tabanlı mesajlaşma için profillerle; böylece ajanlar markaya uygun arayüz çıktısı üretir; bir tasarım sistemi saptandığında teklif zorunludur ama kurulum kabul ile sınırlıdır — görsel profil saptandığında güçlü biçimde önerilir, CLI ve konuşma profilleri saptandığında önerilir ve her zaman sorulur.
- **AI Diff Reviewer** — gerekli yerel inceleme: onboarding, [AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer) v3 + `.review/extension.md` kurar ve her Final Review'in güvenlik incelemesi onu çalıştırır; isteğe bağlı Flow B, aynı uzantıyı paylaşan bir CI PR birleştirme kapısı ekler — açıkça sunulur, istenmeden asla kurulmaz.

### Ekosistem

**Metodoloji tek başına çalışır. Eklentiler onu güçlendirir.** Her eklenti, Deep Work Plan skill'i içinde ince bir entegrasyon katmanıdır; kendi deposu, sürümü ve arayüz sürümü olan bir ürüne etiketle sabitlenir. Her ürün Deep Work Plan olmadan çalışır ve hiçbir eklenti zorunlu değildir.

- **Deep Work Plan skill'i** — Planları oluşturur, yürütür, doğrular, sürdürür ve iyileştirir. Hiçbir eklenti gerektirmez.
- **[herdr](/tr/kit/herdr)** — Herhangi bir makinede Herdr panellerindeki eşler: tek bir yetkili yanıtla etkileşimli devretme. Sabitlenen sürüm `herdr-peers@v0.1.0`.
- **[agentkit](/tr/kit/agentkit)** — Her terminal kodlama ajanı için tek bir ak komutu: bir worktree içinde başsız devretme. Sabitlenen sürüm `coding-agents-kit@v0.1.1`.
- **[devcontainer](/tr/kit/devcontainer)** — Kodlama ajanları olmadan sunulan bir Dev Containers şablonu ve temel imajlar. Sabitlenen sürüm `devcontainer-kit@v0.1.2`.
- **[vim](/tr/kit/vim)** — Salt okunur bir plan tarayıcısı ve bir Markdown görüntüleyicisi içeren terminal düzenleyicisi. Sabitlenen sürüm `deepworkplan-vim@v0.4.1`.

Eklenti kayıt defteri ve tanımlayıcılar, bir ön sürüm olan v7 betasında sunulur: `v7.0.0-beta.1`

### Örnekler

İşlenmiş, önce-sonra anlatımları.

- [Kite göz atın](/kit)
- [Hızlı başlangıç](/quickstart)
- [Örnekleri görün](/examples)
