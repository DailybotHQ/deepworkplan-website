---
title: Devcontainer
description: "हर रिपॉज़िटरी के लिए एक ही टेम्पलेट से दोहराने योग्य डेव कंटेनर: ak से आपके होस्ट खातों पर एजेंट, दोनों दिशाओं में जुड़ा Herdr, और अंदर कोई SSH कुंजी नहीं।"
kind: addon
lang: hi
order: 1
---

# Devcontainer addon

रिपॉज़िटरी को एक पुनरुत्पाद्य, पृथक development container दें — ऐसा, जिसका उपयोग लोग, एडिटर और कोडिंग एजेंट सभी कर सकें। **DWP v7** (पैक `v7.5.1`) में यह ऐडऑन **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)** को एकीकृत करता है — एक MIT उत्पाद जो Deep Work Plan के बिना भी काम करता है। यह वैकल्पिक है: इसके बिना भी एक रिपॉज़िटरी पूरी तरह अनुरूप होती है।

## devcontainer-kit क्या प्रदान करता है

- **एक टेम्पलेट**, जो [Dev Containers](https://containers.dev) विनिर्देश पर आधारित है और जिसे `dck init` रिपॉज़िटरी में एक निश्चित लेआउट में रेंडर करता है: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` और `dev.sh`। बाद में दोबारा चलाने पर यह समाधान (reconcile) करता है और आपके संपादनों को कभी अधिलेखित नहीं करता; किसी मौजूदा फ़ाइल में हर बदलाव पहले दिखाया जाता है और उसके लिए सहमति आवश्यक है।
- **रिपॉज़िटरी का अपना container।** Dockerfile runtime की आधिकारिक image से शुरू होता है, जो digest पर पिन की गई है — `node-24`, `python-3.13` या `debian` — और kit के build चरणों को `docker/local/<service>/dck/` में कॉपी करता है। कोई साझा base image शामिल नहीं है।
- **`dev.sh` और `dck`।** `bash dev.sh up` एक सामान्य टर्मिनल से container को build करता है, शुरू करता है और उससे जुड़ता है; `shell`, `rebuild`, `doctor` और बाकी कमांड VS Code या Cursor के साथ या उनके बिना काम करती हैं।
- **दोनों दिशाओं में Herdr।** होस्ट का [Herdr](https://herdr.dev) हर container को केवल loopback पर सुनने वाले SSH सर्वर के माध्यम से एक मशीन के रूप में जोड़ता है, और container मानक साइडबार के साथ खुलता है: App, Editor, Development और Agents। हर workspace और pane, बाद में खोले गए भी, ऐप पाथ (डिफ़ॉल्ट रूप से `/app`) में शुरू होते हैं। भीतर, [herdr-peers](/kit/herdr) एजेंटों को होस्ट पर और दूसरे containers में मौजूद एजेंटों से पूछने देता है।
- **`dck-dockerfile` skill।** एक एजेंट अनुरोध पर किसी रिपॉज़िटरी का container बनाता या दोबारा उत्पन्न करता है और उसे एक वास्तविक build से सिद्ध करता है।

## इंस्टॉल

```bash
git clone --branch v0.2.11 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

आवश्यकताएँ: Linux या macOS होस्ट पर `bash` 3.2 या नया और `python3` 3.11 या नया, तथा container कमांड के लिए Compose v2 के साथ Docker। किसी रिलीज़ को उसके `SHA256SUMS` asset से सत्यापित करें। `v0.2.11` पिन करें: `v0.2.0` समर्थित नहीं है।

| मद | मान |
|---|---|
| उत्पाद | `DailybotHQ/devcontainer-kit`, tag `v0.2.11`, इंटरफ़ेस 2 |
| रजिस्ट्री कुंजी | `.dwp/config.json` में `devcontainer` |
| प्रति-रिपॉज़िटरी config | `.devcontainer/dck.toml` |
| पहचान | `dck doctor --json` |

## परतें

हर container में development टूल होते हैं — git, gh, ripgrep, एक SSH सर्वर, Herdr और herdr-peers — और कोई secret नहीं, जब तक आप [होस्ट खातों](#कंटेनर-के-अंदर-होस्ट-खाते) को opt-in न करें। बाकी सब एक परत है जिसे आप `dck.toml` में चुनते हैं:

| परत | डिफ़ॉल्ट | यह क्या जोड़ती है |
|---|---|---|
| `agents` | बंद | सत्यापित रिलीज़ से [coding-agents-kit](/kit/agentkit) और आपके द्वारा सूचीबद्ध CLI, हर एक अपने स्थायी volume के साथ, साथ ही `classic` (`claudex`, `codexx`, …) और `providers` (`claude-glm`, `codex-azure`, …) presets। एजेंट डिफ़ॉल्ट रूप से स्वायत्तता में चलते हैं — container ही sandbox है। opt-out: service की `.env` में `AGENTKIT_PERMISSIONS=ask`। |
| `editor` | चालू | tag पर पिन किए गए [DeepWorkPlan Vim](/kit/vim) के साथ Neovim; बंद करने पर एक सामान्य एडिटर मिलता है। |
| `dailybot` | बंद | dailybot ऐडऑन के लिए Dailybot CLI। |

लॉगिन, `gh`, Herdr कॉन्फ़िगरेशन और git पहचान `bash dev.sh rebuild` के बाद भी बने रहते हैं।

## मशीनों के पार एजेंट

`v0.2.3` से, Docker Desktop पर `dck up` बिना किसी मैनुअल चरण के एक दो-तरफ़ा mesh जोड़ देता है:

- **Container और होस्ट।** भीतर के एजेंट होस्ट पर, हर दूसरे dck container में और उन अन्य loopback containers में मौजूद Herdr एजेंटों तक पहुँचते हैं जिन्हें आपके होस्ट का Herdr पहले से प्रबंधित करता है — और वे भी वापस पहुँचते हैं। हर पीयर एक पिन की हुई होस्ट कुंजी रखता है; पहले उपयोग पर किसी पर भरोसा नहीं किया जाता।
- **एक वैकल्पिक होस्ट listener।** `dck setup` एक बार, `127.0.0.1` पर एक उपयोगकर्ता-स्तरीय SSH सर्वर प्रस्तावित करता है जो केवल dck कुंजी स्वीकार करता है और जिसे launchd (macOS) चालू रखता है। यदि आप पहले से कोई loopback listener चलाते हैं, तो होस्ट प्रोफ़ाइल को उसी की ओर इंगित करें। `dck host listener disable` उसे हटा देता है।
- **Rebuild के बाद भी बना रहता है।** Container का Herdr मशीन कैटलॉग एक volume पर रहता है, इसलिए `bash dev.sh rebuild` भीतर पंजीकृत हर मशीन को बनाए रखता है।
- **होस्ट से भी जवाब।** `dck setup` होस्ट पर एक सत्यापित [herdr-peers](/kit/herdr) इंस्टॉल करता है, इसलिए `dck agents` और `dck ask` वहाँ भी काम करते हैं, और होस्ट के एजेंट `herdr-peers reply` से उत्तर देते हैं।
- **वे containers जिन्हें kit ने नहीं बनाया।** वे जिन सार्वजनिक कुंजियों से लॉगिन करते हैं, उन्हें अपनी होस्ट प्रोफ़ाइल में `[ssh] authorized_extra` के अंतर्गत सूचीबद्ध करें, और वे भी dck containers तक पहुँच सकेंगे।

होस्ट और container दोनों में इसे [coding-agents-kit](/kit/agentkit) के साथ जोड़ें, और वही `ak` दोनों ओर एजेंट लॉन्च करता है।

## कंटेनर के अंदर होस्ट खाते

एक कंटेनर उन खातों का उपयोग कर सकता है जो होस्ट पर आपके पास पहले से हैं, उसी तरह जैसे git पहले से होस्ट के SSH agent के माध्यम से काम करता है, अंदर किसी लॉगिन के बिना। यह opt-in है और आपकी **होस्ट प्रोफ़ाइल** में रहता है, कभी किसी रिपॉज़िटरी की `dck.toml` में नहीं:

```toml
[agents]
host_profiles = true          # default false
host_env_keys = ["ZAI_CODING_API_KEY"]   # allow-list of env names to share
```

`host_profiles` चालू होने पर, `dck up` केवल उन CLI की प्रोफ़ाइलें साझा करता है जिन्हें रिपॉज़िटरी इंस्टॉल करती है:

- **Claude Code** हर प्रोफ़ाइल के लिए एक दीर्घकालिक टोकन से: `@default` के लिए `CLAUDE_CODE_OAUTH_TOKEN` और `@name` के लिए `CLAUDE_CODE_OAUTH_TOKEN_<SUFFIX>` (suffix बड़े अक्षरों में, और `A-Z`, `0-9` तथा `_` के बाहर का हर अक्षर `_` में बदला हुआ)।
- **Codex** अपनी auth फ़ाइल से, `@default` के लिए और हर प्रोफ़ाइल के लिए।
- **kit की env फ़ाइल**, केवल-पढ़ने योग्य और `host_env_keys` के नामों तक सीमित।

पूरी agentkit home कभी mount नहीं की जाती, और जिन प्रोफ़ाइलों में होस्ट के absolute पथ हैं उन्हें छोड़ दिया जाता है। read-write साझा किया गया Codex लॉगिन एक साथ दो लेखकों द्वारा रीफ़्रेश किया जा सकता है: हर Codex खाते पर एक ही सक्रिय एजेंट रखें। कंटेनर के अंदर, वही `ak <kind> @<profile>` होस्ट वाले खाते पर ही चलता है, और यही एक लीड को कंटेनर लेन को वे खाते सौंपने देता है जिन्हें `ak pick` ने चुना — देखें [कई एजेंट चलाना](/methodology/06-orchestration)।

## सुरक्षा डिफ़ॉल्ट

- हर प्रकाशित port `127.0.0.1` से बाइंड होता है, जब तक `dck.toml` में `bind` सेट न हो।
- SSH पर git होस्ट के SSH agent से होकर जाता है — उसका socket, कभी कोई कुंजी फ़ाइल नहीं और कभी mount किया गया `~/.ssh` या `~/.gitconfig` नहीं। git पहचान `DCK_GIT_*` मानों से आती है, जिन्हें `dck setup` भरता है।
- SSH होस्ट कुंजियाँ runtime पर प्रति-प्रोजेक्ट volume में उत्पन्न की जाती हैं, कभी image में पहले से शामिल नहीं की जातीं; सर्वर केवल सार्वजनिक कुंजियाँ स्वीकार करता है, कोई root लॉगिन नहीं और कोई पासवर्ड नहीं।
- टेम्पलेट कोई `cap_add`, कोई `privileged` मोड और कोई Docker socket नहीं जोड़ता।
- हर डाउनलोड संस्करण पर पिन किया जाता है और checksum से सत्यापित होता है; base image digest पर पिन की जाती है।
- Herdr mesh, जो एक container के एजेंटों को दूसरों तक पहुँचने देता है, डिफ़ॉल्ट रूप से चालू है और kit के threat model में उसे बंद करने के तरीकों के साथ प्रलेखित है। होस्ट listener किसी चल रहे container के कोड को आपके रूप में होस्ट पर shell खोलने देता है: यह opt-in है, केवल loopback पर है, केवल dck कुंजी स्वीकार करता है और `dck host listener disable` से हट जाता है।

## टिप्पणियाँ

वैकल्पिक और कभी आवश्यक नहीं। एक रिपॉज़िटरी शून्य वैकल्पिक ऐडऑन के साथ पूरी तरह अनुरूप होती है। v0.2 Linux और macOS होस्ट का समर्थन करता है; containers के बीच mesh के लिए Docker Desktop आवश्यक है।
