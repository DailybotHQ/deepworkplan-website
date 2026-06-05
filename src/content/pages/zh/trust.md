---
title: "信任与安全"
description: "为什么 Deep Work Plan 可以放心采用：开源且采用 MIT 许可、以 Markdown 为核心且无网络调用或遥测、非破坏性设计、安装可验证，并具有清晰的漏洞披露政策。"
lastUpdated: 2026-06-05
---

## 为什么可以信任它

没有人应该安装一个无法信任的技能。Deep Work Plan 生来就是可被验证的，而非依赖信念：开源、以 Markdown 为核心、非破坏性，且在运行之前就可以逐行核查。

- **开源且采用 MIT 许可** — 网站和技能均公开且可 diff；在运行之前阅读每一行。
- **以 Markdown 为核心——无网络调用，无遥测** — 没有 CLI、没有 HTTP API、没有认证流程；不发起任何网络调用，也不发送任何遥测数据。你的代码仓库中没有任何信息会离开你的机器。
- **非破坏性设计** — 唯一与安全相关的操作就是修改你的代码仓库，且是协调式的而非覆盖式的：检测已有内容，提出计划，在替换任何内容之前征求确认。计划输出存放在被 gitignore 的 `.dwp/` 目录中。
- **不涉及任何密钥** — 从不将密钥提交到版本控制，追加 `.gitignore` 而非重写它，每一处改动都以小巧、可读的 diff 呈现供审阅。
- **可验证的来源** — 每个发布版本都会为已发布的技能文件发布校验和。

---

## 运行前先验证

在完成核查之前，请将该技能视为不可信的。每个发布版本都会附带一份涵盖所有已发布技能文件的 `SHA256SUMS` 文件。下载你打算安装的版本所对应的文件，然后验证你的副本是否匹配——非零退出码意味着某个文件不匹配，此时应立即停止。

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git
cd deepworkplan-skill
# Download the checksums for the release you intend to install (replace vX.Y.Z):
curl -fsSL -o SHA256SUMS \
  https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
./setup.sh --verify        # non-zero exit means a file does not match — stop
```

发布版本有**校验和，但未经签名**——签名（cosign 或维护者 GPG）是已记录的下一步计划，而非当前的承诺。由于一切都是公开的，你也可以将任意文件与仓库在其 tag 处的内容进行比对。

---

## 报告漏洞

请私下发送邮件至 **security@dailybot.com** 进行报告，而非公开提交 issue。我们在 3 个工作日内确认收到报告，并根据严重程度争取在 30 天内为有效发现提供修复或缓解措施。网站和技能共享同一套政策。

---

## 诚实的局限性

- 发布版本有校验和，但尚未经过密码学签名——签名已在计划之中，尚未完成。
- Deep Work Plan 对你的代码仓库运行一个自主编码代理。请审阅它提出的计划和 diff；该方法论正是为这种审阅而设计的，而非取代它。
- 这里的信任声明仅描述官方来源。已偏离仓库的经修改或第三方副本不附带这些保证——请先验证。

---

## 信任资源

- [可机器读取的信任清单](https://deepworkplan.com/.well-known/dwp-trust.json)
- [security.txt（RFC 9116）](https://deepworkplan.com/.well-known/security.txt)
- [网站安全政策](https://github.com/DailybotHQ/deepworkplan-website/blob/main/SECURITY.md)
- [技能安全政策与威胁模型](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/SECURITY.md)
- [阅读方法论](/methodology)
- [采纳（Init）](/init)
