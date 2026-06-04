---
title: Astro / Svelte
description: "Astro साइटों के लिए एक ऑनबोर्डिंग प्रीसेट, वैकल्पिक रूप से Svelte islands के साथ, जिसमें content collections, schema validation, और island hydration के लिए तर्क संकेत शामिल हैं।"
kind: preset
lang: hi
order: 3
stack: Astro / Svelte
---

# Astro / Svelte preset

एक तर्क मार्गदर्शिका जिसे onboard प्रवाह Astro साइटों के लिए उपयोग करता है, वैकल्पिक रूप से Svelte islands के साथ। यह एक चेकलिस्ट है, टेम्पलेट नहीं — पता लगाई गई वास्तविकता ही जीतती है।

## संकेत

- `astro.config.*`; वैकल्पिक रूप से `@astrojs/svelte` और `.svelte` कंपोनेंट।
- `src/content/` के अंतर्गत Zod schemas वाले Content Collections।

## किस बारे में तर्क करें

- वास्तविक lint, type-check (`astro check`), test, और build स्क्रिप्ट — हूबहू दर्ज किए गए।
- Content-collection schemas और island-hydration परिपाटियाँ (`client:load` के बजाय `client:visible`)।
- कंपोनेंट, पेज, और content entries के लिए स्टैक-उपयुक्त स्किल्स।

## टिप्पणियाँ

चुनिंदा इंटरैक्टिविटी के साथ Astro के island architecture का उपयोग करने वाली कंटेंट-संचालित साइटों के लिए उपयोगी।
