---
title: DeepWorkPlan Vim
description: "Opt-in DWP eklentisi: DeepWorkPlan Vim, Deep Work Plan'ın terminal düzenleyicisi — üretilen komut dizini, plan gezgini ve Neovim'de Markdown okuma."
kind: addon
lang: tr
order: 6
---

# DeepWorkPlan Vim eklentisi

**DeepWorkPlan Vim**, Deep Work Plan'ın terminal düzenleyicisidir: bir Neovim yapılandırması (bu, depo dosyası değil düzenleyicinin kendisidir) ve metodolojinin çalışma yüzeylerini tek tuş mesafesine koyar. Kit'in diğer girdileri bir depoya harness kurarken, bu eklenti kişiye — ve Neovim'i headless kullanan herhangi bir ajana — DWP'yi doğal biçimde konuşan bir düzenleyici kazandırır.

**Neovim 0.12 veya daha yenisi** gerekir; **macOS ve Linux** üzerinde çalışır (Windows belgelenmiş manuel yol ile desteklenir) ve **GPL-3.0** lisanslıdır — kullanmak, incelemek ve değiştirmek özgürdür.

## Neyi ekler

| # | Özellik | Ne yapar | Eşleme |
|---|---------|--------------|---------|
| F1 | **Üretilen komut dizini** | Tüm düzenleyici, listelenmiş: her komut kendi eşlemesi ve tek satırlık açıklamasıyla; canlı yapılandırmadan üretilir, böylece dizin düzenleyiciden sapmaz. | `SPC h h` |
| F2 | **VS Code tarzı hareketler** | Tümünü seç, kopyala ve panoya yank; kas hafızasının zaten bildiği akorlar üzerinde. | `<C-a>`, `y`, `<leader>y` |
| F3 | **Deep Work Plan tarayıcısı** | Depoyu yöneten planı — görevleri, doğrulama kapılarını ve tamamlanma durumunu — düzenleyiciden çıkmadan açar. | `SPC P` |
| F4 | **Markdown görüntüleyici** | Markdown'ı ajanların okuduğu gibi okur: işlenmiş önizleme ya da kopyala-yapıştır sadakati için ham kaynak. | `SPC m p`, `SPC m r` |
| F5 | **Tek satırlık kurulum programı** | macOS ve Linux için rıza-öncelikli bir `install.sh`; belgelenmiş manuel yol Windows'u kapsar. | `curl -fsSL https://deepworkplan.com/vim/install.sh \| bash` |

## Kurulum

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

Kurulum programı **rıza-önceliklidir**: mevcut, başka birine ait Neovim yapılandırması asla üzerine yazılmaz. Terminalsiz bir boru hattında hiçbir şeye dokunmadan yönergelerle durur; etkileşimli çalıştırmada mevcut yapılandırmayı kenara almadan önce sorar. Eklentiler ilk açılışta headless kurulur — kapanıp yeniden açma oyunu yok.

Windows bir `curl | bash` hedefi değildir. Belgelenmiş manuel yol (winget artı Git Bash ya da WSL) depo README'sinde bulunur.

Tam yüzey, ekran görüntüsü olmadan ve sözleşmeyle sınırlı: [/vim sayfası](/vim).

## Ne zaman tercih edilir

| Sinyal | Eylem |
|--------|--------|
| Geliştirici terminalde yaşar ve depoyu planla yönetir | Eklentiyi **sunun** |
| Plan tarayıcının (`SPC P`) durumu görünür tuttuğu uzun ufuklu DWP yürütmesi | **Önerin** |
| Geliştiricinin düzenleyicisi zaten yapılandırılmış ve pazarlık dışı | **Atlayın** — eklenti tasarım gereği opt-in'dir |
| WSL'siz yalnızca Windows ekibi | **Atlayın** ya da belgelenmiş manuel yolu gösterin |

## İlgili kit girdileri

- [Devcontainer](/kit/devcontainer) — yeniden üretilebilir geliştirme ortamı (birinci eklenti)
- [Dailybot](/kit/dailybot) — ekibe görünür plan yaşam döngüsü raporları (ikinci eklenti)
- [AI Diff Reviewer](/kit/ai-diff-reviewer) — plan Final Review'ları sırasında yerel inceleme (beşinci eklenti)
