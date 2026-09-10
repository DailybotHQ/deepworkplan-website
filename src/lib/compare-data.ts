/**
 * Language-neutral facts for the /compare page.
 *
 * Words (names, blurbs, labels, cell wording) live in the translations
 * (`comparePage.*`); this module carries only ids, official URLs, the review
 * date and the enum value of every cell, so the facts have one home and the
 * content policy (analysis_results/COMPARE_CONTENT_POLICY.md of
 * PLAN_compare_and_faq_pages, mirrored in docs/PRODUCT_SPEC.md) can be checked
 * mechanically: every alternative has every cell, every cell is one of three
 * neutral values, every source is an https URL, and the review date is visible.
 */

/** ISO date of the last fact review; rendered on the page in the reader's locale. */
export const COMPARE_REVIEWED_ON = '2026-09-10';

/** The three neutral cell values. Never "no", "missing" or "lacks". */
export type CellValue = 'built-in' | 'optional' | 'not-in-scope';

export const CELL_VALUES: readonly CellValue[] = [
  'built-in',
  'optional',
  'not-in-scope',
] as const;

/** Capability rows, in display order. Labels and help text are translation keys. */
export const CAPABILITY_IDS = [
  'toolAgnostic',
  'repoNativeHarness',
  'taskAcceptanceCriteria',
  'perTaskGates',
  'resumableState',
  'finalReview',
  'conformanceChecker',
  'instructionBudgetLedger',
  'onboardingScaffold',
  'brownfieldSpecs',
] as const;

export type CapabilityId = (typeof CAPABILITY_IDS)[number];

export type AlternativeCategory =
  | 'methodology'
  | 'sdd'
  | 'agent-framework'
  | 'ai-native-sdlc'
  | 'vendor-native';

/** Alternatives in display order: Deep Work Plan first, then grouped by category. */
export const ALTERNATIVE_IDS = [
  'dwp',
  'github-spec-kit',
  'openspec',
  'amazon-kiro',
  'bmad-method',
  'superpowers',
  'get-shit-done',
  'gentle-ai',
  'claude-ai-native-sdlc',
  'vendor-native',
] as const;

export type AlternativeId = (typeof ALTERNATIVE_IDS)[number];

export interface Alternative {
  /** Stable kebab-case id; also the translation key under `comparePage.alternatives`. */
  id: AlternativeId;
  category: AlternativeCategory;
  /** Official site of the tool (the only kind of source the policy allows). */
  homepage: string;
  /** Official documentation or README used for the review. */
  docsUrl: string;
  cells: Record<CapabilityId, CellValue>;
}

/**
 * Deep Work Plan first, then the alternatives grouped by category. Values come
 * from the 2026-09-10 review of each tool's own documentation; "optional" means
 * the capability exists as guidance, an extension, a hook or a partial form.
 */
