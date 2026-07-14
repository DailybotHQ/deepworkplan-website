---
title: Eklentiler
description: "İsteğe bağlı DWP uzantıları: dört üretim eklentisi (devcontainer, Dailybot, dependency-upgrade, design-system), eklenti sözleşmesi ve kit kavramları (skill'ler, agent'lar, preset'ler, adapter'lar, örnekler)."
order: 5
lang: tr
section: Addons
---

# Eklentiler

**Sürüm 2.0.** Eklentiler, temel Deep Work Plan metodolojisine isteğe bağlı uzantılardır. **Uyumluluk için asla gerekli değildir** — sıfır eklentili bir depo tamamen AI-first ve DWP uyumludur. Her eklenti onboarding sırasında sunulur, açıkça kabul veya reddedilir ve — kabul edildiğinde — mevcut kurulumu ezmek yerine **uzlaştırır**.

## Eklenti sözleşmesi

Her üretim eklentisi dört zorunlu bileşen sunar:

| Bileşen | Amaç |
|-----------|---------|
| **Spec** | Eklentinin ne sağladığının ve "bu eklentiye uyumlu" olmanın ne anlama geldiğinin normatif RFC-2119 açıklaması |
| **Reasoning templates** | Agent'ın hedef deponun stack'i hakkında akıl yürüterek doldurduğu kılavuzlar — kopyala-yapıştır değil |
| **Onboarding hook** | Geliştirici kabul ettiğinde `onboard` akışının çağırdığı `SKILL.md` giriş noktası |
| **Validation step** | Eklentinin doğru uygulandığını doğrulayan kontrol listesi |

Keşif: `onboard` akışı `skills/deepworkplan/addons/` dizinini numaralandırır ve her eklentiyi temel iskeletten sonra **Faz 7b**'de opt-in adım olarak sunar.

## Üretim eklentileri (dört)

Bugün dört eklenti sunulmaktadır. Her birinin kullanıcıya yönelik ayrıntılı bir **kit katalog sayfası** ve Deep Work Plan skill'i içinde **normatif spec**'i vardır.

### Devcontainer (birinci eklenti)

Tespit edilen stack'ten akıl yürütülmüş compose tabanlı `.devcontainer/` + `docker/` kurulumu.

- **Kit sayfası:** [Devcontainer](/kit/devcontainer)
- **Ne ekler:** kalıcı AI-CLI auth volume'leri (Claude, Codex, Cursor, gh, Dailybot), `dailybot-project-network`, `DOCKER_DEV_ENV=vscode`, doğrulama alias'ları (`codecheck`, `check`, `fix`, `test`), halka açık OSS gizli bilgi hijyeni
- **Davranış:** ~%85 sabit iskelet; ~%15 stack'e göre akıl yürütülür. Mevcut devcontainer'lar uzlaştırılır, asla ezilmez
- **Ne zaman sunulur:** izole dev container'dan faydalanan Docker veya servisli çoğu depo

### Dailybot (ikinci eklenti)

Agent ilerleme görünürlüğü için geliştiricinin **Dailybot ekibine** opt-in bağlantı.

- **Kit sayfası:** [Dailybot](/kit/dailybot) — tam yetenek referansı
- **DWP eklentisinin bağladıkları:** dailybot `report` alt-skill'i ile dört plan yaşam döngüsü raporu (kickoff, significant task, blocked, completion); isteğe bağlı deterministik hook zorlaması (`dailybot hook`, CLI `>= 3.7.0`)
- **Eşleşen skill:** [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) kurulumu (şu an **3.10.3**) **14 yetenek** sunar — Slack/Teams/Discord/Google Chat sohbeti, check-in'ler, form authoring, ask AI, kudos, depo başına API anahtarları (`.dailybot/env.json`), e-posta ve daha fazlası. DWP eklentisi yalnızca **report**'u bağlar; diğer yetenekler doğrudan Dailybot skill üzerinden çağrılır
- **Auth:** tamamen Dailybot skill'e ertelenmiş (`dailybot login` veya `DAILYBOT_API_KEY`); bu eklenti asla kimlik bilgisi saklamaz
- **Vendor-neutral koruma:** temel DWP'nin Dailybot'a **sıfır** bağımlılığı vardır; herkes için otomatik kurmayın
- **Ne zaman sunulur:** geliştirici veya ekip zaten Dailybot kullanıyor veya açıkça ekip raporlaması istiyor

### Dependency upgrade (üçüncü eklenti)

Paket yöneticisinden bağımsız, toplu, doğrulanmış, geri alınabilir bağımlılık yükseltmeleri.

