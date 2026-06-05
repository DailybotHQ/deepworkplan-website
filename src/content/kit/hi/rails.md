---
title: Ruby on Rails
description: "Ruby on Rails एप्लिकेशन के लिए एक ऑनबोर्डिंग प्रीसेट, जिसमें MVC layout, migrations, test framework और asset तथा config pipeline के लिए तर्क-संकेत हैं।"
kind: preset
lang: hi
order: 10
stack: Ruby on Rails
---

# Ruby on Rails preset

एक तर्क-मार्गदर्शिका जिसे onboard प्रवाह Ruby on Rails एप्लिकेशन के लिए उपयोग करता है। यह एक चेकलिस्ट है, टेम्पलेट नहीं — पता लगाई गई वास्तविकता ही जीतती है।

## संकेत

- `rails` के साथ `Gemfile`, `bin/rails` executable, और `app/{models,controllers,views}` MVC layout।
- `config/routes.rb`, `db/migrate/` migrations, और `db/schema.rb`।
- Test framework को जो मौजूद हो उससे अनुमानित किया जाता है: RSpec (`spec/`, `.rspec`) या Minitest (`test/`)।

## किस बारे में तर्क करें

- वास्तविक test कमांड (`bin/rails test` या `bundle exec rspec`) और lint गेट (`rubocop`) — हूबहू दर्ज किए गए।
- Request → route → controller → model → view प्रवाह, migration workflow, और credentials तथा config कहाँ रहते हैं।
- Models, controllers, migrations, और (यदि मौजूद हों) jobs तथा mailers के लिए stack-उपयुक्त skills।

## टिप्पणियाँ

यह दर्ज करें कि क्या Active Job/Sidekiq और Hotwire/Turbo उपयोग में हैं, और encrypted credentials (`config/credentials`) कैसे प्रबंधित होते हैं।
