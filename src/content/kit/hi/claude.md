---
title: Claude Code
description: "Claude Code के लिए DWP अडैप्टर, जो नेटिव slash commands और skills के माध्यम से पूर्ण समर्थन देता है, जिसमें संपूर्ण फ़ीचर सेट हेतु subagents और team agents शामिल हैं।"
kind: adapter
lang: hi
order: 1
agent: Claude Code
support: full
prefix: /
---

# Claude Code adapter

Claude Code के पास नेटिव slash commands और skills के माध्यम से **पूर्ण** DWP समर्थन है।

## समर्थन स्तर

**पूर्ण** — सभी पाँच DWP कमांड नेटिव Claude Code slash commands से मैप होते हैं।

## इंस्टॉलेशन

DWP `.agents/skills/` के अंतर्गत skills के रूप में आता है (`.claude/` symlink के माध्यम से हल किया गया)। Claude Code उन्हें स्वतः खोज लेता है।

## आह्वान

`/` प्रीफ़िक्स का उपयोग करें:

```
/dwp-create <goal>
/dwp-execute
```

## टिप्पणियाँ

Claude Code skills, subagents, और team agents का समर्थन करता है — संपूर्ण DWP फ़ीचर सेट।
