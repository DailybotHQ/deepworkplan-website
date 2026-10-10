---
title: Devcontainer
description: "devcontainer-kit tabanlı isteğe bağlı eklenti: tek şablondan her deponun kendi konteyneri, ak ile agent'lar, iki yönlü Herdr, içeride SSH anahtarı yok."
kind: addon
lang: tr
order: 1
---

# Devcontainer eklentisi

Depoya yeniden üretilebilir, yalıtılmış bir geliştirme konteyneri verin — insanların, editörlerin ve kodlama agent'larının hep birlikte kullanabileceği bir konteyner. **DWP v7**'de (paket `v7.1.0`) bu eklenti, Deep Work Plan olmadan da çalışan bir MIT ürünü olan **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**'i entegre eder. İsteğe bağlıdır: bir depo onsuz da tümüyle uyumludur.

## devcontainer-kit'in sağladıkları

- [Dev Containers](https://containers.dev) spesifikasyonu üzerine kurulu, `dck init` komutunun depoya tek bir sabit düzende oluşturduğu **bir şablon**: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` ve `dev.sh`. Daha sonra yeniden çalıştırıldığında uzlaştırır ve düzenlemelerinizin üzerine asla yazmaz; var olan bir dosyadaki her değişiklik önce gösterilir ve onay gerektirir.
- **Deponun kendi konteyneri.** Dockerfile, çalışma ortamının özetle (digest) sabitlenmiş resmî imajından başlar — `node-24`, `python-3.13` ya da `debian` — ve kitin derleme adımlarını `docker/local/<service>/dck/` dizinine kopyalar. Ortak bir temel imaj kullanılmaz.
- **`dev.sh` ve `dck`.** `bash dev.sh up`, konteyneri düz bir terminalden derler, başlatır ve ona bağlanır; `shell`, `rebuild`, `doctor` ve diğerleri VS Code veya Cursor ile ya da onlar olmadan çalışır.
- **İki yönlü Herdr.** Ana makinedeki [Herdr](https://herdr.dev), her konteyneri yalnızca loopback üzerinde dinleyen bir SSH sunucusu aracılığıyla bir makine olarak bağlar; konteyner de standart kenar çubuğuyla açılır: Home, Editor, Development ve Agents. İçeride [herdr-peers](/kit/herdr), agent'ların ana makinedeki ve diğer konteynerlerdeki agent'lara soru sormasını sağlar.
- **`dck-dockerfile` becerisi.** Bir agent, istek üzerine bir deponun konteynerini oluşturur ya da yeniden üretir ve bunu gerçek bir derlemeyle kanıtlar.

## Kurulum

```bash
git clone --branch v0.2.1 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Gereksinimler: Linux veya macOS ana makinesinde `bash` 3.2 veya daha yenisi ve `python3` 3.11 veya daha yenisi; konteyner komutları için de Compose v2 ile Docker. Bir sürümü `SHA256SUMS` varlığıyla doğrulayın. `v0.2.1` sürümüne sabitleyin: `v0.2.0` desteklenmez.

| Öğe | Değer |
|---|---|
| Ürün | `DailybotHQ/devcontainer-kit`, `v0.2.1` etiketi, arayüz 2 |
| Kayıt defteri anahtarı | `.dwp/config.json` içinde `devcontainer` |
| Depo başına yapılandırma | `.devcontainer/dck.toml` |
| Algılama | `dck doctor --json` |

## Katmanlar

Her konteyner geliştirme araçlarını taşır — git, gh, ripgrep, bir SSH sunucusu, Herdr ve herdr-peers — ve hiçbir gizli bilgi içermez. Geri kalanı, `dck.toml` içinde seçtiğiniz bir katmandır:

| Katman | Varsayılan | Ne ekler |
|---|---|---|
| `agents` | kapalı | Doğrulanmış sürümünden [coding-agents-kit](/kit/agentkit) ve listelediğiniz CLI'lar, her biri kendi kalıcı birimiyle; ayrıca `classic` (`claudex`, `codexx`, …) ve `providers` (`claude-glm`, `codex-azure`, …) ön ayarları. Agent'lar varsayılan olarak özerk çalışır — korumalı alan (sandbox) konteynerin kendisidir. Devre dışı bırakma: servis `.env` dosyasında `AGENTKIT_PERMISSIONS=ask`. |
| `editor` | açık | Etikete sabitlenmiş [DeepWorkPlan Vim](/kit/vim) ile Neovim; kapalıyken düz bir editör sunar. |
| `dailybot` | kapalı | dailybot eklentisi için Dailybot CLI. |

Oturum açma bilgileri, `gh`, Herdr yapılandırması ve git kimliği `bash dev.sh rebuild` sonrasında korunur.

## Güvenlik varsayılanları

- `dck.toml` içinde `bind` ayarlanmadıkça her yayımlanan port `127.0.0.1` adresine bağlanır.
- SSH üzerinden git, ana makinenin SSH agent'ı aracılığıyla çalışır — onun soketi; asla bir anahtar dosyası, asla bağlanmış bir `~/.ssh` ya da `~/.gitconfig` değil. Git kimliği, `dck setup` komutunun doldurduğu `DCK_GIT_*` değerlerinden gelir.
- SSH ana makine anahtarları çalışma zamanında proje başına bir birime üretilir, asla bir imajın içine gömülmez; sunucu yalnızca açık anahtarları kabul eder, root girişi ve parola yoktur.
- Şablon hiçbir `cap_add`, hiçbir `privileged` modu ve hiçbir Docker soketi eklemez.
- Her indirme sürüme sabitlenir ve sağlama toplamıyla doğrulanır; temel imaj özetle (digest) sabitlenir.
- Bir konteynerdeki agent'ların diğerlerine ulaşmasını sağlayan Herdr ağı varsayılan olarak açıktır ve kapatma anahtarlarıyla birlikte kitin tehdit modelinde belgelenmiştir.

## Notlar

İsteğe bağlıdır ve hiçbir zaman zorunlu değildir. Bir depo, sıfır isteğe bağlı eklentiyle tümüyle uyumludur. v0.2, Linux ve macOS ana makinelerini destekler; konteynerler arasındaki ağ Docker Desktop gerektirir.
