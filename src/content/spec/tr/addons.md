---
title: Eklentiler
description: "DWP eklentileri: yedi isteğe bağlı uzantı, gerekli AI Diff Reviewer yerel incelemesi ve isteğe bağlı CI yüzeyi, eklenti sözleşmesi ve kit kavramları."
order: 6
lang: tr
section: Addons
---

# Eklentiler

> **Sürüm kapsamı:** Bu belge, korunan bir v5.0.0 temel belgesidir. Güncel standart DWP 7.0.0, [şartname dizininde](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/skills/deepworkplan/spec/README.md) listelenen geçerli `V6_*.md` ve `V7_*.md` uzantılarını da gerektirir. Mevcut v5 ve v6 planları kayıtlı kurallarını korur.

**Sürüm 2.1.0.** Eklentiler, temel Deep Work Plan metodolojisine uzantılardır. Sekizin yedisi isteğe bağlıdır ve **uyumluluk için asla gerekli değildir** — sıfır isteğe bağlı eklentili bir depo tamamen AI-first ve DWP uyumludur. Her isteğe bağlı eklenti onboarding sırasında sunulur, açıkça kabul veya reddedilir ve — kabul edildiğinde — mevcut kurulumu ezmek yerine **uzlaştırır**. Bir bileşen beyan edilen istisnadır: 2.3.0 standardından itibaren **AI Diff Reviewer yerel incelemesi** gerekli temelin bir parçasıdır — onboarding onu kurar ve her Final Review onu çalıştırır — CI yüzeyi ise isteğe bağlı kalır.

## Eklenti sözleşmesi

Her üretim eklentisi dört zorunlu bileşen sunar:

| Bileşen | Amaç |
|-----------|---------|
| **Spec** | Eklentinin ne sağladığının ve "bu eklentiye uyumlu" olmanın ne anlama geldiğinin normatif RFC-2119 açıklaması |
| **Reasoning templates** | Agent'ın hedef deponun stack'i hakkında akıl yürüterek doldurduğu kılavuzlar — kopyala-yapıştır değil |
| **Onboarding hook** | Geliştirici kabul ettiğinde `onboard` akışının çağırdığı `SKILL.md` giriş noktası |
| **Validation step** | Eklentinin doğru uygulandığını doğrulayan kontrol listesi |

Keşif: `onboard` akışı `skills/deepworkplan/addons/` dizinini numaralandırır ve her eklentiyi temel iskeletten sonra **Faz 7b**'de opt-in adım olarak sunar.

## Üretim eklentileri (sekiz)

Bugün sekiz eklenti sunulmaktadır — yedi opt-in artı gerekli yerel inceleme. Her birinin kullanıcıya yönelik ayrıntılı bir **kit katalog sayfası** ve Deep Work Plan skill'i içinde **normatif spec**'i vardır. Bunlardan dördü — devcontainer, Herdr, DeepWorkPlan Vim ve Agentkit — kendi deposu ve sürüm döngüsü olan bir ürüne etiketle sabitlenmiş ince entegrasyon katmanlarıdır; her ürün Deep Work Plan olmadan çalışır. Kabul edilen bir eklenti `.dwp/config.json` eklenti kaydına (DWP 7.0.0) yazılır; bu kayıt yalnızca sunabilir veya güçlendirebilir — uyumluluğu ya da bir planı asla koşula bağlamaz.

### Devcontainer (birinci eklenti)

[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit) (`dck`, `v0.2.2` sürümüne sabitlenmiş, arayüz `2`) için ince bir entegratör: `dck init` komutunun depoya, deponun kendi container'ı olarak oluşturduğu bir Dev Containers şablonu ve `dck-dockerfile` skill'i.

- **Kit sayfası:** [Devcontainer](/kit/devcontainer)
- **Ne ekler:** çalışma zamanının digest ile sabitlenmiş resmi imajından üretilen `docker/local/<service>/Dockerfile` (`python-3.13`, `node-24` veya `debian`, paylaşılan temel imaj yok), `dck` başlatıcısı (`up`, `shell`, `rebuild`, `doctor`) üzerine kurulu `dev.sh`, opt-in bir katman olarak kodlama agent'ları, yalnızca loopback portları, içeride hiçbir anahtar olmadan host'un agent'ı üzerinden SSH ile git ve standart düzene sahip container başına Herdr makineleri
- **Davranış:** `dck doctor --json` (arayüz 2) ile tespit edilir; `dck init` mevcut bir devcontainer'ı yalnızca diff'i kabul edildikten sonra uzlaştırır ve önce dosyanın yedeğini alır — asla ezilmez
- **Ne zaman sunulur:** izole dev container'dan faydalanan Docker veya servisli çoğu depo

