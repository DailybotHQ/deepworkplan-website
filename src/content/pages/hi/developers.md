---
title: "डेवलपर — Deep Work Plan एजेंट API"
description: "Deep Work Plan का एजेंट सतह: संस्करणित, केवल-पठन, बिना-प्रमाणीकरण API — OpenAPI स्पेक, MCP सर्वर, 17 भाषाओं में प्रति-पृष्ठ Markdown और आधिकारिक CLI।"
---

## डिज़ाइन से ही ज़ीरो-ऑथ

बनाने के लिए कोई API कुंजी नहीं, कोई OAuth प्रवाह नहीं, और प्रोडक्शन से अलग कोई सैंडबॉक्स नहीं — प्रोडक्शन सतह ही सैंडबॉक्स है। यह पद्धति का एक जानबूझकर चुना गया गुण है: एजेंट "contact sales" फ़ॉर्म नहीं भर सकते, इसलिए साइट कभी ऐसा नहीं माँगती।

- **रीड-ओनली** — MCP एंडपॉइंट (POST) को छोड़कर हर ऑपरेशन एक सुरक्षित, कैश करने योग्य GET है। कहीं भी कोई राइट ऑपरेशन मौजूद नहीं है।
- **कोई API कुंजी नहीं** — कोई रजिस्ट्रेशन, टोकन या रेट-लिमिट टियर नहीं। गुमनाम पहुँच दस्तावेज़ीकृत अनुबंध है, जो [/auth.md](https://deepworkplan.com/auth.md) में घोषित है।
- **निःशुल्क और ओपन सोर्स** — साइट की सामग्री और DWP स्किल MIT-लाइसेंस प्राप्त हैं।
- **मशीन-प्रथम** — `/api/*` पर संरचित JSON त्रुटियाँ, Markdown 404 रिकवरी बॉडी, RFC 9727 API कैटलॉग, और एक ARD क्षमता मैनिफ़ेस्टो।

## स्किल के साथ योजना बनाएँ और निष्पादित करें

ऊपर दिया गया API किसी एजेंट को यह साइट पढ़ने देता है। DWP स्किल वह है जो किसी एजेंट को पद्धति चलाने देती है — इसे किसी रिपॉज़िटरी में एक बार इंस्टॉल करें और यह एक राउटर तथा नौ सब-स्किल्स स्लैश कमांड के रूप में लाती है (या नाम से, उन एजेंटों के लिए जो स्लैश को intercept करते हैं — अधिकांश इसके बजाय `#` का उपयोग करते हैं, जैसे `#dwp-execute`)।

हर योजना दो स्वतंत्र अक्षों में से हर एक से एक मान चुनती है:

- **Lite** — कार्य-रिकॉर्ड योजना के README में ही, स्थिर `#task-N` एंकरों के पीछे रहते हैं। छोटे, सीमित काम के लिए बनाया गया: एक सरोकार, लगभग एक बैठक।
- **Full** — `N.task_<slug>.md` के अंतर्गत प्रति कार्य एक फ़ाइल, घंटों या दिनों तक फैले लंबी-अवधि के काम के लिए, या जब कार्यों के बीच वास्तविक निर्भरताएँ हों। एक Lite योजना बाद में `/dwp-refine promote` के साथ Full में उन्नत हो जाती है।
- **Guided (डिफ़ॉल्ट)** — `dwp-create` लक्ष्य का विश्लेषण करता है, उसे विभाजित करता है, और एक समीक्षा योग्य योजना तैयार करता है, फिर पूछता है: इसे रखें, Lite को Full में उन्नत करें, इसे संपादित करें, या रोकें। किसी भी उत्पाद-कार्य के शुरू होने से पहले एक मनुष्य लूप में बना रहता है।
- **Trust (या auto)** — अंतिम शब्द के रूप में `trust` (या `auto`) जोड़ें, जैसे `/dwp-create <goal> trust`, और एजेंट समीक्षा चरण छोड़कर सीधे execute कमांड लौटाता है।

नौ सब-स्किल्स:

| कमांड | उद्देश्य |
|---------|---------|
| `/dwp-create <goal>` | किसी लक्ष्य को योजना में बदलें — डिफ़ॉल्ट रूप से Lite, बड़े काम के लिए Full। |
| `/dwp-execute` | किसी मौजूदा योजना को कार्य-दर-कार्य चलाएँ: इसे पूरी तरह पढ़ें, हर कार्य को क्रम में निष्पादित करें, उसके gate को सत्यापित करें, प्रगति अपडेट करें। |
| `/dwp-refine` | पूर्ण हो चुके काम और उसके दर्ज साक्ष्य को सुरक्षित रखते हुए किसी मौजूदा योजना में कार्य जोड़ें, हटाएँ, या पुनः क्रमबद्ध करें। |
| `/dwp-resume` | योजना की अपनी फ़ाइलों से स्थिति फिर से बनाएँ और किसी बाधित योजना को उसके पहले अधूरे कार्य से जारी रखें। |
| `/dwp-status` | बिना कोई बदलाव किए किसी योजना की प्रगति की रिपोर्ट दें — पूर्ण, प्रगति में, लंबित कार्य। |
| `/dwp-verify` | यंत्रवत् जाँच करें कि क्या रिपॉज़िटरी AI-first है और क्या उसकी योजनाएँ सुगठित हैं। कुछ भी नहीं बदलता; पास या फ़ेल की रिपोर्ट देता है। |
| `/deepworkplan-onboard` | किसी रिपॉज़िटरी को AI-first बनाएँ: उसके स्टैक के बारे में तर्क करें, फिर एक अनुकूलित `AGENTS.md`, `docs/`, `.agents/`, और एक gitignore की गई `.dwp/` जनरेट करें। |
| `/skill-create`, `/agent-create` | लेखक सब-स्किल: रिपॉज़िटरी की अपनी किट को बढ़ाएँ — दोहराई जाने वाली प्रक्रिया के लिए एक पुनः प्रयोज्य स्किल, या आवर्ती भूमिका के लिए एक एजेंट। |
| `/dwp-upgrade` | किसी नए प्रकाशित स्किल रिलीज़ की जाँच करें और, केवल स्पष्ट अनुमोदन के बाद, उसे इंस्टॉल करें और ऑनबोर्डिंग फिर से चलाएँ। |

एक छोटा, सीमित सुधार — Lite, trust:

```bash
# A small, bounded fix: skip the review round, run it directly.
/dwp-create fix the flaky checkout test trust
/dwp-execute
```

लंबी-अवधि का काम — Full, guided:

```bash
# Long-horizon work with real stakes: review before anything runs.
/dwp-create migrate the billing service to the new payments API
# ...review the proposed plan, then:
/dwp-execute
# ...interrupted? pick up again, even in a fresh session:
/dwp-resume
```

हर योजना का आउटपुट — मैनिफ़ेस्ट, प्रगति लॉग, कार्य-रिकॉर्ड, gate साक्ष्य — रिपॉज़िटरी के भीतर ही एक gitignore की गई `.dwp/` डायरेक्टरी में रहता है। deepworkplan.com को कुछ भी नहीं भेजा जाता या वहाँ संग्रहीत नहीं किया जाता; स्किल कोई नेटवर्क कॉल नहीं करती।

## एंडपॉइंट

| मेथड | पथ | उद्देश्य |
|--------|------|---------|
| GET | `/openapi.json` | पूरे एजेंट API की OpenAPI 3.1 विनिर्देश। |
| GET | `/llms.txt` | क्यूरेटेड LLM गाइडेंस इंडेक्स — अनुशंसित प्रवेश बिंदु। |
| GET | `/init.md` | कैननिकल DWP अपनाने का प्रॉम्प्ट। |
| GET | `/{page}.md` | कोई भी पृष्ठ सोर्स Markdown के रूप में, सभी 17 भाषाओं में। |
| GET | `/api/health.json` | स्थैतिक हेल्थ मार्कर। |
| GET | `/api/v1/index.json` | v1 परिवार की संस्करणित सूची: एंडपॉइंट पथ, साइट संस्करण और स्पेक लिंक। |
| GET | `/api/v1/sections.json` | टाइप किए गए JSON में साइट का नक्शा — प्रत्येक अनुभाग का नाम, पथ और विवरण। |
| GET | `/api/v1/pages.json` | हर भाषा का हर Markdown एंडपॉइंट, भाषा कोड से समूहबद्ध। |
| GET | `/api/v1/health.json` | संस्करणित स्वास्थ्य संकेतक — `/api/health.json` का v1 मिरर। |
| POST | `/api/mcp` | MCP सर्वर (Streamable HTTP, स्टेटलेस)। |
| GET | `/.well-known/ai-catalog.json` | ARD क्षमता मैनिफ़ेस्टो (agentmap)। |

अज्ञात `/api/*` पथ संकल्प संकेत के साथ एक संरचित JSON त्रुटि लौटाते हैं, कभी HTML त्रुटि पृष्ठ नहीं।

## संस्करण और पदावनति

संस्करणित JSON परिवार `/api/v1/` के अंतर्गत रहता है — index, sections, pages और health — और बिना संस्करण के मानक पथ (`/llms.txt`, `/{page}.md`, `/api/mcp`) उसी v1 अनुबंध के हिस्से हैं। तोड़ने वाले बदलाव केवल नए `/api/v{N+1}/` परिवार में आते हैं, कभी v1 के भीतर नहीं। जब कोई एंडपॉइंट पदावनत होता है, तो उसकी प्रतिक्रियाएँ हटाने से कम-से-कम 180 दिन पहले `Deprecation: true` और `Sunset` तिथि ले जाती हैं, और एक `Link` हेडर उत्तराधिकारी की ओर इशारा करता है।

## दर सीमाएँ

`/api/*` की प्रतिक्रियाएँ RFC 9331 दर-सीमा हेडर — `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` और `RateLimit-Policy` — ले जाती हैं, ताकि एजेंट वास्तविक समय में स्वयं को धीमा कर सकें; `429` प्रतिक्रिया `Retry-After` जोड़ती है। प्रवर्तन एज पर सर्वश्रेष्ठ-प्रयास (120 अनुरोध प्रति 60 सेकंड प्रति आगंतुक) है और पहुँच गुमनाम बनी रहती है: कोई कुंजी नहीं, कोई पंजीकरण नहीं, कोई स्तर नहीं।

## MCP सर्वर

`https://deepworkplan.com/api/mcp` पर Streamable HTTP के माध्यम से एक स्टेटलेस Model Context Protocol सर्वर। तीन रीड-ओनली टूल:

- `get_init_prompt` — कैननिकल /init.md अपनाने का प्रॉम्प्ट।
- `list_site_sections` — एक-पंक्ति विवरणों के साथ साइट मैप।
- `read_page` — कोई भी पृष्ठ नेटिव सोर्स Markdown के रूप में, यथा `/init` या `/es/methodology/01-manifesto`।

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

प्रोटोकॉल संस्करण 2025-03-26 और 2025-06-18 समर्थित हैं; किसी सत्र की आवश्यकता नहीं है। मैनिफ़ेस्टो: [/.well-known/mcp.json](https://deepworkplan.com/.well-known/mcp.json)। सर्वर कार्ड: [/.well-known/mcp/server-card.json](https://deepworkplan.com/.well-known/mcp/server-card.json)।

## एजेंटों के लिए Markdown

रेंडर किया गया हर पृष्ठ नेटिव सोर्स Markdown के रूप में प्रकाशित होता है — HTML रूपांतरण नहीं:

```bash
# Content negotiation on any URL
curl -s https://deepworkplan.com/methodology -H 'Accept: text/markdown'

# Or fetch the .md mirror directly — every page, every language
curl -s https://deepworkplan.com/es/developers.md
```

## किट इंस्टॉल करें

Deep Work Plan स्किल के लिए आधिकारिक इंस्टॉल पथ — वही कमांड जो /init एंडपॉइंट एजेंटों को देता है। यह skills-संगत किसी भी कोडिंग एजेंट के साथ काम करता है (Claude Code, Cursor, Codex, Gemini और अन्य):

```bash
# 1. Install the DWP skill — same command the /init endpoint gives agents
npx skills add DailybotHQ/deepworkplan-skill@latest

# 2. Official CLI — zero-dependency client over this API (Node >= 18),
#    prepared in the site repo's cli/ directory pending npm publication
deepworkplan init
deepworkplan read /es/developers
```

स्किल आपकी रिपॉज़िटरी के अंदर `.agents/skills/deepworkplan/` में वेंडर हो जाती है, इसलिए रेपो को छूने वाला हर एजेंट एक ही पद्धति साझा करता है। आधिकारिक `deepworkplan` CLI — इसी API पर एक शून्य-निर्भरता क्लाइंट (`init`, `sections`, `read`, `open`, `mcp`) — npm के लिए तैयार है और प्रकाशन तक साइट रिपॉज़िटरी की [cli/](https://github.com/DailybotHQ/deepworkplan-website/tree/main/cli) निर्देशिका में रहता है।

## मशीन-पठनीय संसाधन

- [OpenAPI विनिर्देश](https://deepworkplan.com/openapi.json)
- [एजेंट पहुँच और ऑथ घोषणा](https://deepworkplan.com/auth.md)
- [API कैटलॉग, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [MCP मैनिफ़ेस्टो](https://deepworkplan.com/.well-known/mcp.json)
- [सुरक्षा संपर्क](https://deepworkplan.com/.well-known/security.txt)
- [साइट रेपो डिस्क्रिप्टर](https://deepworkplan.com/.well-known/dwp.json)
