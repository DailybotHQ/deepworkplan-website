---
title: Dailybot
description: "Opt-in DWP eklentisi: plan yaşam döngüsünü bir Dailybot ekibine bağlar, isteğe bağlı hook zorlaması ve tam Dailybot agent skill 3.10.3 (sohbet, check-in'ler, formlar, ask AI ve daha fazlası)."
kind: addon
lang: tr
order: 2
---

# Dailybot eklentisi

Deep Work Plan yürütmesini bir **Dailybot ekibine** bağlayın; böylece insanlar agent'ların ne inşa ettiğini görür — kickoff, plan ortası ilerleme, engeller ve tamamlanma — toplantı veya ikinci bir toolchain eklemeden. Zaten [Dailybot](https://www.dailybot.com) kullanan ekipler için **opt-in** bir eklenti.

Temel Deep Work Plan metodolojisinin Dailybot'a **sıfır** bağımlılığı vardır. Sıfır eklentili bir depo tamamen uyumludur. Bu eklentiyi yalnızca geliştirici veya ekip zaten Dailybot kullanıyorsa önerin; herkes için otomatik kurmayın.

## Ne zaman kullanılır

| Sinyal | Eylem |
|--------|--------|
| Ekip zaten Dailybot kullanıyor (Slack, Teams, Discord, Google Chat veya dashboard) | Onboarding sırasında **öner** |
| Geliştirici agent ilerleme görünürlüğü veya standup tarzı güncellemeler istiyor | Eklentiyi **sun** |
| Dailybot hesabı olmayan greenfield depo | **Atla** — vendor-neutral temel yeterli |
| İlerlemenin depodan çıkmaması gereken NDA altındaki müşteri işi | **Atla** veya yerel kill-switch olarak `.dailybot/disabled` commit'le |

## Bu eklentinin bağladıkları (kasıtlı olarak dar)

