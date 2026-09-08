---
title: "डेवलपर — Deep Work Plan एजेंट API"
description: "पेश है deepworkplan.com की डेवलपर्स और AI एजेंटों के लिए एजेंट सतह: OpenAPI स्पेसिफिकेशन से वर्णित रीड-ओनली, ज़ीरो-ऑथ API, /api/mcp पर स्टेटलेस MCP सर्वर, 17 भाषाओं में प्रति-पृष्ठ Markdown और npx skills इंस्टॉल CLI।"
---

## डिज़ाइन से ही ज़ीरो-ऑथ

बनाने के लिए कोई API कुंजी नहीं, कोई OAuth प्रवाह नहीं, और प्रोडक्शन से अलग कोई सैंडबॉक्स नहीं — प्रोडक्शन सतह ही सैंडबॉक्स है। यह पद्धति का एक जानबूझकर चुना गया गुण है: एजेंट "contact sales" फ़ॉर्म नहीं भर सकते, इसलिए साइट कभी ऐसा नहीं माँगती।

- **रीड-ओनली** — MCP एंडपॉइंट (POST) को छोड़कर हर ऑपरेशन एक सुरक्षित, कैश करने योग्य GET है। कहीं भी कोई राइट ऑपरेशन मौजूद नहीं है।
- **कोई API कुंजी नहीं** — कोई रजिस्ट्रेशन, टोकन या रेट-लिमिट टियर नहीं। गुमनाम पहुँच दस्तावेज़ीकृत अनुबंध है, जो [/auth.md](https://deepworkplan.com/auth.md) में घोषित है।
- **निःशुल्क और ओपन सोर्स** — साइट की सामग्री और DWP स्किल MIT-लाइसेंस प्राप्त हैं।
- **मशीन-प्रथम** — `/api/*` पर संरचित JSON त्रुटियाँ, Markdown 404 रिकवरी बॉडी, RFC 9727 API कैटलॉग, और एक ARD क्षमता मैनिफ़ेस्टो।

## एंडपॉइंट

| मेथड | पथ | उद्देश्य |
|--------|------|---------|
| GET | `/openapi.json` | पूरे एजेंट API की OpenAPI 3.1 विनिर्देश। |
| GET | `/llms.txt` | क्यूरेटेड LLM गाइडेंस इंडेक्स — अनुशंसित प्रवेश बिंदु। |
| GET | `/init.md` | कैननिकल DWP अपनाने का प्रॉम्प्ट। |
| GET | `/{page}.md` | कोई भी पृष्ठ सोर्स Markdown के रूप में, सभी 17 भाषाओं में। |
| GET | `/api/health.json` | स्थैतिक हेल्थ मार्कर। |
| POST | `/api/mcp` | MCP सर्वर (Streamable HTTP, स्टेटलेस)। |
| GET | `/.well-known/ai-catalog.json` | ARD क्षमता मैनिफ़ेस्टो (agentmap)। |

अज्ञात `/api/*` पथ संकल्प संकेत के साथ एक संरचित JSON त्रुटि लौटाते हैं, कभी HTML त्रुटि पृष्ठ नहीं।

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
npx skills add DailybotHQ/deepworkplan-skill@latest
```

स्किल आपकी रिपॉज़िटरी के अंदर `.agents/skills/deepworkplan/` में वेंडर हो जाती है, इसलिए रेपो को छूने वाला हर एजेंट एक ही पद्धति साझा करता है।

## मशीन-पठनीय संसाधन

- [OpenAPI विनिर्देश](https://deepworkplan.com/openapi.json)
- [एजेंट पहुँच और ऑथ घोषणा](https://deepworkplan.com/auth.md)
- [API कैटलॉग, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [MCP मैनिफ़ेस्टो](https://deepworkplan.com/.well-known/mcp.json)
- [सुरक्षा संपर्क](https://deepworkplan.com/.well-known/security.txt)
- [साइट रेपो डिस्क्रिप्टर](https://deepworkplan.com/.well-known/dwp.json)
