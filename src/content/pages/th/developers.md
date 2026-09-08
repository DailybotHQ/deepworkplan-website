---
title: "นักพัฒนา — agent API ของ Deep Work Plan"
description: "ส่วนติดต่อสำหรับ agent ของ deepworkplan.com สำหรับนักพัฒนาและ AI agent: API แบบอ่านอย่างเดียว ไร้การยืนยันตัวตน ที่อธิบายด้วยสเปก OpenAPI, MCP server แบบ stateless ที่ /api/mcp, Markdown รายหน้าใน 17 ภาษา และ npx skills CLI"
---

## ไร้การยืนยันตัวตนโดยการออกแบบ

ไม่มี API key ต้องสร้าง ไม่มีกระบวนการ OAuth และไม่มี sandbox แยกจาก production — พื้นที่ให้บริการจริงของ production ตัวเองคือ sandbox นี่คือคุณสมบัติที่ตั้งใจไว้ของระเบียบวิธี: agent กรอกแบบฟอร์ม "contact sales" ไม่ได้ เว็บไซต์จึงไม่ขอสิ่งนั้นเลย

- **อ่านอย่างเดียว** — ทุกการดำเนินการเป็น GET ที่ปลอดภัยและแคชได้ ยกเว้น endpoint ของ MCP (POST) ไม่มีการเขียนใด ๆ ทั้งสิ้น
- **ไม่มี API key** — ไม่ต้องสมัคร ไม่มีโทเคน ไม่มีระดับ rate limit การเข้าถึงแบบไม่ระบุตัวตนคือสัญญาที่บันทึกไว้ในเอกสาร ประกาศไว้ใน [/auth.md](https://deepworkplan.com/auth.md)
- **ฟรีและโอเพนซอร์ส** — เนื้อหาของเว็บไซต์และสกิล DWP อยู่ภายใต้สัญญาอนุญาต MIT
- **Machine-first** — JSON error แบบมีโครงสร้างบน `/api/*`, เนื้อหา 404 แบบกู้คืนด้วย Markdown, แค็ตตาล็อก API ตาม RFC 9727 และแมนิเฟสต์ความสามารถ ARD

## Endpoint

| วิธีการ | เส้นทาง | วัตถุประสงค์ |
|--------|------|---------|
| GET | `/openapi.json` | ข้อกำหนด OpenAPI 3.1 ของ agent API ทั้งหมด |
| GET | `/llms.txt` | ดัชนีคำแนะนำ LLM ที่คัดสรรแล้ว — จุดเริ่มต้นที่แนะนำ |
| GET | `/init.md` | พรอมต์การรับเอา DWP อย่างเป็นทางการ |
| GET | `/{page}.md` | หน้าใดก็ได้ในรูป Markdown ต้นฉบับ ครบทั้ง 17 ภาษา |
| GET | `/api/health.json` | ตัวบ่งชี้สถานะสุขภาพแบบคงที่ |
| POST | `/api/mcp` | MCP server (Streamable HTTP, stateless) |
| GET | `/.well-known/ai-catalog.json` | แมนิเฟสต์ความสามารถ ARD (agentmap) |

เส้นทาง `/api/*` ที่ไม่รู้จักจะคืน JSON error แบบมีโครงสร้างพร้อมคำแนะนำแก้ปัญหา ไม่เคยคืนหน้า error แบบ HTML

## MCP server

Model Context Protocol server แบบ stateless ผ่าน Streamable HTTP ที่ `https://deepworkplan.com/api/mcp` เครื่องมือแบบอ่านอย่างเดียวสามตัว:

- `get_init_prompt` — พรอมต์การรับเอา /init.md อย่างเป็นทางการ
- `list_site_sections` — แผนผังเว็บไซต์พร้อมคำอธิบายหนึ่งบรรทัด
- `read_page` — หน้าใดก็ได้ในรูป Markdown ต้นฉบับ เช่น `/init` หรือ `/es/methodology/01-manifesto`

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

รองรับเวอร์ชันโปรโตคอล 2025-03-26 และ 2025-06-18 และไม่ต้องมีเซสชัน แมนิเฟสต์: [/.well-known/mcp.json](https://deepworkplan.com/.well-known/mcp.json) การ์ด server: [/.well-known/mcp/server-card.json](https://deepworkplan.com/.well-known/mcp/server-card.json)

## Markdown สำหรับ agent

ทุกหน้าที่เรนเดอร์ถูกเผยแพร่เป็น Markdown ต้นฉบับ — ไม่ใช่การแปลงจาก HTML:

```bash
# Content negotiation on any URL
curl -s https://deepworkplan.com/methodology -H 'Accept: text/markdown'

# Or fetch the .md mirror directly — every page, every language
curl -s https://deepworkplan.com/es/developers.md
```

## ติดตั้งชุดเครื่องมือ

เส้นทางติดตั้งอย่างเป็นทางการของสกิล Deep Work Plan — คำสั่งเดียวกับที่ endpoint /init มอบให้ agent ใช้ได้กับ coding agent ใดก็ตามที่รองรับ skills (Claude Code, Cursor, Codex, Gemini และอื่น ๆ):

```bash
npx skills add DailybotHQ/deepworkplan-skill@latest
```

สกิลถูกฝังไปที่ `.agents/skills/deepworkplan/` ภายใน repository ของคุณ จึงทำให้ agent ทุกตัวที่แตะ repo นี้ใช้ระเบียบวิธีเดียวกัน

## ทรัพยากรที่อ่านได้ด้วยเครื่อง

- [สเปก OpenAPI](https://deepworkplan.com/openapi.json)
- [คำประกาศการเข้าถึงและการยืนยันตัวตนของ agent](https://deepworkplan.com/auth.md)
- [แค็ตตาล็อก API, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [แมนิเฟสต์ MCP](https://deepworkplan.com/.well-known/mcp.json)
- [ช่องทางติดต่อด้านความปลอดภัย](https://deepworkplan.com/.well-known/security.txt)
- [ตัวบอกรายละเอียด repo ของเว็บไซต์](https://deepworkplan.com/.well-known/dwp.json)
