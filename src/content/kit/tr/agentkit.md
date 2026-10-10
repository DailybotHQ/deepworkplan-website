---
title: Agentkit
description: "coding-agents-kit üzerine kurulu isteğe bağlı v7 eklentisi: her terminal kodlama agent'ı için tek ak komutu, kapatılabilir varsayılan özerklik ve başsız devir."
kind: addon
lang: tr
order: 8
---

# Agentkit eklentisi

Her terminal kodlama agent'ının bir oturumu sürdürmek için kendi bayrakları, ikinci bir hesabı ayrı tutmak için kendi yolu, kendi başsız (headless) modu ve izin istemlerini atlamak için kendi anahtarı vardır. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)**, hepsinin üzerine tek bir komut yüzeyi koyar: `ak <kind> [@profile]`.

Bu eklenti, kiti **DWP v7**'ye (paket `v7.1.4`) **başsız** devretme taşıması olarak entegre eder. İsteğe bağlıdır: o olmadan her görev, tıpkı önceden olduğu gibi mevcut oturumda çalışır. Kitin kendisi, Deep Work Plan olmadan da çalışan bir MIT ürünüdür.

## Kitin size sundukları

- **Her CLI için tek bir söz dizimi.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline` ve `ak grok`, ayrıca sağlayıcı varyantları (GLM, Azure, xAI), aynı oturum bayraklarıyla: `-c` sürdürür, `-r <id>` devam ettirir.
- **Profiller.** `ak claude @work`, ikinci bir hesabı birincisinden ayrı tutulan kendi ana dizininde çalıştırır.
- **Başsız çalıştırmalar.** `ak run <kind> -- "<prompt>"` tek bir istemi etkileşimsiz olarak çalıştırır ve belgelenmiş bir çıkış kodu döndürür; isteğe bağlı olarak tek bir JSON nesnesi biçiminde.
- **Bir doktor.** `ak doctor --json`, hangi CLI'ların kurulu olduğunu, profilleri ve ayarlanmış anahtarların adlarını raporlar — değerlerini asla.
- **Doğrulanmış kurulumlar.** `ak install <cli>`, eksik bir CLI'ı sağlayıcısının resmî kanalından sabitlenmiş bir sürümde kurar ve sabitlenmiş bir sha256 değerine ya da npm kayıt defterinin bütünlük bilgisine karşı doğrular.
- **Tanıdık adlar.** Siz açana kadar kapalı kalan iki takma ad ön ayarı: `classic` (`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`) ve `providers` (`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …); her biri bir `ak <kind>` komutudur.

## Kurulum

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Gereksinimler: macOS veya Linux üzerinde `bash` ve `python3` 3.9 veya daha yenisi; başka hiçbir şey. Windows `install.ps1` kullanır. `v0.3.0` sürümüne sabitleyin: `v0.2.0` ve `v0.2.1` desteklenmez. Bir sürümü `SHA256SUMS` varlığıyla doğrulayın.

| Öğe | Değer |
|---|---|
| Ürün | `DailybotHQ/coding-agents-kit`, `v0.3.0` etiketi, arayüz 1 |
| Kayıt defteri anahtarı | `.dwp/config.json` içinde `agentkit` |
| Taşıma | başsız: her delege için ayrılmış bir git worktree'de bir `ak run` |
| Sağladıkları | `subagents`, `cancel_children`, `model_routing` |
| Gerektirdiği | plan sözleşmesinin `agent_delegation` yetkisi |

## Varsayılan olarak özerklik, her zaman üstün gelen bir devre dışı bırakma seçeneğiyle

`v0.2.0` sürümünden bu yana `ak <kind>`, her agent'ı **özerk** olarak başlatır: CLI'ın yalnızca kitin `providers.toml` dosyasında tutulan kendi özerklik bayrağını ekler. Özerklik, bir geliştirme konteyneri gibi atılabilir ya da korumalı (sandbox) ortamlar için tasarlanmıştır.

**Devre dışı bırakma her zaman üstün gelir**: tek bir komutta `--ask` ya da ortamda veya kitin env dosyasında `AGENTKIT_PERMISSIONS=ask`, aynı komut `--auto` dese bile bayrağı bastırır. Devre dışı bırakılmış bir oturum, bu tercihi başlattığı agent'lara da aktarır. Bir ana makinede devre dışı bırakmayı ayarlayın.

Eklenti hiçbir özerklik bayrağı yazmaz ve asla `--auto` geçirmez. Bir plan devre dışı bırakmayı kaydettiğinde `--ask` geçirir. Bir ana makinede `agent_delegation` yetkisi veren bir plan, kendi worktree'leriyle sınırlı özerk delegeleri kabul eder; worktree bir korumalı alan değildir.

## Plana neler ekler

Sözleşmesi `agent_delegation` yetkisi veren bir v7 planında `execute`, `parallel_safe` bir görevi başka bir CLI'a devredebilir: ayrılmış bir git worktree oluşturur, orada bir zaman aşımıyla `ak run` çalıştırır ve sonucu planın `analysis_results/delegations/` dizinine toplar. Sonuç, planın kendi kapı çalıştırıcısı onu gözlemleyene kadar `asserted` kanıttır. Bir delegeyi iptal etmek, onun tüm süreç ağacını durdurur.

## Agentkit mi Herdr mı

| Durum | Kullanın |
|---|---|
| Bildirilmiş bir çıktısı olan, sınırları belirli `parallel_safe` bir görev | Agentkit (başsız) |
| Görev etkileşim gerektiriyor, uzun sürüyor ya da başka bir makinede bulunuyor | [Herdr](/kit/herdr) (bir bölmedeki eş) |

İkisi birlikte kullanılabilir: herdr-peers, bir bölmede `ak env <kind> @profile` komutunun yazdırdığı ortamla bir eş başlatabilir.

## Notlar

İsteğe bağlıdır ve hiçbir zaman zorunlu değildir. API anahtarı değerleri asla yazdırılmaz, günlüğe kaydedilmez ya da bir yapılandırma dosyasına yazılmaz; belgelenmiş istisna, anahtarını komut satırında alan Cline'dır. OpenCode, Pi, Cline ve Grok için sonuç çıkarma, sağlayıcı belgelerinden oluşturulmuştur ve henüz canlı hesaplara karşı denenmemiştir; bilinmeyen çıktı ham metne geri döner.
