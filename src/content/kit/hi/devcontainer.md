---
title: Devcontainer
description: "devcontainer-kit पर आधारित एक वैकल्पिक ऐडऑन: dck init द्वारा रेंडर किया गया Dev Containers टेम्पलेट, एजेंट-रहित base images, और प्रति container Herdr मशीनें।"
kind: addon
lang: hi
order: 1
---

# Devcontainer addon

रिपॉज़िटरी को एक पुनरुत्पाद्य, पृथक development container दें — ऐसा, जिसका उपयोग लोग, एडिटर और कोडिंग एजेंट सभी कर सकें। **DWP v7 beta** (`v7.0.0-beta.1`, एक प्री-रिलीज़) में यह ऐडऑन **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)** को एकीकृत करता है — एक MIT उत्पाद जो Deep Work Plan के बिना भी काम करता है — और उस टेम्पलेट का स्थान लेता है जो पहले पैक के साथ आता था। यह वैकल्पिक है: इसके बिना भी एक रिपॉज़िटरी पूरी तरह अनुरूप होती है।

## devcontainer-kit क्या प्रदान करता है

- **एक टेम्पलेट**, जो [Dev Containers](https://containers.dev) विनिर्देश पर आधारित है और जिसे `dck init` रिपॉज़िटरी में रेंडर करता है: `devcontainer.json`, एक compose फ़ाइल और `docker/local/`। बाद में दोबारा चलाने पर यह समाधान (reconcile) करता है और आपके संपादनों को कभी अधिलेखित नहीं करता; किसी मौजूदा फ़ाइल में हर बदलाव पहले दिखाया जाता है और उसके लिए सहमति आवश्यक है।
- **`dck`**, एक लॉन्चर जो container को एक सामान्य टर्मिनल से चलाता है — `setup`, `up`, `shell`, `ssh`, `rebuild`, `doctor` — VS Code या Cursor के साथ या उनके बिना।
- तीन प्रकारों में **base images**: `python-3.13`, `node-24` और `debian`, जो कोडिंग एजेंटों के **बिना** आते हैं।
- हर रिपॉज़िटरी के लिए हाथ से कॉपी किए गए entrypoint के बजाय, स्थायी volumes, SSH और SSH सत्रों के environment के लिए **एक entrypoint लाइब्रेरी**।
- **Herdr मशीनें।** हर container केवल loopback पर सुनने वाले SSH सर्वर के माध्यम से [Herdr](https://herdr.dev) से जुड़ सकता है, जिससे उसके भीतर के एजेंट पहुँच योग्य पीयर बन जाते हैं।

## इंस्टॉल

```bash
git clone --branch v0.1.4 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init
```

आवश्यकताएँ: Linux या macOS होस्ट पर `bash` 3.2 या नया और `python3` 3.11 या नया, तथा container कमांड के लिए Compose v2 के साथ Docker। किसी रिलीज़ को उसके `SHA256SUMS` asset से सत्यापित करें।

| मद | मान |
|---|---|
| उत्पाद | `DailybotHQ/devcontainer-kit`, tag `v0.1.4`, इंटरफ़ेस 1 |
| रजिस्ट्री कुंजी | `.dwp/config.json` में `devcontainer` |
| प्रति-रिपॉज़िटरी config | `.devcontainer/dck.toml` |
| पहचान | `dck doctor --json` |

## परतें opt-in हैं

base images में development टूल होते हैं — git, gh, ripgrep, एक SSH सर्वर, Herdr, और tag पर पिन किए गए DeepWorkPlan Vim के साथ Neovim — और कोई कोडिंग एजेंट, कोई रिपोर्टिंग CLI और कोई secret नहीं। बाकी सब कुछ एक परत है जिसे आप `dck.toml` में चालू करते हैं:

| परत | डिफ़ॉल्ट | यह क्या जोड़ती है |
|---|---|---|
| `agents` | बंद | [coding-agents-kit](/kit/agentkit) और आपके द्वारा सूचीबद्ध CLI इंस्टॉल करती है, हर एक के अपने स्थायी volume के साथ। कोई अनुमति-बायपास फ़्लैग सेट नहीं किया जाता। |
| `editor` | चालू | DeepWorkPlan Vim के साथ Neovim; बंद करने पर एक सामान्य एडिटर मिलता है। |

## सुरक्षा डिफ़ॉल्ट

- हर प्रकाशित port `127.0.0.1` से बाइंड होता है, जब तक `dck.toml` में `bind` सेट न हो।
- होस्ट से SSH agent forwarding; होस्ट की निजी कुंजियाँ कभी किसी container में कॉपी नहीं की जातीं।
- SSH होस्ट कुंजियाँ runtime पर प्रति-प्रोजेक्ट volume में उत्पन्न की जाती हैं, कभी image में पहले से शामिल नहीं की जातीं; सर्वर केवल सार्वजनिक कुंजियाँ स्वीकार करता है, कोई root लॉगिन नहीं और कोई पासवर्ड नहीं।
- टेम्पलेट कोई `cap_add`, कोई `privileged` मोड और कोई Docker socket नहीं जोड़ता।
- base images और टूल संस्करण पर पिन किए जाते हैं और checksum से सत्यापित होते हैं; जब भी digest का समाधान हो सके, compose base image को digest द्वारा संदर्भित करता है।

## टिप्पणियाँ

वैकल्पिक और कभी आवश्यक नहीं। एक रिपॉज़िटरी शून्य वैकल्पिक ऐडऑन के साथ पूरी तरह अनुरूप होती है। v0.1 Linux और macOS होस्ट का समर्थन करता है।