### Dailybot (ikinci eklenti)

Agent ilerleme görünürlüğü için geliştiricinin **Dailybot ekibine** opt-in bağlantı.

- **Kit sayfası:** [Dailybot](/kit/dailybot) — tam yetenek referansı
- **DWP eklentisinin bağladıkları:** dailybot `report` alt-skill'i ile dört plan yaşam döngüsü raporu (kickoff, significant task, blocked, completion); isteğe bağlı deterministik hook zorlaması (`dailybot hook`, CLI `>= 3.9.0`)
- **Eşleşen skill:** [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) kurulumu (şu an **3.23.3**) **17 yetenek** sunar — Slack/Teams/Discord/Google Chat sohbeti, check-in'ler, form authoring, ask AI, kudos, Plan panoları ve görevleri, organizasyon etiketleri, depo başına API anahtarları (`.dailybot/env.json`), e-posta ve daha fazlası. DWP eklentisi yalnızca **report**'u bağlar; diğer yetenekler doğrudan Dailybot skill üzerinden çağrılır
- **Auth:** tamamen Dailybot skill'e ertelenmiş (`dailybot login` veya `DAILYBOT_API_KEY`); bu eklenti asla kimlik bilgisi saklamaz
- **Vendor-neutral koruma:** temel DWP'nin Dailybot'a **sıfır** bağımlılığı vardır; herkes için otomatik kurmayın
- **Ne zaman sunulur:** geliştirici veya ekip zaten Dailybot kullanıyor veya açıkça ekip raporlaması istiyor

### Dependency upgrade (üçüncü eklenti)

Paket yöneticisinden bağımsız, toplu, doğrulanmış, geri alınabilir bağımlılık yükseltmeleri.

- **Kit sayfası:** [Dependency upgrade](/kit/dependency-upgrade)
- **Ne ekler:** deponun **gerçek** yöneticisini tespit eder (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, …), semver sınıflandırmalı batch'lerde yükseltir, her batch'ten sonra deponun validation gate'ini çalıştırır, başarısızlıkları geri alır, otomatik commit etmeden özetler
- **Komut:** yalnızca kabul edildiğinde `/lib-upgrade`'i `.agents/commands/` altına kurar
- **Ne zaman sunulur:** bildirilmiş bağımlılığı olan her depo için sunulur; atıl `/lib-upgrade` delege komutu, açıkça reddedilmedikçe onboarding onayı altında kurulur — bir kurulum hiçbir yükseltme çalıştırmaz

### Design system (dördüncü eklenti)

Tutarlı UI, CLI veya konuşma çıktısı için herhangi bir kodlama agent'ının okuduğu arayüz yüzeyi kapsamlı `DESIGN.md`.

