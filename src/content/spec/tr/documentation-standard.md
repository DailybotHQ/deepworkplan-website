---
title: Dokümantasyon standardı
description: "Deep Work Plan’lerin yapılarını, görevlerini ve ilerlemelerini nasıl belgelediğine ilişkin normatif standart: README kuralları, durum işaretleri ve iki zorunlu son görev."
order: 1
lang: tr
section: Standard
---

# Dokümantasyon standardı

**Sürüm 1.0.** Bu standart, Deep Work Plan’lerin yapılarını, görevlerini ve ilerlemelerini nasıl belgelediğini tanımlar. DWP metodolojisi altında oluşturulan her plan için geçerlidir. MUST, SHOULD ve MAY anahtar kelimeleri, RFC 2119’da tanımlandığı şekilde kullanılır.

## Plan README

Her plan, şunları içeren bir `README.md` dosyasına SAHİP OLMALIDIR:

- **Başlık** — `# Deep Work Plan: <name>`.
- **Hedef** — planın amacına ilişkin düzyazı bir bildirim.
- **Kaynak materyal** — kanonik girdilere bağlantılar veya yollar (isteğe bağlı).
- **Görevler** — görev numarası, adı ve bir durum onay kutusu içeren bir Markdown tablosu.
- **Durum** — `<n>/<total> tasks complete` biçiminde bir satır.

## Görev dosyaları

Her görev dosyası `<n>.task_<slug>.md` olarak adlandırılMALI ve dokuz bölümlü anatomiyi İÇERMELİDİR.

## PROGRESS.md

`PROGRESS.md`, yalnızca ekleme yapılan bir yürütme günlüğüdür. Her giriş şunları KAYDETMELİDİR:

- Bir ISO 8601 zaman damgası.
- Görev numarası ve adı.
- Ne yapıldığı.
- Varsa sapmalar veya atlama nedenleri.

## Durum işaretleri

- `[ ]` — başlanmadı.
- `[~]` — devam ediyor.
- `[x]` — bitti.
- `[!]` — engellendi.

## Başlıklar

Tüm başlıklar cümle düzenini KULLANMALIDIR. Belgeler, pazarlama dilinden ve ünlem işaretlerinden KAÇINMALIDIR.

## İki zorunlu son görev

Her plan iki standart görevle bitMELİDİR:

1. **Skills & Agents Discovery** — oluşturulan yeniden kullanılabilir skill’leri ve ajanları belirler.
2. **Executive Report** — paydaşlar için bir sonuç özeti.
