---
title: ส่วนเสริม
description: "addon ของ DWP: สี่ส่วนขยายแบบเลือกใช้ (devcontainer, Dailybot, dependency-upgrade, design-system), การตรวจสอบในเครื่องของ AI Diff Reviewer ที่จำเป็นพร้อมพื้นผิว CI แบบเลือกใช้, สัญญา addon และแนวคิด kit"
order: 6
lang: th
section: Addons
---

# ส่วนเสริม

**เวอร์ชัน 4.0.0** ส่วนเสริมเป็นส่วนขยายของวิธีการ Deep Work Plan หลัก จากห้าตัวมีสี่ตัวเป็นแบบเลือกใช้และ **ไม่จำเป็นสำหรับการสอดคล้อง** — รีโพที่มี addon เลือกใช้ศูนย์ตัวก็ AI-first และสอดคล้อง DWP ครบ แต่ละ addon ที่เลือกใช้ถูกเสนอระหว่าง onboarding ยอมรับหรือปฏิเสธอย่างชัดเจน และเมื่อยอมรับจะ **กระทบกัน** กับการตั้งค่าที่มีแทนการทับล้าง หนึ่งองค์ประกอบเป็นข้อยกเว้นที่ประกาศไว้: ตั้งแต่มาตรฐาน 2.3.0 **การตรวจสอบในเครื่องของ AI Diff Reviewer** เป็นส่วนหนึ่งของพื้นฐานที่จำเป็น — onboarding ติดตั้งมันและทุก Final Review รันมัน — ส่วนพื้นผิว CI ของมันยังคงเป็นแบบเลือกใช้

## สัญญา addon

ทุก addon ที่จัดส่งมีสี่ส่วนประกอบบังคับ:

| ส่วนประกอบ | วัตถุประสงค์ |
|-----------|---------|
| **Spec** | คำอธิบาย normative แบบ RFC-2119 ว่า addon ให้อะไรและ "สอดคล้องกับ addon นี้" หมายถึงอะไร |
| **Reasoning templates** | แนวทางที่เอเจนต์เติมโดยให้เหตุผลจาก stack ของรีโพเป้าหมาย — ไม่ใช่ copy-paste |
| **Onboarding hook** | จุดเข้า `SKILL.md` ที่ขั้นตอน `onboard` เรียกเมื่อนักพัฒนายอมรับ |
| **Validation step** | เช็กลิสต์ยืนยันว่า addon ถูกนำไปใช้ถูกต้อง |

การค้นพบ: ขั้นตอน `onboard` นับ `skills/deepworkplan/addons/` และนำเสนอแต่ละ addon เป็นขั้นตอน opt-in ใน **Phase 7b** หลัง scaffolding หลัก

## Addon ที่จัดส่ง (ห้าตัว)

วันนี้มีห้า addon — สี่ตัวเลือกใช้บวกการตรวจสอบในเครื่องที่จำเป็น แต่ละตัวมี **หน้าแคตตาล็อก kit** พร้อมรายละเอียดสำหรับผู้ใช้ และ **spec normative** ภายใน skill Deep Work Plan

### Devcontainer (addon แรก)

การตั้งค่า `.devcontainer/` + `docker/` แบบ compose ที่ให้เหตุผลจาก stack ที่ตรวจพบ

- **หน้า kit:** [Devcontainer](/kit/devcontainer)
- **สิ่งที่เพิ่ม:** volume auth AI-CLI ถาวร (Claude, Codex, Cursor, gh, Dailybot) `dailybot-project-network` `DOCKER_DEV_ENV=vscode` alias การตรวจสอบ (`codecheck`, `check`, `fix`, `test`) สุขอนามัย secret แบบ public-OSS
- **พฤติกรรม:** ~85% โครงคงที่ ~15% ให้เหตุผลต่อ stack devcontainer ที่มีอยู่ถูกกระทบกัน ไม่ทับล้าง
- **เมื่อเสนอ:** รีโพส่วนใหญ่ที่มี Docker หรือบริการที่ได้ประโยชน์จาก dev container แยก

### Dailybot (addon ที่สอง)

