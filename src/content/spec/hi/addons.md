---
title: ऐडऑन
description: "DWP ऐडऑन: चार ऑप्ट-इन विस्तार (devcontainer, Dailybot, dependency-upgrade, design-system), आवश्यक AI Diff Reviewer स्थानीय समीक्षा अपनी वैकल्पिक CI सतह के साथ, ऐडऑन अनुबंध और kit अवधारणाएँ।"
order: 6
lang: hi
section: Addons
---

# ऐडऑन

**संस्करण 2.1.** ऐडऑन कोर Deep Work Plan पद्धति के विस्तार हैं। पाँच में से चार वैकल्पिक हैं और **अनुरूपता के लिए कभी आवश्यक नहीं** — शून्य वैकल्पिक ऐडऑन वाली रिपॉज़िटरी पूर्णतः AI-first और DWP-अनुरूप है। हर वैकल्पिक ऐडऑन ऑनबोर्डिंग के दौरान प्रस्तावित होता है, स्पष्ट रूप से स्वीकार या अस्वीकार होता है, और — स्वीकार होने पर — मौजूदा सेटअप को मिटाने के बजाय **समाधान** करता है। एक घटक घोषित अपवाद है: संस्करण 2.3.0 से **AI Diff Reviewer स्थानीय समीक्षा** आवश्यक baseline का हिस्सा है — ऑनबोर्डिंग इसे इंस्टॉल करती है और हर Final Review इसे चलाता है — जबकि इसकी CI सतह ऑप्ट-इन बनी रहती है।

## ऐडऑन अनुबंध

हर shipping ऐडऑन चार अनिवार्य घटक भेजता है:

| घटक | उद्देश्य |
|-----------|---------|
| **Spec** | RFC-2119 normative विवरण कि ऐडऑन क्या प्रदान करता है और "इस ऐडऑन के अनुरूप" का अर्थ |
| **Reasoning templates** | एजेंट लक्ष्य रिपॉज़िटरी के stack पर तर्क करके भरता है — copy-paste नहीं |
| **Onboarding hook** | `SKILL.md` प्रवेश बिंदु जिसे `onboard` प्रवाह डेवलपर के स्वीकार पर कॉल करता है |
| **Validation step** | चेकलिस्ट जो पुष्टि करती है कि ऐडऑन सही लागू हुआ |

खोज: `onboard` प्रवाह `skills/deepworkplan/addons/` को गिनता है और हर ऐडऑन को **Phase 7b** में ऑप्ट-इन चरण के रूप में प्रस्तुत करता है, कोर scaffolding के बाद।

## Shipping ऐडऑन (पाँच)

आज पाँच ऐडऑन ship होते हैं — चार ऑप्ट-इन साथ ही आवश्यक स्थानीय समीक्षा। हर एक का **kit catalog पृष्ठ** user-facing विवरण के साथ और Deep Work Plan स्किल के अंदर **normative spec** है।

### Devcontainer (पहला ऐडऑन)

पहचाने गए stack से तर्कित compose-आधारित `.devcontainer/` + `docker/` सेटअप।

- **Kit पृष्ठ:** [Devcontainer](/kit/devcontainer)
- **क्या जोड़ता है:** persistent AI-CLI auth volumes (Claude, Codex, Cursor, gh, Dailybot), `dailybot-project-network`, `DOCKER_DEV_ENV=vscode`, validation aliases (`codecheck`, `check`, `fix`, `test`), public-OSS secret hygiene
- **व्यवहार:** ~85% स्थिर skeleton; ~15% stack के अनुसार तर्कित। मौजूदा devcontainers समाधान होते हैं, कभी मिटाए नहीं जाते
- **कब प्रस्तावित:** अधिकांश रिपॉज़िटरी जहाँ Docker या isolated dev container लाभकारी सेवाएँ हों

### Dailybot (दूसरा ऐडऑन)

डेवलपर की **Dailybot टीम** से ऑप्ट-इन कनेक्शन एजेंट प्रगति दृश्यता के लिए।

- **Kit पृष्ठ:** [Dailybot](/kit/dailybot) — पूर्ण क्षमता संदर्भ
- **DWP ऐडऑन क्या जोड़ता है:** dailybot `report` sub-skill के माध्यम से चार योजना-जीवनचक्र रिपोर्ट (kickoff, significant task, blocked, completion); वैकल्पिक deterministic हुक प्रवर्तन (`dailybot hook`, CLI `>= 3.7.0`)
- **जोड़ी गई स्किल:** [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) (वर्तमान में **3.10.3**) इंस्टॉल करने से **14 क्षमताएँ** — Slack/Teams/Discord/Google Chat पर chat, check-ins, forms authoring, ask AI, kudos, per-repo API keys (`.dailybot/env.json`), email, और अधिक। DWP ऐडऑन केवल **report** जोड़ता है; अन्य क्षमताएँ Dailybot स्किल के माध्यम से सीधे invoke होती हैं
- **Auth:** पूर्णतः Dailybot स्किल को सौंपा (`dailybot login` या `DAILYBOT_API_KEY`); यह ऐडऑन कभी credentials संग्रहीत नहीं करता
- **Vendor-neutral guardrail:** कोर DWP की Dailybot पर **शून्य** निर्भरता; कभी सभी के लिए स्वतः इंस्टॉल न करें
- **कब प्रस्तावित:** डेवलपर या टीम पहले से Dailybot उपयोग करती हो, या स्पष्ट रूप से टीम रिपोर्टिंग माँगे

