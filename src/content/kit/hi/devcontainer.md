---
title: Devcontainer
description: "एक ऑप्ट-इन ऐडऑन जो पता लगाए गए स्टैक से compose-आधारित devcontainer जोड़ता या समाधान करता है, जिसमें रीबिल्ड में टिकने वाला स्थायी AI-CLI auth होता है।"
kind: addon
lang: hi
order: 1
---

# Devcontainer addon

रिपॉज़िटरी में एक पुनरुत्पाद्य, पृथक dev container जोड़ें। यह पहला ऑप्ट-इन Deep Work Plan ऐडऑन है।

## यह क्या जोड़ता है

- एक compose-आधारित devcontainer, जिसका base image और सहायक सेवाएँ पता लगाए गए स्टैक से तर्क की गई होती हैं।
- स्थायी AI-CLI auth volumes (Claude, Codex, Cursor, gh, Dailybot) जो रीबिल्ड में टिके रहते हैं।
- `dailybot-project-network`, `DOCKER_DEV_ENV=vscode` परिपाटी, और validation aliases (`codecheck`, `check`, `fix`, `test`)।
- सार्वजनिक रिपॉज़िटरी के लिए, एक secret-निष्कासक `.dockerignore` और एक secret-मुक्त `.env.example`।

## व्यवहार

devcontainer का लगभग 85% एक स्थिर सामान्य ढाँचा है; शेष 15% — base image, उपयोगकर्ता, workspace फ़ोल्डर, सेवाएँ, ports, secrets — रिपॉज़िटरी के वास्तविक स्टैक से तर्क की जाती है। एक मौजूदा devcontainer को समाधान किया जाता है, कभी अधिलेखित नहीं किया जाता।

## टिप्पणियाँ

ऑप्ट-इन और कभी आवश्यक नहीं। एक रिपॉज़िटरी शून्य ऐडऑन के साथ पूरी तरह अनुरूप होती है।
