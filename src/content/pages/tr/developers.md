---
title: "Geliştiriciler — Deep Work Plan ajan API'si"
description: "Deep Work Plan'ın ajan yüzeyi: sürümlü, salt okunur ve kimlik doğrulamasız bir API — OpenAPI, MCP sunucusu, 17 dilde sayfa başına Markdown ve resmî bir CLI."
---

## Tasarım gereği kimlik doğrulamasız

Üretilecek API anahtarı, OAuth akışı ve üretimden ayrı bir sandbox yoktur — üretim yüzeyinin kendisi sandbox'tur. Bu, metodolojinin bilinçli bir özelliğidir: ajanlar "bize ulaşın" formlarını dolduramaz; dolayısıyla site hiçbir zaman bunu istemez.

- **Salt okunur** — MCP uç noktası (POST) dışındaki her işlem güvenli ve önbelleğe alınabilir bir GET'tir. Hiçbir yerde yazma işlemi yoktur.
- **API anahtarı yok** — kayıt, jeton veya hız sınırı kademesi yoktur. Anonim erişim; [/auth.md](https://deepworkplan.com/auth.md) içinde bildirilen belgelenmiş sözleşmedir.
- **Ücretsiz ve açık kaynak** — site içeriği ve DWP skill'i MIT lisanslıdır.
- **Makine öncelikli** — `/api/*` yollarında yapılandırılmış JSON hataları, Markdown 404 kurtarma gövdeleri, RFC 9727 API kataloğu ve bir ARD yetenek manifestosu.

## Skill ile planlayın ve yürütün

Yukarıdaki API, bir ajanın bu siteyi okumasını sağlar. DWP skill'i ise bir ajanın metodolojiyi çalıştırmasını sağlayan şeydir — bir depoya bir kez kurulur ve bir yönlendirici ile dokuz alt skill getirir; bunlar eğik çizgi komutları olarak çağrılır (ya da isimle, eğik çizgiyi yakalayan ajanlar için — çoğu bunun yerine `#` kullanır, örn. `#dwp-execute`).

Her plan, birbirinden bağımsız iki eksenin her birinden bir değer seçer:

- **Lite** — Görev kayıtları, planın README'sinde, sabit `#task-N` çapaları arkasında yaşar. Küçük, sınırlı işler için tasarlanmıştır: tek bir konu, yaklaşık bir oturum.
- **Full** — `N.task_<slug>.md` altında görev başına bir dosya; saatler veya günler süren uzun soluklu işler için, ya da görevler arasında gerçek bağımlılıklar olduğunda. Bir Lite plan sonradan `/dwp-refine promote` ile Full'e yükseltilir.
- **Guided (varsayılan)** — `dwp-create` hedefi analiz eder, onu ayrıştırır ve incelenebilir bir plan somutlaştırır, ardından sorar: koru, Lite'ı Full'e yükselt, düzenle ya da durdur. Herhangi bir ürün işi başlamadan önce bir insan döngüde kalır.
- **Trust (veya auto)** — Son kelime olarak `trust` (veya `auto`) ekleyin, örn. `/dwp-create <goal> trust`, ve ajan inceleme turunu atlayıp execute komutunu doğrudan döndürür.

Dokuz alt skill:

| Komut | Amaç |
|---------|---------|
| `/dwp-create <goal>` | Bir hedefi plana dönüştürür — varsayılan olarak Lite, daha büyük işler için Full. |
| `/dwp-execute` | Var olan bir planı görev görev çalıştırır: tamamen okur, her görevi sırayla yürütür, kapısını doğrular, ilerlemeyi günceller. |
| `/dwp-refine` | Tamamlanmış işi ve kayıtlı kanıtını koruyarak var olan bir plandaki görevleri ekler, kaldırır veya yeniden sıralar. |
| `/dwp-resume` | Durumu planın kendi dosyalarından yeniden inşa eder ve kesintiye uğramış bir planı ilk tamamlanmamış görevinden itibaren sürdürür. |
| `/dwp-status` | Hiçbir değişiklik yapmadan bir planın ilerlemesini raporlar — tamamlanan, sürmekte olan, bekleyen görevler. |
| `/dwp-verify` | Deponun AI-first olup olmadığını ve planlarının iyi biçimlendirilip biçimlendirilmediğini mekanik olarak denetler. Hiçbir şeyi değiştirmez; geçti ya da kaldı raporu verir. |
| `/deepworkplan-onboard` | Bir depoyu AI-first hale getirir: yığını hakkında akıl yürütür, ardından uyarlanmış bir `AGENTS.md`, `docs/`, `.agents/` ve gitignore edilmiş bir `.dwp/` üretir. |
| `/skill-create`, `/agent-create` | Yazar alt skill'i: deponun kendi kitini büyütür — tekrarlanan bir prosedür için yeniden kullanılabilir bir skill, ya da yinelenen bir rol için bir ajan. |
| `/dwp-upgrade` | Daha yeni yayımlanmış bir skill sürümü olup olmadığını denetler ve yalnızca açık onaydan sonra onu kurar, onboarding'i tekrar çalıştırır. |

Küçük, sınırlı bir düzeltme — Lite, trust:

```bash
# A small, bounded fix: skip the review round, run it directly.
/dwp-create fix the flaky checkout test trust
/dwp-execute
```

Uzun soluklu iş — Full, guided:

```bash
# Long-horizon work with real stakes: review before anything runs.
/dwp-create migrate the billing service to the new payments API
# ...review the proposed plan, then:
/dwp-execute
# ...interrupted? pick up again, even in a fresh session:
/dwp-resume
```

Her planın çıktısı — manifesto, ilerleme günlüğü, görev kayıtları, kapı kanıtı — deponun kendi içinde gitignore edilmiş bir `.dwp/` dizininde yaşar. Hiçbir şey deepworkplan.com'a gönderilmez ya da orada saklanmaz; skill hiçbir ağ çağrısı yapmaz.

## Uç noktalar

| Metot | Yol | Amaç |
|--------|------|---------|
| GET | `/openapi.json` | Ajan API'sinin tamamının OpenAPI 3.1 spesifikasyonu. |
| GET | `/llms.txt` | Seçilmiş LLM rehber dizini — önerilen giriş noktası. |
| GET | `/init.md` | Kanonik DWP benimseme istemi. |
| GET | `/{page}.md` | Herhangi bir sayfa, kaynak Markdown olarak — 17 dilin tümünde. |
| GET | `/api/health.json` | Statik sağlık işareti. |
| GET | `/api/v1/index.json` | v1 ailesinin sürümlü kataloğu: uç nokta yolları, site sürümü ve belirtim bağlantıları. |
| GET | `/api/v1/sections.json` | Site haritası tipli JSON olarak — her bölüm için ad, yol ve açıklama. |
| GET | `/api/v1/pages.json` | Her dildeki tüm Markdown uç noktaları, dil koduna göre gruplanmış. |
| GET | `/api/v1/health.json` | Sürümlü sağlık göstergesi — `/api/health.json`'un v1 aynası. |
| POST | `/api/mcp` | MCP sunucusu (Streamable HTTP, durumsuz). |
| GET | `/.well-known/ai-catalog.json` | ARD yetenek manifestosu (agentmap). |

Bilinmeyen `/api/*` yolları, çözüm ipucu içeren yapılandırılmış bir JSON hatası döndürür; asla bir HTML hata sayfası döndürmez.

## Sürümleme ve kullanımdan kaldırma

Sürümlü JSON ailesi `/api/v1/` altında yaşar — index, sections, pages ve health — ve sürümsüz kanonik yollar (`/llms.txt`, `/{page}.md`, `/api/mcp`) aynı v1 sözleşmesine aittir. Yıkıcı değişiklikler yalnızca yeni bir `/api/v{N+1}/` ailesinde yayımlanır, asla v1 içinde olmaz. Bir uç nokta kullanımdan kaldırıldığında yanıtları `Deprecation: true` taşır ve kaldırılmadan en az 180 gün önce bir `Sunset` tarihi içerir; bir `Link` başlığı halefi gösterir.

## İstek limitleri

`/api/*` yanıtları RFC 9331 istek limiti başlıklarını taşır — `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` ve `RateLimit-Policy` — böylece ajanlar kendilerini gerçek zamanlı yavaşlatabilir; bir `429` yanıtı `Retry-After` ekler. Uygulama uçta elden geldiğince (best-effort) yapılır (ziyaretçi başına 60 saniyede 120 istek) ve erişim anonim kalır: anahtar yok, kayıt yok, kademe yok.

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
# 1. Install the DWP skill — same command the /init endpoint gives agents
npx skills add DailybotHQ/deepworkplan-skill@latest

# 2. Official CLI — zero-dependency client over this API (Node >= 18),
#    prepared in the site repo's cli/ directory pending npm publication
deepworkplan init
deepworkplan read /es/developers
```

Skill, deponuzun içindeki `.agents/skills/deepworkplan/` klasörüne yerleştirilir; böylece depoya dokunan her ajan aynı metodolojiyi paylaşır. Resmî `deepworkplan` CLI — aynı API üzerinde sıfır bağımlılıklı bir istemci (`init`, `sections`, `read`, `open`, `mcp`) — npm için hazırlandı ve yayımlanana kadar site deposunun [cli/](https://github.com/DailybotHQ/deepworkplan-website/tree/main/cli) dizininde durur.

## Makine tarafından okunabilir kaynaklar

- [OpenAPI spesifikasyonu](https://deepworkplan.com/openapi.json)
- [Ajan erişimi ve kimlik doğrulama bildirimi](https://deepworkplan.com/auth.md)
- [API kataloğu, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [MCP manifestosu](https://deepworkplan.com/.well-known/mcp.json)
- [Güvenlik iletişim adresi](https://deepworkplan.com/.well-known/security.txt)
- [Site depo tanımlayıcısı](https://deepworkplan.com/.well-known/dwp.json)
