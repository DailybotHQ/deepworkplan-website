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
    developers: '개발자',
    privacy: '개인정보 보호',
    github: 'GitHub',
    faq: 'FAQ',
    compare: 'Compare',
    resources: 'Resources',
    resourcesDesc: 'Examples, comparison, FAQ and trust',
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

  // Temporary Product Hunt launch announcement bar
  announcementBar: {
    badge: 'New · 토큰 효율적',
    text: 'Deep Work Plan이 오늘 Product Hunt에 출시됐어요',
    tagline: '에이전트에게 계획을',
    linkText: '추천하기',
  },

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: '사이트 내비게이션',
    sections: {
      methodology: '방법론',
      getStarted: '시작하기',
      project: '프로젝트',
      connect: '연결',
      learn: 'Learn',
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
        'Deep Work Plan은 어떤 저장소든 구조화된 환경 — 컨텍스트, 가드레일, 지속되는 계획 — 으로 바꾸어, 어떤 코딩 에이전트든 정확하고 효율적으로 실행하며 장기 작업을 끝까지 완수합니다.',
      instructionLabel: '에이전트에 복사하기',
      instruction:
        'init.md 프롬프트를 복사하여 코딩 에이전트 — Claude Code, Cursor, Codex, 또는 다른 에이전트 — 에 붙여넣어 어떤 리포지토리든 AI-first로 만드세요.',
      copyLabel: 'init.md 복사',
      copiedLabel: '복사됨',
      viewInitCta: '전체 /init 프롬프트 보기',
      pullQuote:
        'Deep Work Plan은 리포지토리 자체가 하니스(harness)가 되는 스펙 주도 개발입니다.',
      primaryCta: '방법론 읽기',
      secondaryCta: '스펙 읽기',
      illustrationAlt:
        '바위 해안의 등대가 한 줄기 빛을 비추어 작은 배를 인도하는 모습 — 어떤 에이전트든 이끄는 든든한 하니스로서의 리포지토리를 떠올리게 하는 판화.',
      scrollCta: '작동 방식 보기',
    },
    pitch: {
      kicker: '문제와 해답',
      problem:
        '짧은 작업에서 코딩 에이전트는 놀라운 성능을 보입니다. 장기 미션 — 마이그레이션, 새 서브시스템, 수십 개 파일의 리팩터링 — 을 맡기면 표류합니다: 컨텍스트가 차고, 앞선 결정이 흐려지고, 수 시간의 작업이 한복간에서 멈춥니다.',
      answer:
        'Deep Work Plan은 스펙 주도 개발로 답합니다. 지속되는 계획, 원자적 작업, 그리고 에이전트가 통과해야 하는 검증 게이트. 완료는 느낌이 아니라 — 검증 가능하고 리뷰 가능한 증거가 됩니다.',
      efficiency:
        '그리고 컨텍스트는 에이전트에게 가장 희소한 자원입니다. 그래서 하네스는 토큰 효율을 위해 설계되었습니다: 지시사항은 점진적으로 로드하고, 검증은 변경된 부분만 다루며, 학습은 작업 자리에서 이루어집니다 — 긴 작업도 경제적으로 지속됩니다.',
      illustrationAlt:
        '한쪽은 안개 속 암초 옆을 표류하는 배, 다른 쪽은 같은 배가 그려진 항로를 따라 항구 등불로 나아가는 모습의 판화 디프틱.',
    },
    story: {
      act1: {
        kicker: '방법론 · 제1막',
        lead: '완료가 무엇인지, 경계가 어디인지 정하는 것은 사람입니다. 계획이 의도를 담고, 에이전트가 시간을 소모합니다 — 늘 지켜볼 필요도, 이십 분마다 고칠 필요도 없습니다.',
        deepLinkLabel: '방법론 읽기',
        deepLinkHref: '/methodology',
      },
      act2: {
        kicker: '방법론 · 제2막',
        lead: '긴 작업은 어떤 모델의 컨텍스트도 채웁니다. 세부 사항은 사라지고 에이전트는 표류합니다. 서면 계획 — 원자적 작업, 검증 게이트, 재개 가능한 상태 — 이야말로 매 바퀴 돌아오는 기준입니다.',
        deepLinkLabel: '핵심 루프 보기',
        deepLinkHref: '/methodology',
      },
      act3: {
        kicker: '방법론 · 제3막',
        lead: '각 작업은 수용 기준과 통과해야 할 검사를 명시합니다. 에이전트가 완료된 느낌으로 끝낼 수는 없습니다 — 통과하거나, 아니면 작업은 열린 채로 남습니다.',
        deepLinkLabel: '사양 읽기',
        deepLinkHref: '/spec',
      },
      act4: {
        kicker: '방법론 · 제4막',
        lead: '컨텍스트, 도구, 가드레일, 상태는 어떤 에이전트나 읽을 수 있는 평범한 파일로 저장소 안에 살아 있습니다. 잠금도, 외부 두뇌도 없이 — 컨텍스트 초기화 이후에도 유지됩니다.',
        deepLinkLabel: '온보딩이 생성하는 것 보기',
        deepLinkHref: '/quickstart',
      },
      act5: {
        kicker: '방법론 · 제5막',
        lead: '컨텍스트는 에이전트에게 가장 희소한 자원입니다. 하네스는 점진적으로 로드하고, 변경된 부분만 검증하며, 작업마다 학습합니다 — 계획이 스스로 비용을 회수합니다.',
        deepLinkLabel: '방법론 읽기',
        deepLinkHref: '/methodology',
      },
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
          title:
            '.claude 및 .cursor → .agents 심링크와 함께 .agents/를 구성합니다',
          description:
            '교차 에이전트용 .agents/ 디렉터리(스킬, 에이전트, 명령)와 .claude 및 .cursor → .agents 심링크를 만들고, CLAUDE.md를 AGENTS.md에 미러링하여 모든 도구가 하나의 진실 공급원을 읽도록 합니다.',
        },
        {
          title: 'DWP 스킬을 설치하고 .dwp/를 구성합니다',
          description:
            'Deep Work Plan 스킬을 연결하고 계획과 초안을 위한 gitignore된 .dwp/ 폴더를 생성한 뒤, 필수인 AI Diff Reviewer 로컬 리뷰를 설치하고, 필요하면 devcontainer 지원 같은 선택형 애드온을 추가로 얹습니다.',
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
          label: '.claude 및 .cursor → .agents 심링크가 있는 .agents/',
          detail:
            '교차 에이전트용 .agents/ 디렉터리(스킬, 에이전트, 명령)와 .claude 및 .cursor → .agents 심링크로 모든 도구가 하나의 진실 공급원을 읽습니다.',
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
      tertiaryCta: '에이전트와 개발자용',
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
    agentTitle: 'AI 에이전트용',
    agentIntro:
      '이 경로는 존재하지 않습니다. 아래의 복구 링크(및 그 기계 판독 가능한 대응물)가 이 사이트의 모든 페이지를 나열합니다.',
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
      '방법론을 실행하는 데 필요한 모든 것: 스킬과 그 하위 스킬, 슬래시 명령, 에이전트 어댑터, 온보딩 프리셋, 필수 로컬 리뷰와 선택형 애드온, 그리고 실제 예시.',
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
          'onboard 흐름이 리포지토리에 얹는 기능: 필수인 AI Diff Reviewer 로컬 리뷰와, AI-first 기준선의 일부가 결코 아닌 네 가지 선택형 애드온.',
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
          'onboard 하위 스킬을 실행하고 에이전트가 실제 리포지토리를 추론하게 하세요. AGENTS.md, docs/ 지식 베이스, 모듈별 문서, 교차 에이전트용 .agents/ 홈(.claude → .agents 및 .cursor → .agents 심링크 포함)을 생성하고, 얇은 dwp-* 명령을 연결하며, gitignore된 .dwp/를 구성합니다.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: '키트 발전과 애드온 채택',
        description:
          '/skill-create와 /agent-create(author 하위 스킬)로 스택에 맞는 스킬, 에이전트, 명령을 키우세요. 온보딩은 필수인 AI Diff Reviewer 로컬 리뷰를 설치하고(그 CI 게이트는 선택으로 남습니다), 네 가지 선택형 애드온 — devcontainer, Dailybot, dependency-upgrade, design-system — 을 제안하며, 맞을 때만 채택하면 됩니다.',
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
    handoffTitle: '에이전트에 복사하기',
    handoffBody:
      '완전한 init.md 프롬프트를 복사하여 AI 코딩 에이전트 — Claude Code, Cursor, Codex, 또는 다른 에이전트 — 에 붙여넣으세요. 방법론과 스펙을 읽고, 스킬을 설치하며, 이 리포지토리를 Deep Work Plan을 위해 온보딩합니다.',
    handoffInstruction:
      'https://deepworkplan.com/init.md 의 지침을 읽고 따라 이 리포지토리를 AI-first로 만드세요.',
    handoffMdLabel: '자체 완결형 에이전트 프롬프트',
    codeLabel: 'agent',
    whatTitle: '이것이 하는 일',
    whatBody: [
      '채택은 리포지토리를 두 가지 견고한 방식으로 바꿉니다 — 방법론의 두 기둥입니다.',
      '첫째, 리포지토리가 스펙 주도가 됩니다. 작업이 즉흥적인 프롬프트가 아니라 작성된 계획과 스펙에서 시작됩니다. 둘째, 리포지토리 자체가 에이전트 하니스가 됩니다 — AGENTS.md, docs/ 지식 베이스, 모듈별 문서, .agents/ 스킬 홈(.claude → .agents 및 .cursor → .agents 심링크 포함)이 모든 에이전트에 필요한 컨텍스트와 명령을 제공합니다.',
    ],
    sequenceTitle: '채택 순서',
    orLabel: '또는',
    steps: [
      {
        title: '설치하기 전에 검증',
        description:
          '프롬프트와 스킬을 확인하기 전까지 신뢰할 수 없는 것으로 취급하세요. 둘 다 오픈 소스이며 MIT 라이선스입니다. 스킬은 마크다운 우선으로 네트워크 호출과 텔레메트리가 없습니다. 모든 릴리스는 배포된 스킬에 대한 SHA256SUMS를 게시하므로 실행 전에 사본이 일치하는지 확인할 수 있습니다. 릴리스는 서명이 아니라 체크섬으로 검증됩니다(서명은 문서화된 다음 단계입니다).',
        commands: [
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill\ncurl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS\n./setup.sh --verify',
        ],
      },
      {
        title: '스킬 설치',
        description:
          '어떤 에이전트든 구조화된 작업을 계획하고 실행할 수 있도록 Deep Work Plan 스킬을 추가합니다. 스킬은 라우터와 여덟 개의 하위 스킬 — create, execute, refine, resume, status, verify, onboard, author — 을 제공합니다.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'openclaw skills install deepworkplan',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: '리포지토리 온보딩 실행',
        description:
          'onboard 하위 스킬을 호출하고 에이전트가 실제 리포지토리 — 스택, 패키지 관리자, 실제 검증 명령 — 를 추론하게 하세요. 그런 다음 AGENTS.md, docs/ 지식 베이스, 모듈별 문서, 교차 에이전트용 .agents/ 홈(.claude → .agents 및 .cursor → .agents 심링크 포함)을 생성하고, 얇은 dwp-* 명령을 연결하며, 계획과 초안을 위한 gitignore된 .dwp/를 구성합니다. 대규모 리포지토리의 경우 onboard 하위 스킬은 계획 주도 경로를 사용합니다: 정찰을 완료한 뒤 온보딩 Deep Work Plan을 생성합니다. 어떤 것도 템플릿이 아니라 모두 리포지토리에 맞게 적응됩니다.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: '로컬 리뷰와 선택형 애드온',
        description:
          '온보딩은 필수인 AI Diff Reviewer 로컬 리뷰를 설치하고(그 CI 게이트는 선택으로 남습니다), 네 가지 선택형 애드온 — devcontainer, Dailybot, dependency-upgrade, design-system — 을 제안하며, 맞을 때만 채택하면 됩니다. 선택형 애드온이 하나도 없어도 리포지토리는 완전히 적합합니다. /skill-create와 /agent-create(author 하위 스킬)로 기본 구성을 넘어 스택에 맞는 스킬, 에이전트, 명령을 키우세요.',
      },
      {
        title: '계획하고 실행',
        description:
          '/dwp-create로 Deep Work Plan을 생성하고 /dwp-execute로 실행한 뒤, 작업이 진행됨에 따라 /dwp-status, /dwp-refine, /dwp-resume, /dwp-verify를 사용하세요. 각 계획은 번호가 매겨진 작업, 검증 게이트, 완료 프로토콜을 담으며 — 세 가지 필수 최종 작업인 보안 검토, 스킬 & 에이전트 탐색, 실행 보고서로 마무리됩니다.',
      },
      {
        title: '적합성 검증',
        description:
          '/dwp-verify를 실행하여 스펙 대비 객관적인 합격/불합격 보고서를 받으세요. AGENTS.md, docs/(스텁이 아닌 실제 콘텐츠), .agents/(얇은 dwp-* 위임자와 디스크와 일치하는 카탈로그), .dwp/, tmp/가 제자리에 있는지 확인하세요 — 템플릿이 아니라 이 리포지토리를 위해 추론된 모든 것.',
        commands: ['/dwp-verify'],
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

  faqPage: {
    meta: {
      title: 'Frequently asked questions — Deep Work Plan',
      description:
        'Answers to the questions people ask about Deep Work Plan: what it does, how gates and resumption work, how it compares with other tools, and how to adopt it.',
    },
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    intro:
      'Short answers to what people ask most about Deep Work Plan, each with a link to the page that goes deeper.',
    groups: [
      {
        id: 'what',
        title: 'What Deep Work Plan is',
        items: [
          {
            id: 'what-is-it',
            question: 'What does Deep Work Plan actually do?',
            answer:
              'Deep Work Plan turns a repository into a structured environment where a coding agent can execute long work reliably. It installs as an agent skill, onboards the repository once (an `AGENTS.md` index, a `docs/` tree, a `.agents/` kit of skills and commands, a gitignored `.dwp/` output area), and from then on any goal becomes a plan: atomic tasks, each with acceptance criteria and a validation gate, executed one at a time, committed as they pass, and resumable from disk by any agent. The plan closes with a Final Review that audits security and validates the final state. The methodology is MIT-licensed and works with any coding agent that reads a repository.',
            linkLabel: 'Read the methodology',
            linkPath: '/methodology',
          },
          {
            id: 'who-is-it-for',
            question: 'Who is it for?',
            answer:
              'Developers and teams who hand real, multi-step work to coding agents and want it to finish. It fits when a task spans more than one session, more than one file family, or more than one agent; when a teammate must be able to pick up where an agent stopped; or when "done" must mean "validated", not "the agent said so". A one-line fix does not need a plan, and the methodology says so: its proportional-rigor rule recommends an inline goal, criteria and gate instead.',
            linkLabel: 'Quickstart',
            linkPath: '/quickstart',
          },
          {
            id: 'is-it-a-tool',
            question: 'Is it a tool, a framework or a methodology?',
            answer:
              'A methodology packaged as an installable skill. There is no server, no account, no proprietary format and no runtime beyond the coding agent you already use. What gets installed is instructions the agent reads, a small set of shell scripts for context detection and conformance checking, and the conventions your repository adopts. Everything the plan produces is Markdown and JSON in your repository, readable without any tool.',
            linkLabel: 'Read the specification',
            linkPath: '/spec',
          },
          {
            id: 'which-agents',
            question: 'Which coding agents does it work with?',
            answer:
              "Any agent that reads repository files. The skill follows the open Agent Skills standard and the `AGENTS.md` convention, so Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot and others pick it up through their normal skill and instruction loading. The methodology's own evaluation shows a plan started by one vendor's agent and resumed by another's in both directions. Installation coverage and behavioral evidence are listed per agent in the compatibility matrix, and the two are never conflated.",
            linkLabel: 'Browse the kit',
            linkPath: '/kit',
          },
        ],
      },
      {
        id: 'how',
        title: 'How a plan runs',
        items: [
          {
            id: 'gates',
            question:
              'How are the validation gates implemented? Do they need human sign-off?',
            answer:
              "They are executable assertions the agent runs itself. Human sign-off bookends the run: a person approves the plan before execution and reviews the final diff at pull-request time; execution in between is autonomous. Every task names concrete commands, typically the repository's own quality gate, selected from the task's touched surface: the tests of the changed behavior and its consumers, widening to the full suite when the change is shared or cannot be bounded. A task is marked done only when those commands exit successfully, and tasks that change behavior must extend the tests. On failure the task is marked blocked and the agent stops.",
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'stale-plan',
            question:
              'How does the plan avoid going stale when people change the code between runs?',
            answer:
              'On three fronts. Tasks are written as behavior, not edits: an acceptance criterion says what the system must do, so a renamed file or a swapped implementation does not invalidate it. Every gate re-runs against the repository as it is now, so a broken assumption fails loudly at the next run instead of drifting silently, and that failure is the cue to refine. And keeping documentation in sync is part of the work: a task that changes behavior also updates the docs and the agent-facing kit that describe it, inside its own gate. Every run should leave the repository more agent-ready than it found it.',
            linkLabel: 'Read the methodology',
            linkPath: '/methodology',
          },
          {
            id: 'edit-mid-run',
            question:
              'Can I change the plan mid-run without losing completed work?',
            answer:
              'Yes; refining a partially executed plan is a first-class move. Task definitions and execution state are kept separate: the plan is a checklist on disk plus a small state file, so what is done stays recorded independently of the task text. When a task turns out to be wrong, the agent marks it blocked and stops rather than pushing through. You then edit, reorder, split or drop the tasks that have not run, while completed tasks stay completed. Resuming rebuilds state from disk and the actual repository and re-runs the gates that matter, so nothing that shifted underneath slips by.',
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'drift',
            question:
              'Does it keep checking the work against the plan, or is the plan an upfront thing?',
            answer:
              'The plan is a continuous check. The agent works one small task at a time and must validate before moving on, so it can wander one step, not three. Every task carries acceptance criteria plus the exact commands that prove them, and progress is written into the repository as it goes, with a status per task, so drift becomes visible to you, to the next session and to the next agent. A plan is not finished until everything validates, including the Final Review. The honest caveat: the methodology cannot stop an agent from writing a weak acceptance criterion in the first place; it makes drift loud instead of silent.',
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'plan-evolution',
            question:
              'Is the plan generated once and maintained by hand, or does it evolve with the code?',
            answer:
              "Neither. It is generated once from a goal and then maintained as part of the work. The plan is deliberately not rewritten from code diffs, because a spec that chases the code becomes a lagging mirror, which is the drift the methodology exists to kill. It evolves on purpose: gates re-run against the current repository, a failing gate triggers a refinement, and the agent performs that refinement during the run while you approve up front and review at the end. Documentation and tests evolve alongside the code by construction, because updating them is inside each task's gate.",
            linkLabel: 'Read the methodology',
            linkPath: '/methodology',
          },
          {
            id: 'resume',
            question: 'What happens if the session dies halfway?',
            answer:
              "Progress lives on disk, not in the chat. The README checkboxes, each task's log, a bounded working index and a machine-readable state file are updated at every task boundary, and the state file records a checkpoint before any planned pause. A fresh session, or a different agent, reads that compact index, reconciles it with the repository and git history, and continues at the first incomplete task without redoing finished work. Even an interrupted plan creation is recoverable: the plan's identity and intended task list are written before any task file, so a half-created plan can be completed or discarded rather than guessed at.",
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'final-review',
            question: 'What is the Final Review?',
            answer:
              "The single mandatory closing task of every plan. In order: a security pass over the plan's full accumulated change set, including a required local review of the diff by the AI Diff Reviewer skill, with critical findings blocking completion until fixed or explicitly accepted; final-state validation, meaning the repository's complete applicable test, lint, type-check and format suites on the final code; and a reconciliation of the skills decisions each task recorded. The agent then reports deliverables, evidence and limitations, and offers an Executive Report once, generating it only if you ask.",
            linkLabel: 'The specification',
            linkPath: '/spec/dwp-specification',
          },
        ],
      },
      {
        id: 'compare',
        title: 'How it compares',
        items: [
          {
            id: 'vs-sdd-tools',
            question:
              'How is it different from spec-driven tools such as Spec Kit, OpenSpec or Kiro?',
            answer:
              "They solve adjacent problems. Spec-driven tools are excellent at capturing what should change: specifications, requirements and change proposals in a repeatable shape. Deep Work Plan is about how an agent executes for hours without drifting: the onboarded harness, per-task validation gates selected from the touched surface, on-disk resumable state, a mandatory Final Review with a security pass, and a conformance checker for the repository itself. The two can be combined, with a spec or change proposal feeding a plan. The comparison page lays the capabilities side by side, on each tool's own terms.",
            linkLabel: 'See the comparison',
            linkPath: '/compare',
          },
          {
            id: 'vs-agent-frameworks',
            question:
              'How is it different from agent workflow frameworks such as BMAD, Superpowers or Get Shit Done?',
            answer:
              'Those frameworks bring strong working styles: roles, principles, test-first steps, verification habits. Deep Work Plan focuses on what stays in the repository and what can be checked: a harness any agent reads cold, task files with acceptance criteria and gates, state that survives a session, a conformance checker with a CI-friendly exit code, and a published measurement of how many instruction bytes each flow loads. It is tool-agnostic by construction and adds no service, provider or secret to the core loop. The comparison page shows where each approach is built in, optional or out of scope.',
            linkLabel: 'See the comparison',
            linkPath: '/compare',
          },
          {
            id: 'vs-native-plan-mode',
            question: "Why not just use my agent's built-in plan mode?",
            answer:
              "Built-in plan modes are useful and Deep Work Plan builds on the same substrate, the `AGENTS.md` convention and the open Agent Skills standard. The difference is where the plan lives and what enforces it. Native plans usually live outside the repository and expire with the session; Deep Work Plan writes the plan, its state and its evidence into the repository, so another agent or a teammate can continue it, and every task carries an executable gate and a recorded log. You keep using your agent's plan mode for thinking; the methodology adds the durable, verifiable execution loop.",
            linkLabel: 'See the comparison',
            linkPath: '/compare',
          },
        ],
      },
      {
        id: 'adopt',
        title: 'Adopting it',
        items: [
          {
            id: 'install',
            question:
              'What does onboarding write into my repository, and does it touch existing files?',
            answer:
              'Onboarding is non-destructive: it detects an existing `AGENTS.md`, `docs/`, `.agents/` or `CLAUDE.md`, reconciles rather than overwrites, and asks before replacing anything. It writes the `AGENTS.md` index with real commands, a reasoned `docs/` tree, per-module docs, the `.agents/` kit with thin `dwp-*` commands, a gitignored `.dwp/` output area, a verified testing map, and the required local code review (the AI Diff Reviewer skill plus a repo-tailored review extension). It then runs a self-check and the conformance checker so you can see what was produced. A repository onboarded under an earlier version gets a targeted upgrade that changes only what is missing.',
            linkLabel: 'The adoption endpoint',
            linkPath: '/init',
          },
          {
            id: 'cost',
            question: 'What does it cost, and how is efficiency measured?',
            answer:
              'The methodology and the skill are MIT-licensed and free; there is no service, no API key and no telemetry in the core flows. Efficiency is reported as the number of instruction bytes each flow loads, measured by a script committed with the skill and published in an evaluation ledger, with increases reported as plainly as decreases. It is not reported as token percentages or cost savings, because a byte inventory does not establish those; a pre-registered public evaluation is planned to measure outcomes properly.',
            linkLabel: 'Trust and disclosure',
            linkPath: '/trust',
          },
        ],
      },
    ],
    stillHaveQuestions: {
      title: 'Still have a question?',
      body: 'Open a discussion or an issue on GitHub. Questions that come up repeatedly are added to this page.',
      ctaLabel: 'Ask on GitHub',
    },
  },

  comparePage: {
    meta: {
      title: 'Deep Work Plan compared with the alternatives — Deep Work Plan',
      description:
        'How Deep Work Plan relates to spec-driven tools, agent workflow frameworks and vendor plan modes: each on its own terms, with sources and a review date.',
    },
    eyebrow: 'Compare',
    title: 'Deep Work Plan and the alternatives',
    intro:
      'Pick the right layer for your situation. Each alternative is described on its own terms, every fact traces to its official documentation, and the page says when it was last reviewed. This is a map, not a ranking.',
    howToRead: {
      title: 'How to read this page',
      body: 'Three values describe each capability. They say where a capability lives in a tool, not how good the tool is.',
      values: {
        builtIn: 'Built in',
        optional: 'Optional or via extension',
        notInScope: 'Not in scope',
      },
    },
    reviewedOnLabel: 'Last reviewed',
    alternativesTitle: 'The alternatives, on their own terms',
    officialSiteLabel: 'Official site',
    categories: {
      methodology: 'Methodology',
      sdd: 'Spec-driven development tools',
      agentFramework: 'Agent workflow frameworks',
      vendorNative: 'Vendor-native plan modes',
    },
    matrix: {
      title: 'Capability matrix',
      caption:
        'Where each capability lives, per tool. Built in, optional or via extension, or not in scope. Reviewed against official documentation.',
      capabilityColumn: 'Capability',
    },
    capabilities: {
      toolAgnostic: {
        label: 'Works with any coding agent',
        help: 'The same repository files drive Claude Code, Codex, Cursor, Gemini CLI and others.',
      },
      repoNativeHarness: {
        label: 'Writes the agent harness into the repository',
        help: "Instructions, docs, skills and commands live in the repository, not in one tool's settings.",
      },
      taskAcceptanceCriteria: {
        label: 'Acceptance criteria per task',
        help: 'Each task states observable conditions for being done.',
      },
      perTaskGates: {
        label: 'Validation gate per task',
        help: 'Each task names the commands that must pass, selected from what it touched.',
      },
      resumableState: {
        label: 'Resumable state on disk',
        help: 'Progress survives a session reset and can be picked up by another agent or a teammate.',
      },
      finalReview: {
        label: 'Mandatory closing review with a security pass',
        help: 'The plan cannot complete without a security review of the full change set and validation of the final state.',
      },
      conformanceChecker: {
        label: 'Executable conformance checker',
        help: 'A script verifies the repository and its plans against the standard, with a CI-friendly exit code.',
      },
      instructionBudgetLedger: {
        label: 'Published instruction-load measurement',
        help: 'The bytes each flow loads are measured by a committed script and published with their limits.',
      },
      onboardingScaffold: {
        label: 'Onboarding that scaffolds documentation',
        help: "A first run writes the repository's agent-facing documentation and kit.",
      },
      brownfieldSpecs: {
        label: 'Living specs for existing systems',
        help: 'Changes are specified as deltas that merge into a growing specification of the system.',
      },
    },
    alternatives: {
      dwp: {
        name: 'Deep Work Plan',
        whatItDoesWell:
          'Installs as a skill, onboards the repository into an agent harness and runs long-horizon plans with per-task validation gates, on-disk state and a mandatory Final Review.',
        audience:
          'Developers and teams who hand multi-session work to any coding agent and need it to finish verified.',
      },
      'github-spec-kit': {
        name: 'GitHub Spec Kit',
        whatItDoesWell:
          'Turns a feature into an executable specification through a constitution, a spec, a plan and a task list, driven by slash commands that integrate with more than fifty coding agents.',
        audience:
          'Teams that want a repeatable specify, plan, tasks and implement workflow inside the agent they already use.',
      },
      openspec: {
        name: 'OpenSpec',
        whatItDoesWell:
          'Captures each change as a proposal with delta specs (added, modified, removed) and RFC 2119 requirements with scenarios, then archives them into living specifications.',
        audience:
          'Teams working on existing systems who want specifications to grow one change at a time.',
      },
      'amazon-kiro': {
        name: 'Amazon Kiro',
        whatItDoesWell:
          'An agentic IDE and CLI whose specs move from EARS-style requirements to design to tasks, with steering files and hooks that run on editor events.',
        audience:
          'Developers who want spec-driven development built into their editor with AWS-backed tooling.',
      },
      'bmad-method': {
        name: 'BMAD Method',
        whatItDoesWell:
          'An agile framework of specialized agent roles (analysis, product, architecture, development, quality) that produces briefs, requirements, architecture documents and story files.',
        audience:
          'Teams that like role-based ceremonies and want a full agile lifecycle for agent work.',
      },
      superpowers: {
        name: 'Superpowers',
        whatItDoesWell:
          'A skills library and workflow for brainstorming, planning in small test-first steps, executing with subagents and reviewing before completion.',
        audience:
          'Developers who want disciplined test-driven execution inside their coding agent.',
      },
      'get-shit-done': {
        name: 'Get Shit Done',
        whatItDoesWell:
          'A planning system with a .planning directory, requirement ids, phase plans, fresh-context execution and a verification pass against stated must-haves.',
        audience:
          'Solo developers and small teams who want context engineering and verification without heavy ceremony.',
      },
      'vendor-native': {
        name: 'Vendor-native plan modes',
        whatItDoesWell:
          'Claude Code, Codex, Cursor and Gemini CLI ship plan modes, instruction files and skills that follow the AGENTS.md and Agent Skills standards.',
        audience:
          'Anyone who wants planning inside a single agent without adopting a methodology.',
      },
    },
    dwpStrengths: {
      title: 'What Deep Work Plan brings',
      items: [
        {
          title: 'Tool-agnostic and repository-native',
          body: 'The harness and the plan are files in your repository, read by any agent that follows the AGENTS.md and Agent Skills standards. Switching agents does not lose the plan.',
        },
        {
          title: 'Validation selected from what each task touched',
          body: 'Every task declares its touched surface and runs the tests of the changed behavior and its consumers, widening to the full suite when the impact cannot be bounded. Zero selected tests is never a pass.',
        },
        {
          title: 'One Final Review with a security pass',
          body: 'A plan closes with a security review of the accumulated change set, including a required local review of the diff, and a validation of the final state. Critical findings block completion.',
        },
        {
          title: 'State that survives sessions and agents',
          body: 'README checkboxes, task logs, a bounded working index and a machine-readable state file are written at every boundary, so another session or another agent continues from disk. Even an interrupted plan creation is recoverable.',
        },
        {
          title: 'A conformance checker for the repository itself',
          body: 'A read-only script verifies the harness and every plan against the specification, understands both plan lifecycles and exits with a CI-friendly code.',
        },
        {
          title: 'Instruction load measured and published',
          body: 'A committed script measures how many bytes each flow loads; the results, including the increases, are published as bytes, never as token or cost percentages.',
        },
      ],
    },
    honestLimits: {
      title: 'Honest limits',
      body: 'Deep Work Plan has no living or delta specification mechanism; OpenSpec and similar tools are stronger there. No independent benchmark of the methodology exists yet; a pre-registered public evaluation is planned. The instruction-load ledger measures bytes loaded, not tokens, cost or outcomes.',
    },
    correction: {
      title: 'Help us keep this accurate',
      body: 'This page is reviewed on the date shown and corrected on request. If a description of your tool is out of date or incomplete, open an issue and we will fix it.',
      ctaLabel: 'Open an issue',
    },
    sourcesTitle: 'Sources',
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

  developersPage: {
    meta: {
      title: '개발자 — Deep Work Plan 에이전트 API, MCP 서버 및 문서',
      description:
        'Deep Work Plan의 에이전트 표면: OpenAPI 스펙을 갖춘 읽기 전용 무인증 API, /api/mcp의 MCP 서버, 17개 언어의 페이지별 Markdown, npx skills 설치 CLI.',
    },
    eyebrow: '에이전트 및 개발자 표면',
    title: '개발자와 AI 에이전트를 위한 Deep Work Plan',
    intro:
      'deepworkplan.com은 페이지와 함께 기계 판독 가능한 표면을 제공합니다. OpenAPI로 기술된 에이전트 API, 스테이트리스 MCP 서버, 17개 언어의 모든 페이지를 담은 네이티브 Markdown 미러, 그리고 설치 가능한 DWP 스킬입니다. 이 페이지의 모든 것은 라이브로 공개되어 있고 무료입니다 — 가입할 것이 전혀 없습니다.',
    accessTitle: '설계부터 무인증',
    accessIntro:
      '생성할 API 키도, OAuth 절차도, 프로덕션과 분리된 샌드박스도 없습니다 — 프로덕션 표면 자체가 샌드박스입니다. 이는 방법론의 의도적인 속성입니다. 에이전트는 "영업 문의" 양식을 작성할 수 없기에, 이 사이트는 그런 것을 절대 요구하지 않습니다.',
    accessPoints: [
      {
        title: '읽기 전용',
        body: '모든 작업은 안전하고 캐시 가능한 GET입니다 — POST를 사용하는 MCP 엔드포인트가 유일한 예외입니다. 어디에도 쓰기 작업, 업로드, 상태 변경은 존재하지 않습니다.',
      },
      {
        title: 'API 키 불필요',
        body: '등록도, 토큰도, 속도 제한 티어도 없습니다. 익명 접근이 문서화된 계약이며, /auth.md와 OAuth 디스커버리 스텁에 선언되어 있습니다.',
      },
      {
        title: '무료 및 오픈 소스',
        body: '사이트 콘텐츠와 DWP 스킬은 MIT 라이선스입니다. 허락을 구하지 않고 상업적·비상업적 작업에 사용할 수 있습니다.',
      },
      {
        title: '머신 퍼스트',
        body: '/api 경로의 구조화된 JSON 오류, Markdown 404 복구 본문, RFC 9727 API 카탈로그, ARD 역량 매니페스트 — 에이전트 소비를 위해 구축되었습니다.',
      },
    ],
    endpointsTitle: '엔드포인트',
    endpointsIntro:
      '에이전트 API의 핵심 엔드포인트입니다. 완전하고 타입이 지정된 스펙 — 모든 작업, 매개변수, 응답 스키마 — 은 OpenAPI 문서에 있습니다.',
    endpointsNote:
      '알 수 없는 /api/* 경로는 해결 힌트를 포함한 구조화된 JSON 오류를 반환하며, HTML 오류 페이지는 결코 반환하지 않습니다.',
    endpoints: [
      {
        method: 'GET',
        path: '/openapi.json',
        description: '전체 에이전트 API의 OpenAPI 3.1 스펙입니다.',
      },
      {
        method: 'GET',
        path: '/llms.txt',
        description:
          '엄선된 LLM 안내 인덱스 — 에이전트에게 권장되는 진입점입니다.',
      },
      {
        method: 'GET',
        path: '/init.md',
        description:
          '정식 DWP 채택 프롬프트(모든 리포지토리를 AI-first로 만듭니다).',
      },
      {
        method: 'GET',
        path: '/{page}.md',
        description:
          '모든 페이지를 네이티브 소스 Markdown으로 — 17개 언어 모두(예: /es/developers.md).',
      },
      {
        method: 'GET',
        path: '/api/health.json',
        description: '스펙과 이 포털로 연결되는 정적 헬스 마커입니다.',
      },
      {
        method: 'POST',
        path: '/api/mcp',
        description:
          'MCP 서버(Streamable HTTP, 스테이트리스): initialize, ping, tools/list, tools/call.',
      },
      {
        method: 'GET',
        path: '/.well-known/ai-catalog.json',
        description:
          'ARD 역량 매니페스트 — robots.txt에 선언된 agentmap입니다.',
      },
    ],
    mcpTitle: 'MCP 서버',
    mcpIntro:
      'Streamable HTTP 위의 스테이트리스 Model Context Protocol 서버입니다. 세 가지 읽기 전용 도구: get_init_prompt, list_site_sections, read_page. 프로토콜 버전 2025-03-26과 2025-06-18을 지원하며 세션은 필요하지 않습니다.',
    mcpCodeLabel: '터미널 — HTTP를 통한 JSON-RPC',
    mcpNote:
      'MCP 매니페스트는 /.well-known/mcp.json에, 서버 카드는 /.well-known/mcp/server-card.json에 있습니다. Claude, ChatGPT, 그리고 모든 MCP 클라이언트가 이 도구들을 네이티브로 호출할 수 있습니다.',
    markdownTitle: '에이전트를 위한 Markdown',
    markdownIntro:
      '렌더링되는 모든 페이지는 HTML 변환이 아니라 네이티브 소스 Markdown으로 게시됩니다. URL 접미사로 Markdown을 명시적으로 요청하거나, 어떤 페이지에서든 HTTP 콘텐츠 협상을 통해 요청하세요.',
    markdownCodeLabel: '터미널 — 콘텐츠 협상',
    markdownNote:
      '콘텐츠 협상은 사이트가 렌더링에 사용하는 것과 동일한 소스 Markdown을, 요청한 URL의 언어로 반환합니다.',
    cliTitle: '키트 설치',
    cliIntro:
      'Deep Work Plan 스킬의 공식 설치 경로입니다 — /init 엔드포인트가 에이전트에게 주는 것과 같은 명령입니다. skills 호환 코딩 에이전트(Claude Code, Cursor, Codex, Gemini 등)라면 무엇이든 작동합니다.',
    cliCodeLabel: '터미널 — skills CLI',
    cliNote:
      '스킬은 리포지토리 내 .agents/skills/deepworkplan/에 벤더되므로, 리포지토리를 다루는 모든 에이전트가 같은 방법론을 공유합니다.',
    resourcesTitle: '기계 판독 가능 리소스',
    resources: [
      { label: 'OpenAPI 스펙 (/openapi.json)', href: '/openapi.json' },
      { label: '에이전트 접근 및 인증 선언 (/auth.md)', href: '/auth.md' },
      {
        label: 'API 카탈로그, RFC 9727 (/.well-known/api-catalog)',
        href: '/.well-known/api-catalog',
      },
      {
        label: 'MCP 매니페스트 (/.well-known/mcp.json)',
        href: '/.well-known/mcp.json',
      },
      {
        label: '보안 연락처 (/.well-known/security.txt)',
        href: '/.well-known/security.txt',
      },
      {
        label: '사이트 리포지토리 디스크립터 (/.well-known/dwp.json)',
        href: '/.well-known/dwp.json',
      },
    ],
    ctaTitle: '에이전트를 향하게 하세요',
    ctaBody:
      '가장 빠른 길은 여전히 한 줄입니다. 어떤 코딩 에이전트에게든 /init 프롬프트를 건네면 스킬을 설치하고, 리포지토리를 온보딩하고, 깊은 작업을 완료하기 시작합니다.',
    ctaPrimary: '/init 프롬프트 열기',
    ctaSecondary: '방법론 읽기',
  },

  privacyPage: {
    meta: {
      title: '개인정보 보호 — Deep Work Plan',
      description:
        'deepworkplan.com의 개인정보 보호 정책: 계정 없음, 광고 없음, 쿠키 없는 분석을 쓰는 정적 사이트이며, 문의 양식이 수집하는 것을 분명하게 설명합니다.',
    },
    eyebrow: '개인정보 보호 정책',
    title: 'deepworkplan.com의 개인정보 보호',
    intro:
      'Deep Work Plan은 정적 문서 및 방법론 사이트입니다. 이 페이지는 방문할 때 사이트가 다루는 데이터를 분명하고 완전하게 설명합니다. 계정 시스템도, 광고도, 사이트 어디에도 크로스 사이트 추적이 없습니다.',
    lastUpdated: '2026년 9월 8일',
    sections: [
      {
        heading: '사이트란 무엇인가',
        body: 'deepworkplan.com은 CDN을 통해 제공되는 정적 페이지 모음입니다. 로그인도, 사용자 데이터베이스도 없으며 사이트가 개인 프로필을 저장할 방법도 없습니다. 콘텐츠는 DailybotHQ 조직의 공개 GitHub 리포지토리에서 개발되며, 여기서 읽는 모든 것은 빌드된 그대로 제공됩니다.',
      },
      {
        heading: '분석',
        body: '이 사이트는 쿠키를 쓰지 않고 프라이버시를 우선하는 분석 서비스 Umami를 사용해 페이지뷰를 집계합니다. Umami는 추적 쿠키를 설정하지 않고 크로스 사이트 프로필을 만들지 않습니다. AI 크롤러는 JavaScript를 실행하지 않기 때문에, 서버 측 엣지 함수가 자동 봇 방문의 사용자 에이전트와 경로를 익명 분석 이벤트로 기록합니다 — 이는 크롤러 소프트웨어를 식별하는 것이지(예: "GPTBot이 /init 방문") 인간 방문자를 식별하는 것이 결코 아닙니다.',
      },
      {
        heading: '쿠키 및 로컬 스토리지',
        body: '이 사이트는 추적 쿠키를 설정하지 않습니다. 브라우저에 저장되는 유일한 것은 localStorage에 보관되는 테마 기본 설정(라이트 또는 다크 모드)이며, 기기를 벗어나거나 어디로도 전송되지 않습니다. 브라우저 저장소를 지우면 사이트는 시스템 기본 테마로 돌아갈 뿐입니다.',
      },
      {
        heading: '서드파티 서비스',
        body: '호스팅과 전송은 Cloudflare Pages에서 실행되며, CDN 운영과 악용 차단의 일환으로 Cloudflare가 자체 개인정보 보호 정책에 따라 엣지에서 요청 로그와 IP 주소를 처리합니다. 집계 분석은 Umami(cloud.umami.is)에서 실행됩니다. 문의 양식을 자발적으로 제출하면 답변은 Google Forms를 통해 팀으로 전송됩니다 — 입력한 정보가 수집되는 유일한 곳이며, 답장을 위해서만 사용됩니다.',
      },
      {
        heading: '하지 않는 것',
        body: '우리는 개인 데이터를 판매하거나 공유하지 않고, 광고나 리마케팅 픽셀을 실행하지 않으며, 브라우저 핑거프린팅을 하지 않고, 마케팅 이메일을 보내지 않습니다. 사이트에는 뉴스레터 가입도 없고, 위에 설명된 집계·쿠키 없는 카운트를 넘는 텔레메트리도 없습니다.',
      },
      {
        heading: '사용자의 선택',
        body: '여기의 분석은 집계형이고 쿠키를 쓰지 않으므로 내보내거나 삭제할 개인 프로필이 없습니다. 어떤 콘텐츠 차단기로도 분석 스크립트를 차단할 수 있으며 사이트 작동에는 영향이 없습니다. 문의 양식을 제출했고 메시지 삭제를 원한다면 아래 연락처로 편지해 주세요. 삭제하겠습니다.',
      },
      {
        heading: '정책 변경',
        body: '이 정책이 실질적으로 변경되면 이 페이지 상단의 업데이트 날짜도 함께 변경되며, 실질적인 수정은 공개 웹사이트 리포지토리에 커밋되어 누구나 이력을 검토할 수 있습니다.',
      },
    ],
    contactTitle: '연락처 및 보안',
    contactBody:
      '개인정보 보호 관련 질문은 security@dailybot.com으로 보내 주세요. 보안 취약점을 신고할 때는 웹사이트 및 스킬 리포지토리에 대해 GitHub의 비공개 취약점 신고를 우선해 주세요 — 정확한 주소는 /.well-known/security.txt에 있습니다.',
  },
};
