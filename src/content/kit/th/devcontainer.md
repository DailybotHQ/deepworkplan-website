---
title: Devcontainer
description: "แอดออนแบบเลือกใช้ที่สร้างบน devcontainer-kit ได้ dev container ของแต่ละ repository จากเทมเพลตเดียว เอเจนต์ผ่าน ak, Herdr สองทาง และไม่มี SSH key อยู่ข้างใน"
kind: addon
lang: th
order: 1
---

# แอดออน Devcontainer

มอบ dev container ที่ทำซ้ำได้และแยกสภาพแวดล้อมให้กับ repository ซึ่งทั้งคน editor และ coding agent ใช้ร่วมกันได้ ใน **DWP v7** (แพ็ก `v7.1.0`) แอดออนนี้ผสาน **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)** เข้ามา ซึ่งเป็นผลิตภัณฑ์ MIT ที่ทำงานได้แม้ไม่มี Deep Work Plan แอดออนนี้เป็นแบบเลือกใช้ repository หนึ่งสอดคล้องกับมาตรฐานได้อย่างสมบูรณ์แม้ไม่มีมัน

## สิ่งที่ devcontainer-kit มอบให้

- **เทมเพลต** ที่สร้างบนข้อกำหนด [Dev Containers](https://containers.dev) ซึ่ง `dck init` จะเรนเดอร์ลงใน repository ในโครงสร้างตายตัวแบบเดียว ได้แก่ `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` และ `dev.sh` หากรันอีกครั้งภายหลัง มันจะปรับให้สอดคล้องกันและไม่เขียนทับสิ่งที่คุณแก้ไขไว้เลย การเปลี่ยนแปลงใด ๆ ต่อไฟล์ที่มีอยู่จะแสดงให้เห็นก่อนและต้องได้รับความยินยอม
- **คอนเทนเนอร์ของ repository เอง** Dockerfile เริ่มจาก image ทางการของ runtime ที่ตรึงด้วย digest ได้แก่ `node-24`, `python-3.13` หรือ `debian` และคัดลอกขั้นตอน build ของชุดเครื่องมือไปไว้ที่ `docker/local/<service>/dck/` โดยไม่มี base image ที่ใช้ร่วมกันเข้ามาเกี่ยวข้องเลย
- **`dev.sh` และ `dck`** `bash dev.sh up` จะ build เริ่ม และเชื่อมต่อเข้าคอนเทนเนอร์จากเทอร์มินัลธรรมดา ส่วน `shell`, `rebuild`, `doctor` และคำสั่งอื่น ๆ ใช้งานได้ไม่ว่าจะมีหรือไม่มี VS Code หรือ Cursor ก็ตาม
- **Herdr สองทาง** [Herdr](https://herdr.dev) บนโฮสต์จะเชื่อมแต่ละคอนเทนเนอร์เข้ามาเป็นเครื่องหนึ่งผ่านเซิร์ฟเวอร์ SSH ที่รับเฉพาะ loopback และคอนเทนเนอร์จะเปิดขึ้นพร้อมแถบด้านข้างมาตรฐาน ได้แก่ Home, Editor, Development และ Agents ภายในคอนเทนเนอร์ [herdr-peers](/kit/herdr) ช่วยให้เอเจนต์ถามเอเจนต์ที่อยู่บนโฮสต์และในคอนเทนเนอร์อื่นได้
- **สกิล `dck-dockerfile`** เอเจนต์สร้างหรือสร้างคอนเทนเนอร์ของ repository ใหม่ตามคำขอ และพิสูจน์ผลด้วยการ build จริง

## การติดตั้ง

```bash
git clone --branch v0.2.1 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

ข้อกำหนด: `bash` 3.2 ขึ้นไปและ `python3` 3.11 ขึ้นไปบนโฮสต์ Linux หรือ macOS รวมถึง Docker พร้อม Compose v2 สำหรับคำสั่งเกี่ยวกับคอนเทนเนอร์ ตรวจสอบรีลีสด้วย asset `SHA256SUMS` ของรีลีสนั้น ให้ตรึงไว้ที่ `v0.2.1` เนื่องจาก `v0.2.0` ไม่ได้รับการสนับสนุน

| รายการ | ค่า |
|---|---|
| ผลิตภัณฑ์ | `DailybotHQ/devcontainer-kit` แท็ก `v0.2.1` อินเทอร์เฟซ 2 |
| คีย์ใน registry | `devcontainer` ใน `.dwp/config.json` |
| config ต่อ repository | `.devcontainer/dck.toml` |
| การตรวจจับ | `dck doctor --json` |

## เลเยอร์

ทุกคอนเทนเนอร์มีเครื่องมือพัฒนา ได้แก่ git, gh, ripgrep, เซิร์ฟเวอร์ SSH, Herdr และ herdr-peers โดยไม่มีความลับใด ๆ ส่วนที่เหลือเป็นเลเยอร์ที่คุณเลือกใน `dck.toml`:

| เลเยอร์ | ค่าเริ่มต้น | สิ่งที่เพิ่มเข้ามา |
|---|---|---|
| `agents` | ปิด | [coding-agents-kit](/kit/agentkit) จากรีลีสที่ผ่านการตรวจสอบ และ CLI ที่คุณระบุ โดยแต่ละตัวมีโวลุมถาวรของตัวเอง พร้อม preset `classic` (`claudex`, `codexx`, …) และ `providers` (`claude-glm`, `codex-azure`, …) เอเจนต์ทำงานแบบอัตโนมัติโดยค่าเริ่มต้น เพราะคอนเทนเนอร์คือ sandbox การเลือกไม่ใช้: ตั้ง `AGENTKIT_PERMISSIONS=ask` ใน `.env` ของ service |
| `editor` | เปิด | Neovim พร้อม [DeepWorkPlan Vim](/kit/vim) ที่ตรึงไว้ด้วยแท็ก หากปิดจะได้ editor แบบธรรมดา |
| `dailybot` | ปิด | Dailybot CLI สำหรับแอดออน dailybot |

การล็อกอิน `gh` การตั้งค่า Herdr และตัวตน git ยังคงอยู่หลัง `bash dev.sh rebuild`

## ค่าเริ่มต้นด้านความปลอดภัย

- ทุกพอร์ตที่เผยแพร่จะ bind กับ `127.0.0.1` เว้นแต่ `dck.toml` จะตั้งค่า `bind`
- git ผ่าน SSH จะใช้ SSH agent ของโฮสต์ผ่าน socket ของมัน ไม่ใช้ไฟล์ key และไม่เมานต์ `~/.ssh` หรือ `~/.gitconfig` เลย ตัวตน git มาจากค่า `DCK_GIT_*` ที่ `dck setup` กรอกให้
- SSH host key ถูกสร้างขึ้นขณะรันลงในโวลุมเฉพาะของแต่ละโปรเจกต์ ไม่ถูกฝังไว้ใน image เลย เซิร์ฟเวอร์รับเฉพาะ public key ไม่อนุญาตให้ล็อกอินเป็น root และไม่ใช้รหัสผ่าน
- เทมเพลตไม่เพิ่ม `cap_add` ไม่ใช้โหมด `privileged` และไม่เมานต์ Docker socket
- การดาวน์โหลดทุกครั้งถูกตรึงด้วยเวอร์ชันและตรวจสอบด้วย checksum ส่วน base image ถูกตรึงด้วย digest
- mesh ของ Herdr ที่ทำให้เอเจนต์ในคอนเทนเนอร์หนึ่งเข้าถึงคอนเทนเนอร์อื่นได้เปิดอยู่โดยค่าเริ่มต้น และมีเอกสารวิธีปิดไว้ใน threat model ของชุดเครื่องมือ

## หมายเหตุ

เป็นแบบเลือกใช้และไม่บังคับเสมอ repo หนึ่งสอดคล้องกับมาตรฐานได้อย่างสมบูรณ์แม้ไม่มีแอดออนแบบเลือกใช้ใดเลย v0.2 รองรับโฮสต์ Linux และ macOS ส่วน mesh ระหว่างคอนเทนเนอร์ต้องใช้ Docker Desktop