การเชื่อม opt-in กับ **ทีม Dailybot** ของนักพัฒนาเพื่อมองเห็นความคืบหน้าของเอเจนต์

- **หน้า kit:** [Dailybot](/kit/dailybot) — อ้างอิงความสามารถครบ
- **สิ่งที่ DWP addon เชื่อม:** รายงาน lifecycle แผนสี่แบบ (kickoff, significant task, blocked, completion) ผ่าน sub-skill dailybot `report`; การบังคับใช้ hook แบบ deterministic แบบเลือกได้ (`dailybot hook`, CLI `>= 3.7.0`)
- **Skill คู่กัน:** ติดตั้ง [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) (ปัจจุบัน **3.10.3**) เปิด **14 ความสามารถ** — แชทบน Slack/Teams/Discord/Google Chat check-in การเขียนฟอร์ม ask AI kudos per-repo API keys (`.dailybot/env.json`) อีเมล และอื่นๆ DWP addon เชื่อมเฉพาะ **report** ความสามารถอื่นเรียกผ่าน skill Dailybot โดยตรง
- **Auth:** มอบหมายทั้งหมดให้ skill Dailybot (`dailybot login` หรือ `DAILYBOT_API_KEY`) addon นี้ไม่เก็บ credentials
- **Guardrail แบบ vendor-neutral:** DWP หลัก **ไม่พึ่งพา** Dailybot เลย อย่าติดตั้งอัตโนมัติให้ทุกคน
- **เมื่อเสนอ:** นักพัฒนาหรือทีมใช้ Dailybot อยู่แล้ว หรือขอการรายงานทีมอย่างชัดเจน

### Dependency upgrade (addon ที่สาม)

การอัปเกรด dependency แบบไม่ผูก package manager แบ่ง batch ตรวจสอบ และย้อนกลับได้

- **หน้า kit:** [Dependency upgrade](/kit/dependency-upgrade)
- **สิ่งที่เพิ่ม:** ตรวจ manager **จริง** ของรีโพ (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, …) อัปเกรดเป็น batch ตาม semver รัน validation gate ของรีโพหลังแต่ละ batch ย้อนเมื่อล้มเหลว สรุปโดยไม่ auto-commit
- **คำสั่ง:** ติดตั้ง `/lib-upgrade` ใน `.agents/commands/` เฉพาะเมื่อยอมรับ
- **เมื่อเสนอ:** เสนอให้ทุก repo ที่มี dependency ที่ประกาศไว้; ตัวมอบหมายแบบเฉื่อย `/lib-upgrade` จะติดตั้งภายใต้ความยินยอมของ onboarding เว้นแต่จะปฏิเสธอย่างชัดเจน — การติดตั้งไม่ได้รันการอัปเกรดใด ๆ

### Design system (addon ที่สี่)

`DESIGN.md` ขอบเขตพื้นผิวอินเทอร์เฟซที่ coding agent ใดๆ อ่านเพื่อ UI CLI หรือผลลัพธ์แบบสนทนาที่สอดคล้อง

- **หน้า kit:** [Design system](/kit/design-system)
- **สิ่งที่เพิ่ม:** `docs/DESIGN.md` (อ้างอิงจาก `AGENTS.md`) สูงสุดสาม **profile** ในไฟล์เดียว: **visual-ui** (โทเค็นและคอมโพเนนต์ UI ที่เรนเดอร์) **cli-output** (สไตล์เทอร์มินัลเชิงความหมาย การเสื่อม TTY/`NO_COLOR`) **conversational** (น้ำเสียง โครงสร้างข้อความ การเรนเดอร์ต่อแพลตฟอร์มพร้อม fallback ข้อความธรรมดา)
- **ความแรงของ profile:** การตรวจพบทำให้การเสนอเป็นข้อบังคับ ส่วนการติดตั้งควบคุมด้วยการยอมรับ ทั้งในโหมดมีคำแนะนำและโหมดไว้วางใจ — visual-ui **แนะนำอย่างหนักแน่นเมื่อตรวจพบ** cli-output และ conversational **แนะนำเมื่อตรวจพบ ถามเสมอ ไม่ auto-apply**
- **เมื่อเสนอ:** เฉพาะเมื่อตรวจพบพื้นผิวอินเทอร์เฟซสำหรับผู้ใช้ — ไม่ใช่ไลบรารีล้วน บริการ headless หรือรีโพ infra เท่านั้น

