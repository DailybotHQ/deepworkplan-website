---
title: "Geliştiriciler — Deep Work Plan ajan API'si"
description: "deepworkplan.com'un geliştiriciler ve yapay zeka ajanları için ajan yüzeyi: OpenAPI spesifikasyonuyla tanımlanmış salt okunur, kimlik doğrulamasız bir API, /api/mcp üzerinde durumsuz bir MCP sunucusu, 17 dilde sayfa başına Markdown ve npx skills kurulum CLI'sı."
---

## Tasarım gereği kimlik doğrulamasız

Üretilecek API anahtarı, OAuth akışı ve üretimden ayrı bir sandbox yoktur — üretim yüzeyinin kendisi sandbox'tur. Bu, metodolojinin bilinçli bir özelliğidir: ajanlar "bize ulaşın" formlarını dolduramaz; dolayısıyla site hiçbir zaman bunu istemez.

- **Salt okunur** — MCP uç noktası (POST) dışındaki her işlem güvenli ve önbelleğe alınabilir bir GET'tir. Hiçbir yerde yazma işlemi yoktur.
- **API anahtarı yok** — kayıt, jeton veya hız sınırı kademesi yoktur. Anonim erişim; [/auth.md](https://deepworkplan.com/auth.md) içinde bildirilen belgelenmiş sözleşmedir.
- **Ücretsiz ve açık kaynak** — site içeriği ve DWP skill'i MIT lisanslıdır.
- **Makine öncelikli** — `/api/*` yollarında yapılandırılmış JSON hataları, Markdown 404 kurtarma gövdeleri, RFC 9727 API kataloğu ve bir ARD yetenek manifestosu.

## Uç noktalar

| Metot | Yol | Amaç |
|--------|------|---------|
| GET | `/openapi.json` | Ajan API'sinin tamamının OpenAPI 3.1 spesifikasyonu. |
| GET | `/llms.txt` | Seçilmiş LLM rehber dizini — önerilen giriş noktası. |
| GET | `/init.md` | Kanonik DWP benimseme istemi. |
| GET | `/{page}.md` | Herhangi bir sayfa, kaynak Markdown olarak — 17 dilin tümünde. |
| GET | `/api/health.json` | Statik sağlık işareti. |
| POST | `/api/mcp` | MCP sunucusu (Streamable HTTP, durumsuz). |
| GET | `/.well-known/ai-catalog.json` | ARD yetenek manifestosu (agentmap). |

Bilinmeyen `/api/*` yolları, çözüm ipucu içeren yapılandırılmış bir JSON hatası döndürür; asla bir HTML hata sayfası döndürmez.

## MCP sunucusu

`https://deepworkplan.com/api/mcp` adresinde, Streamable HTTP üzerinden durumsuz bir Model Context Protocol sunucusu. Üç salt okunur araç:

- `get_init_prompt` — kanonik /init.md benimseme istemi.
- `list_site_sections` — tek satırlık açıklamalarla site haritası.
- `read_page` — herhangi bir sayfa, yerel kaynak Markdown olarak; örn. `/init` veya `/es/methodology/01-manifesto`.

```bash
curl -s https://deepworkplan.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize",
       "params":{"protocolVersion":"2025-06-18","capabilities":{},
                 "clientInfo":{"name":"curl","version":"1.0"}}}'

curl -s https://deepworkplan.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/list"}'

curl -s https://deepworkplan.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call",
       "params":{"name":"read_page","arguments":{"path":"/init"}}}'
```

2025-03-26 ve 2025-06-18 protokol sürümleri desteklenir; oturum gerekmez. Manifesto: [/.well-known/mcp.json](https://deepworkplan.com/.well-known/mcp.json). Sunucu kartı: [/.well-known/mcp/server-card.json](https://deepworkplan.com/.well-known/mcp/server-card.json).

## Ajanlar için Markdown

İşlenen her sayfa, yerel kaynak Markdown olarak yayımlanır — bir HTML dönüşümü değildir:

```bash
# Content negotiation on any URL
curl -s https://deepworkplan.com/methodology -H 'Accept: text/markdown'

# Or fetch the .md mirror directly — every page, every language
curl -s https://deepworkplan.com/es/developers.md
```

## Kit'i kurun

Deep Work Plan skill'i için resmî kurulum yolu — /init uç noktasının ajanlara verdiği komutla aynıdır. Skills uyumlu herhangi bir kodlama ajanıyla çalışır (Claude Code, Cursor, Codex, Gemini ve diğerleri):

```bash
npx skills add DailybotHQ/deepworkplan-skill@latest
```

Skill, deponuzun içindeki `.agents/skills/deepworkplan/` klasörüne yerleştirilir; böylece depoya dokunan her ajan aynı metodolojiyi paylaşır.

## Makine tarafından okunabilir kaynaklar

- [OpenAPI spesifikasyonu](https://deepworkplan.com/openapi.json)
- [Ajan erişimi ve kimlik doğrulama bildirimi](https://deepworkplan.com/auth.md)
- [API kataloğu, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [MCP manifestosu](https://deepworkplan.com/.well-known/mcp.json)
- [Güvenlik iletişim adresi](https://deepworkplan.com/.well-known/security.txt)
- [Site depo tanımlayıcısı](https://deepworkplan.com/.well-known/dwp.json)
