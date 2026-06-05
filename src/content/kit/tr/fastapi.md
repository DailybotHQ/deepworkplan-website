---
title: FastAPI
description: "FastAPI servisleri için yönlendiriciler, Pydantic modelleri, asenkron uç noktalar, bağımlılık enjeksiyonu ve test koşucusuna yönelik akıl yürütme ipuçları içeren bir onboarding ön ayarı."
kind: preset
lang: tr
order: 7
stack: FastAPI
---

# FastAPI ön ayarı

Onboarding akışının FastAPI servisleri için kullandığı bir akıl yürütme kılavuzu. Bu bir şablon değil, bir kontrol listesidir — saptanan gerçeklik kazanır.

## Sinyaller

- `pyproject.toml` / `requirements.txt` içinde `fastapi`, bir ASGI sunucusu (`uvicorn`, `gunicorn` ve `uvicorn.workers`) ve `app = FastAPI()` örneği.
- `APIRouter` modülleri, `async def` yol işlemleri ve Pydantic modelleri ya da `pydantic-settings`.
- Paket yöneticisi ve test koşucusu, var olan manifest ve kilit dosyasından çıkarılır.

## Neyin üzerine akıl yürütülmeli

- Gerçek test komutu (çoğunlukla `httpx`/`TestClient` ile `pytest`) ve lint/tür denetimi kapısı (`ruff`, `mypy`) — birebir kaydedilir.
- Yönlendirici yapısı, istek → bağımlılık → işleyici → yanıt modeli akışı ve ayarların ile sırların nerede tutulduğu.
- Senkron ve asenkron uç noktalar, olay döngüsündeki engelleyen çağrılar ve yönlendiriciler, şemalar ile bağımlılıklar için yığına uygun skill'ler.

## Notlar

Uygulamanın nasıl birleştirildiğini (`include_router`), çalıştırma komutunu (`uvicorn app.main:app`) ve Alembic'in taşımaları yönetip yönetmediğini kaydedin.
