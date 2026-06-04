---
title: Python package / CLI
description: "Python packages और CLI टूल्स के लिए एक ऑनबोर्डिंग प्रीसेट, जिसमें package layout, console entry points, और pytest validation gate के लिए तर्क संकेत शामिल हैं।"
kind: preset
lang: hi
order: 5
stack: Python package / CLI
---

# Python package / CLI preset

एक तर्क मार्गदर्शिका जिसे onboard प्रवाह Python packages और CLI टूल्स के लिए उपयोग करता है। यह एक चेकलिस्ट है, टेम्पलेट नहीं — पता लगाई गई वास्तविकता ही जीतती है।

## संकेत

- `[project.scripts]` entry point वाली `pyproject.toml` (एक इंस्टॉल-योग्य CLI)।
- deps में एक CLI framework: `click`, `typer`, या stdlib `argparse`।
- एक src-layout (`src/<pkg>/`) या `__init__.py`, `cli.py`/`__main__.py`, और `commands/` वाला root package।

## किस बारे में तर्क करें

- वास्तविक validation gate (`ruff check`, `mypy`, `pytest`) — हूबहू दर्ज किया गया, जिसमें कोई भी Makefile/tox/hatch wrapper शामिल है।
- console-script entry नाम और command/subcommand संरचना।
- स्टैक-उपयुक्त स्किल्स: `command-add`, `subcommand`, `option`/`flag`, और यदि यह PyPI पर भेजा जाता है तो `release`।

## टिप्पणियाँ

Public-API स्थिरता, help text, और exit codes उपयोगकर्ता-सामने की सतहें हैं — इन्हें मानकों की तरह मानें।