- **Kit sayfası:** [Design system](/kit/design-system)
- **Ne ekler:** `docs/DESIGN.md` (`AGENTS.md`'den referanslanır), tek dosyada üst üste en fazla üç **profil**: **visual-ui** (render edilmiş UI token'ları ve bileşenleri), **cli-output** (anlamsal terminal stilleri, TTY/`NO_COLOR` degradasyonu), **conversational** (ses, mesaj anatomisi, düz metin fallback'li platform başına render)
- **Profil gücü:** tespit, teklifi zorunlu kılar; kurulum kabul ile sınırlıdır — hem güdümlü modda hem güven modunda — visual-ui **saptandığında güçlü biçimde önerilir**; cli-output ve conversational **tespit edildiğinde önerilir, her zaman sorulur, asla otomatik uygulanmaz**
- **Ne zaman sunulur:** yalnızca kullanıcıya yönelik arayüz yüzeyi tespit edildiğinde — saf kütüphaneler, headless servisler veya yalnızca altyapı depoları için değil

### AI Diff Reviewer (beşinci eklenti — gerekli yerel inceleme, isteğe bağlı CI yüzeyi)

**[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (marketplace **"AI Diff Reviewer"**), zorunlu Final Review güvenlik incelemesine yapılandırılmış bir yerel inceleme kazandırır ve isteğe bağlı olarak CI'da pull request'leri kapı altına alır. 2.3.0 standardından itibaren **yerel inceleme temelin bir parçasıdır**; yalnızca CI yüzeyi isteğe bağlıdır. Bu eklenti her yayında otomatik olarak güncellenir; bu yüzden aşağıda gösterilen etiket yazım anındaki geçerli etikettir ve vendored edilmiş kopyanın gerisinde kalabilir — gerçekte kurulu olan etiket için eklentinin kendi `SKILL.md`'si ve GitHub sürümleri esastır. Kurulum her zaman yayımlanmış bir etikete sabitlenir, asla hareketli bir dala değil.

- **Kit sayfası:** [AI Diff Reviewer](/kit/ai-diff-reviewer) — tam yetenek referansı
- **Onboarding'de gerekli (Faz 7a):** vendored skill'in etikete sabitlenmiş kurulumu (`npx --yes skills add https://github.com/DailybotHQ/ai-diff-reviewer/tree/v3.3.0 --skill ai-diff-reviewer -y`) artı depoya uyarlanmış bir `.review/extension.md` (`generate-extension` aracılığıyla), onboarding onayı altında; hedeflenmiş bir harness yükseltmesi her ikisini de eksik olduğunda uzlaştırır; bir reddediş, beyan edilmiş bir istisna olarak kaydedilir ve kurulana kadar `verify` tarafından raporlanır
- **Her Final Review'da gerekli:** güvenlik incelemesi, upstream üst varsayılan akışını birikmiş değişiklik kümesi üzerinde çalıştırır ve çıktısını plana yerel `analysis_results/SECURITY_REVIEW.md` dosyasına (planın kendi klasörü içinde, asla depo kökünde değil) ekler; eksik bir skill veya uzantı, kaydedilmiş bir `local reviewer not installed` bulgusudur — asla sessiz bir atlama değildir ve asla sürpriz bir önyükleme değil: kurulum, onboarding onayına veya açık bir addon çağrısına aittir; tamamlanmış bir geçişten gelen **doğrulanmış kritik bulgular**, düzeltilene veya açıkça kabul edilene kadar tamamlanmayı bloke eder (v3, BC-07 — doğrulanmamış kritik iddialar ek açıklamalı uyarı olarak gelir ve bir `incomplete`/`timeout` incelemesi temiz bir geçiş değildir, BC-04)
- **İsteğe bağlı CI yüzeyi (Flow B):** upstream `setup` alt-skill'i aracılığıyla `pr-review.yml` (`DailybotHQ/ai-diff-reviewer@v3`), artı geliştirici tarafından çağrılabilir kolaylıklar olarak `apply-review` (salt okunur) ve `address-review` (commit yapar, push eder ve yeniden kurar; v3.1.1'de yeni) — açıkça sunulur, istenmeden asla kurulmaz, asla varsayılan değildir, asla bir plan görevi değildir
- **Asla bloke etmeme (yalnızca çağrı):** başlayabilen ama hata veren bir yerel inceleme bir kez uyarır, kaydedilir ve devam edilir; görevi asla başarısız kılmaz
- **Eşlik (Flow B):** paylaşılan `prompt.md` + uzantı metodoloji/önem derecesini hizalar; CI Yineleme Farkındalıklı İnceleme, yerel geçiş tam kalırken 2.+ turları kısaltabilir
- **Sağlayıcıdan bağımsız güvence:** hiçbir Deep Work Plan akışı ticari bir servis, CI sağlayıcısı veya sır gerektirmez — inceleyici, geliştiricinin kendi kodlama agent'ı tarafından çalıştırılan MIT lisanslı, etikete sabitlenmiş bir skill'dir
- **Uyumluluk:** `verify`, eksik bir yerel inceleyiciyi 2.3.0 veya daha yeni bir standart beyan eden depolar için bir başarısızlık olarak, eski depolar için ise bir harness-sürüm bulgusu olarak raporlar

### Herdr (altıncı eklenti)

v7 planlarının **etkileşimli** devretme taşıyıcısı: [herdr-peers](https://github.com/DailybotHQ/herdr-peers) (sabitlenmiş `v0.1.0`, protokol `1`) için ince bir entegrasyon katmanı.

- **Kit sayfası:** [Herdr](/kit/herdr)
- **Ne ekler:** bir plan, sınırlı bir görevi aynı makinede veya Herdr'ın SSH üzerinden ulaştığı bir makinede, başka bir [Herdr](https://herdr.dev) panelindeki bir kodlama agent'ına devredebilir ve onun tek yetkili yanıtını journal'a kaydedebilir
- **Davranış:** eşler arası protokol (damga, yetki, yanıt, döngü koruması, derinlik ve yayılım sınırları) pakette değil, herdr-peers içinde yaşar; her kullanım `agent_delegation` sözleşme yetkisini gerektirir ve bir delegenin sonucu, planın kendi çalıştırıcısı onu gözlemleyene kadar bir iddia olarak kalır
- **Ne zaman sunulur:** Faz 7b sırasında açık opt-in; `herdr` ve `herdr-peers` için salt okunur tespit; taşıyıcı yalnızca bir Herdr oturumu içinde kullanılabilir

### DeepWorkPlan Vim (yedinci eklenti)

Deep Work Plan için terminal düzenleyicisi (Neovim 0.12+): [DeepWorkPlan Vim](https://github.com/DailybotHQ/deepworkplan-vim) (sabitlenmiş `v0.5.1`, arayüz `1`) için ince bir entegrasyon katmanı.

- **Kit sayfası:** [DeepWorkPlan Vim](/kit/vim)
- **Ne ekler:** agent'lar ve insanlar için isteğe bağlı, makine düzeyinde bir düzenleyici yüzeyi — üretilmiş bir komut dizini, salt okunur bir plan tarayıcısı ve bir Markdown görüntüleyicisi; her iddia ürünün sabitlenmiş, makine tarafından okunabilir yüzeyinden okunur
- **Davranış:** mevcut bir Neovim yapılandırmasının üzerine açık onay olmadan asla yazılmaz; tespit salt okunurdur
- **Ne zaman sunulur:** Faz 7b sırasında açık opt-in; Neovim 0.12+ eksik olduğunda yalnızca bilgilendirme amaçlı

### Agentkit (sekizinci eklenti)

v7 planlarının **arayüzsüz (headless)** devretme taşıyıcısı: [coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit) (`ak`, sabitlenmiş `v0.3.0`, arayüz `1`) için ince bir entegrasyon katmanı.

- **Kit sayfası:** [Agentkit](/kit/agentkit)
- **Ne ekler:** terminal kodlama agent'ları üzerinde tek bir `ak` komut yüzeyi; sınırlı bir plan görevini arayüzsüz çalıştırmak için kullanılır; `subagents`, `cancel_children` ve `model_routing` yeteneklerini yalnızca çalışma zamanında, etkinleştirildiğinde, tespit edildiğinde ve uyumlu bir arayüz üzerinde olduğunda sağlar
- **Davranış:** her kullanım `agent_delegation` sözleşme yetkisini gerektirir; kit agent'ları varsayılan olarak otonom modda başlatır ve vazgeçme seçeneği (`--ask` veya `AGENTKIT_PERMISSIONS=ask`) her zaman önceliklidir — eklenti hiçbir otonomi bayrağı yazmaz, plan vazgeçmeyi kaydettiğinde ve salt okunur delegeler için her zaman `--ask` iletir; kodlama agent'ı CLI'larını asla kendi başına kurmaz ve sağlayıcı anahtar değerlerini asla okumaz
- **Ne zaman sunulur:** Faz 7b sırasında açık opt-in; `ak doctor --json` ile salt okunur tespit

## Skill'ler

Skill'ler adıyla çağrılan yeniden kullanılabilir prosedürlerdir. Bir skill tekrarlanabilir bir iş akışını paketler (test çalıştırma, lint düzeltme, bileşen oluşturma).

Metodoloji küçük bir temel alt-skill seti sunar. Bunlar arasında **author** alt-skill'i bir deponun **kendi kit'ini büyütmesini** sağlar: `/skill-create` ve `/agent-create` ile çağrılır, deponun mevcut `.agents/` düzenini ve kurallarını akıl yürütür, ardından bunlara uyan yeni bir skill, agent veya ince komut delegatörü yazar ve kataloğu senkron tutar. Aynı alt-skill Final Review'in skills uzlaştırma geçişini destekler.

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