export const ALTERNATIVES: readonly Alternative[] = [
  {
    id: 'dwp',
    category: 'methodology',
    homepage: 'https://deepworkplan.com',
    docsUrl: 'https://deepworkplan.com/spec',
    cells: {
      toolAgnostic: 'built-in',
      repoNativeHarness: 'built-in',
      taskAcceptanceCriteria: 'built-in',
      perTaskGates: 'built-in',
      resumableState: 'built-in',
      finalReview: 'built-in',
      conformanceChecker: 'built-in',
      instructionBudgetLedger: 'built-in',
      onboardingScaffold: 'built-in',
      brownfieldSpecs: 'not-in-scope',
    },
  },
  {
    id: 'github-spec-kit',
    category: 'sdd',
    homepage: 'https://github.com/github/spec-kit',
    docsUrl: 'https://github.github.io/spec-kit/',
    cells: {
      toolAgnostic: 'built-in',
      repoNativeHarness: 'optional',
      taskAcceptanceCriteria: 'optional',
      perTaskGates: 'optional',
      resumableState: 'built-in',
      finalReview: 'optional',
      conformanceChecker: 'optional',
      instructionBudgetLedger: 'not-in-scope',
      onboardingScaffold: 'optional',
      brownfieldSpecs: 'optional',
    },
  },
  {
    id: 'openspec',
    category: 'sdd',
    homepage: 'https://openspec.dev',
    docsUrl: 'https://openspec.dev/docs',
    cells: {
      toolAgnostic: 'built-in',
      repoNativeHarness: 'optional',
      taskAcceptanceCriteria: 'built-in',
      perTaskGates: 'not-in-scope',
      resumableState: 'built-in',
      finalReview: 'optional',
      conformanceChecker: 'optional',
      instructionBudgetLedger: 'not-in-scope',
      onboardingScaffold: 'optional',
      brownfieldSpecs: 'built-in',
    },
  },
  {
    id: 'amazon-kiro',
    category: 'sdd',
    homepage: 'https://kiro.dev',
    docsUrl: 'https://kiro.dev/docs/',
    cells: {
      toolAgnostic: 'not-in-scope',
      repoNativeHarness: 'optional',
      taskAcceptanceCriteria: 'built-in',
      perTaskGates: 'optional',
      resumableState: 'built-in',
      finalReview: 'optional',
      conformanceChecker: 'optional',
      instructionBudgetLedger: 'not-in-scope',
      onboardingScaffold: 'optional',
      brownfieldSpecs: 'optional',
    },
  },
  {
    id: 'bmad-method',
    category: 'agent-framework',
    homepage: 'https://github.com/bmad-code-org/BMAD-METHOD',
    docsUrl: 'https://github.com/bmad-code-org/BMAD-METHOD#readme',
    cells: {
      toolAgnostic: 'built-in',
      repoNativeHarness: 'optional',
      taskAcceptanceCriteria: 'built-in',
      perTaskGates: 'optional',
      resumableState: 'optional',
      finalReview: 'optional',
      conformanceChecker: 'not-in-scope',
      instructionBudgetLedger: 'not-in-scope',
      onboardingScaffold: 'optional',
      brownfieldSpecs: 'optional',
    },
  },
  {
    id: 'superpowers',
    category: 'agent-framework',
    homepage: 'https://github.com/obra/superpowers',
    docsUrl: 'https://github.com/obra/superpowers#readme',
    cells: {
      toolAgnostic: 'built-in',
      repoNativeHarness: 'not-in-scope',
      taskAcceptanceCriteria: 'built-in',
      perTaskGates: 'built-in',
      resumableState: 'optional',
      finalReview: 'optional',
      conformanceChecker: 'not-in-scope',
      instructionBudgetLedger: 'not-in-scope',
      onboardingScaffold: 'not-in-scope',
      brownfieldSpecs: 'not-in-scope',
    },
  },
  {
    id: 'get-shit-done',
    category: 'agent-framework',
    homepage: 'https://github.com/open-gsd/gsd-core',
    docsUrl: 'https://github.com/open-gsd/gsd-core#readme',
    cells: {
      toolAgnostic: 'built-in',
      repoNativeHarness: 'optional',
      taskAcceptanceCriteria: 'built-in',
      perTaskGates: 'optional',
      resumableState: 'built-in',
      finalReview: 'optional',
      conformanceChecker: 'not-in-scope',
      instructionBudgetLedger: 'not-in-scope',
      onboardingScaffold: 'built-in',
      brownfieldSpecs: 'optional',
    },
  },
  {
    id: 'gentle-ai',
    category: 'agent-framework',
    homepage: 'https://github.com/Gentleman-Programming/gentle-ai',
    docsUrl: 'https://github.com/Gentleman-Programming/gentle-ai#readme',
    cells: {
      toolAgnostic: 'built-in',
      repoNativeHarness: 'optional',
      taskAcceptanceCriteria: 'optional',
      perTaskGates: 'optional',
      resumableState: 'built-in',
      finalReview: 'optional',
      conformanceChecker: 'not-in-scope',
      instructionBudgetLedger: 'not-in-scope',
      onboardingScaffold: 'not-in-scope',
      brownfieldSpecs: 'optional',
    },
  },
  {
    id: 'claude-ai-native-sdlc',
    category: 'ai-native-sdlc',
    homepage: 'https://claude.com/blog/the-ai-native-sdlc-playbook',
    docsUrl: 'https://claude.com/blog/the-ai-native-sdlc-playbook',
    cells: {
      toolAgnostic: 'not-in-scope',
      repoNativeHarness: 'optional',
      taskAcceptanceCriteria: 'optional',
      perTaskGates: 'optional',
      resumableState: 'optional',
      finalReview: 'optional',
      conformanceChecker: 'not-in-scope',
      instructionBudgetLedger: 'not-in-scope',
      onboardingScaffold: 'not-in-scope',
      brownfieldSpecs: 'optional',
    },
  },
  {
    id: 'vendor-native',
    category: 'vendor-native',
    homepage: 'https://agents.md',
    docsUrl: 'https://agentskills.io',
    cells: {
      toolAgnostic: 'not-in-scope',
      repoNativeHarness: 'optional',
      taskAcceptanceCriteria: 'optional',
      perTaskGates: 'optional',
      resumableState: 'optional',
      finalReview: 'optional',
      conformanceChecker: 'optional',
      instructionBudgetLedger: 'not-in-scope',
      onboardingScaffold: 'optional',
      brownfieldSpecs: 'not-in-scope',
    },
  },
];

export function getAlternative(id: AlternativeId): Alternative {
  const found = ALTERNATIVES.find((a) => a.id === id);
  if (!found) {
    throw new Error(`Unknown compare alternative: ${id}`);
  }
  return found;
}

export function getCell(
  altId: AlternativeId,
  capabilityId: CapabilityId
): CellValue {
  return getAlternative(altId).cells[capabilityId];
}