### AI Diff Reviewer (addon ที่ห้า — การตรวจสอบในเครื่องที่จำเป็น, พื้นผิว CI แบบเลือกใช้)

**[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (marketplace **"AI Diff Reviewer"** เวอร์ชันปัจจุบัน **v2.0.1**) ทำให้การตรวจสอบความปลอดภัยบังคับของ Final Review มีการตรวจสอบในเครื่องแบบมีโครงสร้าง และเลือกที่จะควบคุม pull request ใน CI ตั้งแต่มาตรฐาน 2.3.0 **การตรวจสอบในเครื่องเป็นส่วนหนึ่งของพื้นฐาน** สิ่งที่เป็นแบบเลือกใช้คือพื้นผิว CI เท่านั้น

- **หน้า kit:** [AI Diff Reviewer](/kit/ai-diff-reviewer) — ข้อมูลอ้างอิงความสามารถเต็มรูปแบบ
- **จำเป็นตั้งแต่ onboarding (Phase 7a):** ติดตั้ง vendored skill แบบตรึงแท็ก (`npx --yes skills add DailybotHQ/ai-diff-reviewer@v2.0.1 --skill ai-diff-reviewer -y`) พร้อม `.review/extension.md` ที่ปรับให้เข้ากับรีโพ (ผ่าน `generate-extension`) ภายใต้ความยินยอมของ onboarding; การอัปเกรด harness แบบเจาะจงกระทบทั้งสองเมื่อขาดหายไป; การปฏิเสธถูกบันทึกเป็นข้อยกเว้นที่ประกาศไว้และ `verify` รายงานจนกว่าจะถูกติดตั้ง
- **จำเป็นในทุก Final Review:** การตรวจสอบความปลอดภัยรันโฟลว์หลักเริ่มต้นของ upstream บนชุดการเปลี่ยนแปลงสะสมและผนวกผลลัพธ์เข้า `analysis_results/SECURITY_REVIEW.md` ท้องถิ่นของแผน (ภายในโฟลเดอร์ของแผนเอง ไม่ใช่ที่รูทของ repo); skill หรือส่วนขยายที่หายไปเป็นข้อค้นพบ `local reviewer not installed` ที่ถูกบันทึก — ไม่เคยข้ามอย่างเงียบ ๆ และไม่เคยเป็นการบูตสแตรปโดยไม่แจ้งล่วงหน้า: การติดตั้งเป็นของความยินยอมของ onboarding หรือการเรียกใช้ addon อย่างชัดเจน; ข้อค้นพบ `critical` จากการรันที่เสร็จสิ้นบล็อกการเสร็จสิ้นจนกว่าจะแก้ไขหรือได้รับการยอมรับอย่างชัดเจน
- **พื้นผิว CI แบบเลือกใช้ (Flow B):** `pr-review.yml` (`DailybotHQ/ai-diff-reviewer@v2`) ผ่าน sub-skill `setup` ต้นทาง พร้อม `apply-review` เป็นผู้ช่วยที่นักพัฒนาเรียกใช้ — เสนออย่างชัดเจน ไม่ติดตั้งเมื่อไม่ถูกขอ ไม่เคยเป็นค่าเริ่มต้น ไม่เคยเป็นไฟล์งานของแผน
- **ไม่บล็อก (เฉพาะการเรียก):** การตรวจสอบในเครื่องที่เริ่มได้แต่เกิดข้อผิดพลาดคือ เตือนครั้งเดียว-บันทึก-ดำเนินต่อ; มันไม่เคยทำให้งานล้มเหลว
- **ความเท่าเทียม (Flow B):** `prompt.md` ที่ใช้ร่วมกัน + ส่วนขยายจัดแนวระเบียบวิธีและระดับความรุนแรง; Iteration-Aware Review ของ CI อาจทำให้รอบที่ 2+ สั้นลงในขณะที่การรันในเครื่องยังคงสมบูรณ์
- **การป้องกันที่เป็นกลางต่อผู้ให้บริการ:** ไม่มีโฟลว์ Deep Work Plan ใดต้องการบริการเชิงพาณิชย์ ผู้ให้บริการ CI หรือ secret — ตัวรีวิวเวอร์เป็น skill ใบอนุญาต MIT แบบตรึงแท็กที่รันโดย coding agent ของนักพัฒนาเอง
- **การสอดคล้อง:** `verify` รายงานตัวรีวิวเวอร์ในเครื่องที่หายไปเป็นความล้มเหลวสำหรับรีโพที่ประกาศมาตรฐาน 2.3.0 หรือใหม่กว่า และเป็นข้อค้นพบเวอร์ชัน harness สำหรับรีโพ legacy

## Skills

Skills เป็นขั้นตอนที่ใช้ซ้ำได้ เรียกด้วยชื่อ skill ห่อ workflow ที่ทำซ้ำได้ (รันเทสต์ แก้ lint สร้างคอมโพเนนต์)

วิธีการจัดส่ง sub-skill หลักชุดเล็ก ในบรรดานั้น sub-skill **author** ให้รีโพ **ขยาย kit ของตนเอง**: เรียกผ่าน `/skill-create` และ `/agent-create` ให้เหตุผลจาก layout `.agents/` และแบบแปลงที่มี แล้วเขียน skill เอเจนต์ หรือ command delegator บางๆ ที่ตรงกัน และซิงก์แคตตาล็อก sub-skill เดียวกันหนุนหลังช่วงกระทบยอด skill ของ Final Review

รายการ kit: [Skill create](/kit/skill-create), [Agent create](/kit/agent-create)

## Agents

Agents เป็นผู้ทำงานเฉพาะทางที่มีบทบาทชัด (reviewer, executor, architect) อยู่ภายใต้ `.agents/agents/` และอยู่ในแคตตาล็อกที่ `.agents/docs/`

## Addon บำรุงรักษา

addon **dependency-upgrade** (ด้านบน) เป็น addon บำรุงรักษาหลัก ให้เหตุผลจาก package manager จริงของรีโพแทนการสมมติ npm จัดประเภทอัปเกรดตาม semver อัปเกรดเป็น batch ปลอดภัย รันการตรวจสอบหลังแต่ละ batch และย้อน batch ที่ล้มเหลว

## Addon design-system

ดู [Design system](/kit/design-system) ภายใต้ addon ที่จัดส่ง `DESIGN.md` ระดับรีโพต่างจากเอกสารออกแบบเทคนิคต่อฟีเจอร์: README แผน DWP เกณฑ์การยอมรับงาน และ validation gate ครอบคลุมการออกแบบต่อฟีเจอร์อยู่แล้ว addon design-system เติมบริบทการออกแบบ **อินเทอร์เฟซ** ถาวรแบบ repo-native

## Presets

Presets ปรับ DWP ให้เข้ากับ tech stack เฉพาะ (Django, React, Go, Astro + Svelte และอื่นๆ) เรียกดู [แคตตาล็อก kit](/kit)

## Adapters

Adapters แมปคำสั่ง DWP ไปยังระบบคำสั่งของเอเจนต์เฉพาะ (Claude Code, Cursor, Codex, Gemini, Copilot, OpenClaw และอื่นๆ) รายการ adapter อยู่ใน kit ภายใต้ชื่อแต่ละเอเจนต์

## Examples

Examples แสดง DWP ในทางปฏิบัติ: เปรียบเทียบก่อน/หลัง แผนตัวอย่าง กรณีศึกษา ดู [Examples](/examples) และ [Dogfood this site](/kit/dogfood-this-site)

## การเตือนเรื่องการสอดคล้อง

รีโพ **ต้อง** สอดคล้องครบด้วย addon **ศูนย์** ตัว addon เป็นความสามารถ opt-in แบบชั้น — ไม่ใช่เงื่อนไขเบื้องต้น ดู [Conformance](/spec/conformance)
