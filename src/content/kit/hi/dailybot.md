---
title: Dailybot
description: "ऑप्ट-इन DWP ऐडऑन: योजना जीवनचक्र को Dailybot टीम से जोड़ें, वैकल्पिक हुक प्रवर्तन, और पूर्ण Dailybot एजेंट स्किल 3.10.3 (चैट, चेक-इन, फ़ॉर्म, Ask AI, और अधिक)।"
kind: addon
lang: hi
order: 2
---

# Dailybot addon

Deep Work Plan निष्पादन को एक **Dailybot टीम** से जोड़ें ताकि लोग देख सकें कि एजेंट क्या बना रहे हैं — kickoff, योजना के बीच की प्रगति, ब्लॉकर, और पूर्णता — बिना मीटिंग या दूसरे टूलचेन के। पहले से [Dailybot](https://www.dailybot.com) उपयोग करने वाली टीमों के लिए एक **ऑप्ट-इन** ऐडऑन।

कोर Deep Work Plan पद्धति की Dailybot पर **शून्य** निर्भरता है। शून्य ऐडऑन वाली रिपॉज़िटरी पूर्णतः अनुरूप है। यह ऐडऑन केवल तभी प्रस्तावित करें जब डेवलपर या टीम पहले से Dailybot उपयोग करती हो; कभी सभी के लिए स्वतः इंस्टॉल न करें।

## कब उपयोग करें

| संकेत | कार्रवाई |
|--------|--------|
| टीम पहले से Dailybot उपयोग करती है (Slack, Teams, Discord, Google Chat, या डैशबोर्ड) | ऑनबोर्डिंग के दौरान **अनुशंसित** |
| डेवलपर एजेंट प्रगति दृश्यता या standup-शैली अपडेट माँगता है | ऐडऑन **प्रस्तावित** करें |
| Greenfield रिपॉज़िटरी, कोई Dailybot खाता नहीं | **छोड़ें** — vendor-neutral बेसलाइन पर्याप्त है |
| NDA के तहत क्लाइंट कार्य जहाँ प्रगति रिपॉज़िटरी से बाहर न जाए | **छोड़ें**, या स्थानीय kill-switch के रूप में `.dailybot/disabled` कमिट करें |

## यह ऐडऑन क्या जोड़ता है (जानबूझकर संकीर्ण)

DWP Dailybot ऐडऑन Dailybot को **दोबारा नहीं बनाता**। यह योजना निष्पादन को dailybot **`report`** sub-skill से जोड़ता है और वैकल्पिक रूप से harness हुक कमिट करता है। बाकी सब — इंस्टॉल, सहमति, authentication, लेखन शैली — आधिकारिक [Dailybot agent skill](https://github.com/DailybotHQ/agent-skill) (वर्तमान में **3.10.3**) को **सौंपा** जाता है।

### चार जीवनचक्र घटनाएँ

DWP `create` / `execute` के दौरान, ऐडऑन **चार best-effort एजेंट अपडेट** जोड़ता है। हर घटना सशर्त है (Dailybot मौजूद और प्रमाणित), non-blocking है, और `.dailybot/disabled` का सम्मान करती है।

| घटना | ट्रिगर | स्तर | आवश्यकता |
|-------|---------|-------|-------------|
| **Kickoff** | योजना materialized और स्वीकृत, या पहला `execute` टर्न | regular | SHOULD |
| **Significant task** | कोई फ़ीचर, बग फ़िक्स, या बड़ा refactor पूरा — setup chores नहीं | regular | MAY |
| **Blocked** | योजना रुकी; `state.json.blocked` भरा (`reason`, `needs`) | regular + blockers | SHOULD |
| **Completion** | सभी कार्य पूरे; योजना समाप्त | **milestone** | SHOULD |

Payload योजना की state परत (`state.json`) से निकाले जाते हैं जब मौजूद हो: `completed` परिणामों के रूप में (कार्य संख्या नहीं), `in_progress` वर्तमान कार्य से, `blockers` `state.json.blocked` से। संदेश **क्या बनाया गया और क्यों** वर्णन करता है — कभी फ़ाइल पथ, git stats, ब्रांच नाम, या योजना ID नहीं।

### वैकल्पिक हुक प्रवर्तन

`dailybot-cli >= 3.7.0` के साथ, ऐडऑन **रिपॉज़िटरी-स्तर harness हुक** (`dailybot hook session-start | activity | post-commit | stop | dismiss`) कमिट **कर सकता** है, जो स्थानीय per-repo बहीखाते द्वारा समर्थित हैं। Harness टर्न के अंत में याद दिलाता है जब कोई जीवनचक्र घटना छूट गई — लंबे unattended सत्रों के लिए महत्वपूर्ण जहाँ प्रॉम्प्ट निर्देश कमज़ोर पड़ जाते हैं।

सफल जीवनचक्र रिपोर्ट हुक बहीखाते को **रीसेट** करती है, इसलिए दो परतें कभी दोहरी रिपोर्ट नहीं करतीं। हुक कमांड केवल स्थानीय स्थिति पढ़ते हैं और हमेशा `0` से समाप्त होते हैं।

### रिपॉज़िटरी पहचान और रिपोर्ट नीति

वैकल्पिक रूप से `.dailybot/profile.json` (या टेम्पलेट के रूप में `.dailybot_example/profile.json`) कमिट करें ताकि हर योगदानकर्ता और एजेंट रिपोर्ट एक ही तरह से हस्ताक्षर करें। उस फ़ाइल में **कभी** credentials न रखें — `key` फ़ील्ड hard error है।

वही फ़ाइल रिपोर्ट नीति भी रख सकती है जिसका हुक सम्मान करते हैं:

```json
{
  "name": "my-repo-agent",
  "report": {
    "min_interval_minutes": 30,
    "nudge": true,
    "mode": "continuous"
  }
}
```

`"mode": "continuous"` विशेष रूप से research- या docs-heavy रिपॉज़िटरी के लिए उपयोगी है: non-commit कार्य (विश्लेषण, डिज़ाइन दस्तावेज़, योजनाएँ) जल्दी nudge होते हैं।

## इंस्टॉल (सब ऑप्ट-इन)

ऐडऑन इंस्टॉल पथ **प्रस्तावित** करता है; Dailybot स्किल सहमति और सत्यापन का स्वामी है।

| घटक | कमांड / पथ |
|-----------|----------------|
| **Dailybot agent skill** (अनुशंसित) | `npx skills add DailybotHQ/agent-skill` |
| **मौजूदा स्किल अपडेट** | `npx skills update dailybot` |
| **OpenClaw** | `openclaw skills install dailybot` |
| **Git clone** | `git clone https://github.com/DailybotHQ/agent-skill.git` + `./setup.sh` |
| **Dailybot CLI** (न्यूनतम `>= 3.7.0`) | स्किल द्वारा पहले उपयोग पर `shared/auth.md` के माध्यम से; या `pip install 'dailybot-cli>=3.7.0'`, Homebrew, या [cli.dailybot.com](https://cli.dailybot.com) पर checksum-verified installer |

संस्करण जाँचें: `dailybot --version` और `dailybot version --check`। अपग्रेड: `dailybot upgrade`।

## Authentication — सौंपा गया

यह ऐडऑन **कभी** email, OTP, या API keys नहीं माँगता, और **कभी** credentials संग्रहीत नहीं करता। Authentication Dailybot स्किल के [`shared/auth.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/shared/auth.md) का स्वामी है:

- `dailybot login` (email OTP), या
- `DAILYBOT_API_KEY` / `dailybot config key=...`, या
- एक ऑप्ट-इन, gitignored `.dailybot/env.json` per-repo key फ़ाइल (`dailybot env add/use`, CLI `>= 3.7.0`) ताकि एक डेवलपर अलग-अलग रिपॉज़िटरी में अलग-अलग orgs में साइन-इन रह सके।

Auth resolution **Bearer-first** है: session token को प्राथमिकता मिलती है, `401`/`403` पर पारदर्शी Bearer→API-key retry के साथ, ताकि कोई बासी token किसी वैध key को कभी अवरुद्ध न करे। यदि auth अस्वीकृत या अनुपलब्ध हो, रिपोर्टिंग चुपचाप छोड़ दी जाती है — कार्य जारी रहता है।

## जोड़ी गई Dailybot स्किल — 14 क्षमताएँ (3.10.3)

Dailybot agent skill इंस्टॉल करने से DWP ऐडऑन से कहीं अधिक मिलता है। आधिकारिक स्किल पैक (स्किल **3.10.3**, CLI बेसलाइन **>= 3.7.0**, वर्तमान publish **3.7.3**) **14 समन्वित sub-skills** प्रदान करता है:

| Sub-skill | क्या करता है |
|-----------|--------------|
| **Progress reports** | Dailybot डैशबोर्ड पर standup-शैली एजेंट अपडेट |
| **Ask the AI** | Dailybot AI सहायक से one-shot, headless क्वेरी |
| **Message polling** | सत्र शुरू या idle पर टीम निर्देश जाँचें |
| **Email** | अनिवार्य pre-send सुरक्षा जाँच के साथ ईमेल भेजें |
| **Chat** | Slack, Microsoft Teams, Discord, या Google Chat पर भेजें या संपादित करें — channels, DM, teams, report-style threads, send-as-user (Slack, admin) |
| **Conversations** | bot और नामित साथियों के साथ Slack group DM खोलें या पुनः उपयोग करें; उसी कॉल में रिपोर्ट पोस्ट करें |
| **Health and status** | लंबे सत्रों के लिए एजेंट online/offline घोषित करें |
| **Check-ins** | standup पूरे करें; चेक-इन **लेखन** (शेड्यूल, प्रतिभागी, प्रश्न, reminders, AI सेटिंग) |
| **Kudos** | साथियों या पूरे टीमों को पहचानें; recognition feed, org feed, wall of fame ब्राउज़ करें |
| **Teams** | टीमें सूचीबद्ध करें, सदस्यों का निरीक्षण करें, नामों को UUID में resolve करें; `me`, `org`, user profiles |
| **Forms** | फ़ॉर्म सूचीबद्ध करें (अब डिफ़ॉल्ट रूप से **org-scoped**, संकीर्ण करने के लिए `--mine` और `--owner` के साथ), submit, update, transition करें; फ़ॉर्म **लेखन** (workflow states, permissions, ChatOps); pagination, search, और date filters |
| **Workflows** | org workflows पढ़ें (`workflow list` / `workflow get`; read-only) |
| **Report channels** | फ़ॉर्म या चेक-इन के लिए channel UUID खोजें |
| **Per-repo API keys** | `.dailybot/env.json` प्रबंधित करें — प्रति environment API keys + URLs की एक ऑप्ट-इन, gitignored फ़ाइल (`dailybot env add / use / show / list / remove / off / on`, CLI `>= 3.7.0`) |

**DWP ऐडऑन केवल `report` को योजना निष्पादन में जोड़ता है।** बाकी सब के लिए Dailybot स्किल सीधे invoke करें — उदाहरण: `#releases` पर deploy सारांश पोस्ट करें, standup पूरा करें, या Dailybot AI से चेक-इन ट्रेंड सारांश माँगें।

सार्वजनिक संदर्भ: [dailybot.com/skill.md](https://www.dailybot.com/skill.md)। स्रोत: [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill)। Trust मॉडल: स्किल पैक में [`TRUST.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/TRUST.md)।

## व्यवहार — सौंपें, कभी अवरुद्ध न करें

| नियम | विवरण |
|------|--------|
| **सौंपें** | Dailybot स्किल इंस्टॉल, सहमति, auth, हुक टेम्पलेट, लेखन शैली का स्वामी |
| **कभी अवरुद्ध न करें** | CLI अनुपस्थित, auth विफल, नेटवर्क त्रुटि → एक बार चेतावनी, प्राथमिक कार्य जारी |
| **कोई retry नहीं** | diagnostic लूप में न जाएँ; रिपोर्टिंग best-effort है |
| **समाधान** | मौजूदा स्किल, CLI, profile, हुक, या रिपोर्ट wiring संरक्षित — केवल अंतर भरें |
| **Vendor-neutral** | DWP को Dailybot की आवश्यकता नहीं; यह ऐडऑन additive टीम दृश्यता है |

## ऑनबोर्डिंग प्रवाह

DWP `onboard` के दौरान **Phase 7b** में, कोर AI-first scaffolding के बाद, प्रवाह चार ऑप्ट-इन ऐडऑन प्रस्तावित करता है। यदि डेवलपर Dailybot स्वीकार करता है:

1. मौजूदा सेटअप पहचानें (स्किल, CLI, `.dailybot/profile.json`, हुक, रिपोर्ट चरण)।
2. Dailybot की सहमति प्रवाहों के माध्यम से स्किल/CLI इंस्टॉल प्रस्तावित करें।
3. Authentication `shared/auth.md` को सौंपें।
4. चार जीवनचक्र घटनाओं को `AGENTS.md` / `docs/AI_AGENT_COLLAB.md` में जोड़ें।
5. वैकल्पिक रूप से हुक प्रवर्तन और `.dailybot/profile.json` प्रस्तावित करें।
6. सत्यापन चलाएँ (स्किल के `addons/dailybot/SPEC.md` में SPEC §8)।

Deep Work Plan स्किल में normative अनुबंध: `addons/dailybot/SPEC.md` (संस्करण **2.3.0**)।

## संबंधित kit प्रविष्टियाँ

- [Devcontainer](/kit/devcontainer) — Dailybot CLI persistence के साथ reproducible dev environment (पहला ऐडऑन)
- [Dependency upgrade](/kit/dependency-upgrade) — बैच, सत्यापित dependency अपग्रेड (तीसरा ऐडऑन)
- [Design system](/kit/design-system) — इंटरफ़ेस सतहों के लिए एजेंट-सामना `DESIGN.md` (चौथा ऐडऑन)
- [Deep Work Plan onboard](/kit/deepworkplan-onboard) — ऐडऑन प्रस्तावित करने वाला onboarding sub-skill
