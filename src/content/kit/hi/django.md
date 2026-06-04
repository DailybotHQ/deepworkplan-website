---
title: Django
description: "Django प्रोजेक्ट्स के लिए एक ऑनबोर्डिंग प्रीसेट, जिसमें apps, migrations, settings, management commands, और test runner के लिए तर्क संकेत शामिल हैं।"
kind: preset
lang: hi
order: 1
stack: Django
---

# Django preset

एक तर्क मार्गदर्शिका जिसे onboard प्रवाह Django प्रोजेक्ट्स के लिए उपयोग करता है। यह एक चेकलिस्ट है, टेम्पलेट नहीं — पता लगाई गई वास्तविकता ही जीतती है।

## संकेत

- `manage.py` और `settings.py`; `models.py`, `views.py`, `migrations/` वाले apps।
- मौजूद manifest और lockfile से अनुमानित package manager और test runner।

## किस बारे में तर्क करें

- वास्तविक test कमांड (अक्सर `python manage.py test` या `pytest`) और कोई भी lint/type-check gate — हूबहू दर्ज किया गया।
- App और migration परिपाटियाँ, settings व environment लेआउट, और management-command पैटर्न।
- apps, models, views, और migrations के लिए स्टैक-उपयुक्त स्किल्स।

## टिप्पणियाँ

मानक प्रोजेक्ट लेआउट का पालन करने वाले Django apps के लिए उपयोगी।
