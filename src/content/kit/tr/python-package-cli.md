---
title: Python package / CLI
description: "Python paketleri ve CLI araçları için bir onboarding ön ayarı; paket düzeni, konsol giriş noktaları ve pytest doğrulama geçidi için akıl yürütme ipuçları sunar."
kind: preset
lang: tr
order: 5
stack: Python package / CLI
---

# Python package / CLI ön ayarı

Onboarding akışının Python paketleri ve CLI araçları için kullandığı akıl yürütme kılavuzu. Bu bir şablon değil, bir kontrol listesidir — saptanan gerçeklik kazanır.

## Sinyaller

- `[project.scripts]` giriş noktası içeren bir `pyproject.toml` (kurulabilir bir CLI).
- Bağımlılıklarda bir CLI çerçevesi: `click`, `typer` ya da standart kütüphane `argparse`.
- Bir src düzeni (`src/<pkg>/`) ya da `__init__.py`, `cli.py`/`__main__.py` ve `commands/` içeren bir kök paket.

## Neyin üzerine akıl yürütülmeli

- Gerçek doğrulama geçidi (`ruff check`, `mypy`, `pytest`) — varsa Makefile/tox/hatch sarmalayıcısı dahil birebir kaydedilir.
- Konsol betiği giriş adı ve komut/alt komut yapısı.
- Yığına uygun skill’ler: `command-add`, `subcommand`, `option`/`flag` ve PyPI’ye yayımlanıyorsa `release`.

## Notlar

Genel API kararlılığı, yardım metni ve çıkış kodları kullanıcıya görünen yüzeylerdir — bunları standart olarak ele alın.
