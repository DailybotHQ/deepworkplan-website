---
title: Ruby on Rails
description: "Ruby on Rails uygulamaları için MVC düzeni, taşımalar, test çerçevesi ve varlık ile yapılandırma hattına yönelik akıl yürütme ipuçları içeren bir onboarding ön ayarı."
kind: preset
lang: tr
order: 10
stack: Ruby on Rails
---

# Ruby on Rails ön ayarı

Onboarding akışının Ruby on Rails uygulamaları için kullandığı bir akıl yürütme kılavuzu. Bu bir şablon değil, bir kontrol listesidir — saptanan gerçeklik kazanır.

## Sinyaller

- `rails` içeren bir `Gemfile`, `bin/rails` çalıştırılabiliri ve `app/{models,controllers,views}` MVC düzeni.
- `config/routes.rb`, `db/migrate/` taşımaları ve `db/schema.rb`.
- Test çerçevesi var olana göre çıkarılır: RSpec (`spec/`, `.rspec`) veya Minitest (`test/`).

## Neyin üzerine akıl yürütülmeli

- Gerçek test komutu (`bin/rails test` veya `bundle exec rspec`) ve lint kapısı (`rubocop`) — birebir kaydedilir.
- İstek → rota → kontrolör → model → görünüm akışı, taşıma iş akışı ve kimlik bilgileri ile yapılandırmanın nerede tutulduğu.
- Modeller, kontrolörler, taşımalar ve (varsa) işler ile posta göndericiler için yığına uygun skill'ler.

## Notlar

Active Job/Sidekiq ve Hotwire/Turbo'nun kullanılıp kullanılmadığını ve şifrelenmiş kimlik bilgilerinin (`config/credentials`) nasıl yönetildiğini kaydedin.