### Dependency upgrade (तीसरा ऐडऑन)

Package-manager-agnostic, बैच, सत्यापित, revertible dependency अपग्रेड।

- **Kit पृष्ठ:** [Dependency upgrade](/kit/dependency-upgrade)
- **क्या जोड़ता है:** रिपॉज़िटरी के **वास्तविक** manager का पता लगाता है (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, …), semver-वर्गीकृत बैचों में अपग्रेड, हर बैच के बाद रिपॉज़िटरी का validation gate, विफलताएँ revert, बिना auto-commit सारांश
- **कमांड:** स्वीकार होने पर केवल `/lib-upgrade` को `.agents/commands/` में इंस्टॉल करता है
- **कब प्रस्तावित:** lockfile मौजूद और dependency-heavy stack; केवल प्रासंगिक होने पर अनुशंसित

### Design system (चौथा ऐडऑन)

इंटरफ़ेस-सतह-दायरे वाला `DESIGN.md` जिसे कोई भी coding agent सुसंगत UI, CLI, या conversational आउटपुट के लिए पढ़ता है।

- **Kit पृष्ठ:** [Design system](/kit/design-system)
- **क्या जोड़ता है:** `docs/DESIGN.md` (`AGENTS.md` से संदर्भित) अधिकतम तीन **profiles** एक फ़ाइल में: **visual-ui** (rendered UI tokens और components), **cli-output** (semantic terminal styles, TTY/`NO_COLOR` degradation), **conversational** (voice, message anatomy, per-platform rendering plain-text fallbacks के साथ)
- **Profile strength:** visual-ui **पता चलने पर default-on**; cli-output और conversational **पता चलने पर अनुशंसित, हमेशा पूछे जाते हैं, कभी auto-applied नहीं**
- **कब प्रस्तावित:** केवल जब user-facing इंटरफ़ेस सतह पहचानी जाए — pure libraries, headless services, या infra-only रिपॉज़िटरी के लिए नहीं

### AI Diff Reviewer (पाँचवाँ ऐडऑन — आवश्यक स्थानीय समीक्षा, वैकल्पिक CI सतह)

