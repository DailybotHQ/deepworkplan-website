---
title: "DeepWorkPlan Vim"
description: "DeepWorkPlan Vim, Deep Work Plan'ın terminal düzenleyicisidir: komut dizini, plan tarayıcısı ve Markdown görüntüleyicisi içeren Neovim 0.12+ yapılandırması."
lastUpdated: 2026-10-03
---

## Nedir

Terminalde yaşayan insanlar ve kodlama ajanları için bir Neovim yapılandırması — planlarınız, belgeleriniz ve komut dizininiz tek tuş uzağınızda.

## Kurulum

Tek satır, DeepWorkPlan Vim'i Neovim yapılandırmanız olarak kurar. Kurulum programı ne yapacağını açıklar ve mevcut bir kuruluma dokunmadan önce sorar.

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

Önce onay: mevcut bir Neovim yapılandırması, açık onayınız olmadan asla üzerine yazılmaz. Kurulum programı durur ve manuel yolu gösterir.

Windows'ta tek satırlık komut uygulanmaz; manuel yol depo README'sinde belgelenmiştir. [Windows kurulum yolu](https://github.com/DailybotHQ/deepworkplan-vim#install-host)

## Ne yapar

Beş özellik, bilinçli olarak dar kapsamlı. Her biri, üretilen komut dizininde inceleyebileceğiniz bir tuş atamasına karşılık gelir.

| Özellik | Nedir | Atama |
|---|---|---|
| Üretilen komut dizini | Komut dizini etkin yapılandırmadan üretilir; böylece tuş atamaları listesi her zaman günceldir. | `SPC h h` |
| VS Code tarzı hareketler | Grafik düzenleyicilerin şekillendirdiği düzenleme hareketleri: tümünü seç ve sistem panosuna kopyala. | `<C-a>`, `y`, `<leader>y` |
| Deep Work Plan tarayıcısı | Depodaki planları gezen bir panel — düzenleyiciden çıkmadan bir planı, görevlerini ve doğrulama kapılarını okuyun. | `SPC P` |
| Markdown görüntüleyici | Markdown'ı tarayıcıda önizleyin veya tampon içinde işleyin — belgeler ve planlar, işin yapıldığı yerde kalır. | `SPC m p`, `SPC m r` |
| Tek satırlık kurulum programı | macOS ve Linux için kendi kendine yeten bir kurulum programı; Windows için belgelenmiş manuel bir yol sunar. | — |

## Gereksinimler

- Neovim 0.12 veya daha yenisi; Lua (lua, lua5.4 veya luajit) erişilebilir olsun
- macOS ve Linux; Windows, belgelenmiş manuel bir yol ile desteklenir
- GPL-3.0 lisanslı — kullanmak, incelemek ve değiştirmek özgürce

## İlgili bağlantılar

- [Kitteki addon belgesini okuyun](/kit/vim)
- [Kaynak depoyu görüntüle](https://github.com/DailybotHQ/deepworkplan-vim)
- DeepWorkPlan Vim'i kurun, Neovim'i açın ve planlarınızı ajanlarınızın kullandığı aynı terminalde okuyun.
