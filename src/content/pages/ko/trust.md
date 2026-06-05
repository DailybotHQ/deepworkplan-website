---
title: "신뢰와 보안"
description: "Deep Work Plan을 안심하고 채택할 수 있는 이유: 오픈 소스이자 MIT 라이선스, 네트워크 호출이나 텔레메트리 없는 Markdown-first, 비파괴적 설계, 검증 가능한 설치, 그리고 명확한 취약점 공개 정책."
lastUpdated: 2026-06-05
---

## 왜 신뢰할 수 있는가

신뢰할 수 없는 스킬을 설치해서는 안 됩니다. Deep Work Plan은 맹목적인 믿음이 아니라 검증에 기반하도록 설계되었습니다. 오픈 소스, Markdown-first, 비파괴적이며, 실행하기 전에 확인할 수 있습니다.

- **오픈 소스이자 MIT 라이선스** — 웹사이트와 스킬은 모두 공개되어 있으며 diff 가능합니다. 실행하기 전에 모든 줄을 읽으세요.
- **Markdown-first — 네트워크 없음, 텔레메트리 없음** — CLI도, HTTP API도, 인증 흐름도 없습니다. 네트워크 호출을 하지 않으며 텔레메트리를 전송하지 않습니다. 리포지토리에 관한 어떤 정보도 사용자의 기기를 벗어나지 않습니다.
- **비파괴적 설계** — 유일한 보안 관련 작업은 리포지토리를 변경하는 것이며, 덮어쓰기가 아니라 조정합니다. 기존에 있는 것을 감지하고 계획을 제안한 뒤, 무언가를 교체하기 전에 확인을 요청합니다. 계획 출력은 gitignore된 `.dwp/` 디렉터리에 저장됩니다.
- **비밀 정보를 건드리지 않음** — 비밀 정보를 커밋하지 않으며, `.gitignore`를 덮어쓰는 대신 추가하고, 모든 변경은 작고 읽기 쉬운 diff로 검토할 수 있습니다.
- **검증 가능한 출처** — 모든 릴리스는 배포된 스킬에 대한 체크섬을 게시합니다.

---

## 실행 전에 검증

확인하기 전까지 스킬을 신뢰할 수 없는 것으로 취급하세요. 각 릴리스에는 배포된 스킬을 아우르는 `SHA256SUMS` 파일이 첨부됩니다. 설치하려는 버전의 파일을 다운로드한 뒤, 복사본이 일치하는지 검증하세요 — 비정상 종료 코드는 파일이 일치하지 않음을 의미하므로 중단해야 합니다.

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git
cd deepworkplan-skill
# Download the checksums for the release you intend to install (replace vX.Y.Z):
curl -fsSL -o SHA256SUMS \
  https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
./setup.sh --verify        # non-zero exit means a file does not match — stop
```

릴리스는 **체크섬으로 검증되며, 서명되지는 않았습니다** — 서명(cosign 또는 관리자 GPG)은 문서화된 다음 단계이지 현재의 주장이 아닙니다. 모든 것이 공개되어 있으므로, 임의의 파일을 해당 태그의 리포지토리와 diff로 비교할 수도 있습니다.

---

## 취약점 신고

공개 이슈를 열지 말고 **security@dailybot.com**으로 비공개 신고해 주세요. 신고는 영업일 기준 3일 이내에 확인하며, 유효한 발견에 대해서는 심각도에 따라 30일 이내에 수정 또는 완화 방안을 제공하는 것을 목표로 합니다. 웹사이트와 스킬은 동일한 정책을 공유합니다.

---

## 솔직한 한계

- 릴리스는 체크섬으로 검증되지만 아직 암호학적으로 서명되지 않았습니다 — 서명은 계획 중이며 아직 완료되지 않았습니다.
- Deep Work Plan은 자율적인 코딩 에이전트를 리포지토리에 대해 실행합니다. 제안된 계획과 diff를 검토하세요. 방법론은 그 검토를 위해 설계된 것이지, 검토를 대체하려는 것이 아닙니다.
- 여기의 신뢰 주장은 공식 소스만을 설명합니다. 리포지토리에서 벗어난 수정되거나 서드파티의 복사본에는 이러한 보증이 없습니다 — 먼저 검증하세요.

---

## 신뢰 리소스

- [기계 판독 가능한 신뢰 매니페스트](https://deepworkplan.com/.well-known/dwp-trust.json)
- [security.txt(RFC 9116)](https://deepworkplan.com/.well-known/security.txt)
- [웹사이트 보안 정책](https://github.com/DailybotHQ/deepworkplan-website/blob/main/SECURITY.md)
- [스킬 보안 정책 및 위협 모델](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/SECURITY.md)
- [방법론 읽기](/methodology)
- [채택(Init)](/init)