DWP Dailybot eklentisi Dailybot'u **yeniden icat etmez**. Plan yürütmesini dailybot **`report`** alt-skill'ine bağlar ve isteğe bağlı olarak harness hook'larını commit'ler. Geri kalan her şey — kurulum, onay, kimlik doğrulama, yazım stili — resmi [Dailybot agent skill](https://github.com/DailybotHQ/agent-skill)'e (şu an **3.10.3**) **ertelenir**.

### Dört yaşam döngüsü olayı

DWP `create` / `execute` sırasında eklenti **dört best-effort agent güncellemesi** bağlar. Her olay koşulludur (Dailybot mevcut ve kimlik doğrulanmış), engelleyici değildir ve `.dailybot/disabled`'a saygı gösterir.

| Olay | Tetikleyici | Seviye | Gereksinim |
|-------|---------|-------|-------------|
| **Kickoff** | Plan somutlaştırıldı ve onaylandı veya ilk `execute` turu | regular | SHOULD |
| **Significant task** | Bir özellik, hata düzeltmesi veya büyük refactor tamamlandı — kurulum işleri değil | regular | MAY |
| **Blocked** | Plan durur; `state.json.blocked` dolduruldu (`reason`, `needs`) | regular + blockers | SHOULD |
| **Completion** | Tüm görevler bitti; plan tamamlandı | **milestone** | SHOULD |

Payload'lar mevcut olduğunda planın durum katmanından (`state.json`) türetilir: `completed` sonuçlar olarak (görev numaraları değil), `in_progress` mevcut görevden, `blockers` `state.json.blocked`'dan. Mesaj **ne inşa edildiğini ve nedenini** açıklar — asla dosya yolları, git istatistikleri, branch adları veya plan ID'leri değil.

### İsteğe bağlı hook zorlaması

`dailybot-cli >= 3.7.0` ile eklenti depo düzeyinde harness hook'larını (`dailybot hook session-start | activity | post-commit | stop | dismiss`) yerel depo başına ledger ile destekleyerek **commit edebilir**. Harness, bir yaşam döngüsü olayı kaçırıldığında tur sonunda agent'ı hatırlatır — prompt talimatlarının zayıfladığı uzun gözetimsiz oturumlar için kritik.

Başarılı bir yaşam döngüsü raporu hook ledger'ını **sıfırlar**, böylece iki katman asla çift rapor vermez. Hook komutları yalnızca yerel durumu okur ve her zaman `0` ile çıkar.

### Depo kimliği ve rapor politikası

İsteğe bağlı olarak `.dailybot/profile.json` (veya şablon olarak `.dailybot_example/profile.json`) commit'leyin; böylece her katkıda bulunan ve agent raporları aynı şekilde imzalar. O dosyaya **asla** kimlik bilgisi koymayın — `key` alanı ciddi bir hatadır.

Aynı dosya hook'ların uyduğu rapor politikasını taşıyabilir:

```json
{
  "name": "my-repo-agent",
  "report": {
    "min_interval_minutes": 30,
    "nudge": true,
    "mode": "continuous"
  }
}
```

`"mode": "continuous"` özellikle araştırma veya dokümantasyon ağırlıklı depolar için kullanışlıdır: commit'siz çalışma (analiz, tasarım dokümanları, planlar) daha erken hatırlatılır.

## Kurulum (hepsi opt-in)

Eklenti kurulum yollarını **sunar**; Dailybot skill onay ve doğrulamayı yönetir.

| Bileşen | Komut / yol |
|-----------|----------------|
| **Dailybot agent skill** (önerilen) | `npx skills add DailybotHQ/agent-skill` |
| **Mevcut skill'i güncelle** | `npx skills update dailybot` |
| **OpenClaw** | `openclaw skills install dailybot` |
| **Git clone** | `git clone https://github.com/DailybotHQ/agent-skill.git` + `./setup.sh` |
| **Dailybot CLI** (minimum `>= 3.7.0`) | İlk kullanımda skill tarafından doğrulanmış `shared/auth.md` ile kurulur; veya `pip install 'dailybot-cli>=3.7.0'`, Homebrew veya [cli.dailybot.com](https://cli.dailybot.com)'daki checksum doğrulanmış yükleyici |

Sürümleri kontrol et: `dailybot --version` ve `dailybot version --check`. Yükseltme: `dailybot upgrade`.

## Kimlik doğrulama — ertelenmiş

Bu eklenti **asla** e-posta, OTP veya API anahtarı istemez ve kimlik bilgilerini **saklamaz**. Kimlik doğrulama Dailybot skill'in [`shared/auth.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/shared/auth.md) dosyasına aittir:

- `dailybot login` (e-posta OTP) veya
- `DAILYBOT_API_KEY` / `dailybot config key=...` veya
- opt-in, gitignore'lanmış bir `.dailybot/env.json` depo başına anahtar dosyası (`dailybot env add/use`, CLI `>= 3.7.0`); böylece bir geliştirici farklı depolarda farklı org'larda oturum açmış olabilir.

Kimlik doğrulama çözümü **Bearer-first**'tür: bir oturum token'ı önceliklidir ve `401`/`403` durumunda şeffaf bir Bearer→API-anahtarı yeniden denemesiyle eski bir token asla geçerli bir anahtarı engellemez. Kimlik doğrulama reddedilirse veya kullanılamazsa raporlama sessizce atlanır — çalışma devam eder.

## Eşleşen Dailybot skill — 14 yetenek (3.10.3)

Dailybot agent skill kurmak, DWP eklentisinin bağladığından çok daha fazlasını getirir. Resmi skill paketi (skill **3.10.3**, CLI baseline **>= 3.7.0**, güncel yayın **3.7.3**) **14 koordineli alt-skill** sunar:

| Alt-skill | Ne yapar |
|-----------|--------------|
| **Progress reports** | Dailybot dashboard'a standup tarzı agent güncellemeleri |
| **Ask the AI** | Dailybot AI asistanına tek seferlik headless sorgular |
| **Message polling** | Oturum başında veya boştayken ekip talimatlarını kontrol et |
| **Email** | Zorunlu gönderim öncesi güvenlik kontrolleriyle e-posta gönder |
| **Chat** | Slack, Microsoft Teams, Discord veya Google Chat'te gönder veya düzenle — kanallar, DM'ler, ekipler, rapor tarzı thread'ler, send-as-user (Slack, admin) |
| **Conversations** | Bot ve adı geçen ekip arkadaşlarıyla Slack grup DM'i aç veya yeniden kullan; aynı çağrıda rapor yayınla |
| **Health and status** | Uzun süren oturumlar için agent çevrimiçi/çevrimdışı duyur |
| **Check-ins** | Standup'ları tamamla; check-in'leri **author** et (zamanlama, katılımcılar, sorular, hatırlatıcılar, AI ayarları) |
| **Kudos** | Ekip arkadaşlarını veya tüm ekipleri tanı; tanınma akışı, org akışı, wall of fame'e göz at |
| **Teams** | Ekipleri listele, üyeleri incele, adları UUID'lere çöz; `me`, `org`, kullanıcı profilleri |
| **Forms** | Listele (artık varsayılan olarak **org kapsamlı**, daraltmak için `--mine` ve `--owner`), gönder, güncelle, geçiş yap; formları **author** et (workflow durumları, izinler, ChatOps); sayfalama, arama ve tarih filtreleri |
| **Workflows** | Org workflow'larını oku (`workflow list` / `workflow get`; salt okunur) |
| **Report channels** | Formlar veya check-in'ler için kanal UUID'lerini keşfet |
| **Per-repo API keys** | `.dailybot/env.json`'ı yönet — ortam başına API anahtarları + URL'lerden oluşan opt-in, gitignore'lanmış bir dosya (`dailybot env add / use / show / list / remove / off / on`, CLI `>= 3.7.0`) |

**DWP eklentisi yalnızca `report`'u plan yürütmesine bağlar.** Geri kalan her şey için Dailybot skill'i doğrudan çağırın — örneğin `#releases`'e deploy özeti gönderin, standup tamamlayın veya Dailybot AI'dan check-in trendlerini özetlemesini isteyin.

Halka açık referans: [dailybot.com/skill.md](https://www.dailybot.com/skill.md). Kaynak: [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill). Güven modeli: skill paketindeki [`TRUST.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/TRUST.md).

## Davranış — ertele, asla engelleme

| Kural | Ayrıntı |
|------|--------|
| **Ertele** | Dailybot skill kurulum, onay, auth, hook şablonları, yazım stilini yönetir |
| **Asla engelleme** | CLI yok, auth başarısız, ağ hatası → bir kez uyar, birincil çalışmaya devam et |
| **Yeniden deneme yok** | Tanı döngülerine girme; raporlama best-effort'tur |
| **Uzlaştır** | Mevcut skill, CLI, profile, hook'lar veya rapor bağlantısı korunur — yalnızca boşluklar doldurulur |
| **Vendor-neutral** | DWP Dailybot gerektirmez; bu eklenti ek ekip görünürlüğüdür |

## Onboarding akışı

DWP `onboard` sırasında **Faz 7b**'de, temel AI-first iskeletinden sonra akış beş opt-in eklenti sunar. Geliştirici Dailybot'u kabul ederse:

1. Mevcut kurulumu tespit et (skill, CLI, `.dailybot/profile.json`, hook'lar, rapor adımı).
2. Dailybot onay akışlarıyla skill/CLI kurulumu sun.
3. Kimlik doğrulamayı `shared/auth.md`'ye ertele.
4. Dört yaşam döngüsü olayını `AGENTS.md` / `docs/AI_AGENT_COLLAB.md`'ye bağla.
5. İsteğe bağlı olarak hook zorlaması ve `.dailybot/profile.json` sun.
6. Doğrulamayı çalıştır (skill'in `addons/dailybot/SPEC.md` dosyasında SPEC §8).

Deep Work Plan skill'inde normatif sözleşme: `addons/dailybot/SPEC.md` (sürüm **2.3.0**).

## İlgili kit girişleri

- [Devcontainer](/kit/devcontainer) — Dailybot CLI kalıcılığıyla tekrarlanabilir geliştirme ortamı (birinci eklenti)
- [Dependency upgrade](/kit/dependency-upgrade) — toplu, doğrulanmış bağımlılık yükseltmeleri (üçüncü eklenti)
- [Design system](/kit/design-system) — arayüz yüzeyleri için agent odaklı `DESIGN.md` (dördüncü eklenti)
- [Deep Work Plan onboard](/kit/deepworkplan-onboard) — eklentileri sunan onboarding alt-skill'i