**[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (marketplace **"AI Diff Reviewer"**, वर्तमान संस्करण **v2.0.0**) अनिवार्य Final Review सुरक्षा-जाँच को एक संरचित स्थानीय समीक्षा देता है, और वैकल्पिक रूप से CI में pull requests को गेट करता है। संस्करण 2.3.0 से **स्थानीय समीक्षा baseline का हिस्सा है**; केवल CI सतह ऑप्ट-इन है।

- **Kit पृष्ठ:** [AI Diff Reviewer](/kit/ai-diff-reviewer) — पूर्ण क्षमता संदर्भ
- **ऑनबोर्डिंग पर आवश्यक (Phase 7a):** vendored skill का tag-pinned इंस्टॉल (`npx --yes skills add DailybotHQ/ai-diff-reviewer@v2.0.0 --skill ai-diff-reviewer -y`) साथ ही repo के लिए ढाला गया `.review/extension.md` (`generate-extension` के माध्यम से), ऑनबोर्डिंग की सहमति के अंतर्गत; अनुपस्थित होने पर एक targeted harness upgrade दोनों को समाधान करता है; अस्वीकृति एक घोषित अपवाद के रूप में दर्ज होती है और इंस्टॉल होने तक `verify` उसकी रिपोर्ट करता है
- **हर Final Review में आवश्यक:** सुरक्षा-जाँच संचित change set पर upstream parent डिफ़ॉल्ट प्रवाह चलाती है और अपना आउटपुट `analysis_results/SECURITY_REVIEW.md` में जोड़ती है; अनुपस्थित skill या एक्सटेंशन एक दर्ज `local reviewer not installed` निष्कर्ष है — जब रन harness में लिख सकता हो तो इंस्टॉल किया जाता है — कभी चुपचाप नहीं छोड़ा जाता; एक पूर्ण पास के `critical` निष्कर्ष ठीक या स्पष्ट रूप से स्वीकृत होने तक पूर्णता को रोकते हैं
- **वैकल्पिक CI सतह (Flow B):** upstream `setup` sub-skill के माध्यम से `pr-review.yml` (`DailybotHQ/ai-diff-reviewer@v2`), साथ ही `apply-review` डेवलपर द्वारा इनवोक किए जाने वाले साथी के रूप में — स्पष्ट रूप से प्रस्तावित, बिना अनुरोध कभी इंस्टॉल नहीं, कभी डिफ़ॉल्ट नहीं, कभी प्लान टास्क नहीं
- **कभी अवरोधित नहीं (केवल इनवोकेशन):** एक स्थानीय समीक्षा जो शुरू हो सकती हो पर त्रुटि दे दे, तो एक बार चेतावनी दें, दर्ज करें, जारी रखें; वह उस कार्य को कभी विफल नहीं करती
- **समानता (Flow B):** साझा `prompt.md` + एक्सटेंशन पद्धति/गंभीरता संरेखित करते हैं; CI Iteration-Aware Review स्थानीय पास पूर्ण रहते हुए 2+ राउंड को छोटा कर सकता है
- **वेंडर-तटस्थ सुरक्षा:** कोई भी Deep Work Plan प्रवाह व्यावसायिक सेवा, CI प्रदाता या secret की आवश्यकता नहीं रखता — reviewer एक MIT, tag-pinned skill है जो डेवलपर के अपने coding agent द्वारा चलाया जाता है
- **अनुरूपता:** `verify` अनुपस्थित स्थानीय reviewer को संस्करण 2.3.0 या नए की घोषणा करने वाली रिपॉज़िटरी के लिए विफलता के रूप में, और legacy रिपॉज़िटरी के लिए harness-संस्करण निष्कर्ष के रूप में रिपोर्ट करता है

## Skills

Skills नाम से invoke की जाने वाली पुनः-प्रयोज्य प्रक्रियाएँ हैं। एक skill दोहराने योग्य workflow पैकेज करती है (tests चलाना, lint ठीक करना, component बनाना)।

पद्धति मूल sub-skills का छोटा समूह ship करती है। उनमें, **author** sub-skill रिपॉज़िटरी को **अपनी kit बढ़ाने** देती है: `/skill-create` और `/agent-create` के माध्यम से invoke, मौजूदा `.agents/` लेआउट और परिपाटियों पर तर्क, फिर नई skill, agent, या thin command delegator जो उनसे मेल खाता हो, और कैटलॉग sync रखता है। वही sub-skill Final Review के स्किल्स समाधान पास का समर्थन करती है।

Kit प्रविष्टि: [Skill create](/kit/skill-create), [Agent create](/kit/agent-create)।

## Agents

Agents परिभाषित भूमिका वाले विशेषीकृत workers हैं (reviewer, executor, architect)। वे `.agents/agents/` के अंतर्गत रहते हैं और `.agents/docs/` में catalog होते हैं।

## रखरखाव ऐडऑन

**dependency-upgrade** ऐडऑन (ऊपर) प्राथमिक रखरखाव ऐडऑन है। यह npm मानने के बजाय रिपॉज़िटरी के वास्तविक package manager पर तर्क करता है, semver द्वारा अपग्रेड वर्गीकृत करता है, सुरक्षित बैचों में अपग्रेड, हर बैच के बाद validation, विफल बैच revert।

## Design-system ऐडऑन

Shipping ऐडऑन के अंतर्गत [Design system](/kit/design-system) देखें। रिपॉज़िटरी-स्तर `DESIGN.md` per-feature तकनीकी डिज़ाइन दस्तावेज़ से अलग है: DWP की योजना README, कार्य acceptance criteria, और validation gates पहले से per-feature डिज़ाइन कवर करते हैं। design-system ऐडऑन टिकाऊ, repo-native **interface** डिज़ाइन संदर्भ भरता है।

## Presets

Presets DWP को विशिष्ट tech stack (Django, React, Go, Astro + Svelte, और अधिक) के अनुसार अनुकूलित करते हैं। [kit catalog](/kit) ब्राउज़ करें।

## Adapters

Adapters DWP कमांड्स को विशिष्ट agent की कमांड प्रणाली (Claude Code, Cursor, Codex, Gemini, Copilot, OpenClaw, और अन्य) से map करते हैं। Adapter प्रविष्टियाँ kit में हर agent नाम के अंतर्गत रहती हैं।

## Examples

Examples DWP को व्यवहार में दर्शाते हैं: before/after तुलना, नमूना योजनाएँ, case studies। [Examples](/examples) और [Dogfood this site](/kit/dogfood-this-site) देखें।

## अनुरूपता अनुस्मारक

रिपॉज़िटरी **शून्य** वैकल्पिक ऐडऑन के साथ पूर्णतः अनुरूप **होनी चाहिए**। ऐडऑन layered ऑप्ट-इन क्षमताएँ हैं — कभी पूर्वापेक्षाएँ नहीं। [Conformance](/spec/conformance) देखें।