- **Kit sayfası:** [Dependency upgrade](/kit/dependency-upgrade)
- **Ne ekler:** deponun **gerçek** yöneticisini tespit eder (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, …), semver sınıflandırmalı batch'lerde yükseltir, her batch'ten sonra deponun validation gate'ini çalıştırır, başarısızlıkları geri alır, otomatik commit etmeden özetler
- **Komut:** yalnızca kabul edildiğinde `/lib-upgrade`'i `.agents/commands/` altına kurar
- **Ne zaman sunulur:** lockfile mevcut ve bağımlılık yoğun stack; yalnızca ilgili olduğunda öner

### Design system (dördüncü eklenti)

Tutarlı UI, CLI veya konuşma çıktısı için herhangi bir kodlama agent'ının okuduğu arayüz yüzeyi kapsamlı `DESIGN.md`.

- **Kit sayfası:** [Design system](/kit/design-system)
- **Ne ekler:** `docs/DESIGN.md` (`AGENTS.md`'den referanslanır), tek dosyada üst üste en fazla üç **profil**: **visual-ui** (render edilmiş UI token'ları ve bileşenleri), **cli-output** (anlamsal terminal stilleri, TTY/`NO_COLOR` degradasyonu), **conversational** (ses, mesaj anatomisi, düz metin fallback'li platform başına render)
- **Profil gücü:** visual-ui **tespit edildiğinde varsayılan açık**; cli-output ve conversational **tespit edildiğinde önerilir, her zaman sorulur, asla otomatik uygulanmaz**
- **Ne zaman sunulur:** yalnızca kullanıcıya yönelik arayüz yüzeyi tespit edildiğinde — saf kütüphaneler, headless servisler veya yalnızca altyapı depoları için değil

## Skill'ler

Skill'ler adıyla çağrılan yeniden kullanılabilir prosedürlerdir. Bir skill tekrarlanabilir bir iş akışını paketler (test çalıştırma, lint düzeltme, bileşen oluşturma).

Metodoloji küçük bir temel alt-skill seti sunar. Bunlar arasında **author** alt-skill'i bir deponun **kendi kit'ini büyütmesini** sağlar: `/skill-create` ve `/agent-create` ile çağrılır, deponun mevcut `.agents/` düzenini ve kurallarını akıl yürütür, ardından bunlara uyan yeni bir skill, agent veya ince komut delegatörü yazar ve kataloğu senkron tutar. Aynı alt-skill zorunlu Skills & Agents Discovery görevini yürütür.

Kit girişi: [Skill create](/kit/skill-create), [Agent create](/kit/agent-create).

## Agent'lar

Agent'lar tanımlı bir role sahip uzmanlaşmış çalışanlardır (reviewer, executor, architect). `.agents/agents/` altında yaşar ve `.agents/docs/` içinde kataloglanır.

## Bakım eklentileri

Yukarıdaki **dependency-upgrade** eklentisi birincil bakım eklentisidir. npm varsaymak yerine deponun gerçek paket yöneticisi hakkında akıl yürütür, yükseltmeleri semver'e göre sınıflandırır, güvenli batch'lerde yükseltir, her batch'ten sonra doğrulama çalıştırır ve başarısız olan batch'i geri alır.

## Design-system eklentisi

Üretim eklentileri altında [Design system](/kit/design-system)'e bakın. Depo düzeyindeki `DESIGN.md`, özellik başına teknik tasarım belgesinden farklıdır: DWP plan README'si, görev kabul kriterleri ve validation gate'leri özellik başına tasarımı zaten kapsar. Design-system eklentisi kalıcı, depo-yerel **arayüz** tasarım bağlamını doldurur.

## Preset'ler

Preset'ler DWP'yi belirli bir teknoloji stack'ine uyarlar (Django, React, Go, Astro + Svelte ve daha fazlası). [Kit kataloğuna](/kit) göz atın.

## Adapter'lar

Adapter'lar DWP komutlarını belirli bir agent'ın komut sistemine eşler (Claude Code, Cursor, Codex, Gemini, Copilot, OpenClaw ve diğerleri). Adapter girişleri kit'te her agent adının altında bulunur.

## Örnekler

Örnekler DWP'yi uygulamada gösterir: önce/sonra karşılaştırmaları, örnek planlar, vaka çalışmaları. [Examples](/examples) ve [Dogfood this site](/kit/dogfood-this-site)'e bakın.

## Uyumluluk hatırlatması

Bir depo **sıfır** eklentiyle tamamen uyumlu **OLMALIDIR**. Eklentiler katmanlı opt-in yeteneklerdir — asla ön koşul değildir. [Conformance](/spec/conformance)'a bakın.
