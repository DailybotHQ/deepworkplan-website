---
title: Dependency upgrade
description: "एक ऑप्ट-इन, package-manager-agnostic ऐडऑन जो रिपॉज़िटरी की dependencies को मान्य, प्रत्यावर्तनीय बैचों में अपग्रेड करता है, npm मानने के बजाय वास्तविक manager का पता लगाता है।"
kind: addon
lang: hi
order: 3
---

# Dependency-upgrade addon

एक बैच-आधारित, मान्य, प्रत्यावर्तनीय वर्कफ़्लो के साथ रिपॉज़िटरी की dependencies को अद्यतन करें। यह तीसरा ऑप्ट-इन Deep Work Plan ऐडऑन है।

## यह क्या जोड़ता है

- मौजूद manifest और lockfile से रिपॉज़िटरी के **वास्तविक** package manager (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, और बहुत कुछ) का पता लगाना।
- `.agents/commands/` में इंस्टॉल किया गया एक `/lib-upgrade` कमांड, **केवल स्वीकृत होने पर**।

## व्यवहार

1. एक स्वच्छ (या बैकअप किया हुआ) working tree आवश्यक है।
2. अपग्रेड को semver द्वारा वर्गीकृत करें — patch, minor, major; major के लिए स्पष्ट अनुमोदन आवश्यक है।
3. छोटे, सुसंगत बैचों में अपग्रेड करें; कभी एक साथ सभी नहीं।
4. प्रत्येक बैच के बाद रिपॉज़िटरी का वास्तविक validation gate चलाएं; विफल होने वाले किसी भी बैच को वापस लौटाएं।
5. सारांश दें कि क्या अपग्रेड किया गया, छोड़ा गया, और वापस लौटाया गया; डेवलपर को कमिट करने दें।

## टिप्पणियाँ

Package-manager agnostic — किसी गैर-JS रिपॉज़िटरी में कभी npm/ncu नहीं चलाता। ऑप्ट-इन, कभी आवश्यक नहीं, और कभी स्वतः कमिट नहीं करता।
