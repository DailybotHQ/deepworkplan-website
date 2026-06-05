/**
 * ko translations
 *
 * Scaffolded from en.ts — translate every string value in place.
 * Follow analysis_results/TRANSLATION_STYLE_GUIDE.md. Do NOT translate:
 * code, paths, command names, or the https://deepworkplan.com/init.md URL.
 */

import type { SiteTranslations } from './types';

export const ko: SiteTranslations = {
  // Site metadata
  siteTitle: 'Deep Work Plan',
  siteTitleFull: 'Deep Work Plan — AI 코딩 에이전트를 위한 구조화된 실행',
  siteDescription:
    'Deep Work Plan: 구조화되고 검증 가능하며 재개할 수 있는 장시간 AI 에이전트 실행을 위한 오픈 방법론이자 레퍼런스 키트.',

  // Navigation
  nav: {
    home: '홈',
    about: '소개',
    contact: '문의',
    // Deep Work Plan IA
    methodology: '방법론',
    spec: '스펙',
    kit: '키트',
    examples: '예시',
    init: 'Init',
    quickstart: '빠른 시작',
    trust: '신뢰',
    github: 'GitHub',
    repo: {
      label: '소스 코드',
      website: '웹사이트 저장소',
      websiteDesc: '이 사이트',
      skill: '스킬 저장소',
      skillDesc: '설치 가능한 스킬',
    },
    menu: '메뉴 열기',
    closeMenu: '메뉴 닫기',
  },

  // Footer
  footer: {
    copyright: 'Deep Work Plan',
    allRightsReserved: '모든 권리 보유.',
    poweredBy: 'Powered by',
  },

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: '사이트 내비게이션',
    sections: {
      methodology: '방법론',
      getStarted: '시작하기',
      project: '프로젝트',
      connect: '연결',
    },
  },

  // Deep Work Plan homepage
  home: {
    meta: {
      title: 'Deep Work Plan — AI 코딩 에이전트를 위한 구조화된 실행',
      description:
        '모델보다 컨텍스트가 더 중요합니다. Deep Work Plan은 어떤 리포지토리든 코딩 에이전트가 장시간 작업을 끝까지 완수하는 구조화된 환경으로 바꿉니다.',
    },
    hero: {
      badge: '오픈 방법론 · MIT · 에이전트 비종속',
      title: '모델은 중요합니다.',
      titleEmphasis: '컨텍스트는 더 중요합니다.',
      subtitle:
        'Deep Work Plan은 어떤 리포지토리든 구조화된 환경 — 컨텍스트, 가드레일, 견고한 계획 — 으로 바꾸어, 어떤 코딩 에이전트든 정밀하게 실행하고 장시간 작업을 끝까지 완수하도록 합니다.',
      instructionLabel: '에이전트에게 이 한 줄을 전달하세요',
      instruction:
        'https://deepworkplan.com/init.md 의 지침을 읽고 따라 이 리포지토리를 AI-first로 만드세요.',
      copyLabel: '복사',
      copiedLabel: '복사됨',
      viewInitCta: '전체 /init 프롬프트 보기',
      pullQuote:
        'Deep Work Plan은 리포지토리 자체가 하니스(harness)가 되는 스펙 주도 개발입니다.',
      primaryCta: '방법론 읽기',
      secondaryCta: '스펙 읽기',
      illustrationAlt:
        '바위 해안의 등대가 한 줄기 빛을 비추어 작은 배를 인도하는 모습 — 어떤 에이전트든 이끄는 든든한 하니스로서의 리포지토리를 떠올리게 하는 판화.',
    },
    pitch: {
      kicker: '문제와 해답',
      problem:
        'AI 코딩 에이전트는 짧은 작업에서는 놀랍도록 효과적입니다. 그러나 마이그레이션, 새로운 서브시스템, 수십 개 파일에 걸친 리팩터링 같은 장시간 작업에서는 방향을 잃습니다. 컨텍스트가 가득 차고, 결정이 잊히며, 여러 시간이 걸리는 작업이 중간에 중단됩니다.',
      answer:
        'Deep Work Plan은 스펙 주도 개발로 답합니다. 계획이 견고한 단일 진실 공급원이 되고, 에이전트는 명시적인 인수 기준과 검증 게이트에 맞춰 실행합니다. 방향 이탈이 줄고 작업은 검증 가능한 상태로 유지되며, 어떤 에이전트든 세션을 넘어 작업을 이어받을 수 있습니다.',
      origin:
        '이는 또한 이식 가능한 형태로 만든 하니스 엔지니어링이기도 합니다. 에이전트 하니스란 모델을 둘러싼 발판 — 컨텍스트, 도구, 제어 루프, 가드레일, 재개 가능한 상태 — 으로, 모델을 신뢰할 수 있게 만듭니다. Deep Work Plan은 그 하니스를 리포지토리 자체에 설치합니다(AGENTS.md, docs, .agents/ 스킬 홈, DWP 스킬). 그래서 어떤 에이전트든 어떤 리포지토리든 조종할 수 있습니다. Dailybot에서 탄생해 수개월간 실전에서 검증되었으며, DailybotHQ/deepworkplan-skill로 공개되었습니다.',
      illustrationAlt:
        '위험 지대를 안전하게 통과하도록 한 줄의 항로가 그려진 해도 — 작업을 정해진 항로 위에 유지하는 방향으로서의 계획을 떠올리게 하는 판화.',
    },
    onboarding: {
      badge: '추론 기반 온보딩',
      title: '어떤 리포지토리든 가리키세요. 복사·붙여넣기가 아니라 추론합니다.',
      subtitle:
        '온보딩 흐름은 리포지토리의 실제 언어, 프레임워크, 패키지 관리자, 검증 명령을 살펴본 뒤, 그 리포지토리에 맞춘 산출물을 생성합니다. 범용 스텁은 실패로 간주됩니다.',
      steps: [
        {
          title: '스택과 아키타입을 추론합니다',
          description:
            '매니페스트, 폴더 구조, CI를 읽어 실제 test, lint, build 명령을 추론한 뒤, 리포지토리를 개별 리포지토리 또는 오케스트레이터 허브로 분류합니다.',
        },
        {
          title: 'AGENTS.md, docs/, 모듈별 문서를 생성합니다',
          description:
            '추론으로 작성된 AGENTS.md, 분류된 docs/ 계층, 그리고 주요 모듈마다 들어가는 README와 docs/ — 모두 플레이스홀더가 아니라 리포지토리의 실제 명령으로 채워집니다.',
        },
        {
          title: '.claude → .agents 심링크와 함께 .agents/를 구성합니다',
          description:
            '교차 에이전트용 .agents/ 디렉터리(스킬, 에이전트, 명령)와 .claude → .agents 심링크를 만들고, CLAUDE.md를 AGENTS.md에 미러링하여 모든 도구가 하나의 진실 공급원을 읽도록 합니다.',
        },
        {
          title: 'DWP 스킬을 설치하고 .dwp/를 구성합니다',
          description:
            'Deep Work Plan 스킬을 연결하고 계획과 초안을 위한 gitignore된 .dwp/ 폴더를 생성한 뒤, 필요하면 devcontainer 지원 같은 선택형 애드온을 추가로 얹습니다.',
        },
      ],
    },
    quickstart: {
      badge: '실행하면 무슨 일이 일어나는가',
      title: '지침은 한 줄. 나머지는 리포지토리가 합니다.',
      subtitle:
        '설치 방식을 고르거나 템플릿을 복사할 필요가 없습니다. 에이전트에게 한 줄을 건네면, 에이전트가 재사용 가능한 엔진인 스킬을 설치하고 리포지토리를 거기에 맞게 적응시킵니다.',
      steps: [
        {
          title: '에이전트가 /init.md를 엽니다',
          description:
            'deepworkplan.com/init.md의 온보딩 프롬프트와 그것이 링크하는 방법론, 스펙, 키트 — 곧 채택할 표준 — 를 읽습니다.',
        },
        {
          title: 'Deep Work Plan 스킬을 설치합니다',
          description:
            '스킬은 모든 리포지토리에서 동일한 엔진입니다. 명령 한 줄로 라우터와 그 하위 스킬(create, execute, refine, resume, status, verify, onboard, author)을 Claude Code, Cursor, Codex, Gemini, Copilot용으로 가져옵니다.',
        },
        {
          title: '리포지토리를 적응시킵니다',
          description:
            '복사·붙여넣기가 아니라 실제 스택을 추론하여 AGENTS.md, 분류된 docs/ 트리, 모듈별 README, 추론된 .agents/ 키트, gitignore된 .dwp/를 작성합니다. 리포지토리가 하니스가 됩니다.',
        },
        {
          title: '계획하고 실행합니다',
          description:
            '어떤 작업이든 장시간 Deep Work Plan을 생성하고 단계별로 실행합니다. 명시적인 인수 기준, 검증 게이트, 재개 가능한 상태와 함께 수 시간 동안 자율적으로 진행됩니다.',
        },
      ],
      note: '스킬은 어디서나 동일하게 설치됩니다. 적응되는 것은 리포지토리입니다 — 스택에 맞게 생성된 AGENTS.md, 문서, 추론된 .agents/ 키트. 이 분리가 방법론을 일회성 스캐폴드가 아니라 재사용 가능한 표준으로 만듭니다.',
    },
    outcomes: {
      badge: '무엇을 얻는가',
      title: '에이전트가 자율적으로 일하는 데 필요한 모든 것.',
      subtitle:
        '한 번의 실행, 원자적인 커밋. 모든 산출물은 Markdown이고 모든 변경은 감사 가능합니다.',
      items: [
        {
          label: '리포지토리 루트의 AGENTS.md',
          detail:
            '플레이스홀더가 있는 템플릿이 아니라 리포지토리의 실제 스택, 명령, 구조에서 추론됩니다. CLAUDE.md는 AGENTS.md에 심링크됩니다.',
        },
        {
          label: '분류된 docs/와 모듈별 문서',
          detail:
            '아키텍처, 셋업, 표준, 문제 해결 — 그리고 코드베이스에서 생성된, 주요 모듈마다 들어가는 README와 docs/.',
        },
        {
          label: '.claude → .agents 심링크가 있는 .agents/',
          detail:
            '교차 에이전트용 .agents/ 디렉터리(스킬, 에이전트, 명령)와 .claude → .agents 심링크로 모든 도구가 하나의 진실 공급원을 읽습니다.',
        },
        {
          label: '설치된 Deep Work Plan 스킬',
          detail:
            'create, execute, refine, resume, status, verify, onboard, author — 리포지토리별 복사 없이 단일 스킬 팩으로 에이전트가 사용할 수 있습니다.',
        },
        {
          label: '직접 확인할 수 있는 적합성',
          detail:
            '/dwp-verify는 스펙에 대비한 객관적 합격/불합격 보고서를 만들어, "AI-first"가 단언이 아니라 검증된 사실이 되게 합니다 — 모든 계획 이후 재검증도 가능합니다.',
        },
        {
          label: '두 가지 아키타입, 모두 처리',
          detail:
            '온보딩은 리포지토리를 개별 리포지토리(일반적인 경우) 또는 여러 리포지토리에 걸친 하위 계획을 조율하는 오케스트레이터 허브로 분류합니다.',
        },
        {
          label: '리포지토리가 키워 가는 살아 있는 키트',
          detail:
            'author 하위 스킬(skill-create, agent-create)로 리포지토리가 자체 스킬, 에이전트, 명령을 발전시킬 수 있습니다. dependency-upgrade 같은 선택형 유지보수 애드온이 최신 상태를 유지하도록 돕습니다.',
        },
        {
          label: 'Git 네이티브, 재개 가능, .dwp/',
          detail:
            '데몬도 외부 상태도 없습니다. 계획과 초안은 gitignore된 .dwp/ 폴더에 저장되며, 컨텍스트가 넘쳐도 git만으로 어떤 작업이든 재개됩니다.',
        },
      ],
    },
    agents: {
      badge: '에이전트',
      title: '이미 사용 중인 에이전트와 함께 작동합니다.',
      subtitle:
        '하나의 방법론, 여러 어댑터. Markdown은 프레임워크를 어떤 것에도 묶지 않습니다 — Markdown을 읽는 모든 에이전트가 Deep Work Plan을 실행할 수 있습니다.',
      fullLabel: '완전',
      partialLabel: '부분',
      viewAllCta: '모든 에이전트 보기',
      items: [
        {
          name: 'Claude Code',
          support: 'full',
          note: '네이티브 WebFetch와 슬래시 명령을 갖춘 레퍼런스 구현.',
        },
        {
          name: 'Cursor',
          support: 'full',
          note: '완전한 어댑터. WebFetch가 차단되면 오프라인 번들을 사용하세요.',
        },
        {
          name: 'OpenAI Codex',
          support: 'full',
          note: '오프라인 번들 권장. 규칙은 .codex/ 아래에 설치됩니다.',
        },
        {
          name: 'GitHub Copilot',
          support: 'full',
          note: '완전한 어댑터 — dwp-* 명령이 AGENTS.md와 # 절차를 통해 실행됩니다.',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'Gemini 2.5 Pro 이상이 필요하며 네이티브 WebFetch를 지원합니다.',
        },
        {
          name: 'OpenCode',
          support: 'full',
          note: '오픈 소스. AGENTS.md를 네이티브로 읽고 # 명령으로 dwp-*를 실행합니다.',
        },
        {
          name: 'Windsurf',
          support: 'full',
          note: '규칙과 # 명령 절차가 완전한 Deep Work Plan 루프를 구동합니다.',
        },
        {
          name: 'Cline',
          support: 'full',
          note: '오픈 소스. Markdown 규칙과 # 명령이 모든 dwp-* 단계를 실행합니다.',
        },
        {
          name: 'Antigravity',
          support: 'full',
          note: '네이티브 명령 표면을 갖춘 완전한 어댑터.',
        },
      ],
    },
    stacks: {
      badge: '스택',
      title: '중요한 스택을 위한 추론 프리셋.',
      subtitle:
        '이것은 템플릿이 아니라 추론 보조 자료입니다. 온보딩은 리포지토리의 실제 매니페스트를 읽고 스택별로 적응합니다 — 프리셋을 맹목적으로 복사하지 않습니다. 모노레포는 모듈별 문서를 받습니다.',
      viewAllCta: '모든 프리셋 보기',
      items: [
        { name: 'Django', sub: 'DRF · Poetry' },
        { name: 'FastAPI', sub: 'Pydantic · Poetry' },
        { name: 'Vue', sub: 'Vite · TypeScript' },
        { name: 'React', sub: 'Next · Vite · TS' },
        { name: 'Astro', sub: 'Svelte/React · MDX' },
        { name: 'TypeScript · Node', sub: 'Express · Fastify' },
        { name: 'TypeScript · Lambda', sub: 'Serverless · SAM' },
        { name: 'Go', sub: 'Modules · stdlib' },
        { name: 'Rust', sub: 'Cargo · 2021+' },
        { name: 'Generic', sub: '모든 스택' },
      ],
    },
    archetypes: {
      badge: '두 가지 아키타입',
      title: '개별 리포지토리, 또는 오케스트레이터 허브.',
      subtitle:
        '온보딩은 아키타입에 따라 갈립니다. 대부분의 리포지토리는 개별 리포지토리입니다. 허브는 여러 리포지토리에 걸쳐 하위 Deep Work Plan을 조율합니다. 방법론은 둘 다 일급으로 다룹니다.',
      individual: {
        tag: '일반적인 경우',
        title: '개별 리포지토리',
        description:
          '하나의 주요 스택, 자체 검증 명령, 모듈별 문서를 갖춘 단일 코드베이스. 기본값이며, 리포지토리가 명백히 허브가 아닌 한 온보딩은 이를 가정합니다.',
        example:
          '예를 들어 Django API, Vue 앱, TypeScript Lambda 서비스가 있습니다.',
      },
      orchestrator: {
        tag: '조율',
        title: '오케스트레이터 허브',
        description:
          '오케스트레이터 매니페스트를 통해 하위 리포지토리 전반의 작업을 조율하는 조율 리포지토리입니다. 각자 자신의 리포지토리에 커밋하는 하위 계획을 생성하며, 경계 규칙과 내비게이션 인덱스를 함께 둡니다.',
        example:
          '예를 들어 다섯 개의 제품 리포지토리를 조율하는 허브가 있습니다.',
      },
    },
    comparison: {
      badge: '방법론 대 도구',
      title: '다른 레이어. 경쟁이 아니라 보완.',
      subtitle:
        'Deep Work Plan은 또 하나의 스캐폴더가 아닙니다. 스펙 주도 또는 스캐폴딩 도구 아래에 자리한 방법론 레이어이며, 장시간 자율 실행에 초점을 둡니다.',
      colDwp: 'Deep Work Plan',
      colOthers: '스캐폴딩 / 스펙 도구',
      rows: [
        {
          label: '주요 초점',
          dwp: '장시간 자율 실행',
          others: '스펙 또는 스캐폴드 생성',
        },
        {
          label: '작업 단위',
          dwp: 'Deep Work Plan(재개 가능한 세션)',
          others: '스펙 문서 또는 스캐폴드',
        },
        {
          label: '상태 모델',
          dwp: 'Git 네이티브 .dwp/ 폴더, 재개 가능',
          others: '종종 외부 또는 IDE 내부',
        },
        {
          label: '에이전트 결합',
          dwp: '에이전트 비종속(Markdown과 Bash)',
          others: '종종 도구 또는 IDE 종속',
        },
        {
          label: '컨텍스트 복구',
          dwp: '컨텍스트 초과 후 재개',
          others: '대개 작업을 다시 시작',
        },
        {
          label: '라이선스',
          dwp: 'MIT, 오픈 방법론 및 키트',
          others: '경우에 따라 다름',
        },
      ],
    },
    origin: {
      badge: '기원',
      quote:
        '분산 팀을 위한 비동기 스탠드업을 만드는 회사 Dailybot이 구축했습니다. 우리는 사내에서 Deep Work Plan을 사용해 Django, Vue, TypeScript Lambda, Astro에 걸친 프로덕션 리포지토리를 에이전트가 조종할 수 있게 만들었습니다. 수개월의 프로덕션 사용 끝에 이 방법론을 MIT 라이선스로 공개했습니다.',
      attribution: 'Dailybot 엔지니어링 팀',
      dailybotCta: 'Dailybot 알아보기',
    },
    finalCta: {
      badge: '리포지토리를 AI-first로 만드세요',
      title: '에이전트에게 깊은 작업을 맡기세요.',
      subtitle:
        '에이전트에게 한 줄을 건네 /init.md를 가리키면 리포지토리가 AI-first가 됩니다. 스킬을 설치하고, 스택을 추론하고, 완전한 AGENTS.md 계층을 커밋합니다. 거기서부터 수 시간 동안 자율적으로 실행되는 Deep Work Plan을 생성하고 실행합니다.',
      primaryCta: '/init 프롬프트 열기',
      secondaryCta: '방법론 읽기',
      meta: 'MIT 라이선스 · 텔레메트리 없음 · 산출물은 gitignore된 .dwp/ 폴더로.',
    },
  },
  // Contact section (homepage)
  contact: {
    title: '문의',
    nameLabel: '이름',
    namePlaceholder: '성함',
    emailLabel: '이메일',
    emailPlaceholder: 'your@email.com',
    messageLabel: '메시지',
    messagePlaceholder: '메시지를 작성하세요...',
    sendButton: '메시지 보내기',
  },

  // About page
  aboutPage: {
    title: '방법론 소개',
    subtitle: '오픈 방법론 · MIT 라이선스',
    description:
      'Deep Work Plan은 AI 코딩 에이전트와 함께하는 진지한 엔지니어링 작업을 위한 오픈, 프레임워크 비종속 방법론입니다. 어디서 왔고 누가 관리하는지 소개합니다.',
    heroDescription:
      'AI 코딩 에이전트와 함께 깊은 작업을 계획하고, 실행하고, 검증하는 반복 가능한 구조 — 공개적으로 만들어졌고 자유롭게 사용할 수 있습니다.',
    bioTitle: '무엇인가',
    bioText:
      'Deep Work Plan(DWP)은 제품이 아니라 방법론입니다. 목표를 합의된 계획으로 바꾸고, 그 계획을 원자적이며 독립적으로 검증 가능한 작업으로 나누며, 각 작업을 검증으로 마무리되는 집중된 루프로 실행하는 방법을 정의합니다.<br /><br />어떤 AI 에이전트나 스택을 쓰는지에 대해 의도적으로 비종속적입니다 — 어댑터가 동일한 핵심 루프를 Claude, Cursor, Copilot, Codex, Gemini 등으로 옮깁니다. 계획, 작업, 실행 로그는 모두 일반 Markdown이므로 작업은 읽기 쉽고, 검토 가능하며, 버전 관리됩니다.',
    passionsTitle: '핵심 원칙',
    passions: [
      {
        title: '실행 전에 계획',
        description:
          '계획이 합의되기 전에는 어떤 코드도 작성하지 않습니다. 계획은 사용자와 에이전트 사이의 계약입니다.',
        icon: '\u{1F5FA}️',
        link: '/methodology',
      },
      {
        title: '작업은 원자적',
        description:
          '각 작업은 단독으로 실행하고 검증한 뒤 원자적으로 커밋할 수 있도록 범위가 정해집니다.',
        icon: '\u{1F9E9}',
        link: '/spec',
      },
      {
        title: '모든 것을 검증',
        description:
          '모든 작업은 다음 작업이 시작되기 전 명시적 검증으로 끝나며, 진행 상황은 git에 기록됩니다.',
        icon: '✅',
        link: '/kit',
      },
    ],
    quickFactsTitle: '한눈에 보기',
    quickFacts: [
      '오픈 방법론, MIT 라이선스',
      '프레임워크 및 에이전트 비종속',
      'Dailybot과 커뮤니티가 관리',
      '스펙, 명령, 어댑터, 프리셋, 예시 포함',
      'Markdown 전용 — 런타임 없음, 종속 없음',
      '어떤 리포지토리든 AI-first이며 에이전트가 조종 가능한 코드베이스로 전환',
    ],
    ctaTitle: '누가 관리하는가',
    ctaDescription:
      'Deep Work Plan은 Dailybot의 실제 엔지니어링 작업에서 자라났으며, 현재 Dailybot과 오픈소스 커뮤니티가 함께 관리합니다. 방법론, 스펙, 키트는 MIT 라이선스로 공개됩니다 — 자유롭게 사용하고, 적응시키고, 그 위에 만들 수 있습니다.',
    ctaCv: '방법론 읽기',
    ctaContact: '빠른 시작',
  },

  // Contact page
  contactPage: {
    title: '커뮤니티 & 문의',
    subtitle: '오픈소스 · 커뮤니티 주도',
    description:
      'Deep Work Plan은 공개적으로 만들어집니다. 소스를 찾고, 이슈를 열고, 아래 채널로 대화에 참여하세요 — 기여를 환영합니다.',
    heroDescription:
      '질문, 아이디어, 개선 제안이 있으신가요? Deep Work Plan은 공개적으로 개발됩니다 — 프로젝트와 관리자에게 연락할 수 있는 곳입니다.',
    formTitle: '메시지 보내기',
    nameLabel: '이름',
    namePlaceholder: '성함',
    emailLabel: '이메일',
    emailPlaceholder: 'your@email.com',
    reasonLabel: '문의 주제',
    reasonOptions: [
      { value: '', label: '— 주제를 선택하세요 —' },
      { value: 'general', label: '일반 / 인사 전하기' },
      { value: 'tech-talk', label: '기술 강연 / 연사 초청' },
      { value: 'collaboration', label: '협업 / 파트너십' },
      { value: 'project', label: '프로젝트 / 업무 문의' },
      { value: 'dailybot', label: 'Dailybot 관련 질문' },
      { value: 'trading', label: '트레이딩 관련 질문' },
      {
        value: 'the-library-of-tomorrow',
        label: 'The Library of Tomorrow 참여',
      },
      { value: 'other', label: '기타' },
    ],
    subjectLabel: '제목',
    subjectPlaceholder: '무엇에 관한 내용인가요?',
    messageLabel: '메시지',
    messagePlaceholder: '메시지를 작성하세요...',
    sendButton: '메시지 보내기',
    sendingButton: '보내는 중...',
    successTitle: '메시지가 전송되었습니다',
    successMessage: '연락 주셔서 감사합니다. 가능한 한 빨리 답변드리겠습니다.',
    sendAnotherButton: '다른 메시지 보내기',
    requiredField: '필수 입력 항목입니다',
    invalidEmail: '유효한 이메일 주소를 입력하세요',
    fallbackMessage:
      '문의 양식을 현재 사용할 수 없습니다. 이메일로 직접 연락하실 수 있습니다.',
    fallbackEmailText: '다음 주소로 이메일을 보내주세요',
    formNote: '가능한 한 빨리 답변드리겠습니다.',
    socialTitle: '함께 연결하기',
    locationTitle: '위치',
    locationText:
      '콜롬비아에 기반을 두고 있으며, 전 세계 원격 협업에 열려 있습니다.',
    prefillSubjects: {
      generalInquiry: '일반 문의',
      collaboration: '협업 기회',
      projectInquiry: '프로젝트 또는 업무 문의',
      projectCollaboration: '프로젝트 협업 문의',
      startupCollaboration: '스타트업 협업 기회',
      techTalkInvitation: '기술 강연 연사 초청',
      tradingQuestion: '트레이딩 질문',
      dailybotQuestion: 'Dailybot 관련 질문',
    },
  },

  contactSection: {
    title: '함께 연결해요',
    description:
      '흥미로운 대화, 협업 기회, 새로운 아이디어에 언제나 열려 있습니다. 기술 이야기든, 창업 이야기든, 그저 인사를 건네고 싶으시든 환영합니다.',
    ctaText: '연락하기',
    ctaLink: '/contact?topic=general&subject=General%20Inquiry',
  },

  // Date formatting
  dateLocale: 'ko-KR',

  // 404 page
  notFoundPage: {
    title: '페이지를 찾을 수 없습니다',
    description:
      '찾으시는 페이지가 존재하지 않거나 이동되었습니다. 방법론을 살펴보거나 홈페이지로 돌아가 계속 둘러보세요.',
    heading: '페이지를 찾을 수 없습니다',
    message:
      '죄송합니다. 찾으시는 페이지가 존재하지 않거나 이동되었을 수 있습니다. 홈페이지로 돌아가거나 방법론을 둘러보세요.',
    backHome: '홈으로 돌아가기',
    exploreMethodology: '방법론 읽기',
  },

  // Deep Work Plan — Methodology index + chapter reader
  methodologyPage: {
    meta: {
      title: 'Deep Work Plan 방법론',
      description:
        '매니페스토부터 아키타입까지 다섯 장: Deep Work Plan을 떠받치는 원칙, 핵심 루프, 템플릿, 스킬과 에이전트, 그리고 적응 방식을 다룹니다.',
    },
    eyebrow: '방법론',
    title: 'Deep Work Plan 방법론',
    intro:
      'Deep Work Plan의 철학에서 출발해 매일 사용하는 실전 루프, 템플릿, 적응 방식까지 안내하는 다섯 장.',
    chapterLabel: '장',
    readChapter: '장 읽기',
    prev: '이전',
    next: '다음',
    backToIndex: '전체 장',
  },

  // Deep Work Plan — Spec index + reader
  specPage: {
    meta: {
      title: 'Deep Work Plan 스펙',
      description:
        'Deep Work Plan 방법론의 읽기 쉬운 스펙: DWP 형식, 에이전트 프로토콜, 아키타입, 문서화 표준, 애드온을 다룹니다.',
    },
    eyebrow: '스펙',
    title: '스펙',
    intro:
      '방법론의 정밀하고 읽기 쉬운 스펙 — 사람과 에이전트가 공유하는 구조와 프로토콜.',
    tocTitle: '이 페이지에서',
    prev: '이전',
    next: '다음',
    backToIndex: '전체 스펙 문서',
  },

  // Deep Work Plan — Kit index + detail
  kitPage: {
    meta: {
      title: 'Deep Work Plan 키트',
      description:
        '스킬과 여덟 개의 하위 스킬, 명령, 어댑터, 프리셋, 선택형 애드온, 예시 — Deep Work Plan을 여러 에이전트와 스택에서 실행 가능하게 만듭니다.',
    },
    eyebrow: '키트',
    title: '키트',
    intro:
      '방법론을 실행하는 데 필요한 모든 것: 스킬과 그 하위 스킬, 슬래시 명령, 에이전트 어댑터, 온보딩 프리셋, 선택형 애드온, 그리고 실제 예시.',
    groups: {
      command: {
        title: '하위 스킬 & 명령',
        description:
          '스킬 라우터와 그 하위 스킬(create, execute, refine, resume, status, verify, onboard, author), 그리고 그것들에 위임하는 얇은 슬래시 명령.',
      },
      adapter: {
        title: '어댑터',
        description: 'Claude, Cursor, Codex 등을 위한 얇은 에이전트별 통합.',
      },
      preset: {
        title: '온보딩 프리셋',
        description:
          'onboard 흐름이 문서, 스킬, 검증 명령을 리포지토리에 맞게 적응시킬 때 사용하는 스택별 추론 가이드.',
      },
      example: {
        title: '예시',
        description: '실제로 작업한 전후 비교 워크스루.',
      },
      addon: {
        title: '애드온(선택형)',
        description:
          'onboard 흐름이 리포지토리에 얹을 수 있는 선택 기능 — AI-first 기준선의 일부는 결코 아닙니다.',
      },
    },
    viewDetail: '상세 보기',
    prev: '이전',
    next: '다음',
    backToIndex: '키트로 돌아가기',
  },

  // Deep Work Plan — Examples gallery + detail
  examplesPage: {
    meta: {
      title: 'Deep Work Plan 예시',
      description:
        'Deep Work Plan을 사용한 경우와 사용하지 않은 경우 동일한 엔지니어링 작업을 보여 주는 전후 비교 워크스루 — 신뢰성과 검토에서의 차이.',
    },
    eyebrow: '예시',
    title: '예시',
    intro:
      '방법론이 작동하는 모습을 확인하세요 — 실제 엔지니어링 작업의 구체적인 전후 비교 워크스루.',
    viewExample: '워크스루 읽기',
    prev: '이전',
    next: '다음',
    backToGallery: '전체 예시',
  },

  // Deep Work Plan — Quickstart page
  quickstartPage: {
    meta: {
      title: '빠른 시작 — Deep Work Plan',
      description:
        '스킬을 설치하고 리포지토리를 온보딩한 뒤 어떤 에이전트로든 계획하고 실행하세요 — 리포지토리를 스펙 주도이며 에이전트가 조종 가능하게 만드는 단계.',
    },
    eyebrow: '빠른 시작',
    title: '몇 분 만에 시작',
    intro:
      '스킬을 설치하고 리포지토리를 온보딩한 뒤 어떤 에이전트로든 계획하고 실행하세요 — 리포지토리를 스펙 주도이며 에이전트가 조종 가능하게 만드는 단계.',
    sequenceTitle: '채택 경로',
    codeLabel: '터미널',
    orLabel: '또는',
    steps: [
      {
        title: 'Deep Work Plan 스킬 설치',
        description:
          '리포지토리에 스킬을 추가합니다 — 라우터와 여덟 개의 하위 스킬(create, execute, refine, resume, status, verify, onboard, author). 가장 빠른 경로로 Skills CLI를 사용하거나, 리포지토리를 클론한 뒤 git과 셸을 사용할 수 있는 곳에서 setup을 실행하세요.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: '리포지토리 온보딩',
        description:
          'onboard 하위 스킬을 실행하고 에이전트가 실제 리포지토리를 추론하게 하세요. AGENTS.md, docs/ 지식 베이스, 모듈별 문서, 교차 에이전트용 .agents/ 홈(.claude → .agents 심링크 포함)을 생성하고, 얇은 dwp-* 명령을 연결하며, gitignore된 .dwp/를 구성합니다.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: '키트 발전과 애드온 채택',
        description:
          '/skill-create와 /agent-create(author 하위 스킬)로 스택에 맞는 스킬, 에이전트, 명령을 키우세요. 온보딩은 또한 세 가지 선택형 애드온 — devcontainer, Dailybot, dependency-upgrade — 을 제안하며, 맞을 때만 채택하면 됩니다.',
      },
      {
        title: '계획하고 실행',
        description:
          'Deep Work Plan을 생성하고 작업 단위로 실행하면서, 각 게이트를 검증하고 세션을 넘어 재개하세요 — 리포지토리를 자체 스펙에 대비해 조종합니다.',
        commands: ['/dwp-create <goal>', '/dwp-execute'],
      },
    ],
    outcomeTitle: '결과',
    outcome:
      '리포지토리가 스펙 주도이며 에이전트가 조종 가능해집니다. 계획이 견고한 단일 진실 공급원이 되고, 리포지토리 자체가 어떤 에이전트든 실행하는 하니스가 됩니다.',
    nextStepsTitle: '다음 단계',
    nextSteps: [
      { label: '방법론 읽기', href: '/methodology' },
      { label: '키트 둘러보기', href: '/kit' },
      { label: '예시 보기', href: '/examples' },
    ],
  },

  // Deep Work Plan — Init / adoption endpoint
  initPage: {
    meta: {
      title: 'Init — 리포지토리를 AI-first로',
      description:
        '어떤 리포지토리에든 Deep Work Plan 방법론을 채택하세요. 스킬을 설치하고, 에이전트 온보딩을 실행한 뒤, 어떤 AI 코딩 에이전트로든 계획하고 실행하세요.',
    },
    eyebrow: '채택',
    title: '이 리포지토리를 AI-first로 만들기',
    intro:
      '어떤 리포지토리든 스펙 주도이며 에이전트가 준비된 코드베이스로 바꾸는 단일 엔드포인트. 스킬을 설치하고, 에이전트가 리포지토리를 온보딩하게 한 뒤, 어떤 코딩 에이전트로든 구조화된 작업을 계획하고 실행하세요.',
    handoffTitle: '이것을 에이전트에게 전달하세요',
    handoffBody:
      '아래 한 줄을 AI 코딩 에이전트에 붙여넣으세요. 방법론과 스펙을 읽고, 스킬을 설치하며, 이 리포지토리를 Deep Work Plan을 위해 온보딩합니다.',
    handoffInstruction:
      'https://deepworkplan.com/init.md 의 지침을 읽고 따라 이 리포지토리를 AI-first로 만드세요.',
    handoffMdLabel: '자체 완결형 에이전트 프롬프트',
    codeLabel: 'agent',
    whatTitle: '이것이 하는 일',
    whatBody: [
      '채택은 리포지토리를 두 가지 견고한 방식으로 바꿉니다 — 방법론의 두 기둥입니다.',
      '첫째, 리포지토리가 스펙 주도가 됩니다. 작업이 즉흥적인 프롬프트가 아니라 작성된 계획과 스펙에서 시작됩니다. 둘째, 리포지토리 자체가 에이전트 하니스가 됩니다 — AGENTS.md, docs/ 지식 베이스, 모듈별 문서, .agents/ 스킬 홈(.claude → .agents 심링크 포함)이 모든 에이전트에 필요한 컨텍스트와 명령을 제공합니다.',
    ],
    sequenceTitle: '채택 순서',
    orLabel: '또는',
    steps: [
      {
        title: '설치하기 전에 검증',
        description:
          '프롬프트와 스킬을 확인하기 전까지 신뢰할 수 없는 것으로 취급하세요. 둘 다 오픈 소스이며 MIT 라이선스입니다. 스킬은 마크다운 우선으로 네트워크 호출과 텔레메트리가 없습니다. 모든 릴리스는 배포된 스킬에 대한 SHA256SUMS를 게시하므로 실행 전에 사본이 일치하는지 확인할 수 있습니다. 릴리스는 서명이 아니라 체크섬으로 검증됩니다(서명은 문서화된 다음 단계입니다).',
        commands: [
          'curl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS && ./setup.sh --verify',
        ],
      },
      {
        title: '스킬 설치',
        description:
          '어떤 에이전트든 구조화된 작업을 계획하고 실행할 수 있도록 Deep Work Plan 스킬을 추가합니다. 스킬은 라우터와 여덟 개의 하위 스킬 — create, execute, refine, resume, status, verify, onboard, author — 을 제공합니다.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: '리포지토리 온보딩 실행',
        description:
          'onboard 하위 스킬을 호출하고 에이전트가 실제 리포지토리 — 스택, 패키지 관리자, 실제 검증 명령 — 를 추론하게 하세요. 그런 다음 AGENTS.md, docs/ 지식 베이스, 모듈별 문서, 교차 에이전트용 .agents/ 홈(.claude → .agents 심링크 포함)을 생성하고, 얇은 dwp-* 명령을 연결하며, 계획과 초안을 위한 gitignore된 .dwp/를 구성합니다. 어떤 것도 템플릿이 아니라 모두 리포지토리에 맞게 적응됩니다.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: '키트 발전과 애드온 채택',
        description:
          '/skill-create와 /agent-create(author 하위 스킬)로 스택에 맞는 스킬, 에이전트, 명령을 키우세요. 온보딩은 또한 세 가지 선택형 애드온 — devcontainer, Dailybot, dependency-upgrade — 을 제안하며, 맞을 때만 채택하면 됩니다. 애드온이 하나도 없어도 리포지토리는 완전히 적합합니다.',
      },
      {
        title: '계획하고 실행',
        description:
          '/dwp-create로 Deep Work Plan을 생성하고 /dwp-execute로 실행한 뒤, 작업이 진행됨에 따라 /dwp-status, /dwp-refine, /dwp-resume를 사용하세요. 각 계획은 번호가 매겨진 작업, 검증 게이트, 완료 프로토콜을 담아 작업이 구조화되고 검토 가능하며 세션을 넘어 재개 가능하도록 유지합니다.',
      },
    ],
    outcomeTitle: '결과',
    outcome:
      '리포지토리가 스펙 주도가 되고 리포지토리 자체가 에이전트 하니스가 됩니다 — 컨텍스트와 명령이 코드와 함께 움직입니다.',
    nextStepsTitle: '다음에 읽을 것',
    nextSteps: [
      { label: '빠른 시작', href: '/quickstart' },
      { label: '방법론', href: '/methodology' },
      { label: '스펙', href: '/spec' },
      { label: '키트', href: '/kit' },
    ],
  },

  trustPage: {
    meta: {
      title: '신뢰와 보안',
      description:
        'Deep Work Plan을 안심하고 채택할 수 있는 이유: 오픈 소스이자 MIT 라이선스, 네트워크 호출이나 텔레메트리 없는 Markdown-first, 비파괴적 설계, 검증 가능한 설치, 그리고 명확한 취약점 공개 정책.',
    },
    eyebrow: '신뢰 & 보안',
    title: '신뢰와 보안',
    intro:
      '신뢰할 수 없는 스킬을 설치해서는 안 됩니다. Deep Work Plan은 맹목적인 믿음이 아니라 검증에 기반하도록 설계되었습니다. 오픈 소스, Markdown-first, 비파괴적이며, 실행하기 전에 확인할 수 있습니다. 이 페이지는 무엇을 하는지, 무엇을 하지 않는지, 그리고 두 가지를 어떻게 확인할 수 있는지를 솔직하게 설명합니다.',
    pillarsTitle: '무엇을 신뢰하는가',
    pillars: [
      {
        title: '오픈 소스이자 MIT 라이선스',
        body: '웹사이트와 스킬은 모두 공개되어 있으며 diff 가능합니다. 실행하기 전에 모든 줄을 읽고, 태그 릴리스의 소스와 임의의 복사본을 비교할 수 있습니다.',
      },
      {
        title: 'Markdown-first — 네트워크 없음, 텔레메트리 없음',
        body: '스킬에는 CLI도, HTTP API도, 인증 흐름도 없습니다. 네트워크 호출을 하지 않으며 텔레메트리를 전송하지 않습니다. 유일한 로컬 헬퍼는 git과 환경 메타데이터만 읽습니다. 리포지토리에 관한 어떤 정보도 사용자의 기기를 벗어나지 않습니다.',
      },
      {
        title: '비파괴적 설계',
        body: '스킬이 하는 유일한 보안 관련 작업은 리포지토리를 변경하는 것이며, 덮어쓰기가 아니라 조정합니다. 기존에 있는 것을 감지하고 계획을 제안한 뒤, 무언가를 교체하기 전에 확인을 요청합니다. 계획 출력은 gitignore된 .dwp/ 디렉터리에 저장됩니다.',
      },
      {
        title: '비밀 정보를 건드리지 않음',
        body: '방법론은 비밀 정보를 커밋하지 않으며 작업 상태를 버전 관리 외부에 유지합니다. 온보딩은 .gitignore를 덮어쓰는 대신 추가하며, 모든 변경은 작고 읽기 쉬운 diff로 검토할 수 있도록 설계됩니다.',
      },
      {
        title: '검증 가능한 출처',
        body: '모든 릴리스는 배포된 스킬에 대한 체크섬을 게시하므로, 신뢰하기 전에 다운로드한 복사본이 게시된 내용과 일치하는지 확인할 수 있습니다.',
      },
    ],
    verifyTitle: '실행 전에 검증',
    verifyIntro:
      '확인하기 전까지 스킬을 신뢰할 수 없는 것으로 취급하세요. 각 릴리스에는 배포된 스킬을 아우르는 SHA256SUMS 파일이 첨부됩니다. 설치하려는 버전의 파일을 다운로드한 뒤, 복사본이 일치하는지 검증하세요 — 비정상 종료 코드는 파일이 일치하지 않음을 의미하므로 중단해야 합니다.',
    codeLabel: 'shell',
    verifyNote:
      '릴리스는 체크섬으로 검증되며, 서명되지는 않았습니다 — 서명(cosign 또는 관리자 GPG)은 문서화된 다음 단계이지 현재의 주장이 아닙니다. 모든 것이 공개되어 있으므로, 임의의 파일을 해당 태그의 리포지토리와 diff로 비교할 수도 있습니다.',
    disclosureTitle: '취약점 신고',
    disclosureBody:
      '보안 문제를 발견하셨나요? 공개 이슈를 열지 말고, 해당 리포지토리(스킬 또는 웹사이트 — 아래에 링크된 보안 정책 참조)에서 GitHub의 비공개 취약점 신고 기능을 통해 비공개로 신고해 주세요. 공개 이슈를 열면 수정이 완료되기 전에 문제가 노출됩니다.',
    resourcesTitle: '신뢰 리소스',
    linkManifest: '기계 판독 가능한 신뢰 매니페스트',
    linkSecurityTxt: 'security.txt(RFC 9116)',
    linkPolicy: '웹사이트 보안 정책',
    linkSkillPolicy: '스킬 보안 정책 및 위협 모델',
    limitationsTitle: '솔직한 한계',
    limitations: [
      '릴리스는 체크섬으로 검증되지만 아직 암호학적으로 서명되지 않았습니다 — 서명은 계획 중이며 아직 완료되지 않았습니다.',
      'Deep Work Plan은 자율적인 코딩 에이전트를 리포지토리에 대해 실행합니다. 제안된 계획과 diff를 검토하세요. 방법론은 그 검토를 위해 설계된 것이지, 검토를 대체하려는 것이 아닙니다.',
      '여기의 신뢰 주장은 공식 소스만을 설명합니다. 리포지토리에서 벗어난 수정되거나 서드파티의 복사본에는 이러한 보증이 없습니다 — 먼저 검증하세요.',
    ],
    ctaTitle: '자신 있게 채택하세요',
    ctaBody:
      '방법론과 스펙을 읽고, 에이전트를 init 엔드포인트로 향하게 한 뒤, 실행하기 전에 설치를 검증하세요.',
    ctaPrimary: '방법론 읽기',
    ctaSecondary: '채택(Init)',
  },
};
