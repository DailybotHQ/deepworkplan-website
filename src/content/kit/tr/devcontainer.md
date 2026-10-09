---
title: Devcontainer
description: "devcontainer-kit tabanlı isteğe bağlı eklenti: dck init ile oluşturulan Dev Containers şablonu, agent'sız temel imajlar ve konteyner başına Herdr makineleri."
kind: addon
lang: tr
order: 1
---

# Devcontainer eklentisi

Depoya yeniden üretilebilir, yalıtılmış bir geliştirme konteyneri verin — insanların, editörlerin ve kodlama agent'larının hep birlikte kullanabileceği bir konteyner. **DWP v7 beta**'da (`v7.0.0-beta.1`, bir ön sürüm) bu eklenti, Deep Work Plan olmadan da çalışan bir MIT ürünü olan **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**'i entegre eder ve paketin daha önce taşıdığı şablonun yerini alır. İsteğe bağlıdır: bir depo onsuz da tümüyle uyumludur.

## devcontainer-kit'in sağladıkları

- [Dev Containers](https://containers.dev) spesifikasyonu üzerine kurulu, `dck init` komutunun depoya oluşturduğu **bir şablon**: `devcontainer.json`, bir compose dosyası ve `docker/local/`. Daha sonra yeniden çalıştırıldığında uzlaştırır ve düzenlemelerinizin üzerine asla yazmaz; var olan bir dosyadaki her değişiklik önce gösterilir ve onay gerektirir.
- Konteyneri düz bir terminalden çalıştıran bir başlatıcı olan **`dck`** — `setup`, `up`, `shell`, `ssh`, `rebuild`, `doctor` — VS Code veya Cursor ile ya da onlar olmadan.
- Kodlama agent'ları **olmadan** gelen üç çeşit **temel imaj**: `python-3.13`, `node-24` ve `debian`.
- Her depo için elle kopyalanan bir entrypoint yerine, kalıcı birimler, SSH ve SSH oturumlarının ortamı için **bir entrypoint kütüphanesi**.
- **Herdr makineleri.** Her konteyner yalnızca loopback üzerinde dinleyen bir SSH sunucusu aracılığıyla [Herdr](https://herdr.dev)'a katılabilir; böylece içindeki agent'lar erişilebilir eşler hâline gelir.

## Kurulum

```bash
git clone --branch v0.1.2 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init
```

Gereksinimler: Linux veya macOS ana makinesinde `bash` 3.2 veya daha yenisi ve `python3` 3.11 veya daha yenisi; konteyner komutları için de Compose v2 ile Docker. Bir sürümü `SHA256SUMS` varlığıyla doğrulayın.

| Öğe | Değer |
|---|---|
| Ürün | `DailybotHQ/devcontainer-kit`, `v0.1.2` etiketi, arayüz 1 |
| Kayıt defteri anahtarı | `.dwp/config.json` içinde `devcontainer` |
| Depo başına yapılandırma | `.devcontainer/dck.toml` |
| Algılama | `dck doctor --json` |

## Katmanlar isteğe bağlıdır

Temel imajlar geliştirme araçlarını taşır — git, gh, ripgrep, bir SSH sunucusu, Herdr ve etikete sabitlenmiş DeepWorkPlan Vim ile Neovim — ve hiçbir kodlama agent'ı, hiçbir raporlama CLI'ı ve hiçbir gizli bilgi içermez. Geri kalan her şey, `dck.toml` içinde açtığınız bir katmandır:

| Katman | Varsayılan | Ne ekler |
|---|---|---|
| `agents` | kapalı | [coding-agents-kit](/kit/agentkit)'i ve listelediğiniz CLI'ları, her biri kendi kalıcı birimiyle kurar. Hiçbir izin atlama bayrağı ayarlanmaz. |
| `editor` | açık | DeepWorkPlan Vim ile Neovim; kapalıyken düz bir editör sunar. |

## Güvenlik varsayılanları

- `dck.toml` içinde `bind` ayarlanmadıkça her yayımlanan port `127.0.0.1` adresine bağlanır.
- SSH agent yönlendirmesi ana makineden yapılır; ana makinenin özel anahtarları asla bir konteynere kopyalanmaz.
- SSH ana makine anahtarları çalışma zamanında proje başına bir birime üretilir, asla bir imajın içine gömülmez; sunucu yalnızca açık anahtarları kabul eder, root girişi ve parola yoktur.
- Şablon hiçbir `cap_add`, hiçbir `privileged` modu ve hiçbir Docker soketi eklemez.
- Temel imajlar ve araçlar sürüme sabitlenir ve sağlama toplamıyla doğrulanır; özet çözümlenebildiği her durumda compose, temel imaja özet (digest) ile başvurur.

## Notlar

İsteğe bağlıdır ve hiçbir zaman zorunlu değildir. Bir depo, sıfır isteğe bağlı eklentiyle tümüyle uyumludur. v0.1, Linux ve macOS ana makinelerini destekler.
