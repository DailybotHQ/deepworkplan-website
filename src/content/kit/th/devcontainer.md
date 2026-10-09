---
title: Devcontainer
description: "แอดออนแบบเลือกใช้ที่สร้างบน devcontainer-kit ได้แก่ เทมเพลต Dev Containers ที่ dck init สร้างให้ base image ที่ไม่มีเอเจนต์ และเครื่อง Herdr ต่อคอนเทนเนอร์"
kind: addon
lang: th
order: 1
---

# แอดออน Devcontainer

มอบ dev container ที่ทำซ้ำได้และแยกสภาพแวดล้อมให้กับ repository ซึ่งทั้งคน editor และ coding agent ใช้ร่วมกันได้ ใน **DWP v7 beta** (`v7.0.0-beta.1` ซึ่งเป็นรุ่นก่อนเผยแพร่) แอดออนนี้ผสาน **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)** เข้ามา ซึ่งเป็นผลิตภัณฑ์ MIT ที่ทำงานได้แม้ไม่มี Deep Work Plan และมาแทนเทมเพลตที่ชุดแพ็กเคยมีมาให้ แอดออนนี้เป็นแบบเลือกใช้ repository หนึ่งสอดคล้องกับมาตรฐานได้อย่างสมบูรณ์แม้ไม่มีมัน

## สิ่งที่ devcontainer-kit มอบให้

- **เทมเพลต** ที่สร้างบนข้อกำหนด [Dev Containers](https://containers.dev) ซึ่ง `dck init` จะเรนเดอร์ลงใน repository ได้แก่ `devcontainer.json` ไฟล์ compose และ `docker/local/` หากรันอีกครั้งภายหลัง มันจะปรับให้สอดคล้องกันและไม่เขียนทับสิ่งที่คุณแก้ไขไว้เลย การเปลี่ยนแปลงใด ๆ ต่อไฟล์ที่มีอยู่จะแสดงให้เห็นก่อนและต้องได้รับความยินยอม
- **`dck`** ตัวเปิดที่รันคอนเทนเนอร์จากเทอร์มินัลธรรมดา ได้แก่ `setup`, `up`, `shell`, `ssh`, `rebuild`, `doctor` ไม่ว่าจะมีหรือไม่มี VS Code หรือ Cursor ก็ตาม
- **base image** สามแบบ ได้แก่ `python-3.13`, `node-24` และ `debian` ซึ่ง **ไม่มี** coding agent ติดมาด้วย
- **ไลบรารี entrypoint** สำหรับโวลุมถาวร SSH และ environment ของเซสชัน SSH แทนที่ entrypoint ที่ต้องคัดลอกด้วยมือในแต่ละ repository
- **เครื่อง Herdr** แต่ละคอนเทนเนอร์สามารถเข้าร่วม [Herdr](https://herdr.dev) ผ่านเซิร์ฟเวอร์ SSH ที่รับเฉพาะ loopback ทำให้เอเจนต์ภายในกลายเป็น peer ที่เข้าถึงได้

## การติดตั้ง

```bash
git clone --branch v0.1.4 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init
```

ข้อกำหนด: `bash` 3.2 ขึ้นไปและ `python3` 3.11 ขึ้นไปบนโฮสต์ Linux หรือ macOS รวมถึง Docker พร้อม Compose v2 สำหรับคำสั่งเกี่ยวกับคอนเทนเนอร์ ตรวจสอบรีลีสด้วย asset `SHA256SUMS` ของรีลีสนั้น

| รายการ | ค่า |
|---|---|
| ผลิตภัณฑ์ | `DailybotHQ/devcontainer-kit` แท็ก `v0.1.4` อินเทอร์เฟซ 1 |
| คีย์ใน registry | `devcontainer` ใน `.dwp/config.json` |
| config ต่อ repository | `.devcontainer/dck.toml` |
| การตรวจจับ | `dck doctor --json` |

## เลเยอร์เป็นแบบเลือกเปิด

base image มีเครื่องมือพัฒนา ได้แก่ git, gh, ripgrep, เซิร์ฟเวอร์ SSH, Herdr และ Neovim พร้อม DeepWorkPlan Vim ที่ตรึงไว้ด้วยแท็ก โดยไม่มี coding agent ไม่มี CLI สำหรับรายงาน และไม่มีความลับใด ๆ ส่วนอื่นทั้งหมดเป็นเลเยอร์ที่คุณเปิดใน `dck.toml`:

| เลเยอร์ | ค่าเริ่มต้น | สิ่งที่เพิ่มเข้ามา |
|---|---|---|
| `agents` | ปิด | ติดตั้ง [coding-agents-kit](/kit/agentkit) และ CLI ที่คุณระบุ โดยแต่ละตัวมีโวลุมถาวรของตัวเอง ไม่มีการตั้งแฟล็กข้ามสิทธิ์ใด ๆ |
| `editor` | เปิด | Neovim พร้อม DeepWorkPlan Vim หากปิดจะได้ editor แบบธรรมดา |

## ค่าเริ่มต้นด้านความปลอดภัย

- ทุกพอร์ตที่เผยแพร่จะ bind กับ `127.0.0.1` เว้นแต่ `dck.toml` จะตั้งค่า `bind`
- ส่งต่อ SSH agent จากโฮสต์ โดยไม่คัดลอก private key ของโฮสต์เข้าไปในคอนเทนเนอร์เลย
- SSH host key ถูกสร้างขึ้นขณะรันลงในโวลุมเฉพาะของแต่ละโปรเจกต์ ไม่ถูกฝังไว้ใน image เลย เซิร์ฟเวอร์รับเฉพาะ public key ไม่อนุญาตให้ล็อกอินเป็น root และไม่ใช้รหัสผ่าน
- เทมเพลตไม่เพิ่ม `cap_add` ไม่ใช้โหมด `privileged` และไม่เมานต์ Docker socket
- base image และเครื่องมือถูกตรึงด้วยเวอร์ชันและตรวจสอบด้วย checksum โดย compose จะอ้างอิง base image ด้วย digest ทุกครั้งที่สามารถ resolve digest ได้

## หมายเหตุ

เป็นแบบเลือกใช้และไม่บังคับเสมอ repo หนึ่งสอดคล้องกับมาตรฐานได้อย่างสมบูรณ์แม้ไม่มีแอดออนแบบเลือกใช้ใดเลย v0.1 รองรับโฮสต์ Linux และ macOS
