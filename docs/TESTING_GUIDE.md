# Testing Guide

Guide for testing in deepworkplan.com.

## Overview

This project uses **Vitest** for unit and component testing. The testing infrastructure covers:

- **Utility function tests** for all pure functions in `src/lib/`
- **Svelte component tests** for key interactive components using `@testing-library/svelte`
- **Coverage enforcement** at 80%+ on `src/lib/` code

E2E testing (Playwright) is not yet configured.

## Running Tests

```bash
# Run all tests (single run)
pnpm run test

# Watch mode (re-runs on file changes)
pnpm run test:watch

# Run with coverage report
pnpm run test:coverage
```

## Selecting a Gate for a Change

A Deep Work Plan reads this section to turn a task's **Touched Surface** into a
validation gate, instead of running the whole suite for every change. Every
command below was run against this repository and the evidence is what a correct
run actually prints.

All commands run from the **repository root**. Toolchain: `vitest` 5.x,
`biome` 2.x, `astro` 7.x, `pnpm`.

### Commands

| Scope | Command | Evidence of a correct run |
| :---- | :------ | :------------------------ |
| Full test suite | `pnpm run test` | `Test Files 16 passed (16)` · `Tests 229 passed (229)` |
| One test file | `pnpm run test tests/unit/lib/i18n.test.ts` | `Test Files 1 passed (1)` · `Tests 49 passed (49)` |
| One test file (equivalent) | `pnpm exec vitest run tests/unit/lib/i18n.test.ts` | same as above |
| By test name | `pnpm exec vitest run -t "<name fragment>"` | the selected count, not `229` |
| Full lint + format | `pnpm run biome:check` | `Checked 246 files` |
| Scoped lint + format | `pnpm exec biome check src/lib/i18n.ts` | `Checked 1 file` |

> **Trap — never pass `--` to the test script.** `pnpm run test -- <path>` does
> **not** scope: pnpm swallows the separator and vitest receives no filter, so it
> runs the whole suite while appearing to target one file. It prints
> `Test Files 16 passed (16)`, not `1 passed (1)`. A gate recorded as scoped that
> prints the full count was never scoped. Drop the `--`.

### Commands that have no scoped form

Do not invent a scoped variant for these — the toolchain does not support one,
and a project-wide run here is the honest gate:

- **`pnpm run astro:check`** (type-check) — `astro check` takes `--root` and
  `--tsconfig` only; there is no per-file selection. Run it whole.
- **`pnpm run i18n:check`** — parity is a cross-language property; checking one
  locale proves nothing.
- **`pnpm run md:check`** / **`pnpm run md:content-check`** — both compare the
  built `dist/` against the Markdown endpoints and require a completed build.
- **`pnpm run build`** — the real gate for anything that renders. Note it emits
  1709 pages and occasionally fails on a `dist/.prerender` directory race; the
  fix is `rm -rf dist` and re-run, not a code change.

### Source-to-test mapping

The tree is **mirrored**, not co-located:

- `src/lib/<name>.ts` → `tests/unit/lib/<name>.test.ts`
- Editorial/home components → `tests/unit/components/<topic>.test.ts`, which
  assert narrative and parity across plates rather than one component each

### Consumers and blind spots

A changed file is not always covered by the test that shares its name:

- **`src/lib/i18n.ts` and `src/lib/translations/*.ts` fan out to every page.**
  Touching them means `pnpm run i18n:check` **and** a build, not just
  `translations.test.ts` — 1709 pages render from them.
- **Content collections (`src/content/**`) have no unit tests.** Their gates are
  `pnpm run i18n:check`, `pnpm run md:check` and the build.
- **`.astro` pages and most components are not unit-tested.** The build plus the
  Lighthouse budget are their real gates; a passing `pnpm run test` says nothing
  about them.
- **Mobile Lighthouse performance is CPU-throttle sensitive** and flakes in
  shared-tenancy CI. See [PERFORMANCE.md](./PERFORMANCE.md) before treating a
  single failure as a regression.

### Escalation

Start at the narrowest gate that covers the Touched Surface and widen when the
change crosses a boundary above: a single `src/lib` helper → its mirrored test;
anything touching i18n, translations, content or routing → `i18n:check` plus a
build; anything that changes rendered output → add `md:check`.

### Posture

**Unit-first.** Prefer the mirrored unit test as the gate and widen only when the
change genuinely crosses a boundary. The full suite finishes in seconds, so where
selection would cost more thought than it saves, running `pnpm run test` whole is
the cheaper and equally honest choice.

## Test Structure

```
tests/
├── unit/
│   ├── lib/                            # Utility function tests
│   │   ├── i18n.test.ts                # i18n utility functions
│   │   ├── markdown-for-agents.test.ts # Markdown endpoint serialization
│   │   └── translations.test.ts        # Translation system
│   └── components/                     # Svelte component tests
├── fixtures/                           # Shared mock data
├── helpers/
│   └── setup.ts                        # Test setup (jest-dom matchers)
└── mocks/
    └── astro-content.ts                # Mock for astro:content virtual module
```

## Writing New Tests

### File Naming

- Use `*.test.ts` for all test files
- Place in `tests/unit/lib/` for utility tests
- Place in `tests/unit/components/` for component tests

### Utility Function Tests

```typescript
import { describe, expect, it } from 'vitest';
import { myFunction } from '@/lib/myModule';

describe('myFunction', () => {
  it('returns expected result for valid input', () => {
    expect(myFunction('input')).toBe('expected');
  });

  it('handles edge case', () => {
    expect(myFunction('')).toBe('default');
  });
});
```

### Svelte Component Tests

```typescript
import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import MyComponent from '@/components/MyComponent.svelte';

describe('MyComponent', () => {
  it('renders content', () => {
    render(MyComponent, { props: { title: 'Hello' } });
    expect(screen.getByText('Hello')).toBeDefined();
  });
});
```

### Using Fixtures

Place shared mock data in `tests/fixtures/` and import it into tests. For Svelte components that expect a content-collection entry, build a minimal mock and cast it:

```typescript
import { render } from '@testing-library/svelte';
import MethodologyCard from '@/components/MethodologyCard.svelte';

const doc = { data: { title: 'Introduction', order: 1, lang: 'en' } };

// Use `as never` for CollectionEntry type compatibility
render(MethodologyCard, { props: { doc: doc as never } });
```

## Configuration

### `vitest.config.ts`

Key configuration:

- **Environment:** `happy-dom` (lightweight DOM for tests)
- **Path aliases:** `@/` maps to `src/` (matches tsconfig)
- **Svelte support:** `@sveltejs/vite-plugin-svelte` with `hot: false`
- **Browser resolve:** `conditions: ['browser']` required for Svelte 5 component tests
- **astro:content mock:** Aliased to `tests/mocks/astro-content.ts` since Vitest cannot resolve Astro virtual modules

### Coverage

- **Provider:** V8
- **Target:** 80%+ on statements, branches, functions, and lines for `src/lib/`
- **Excludes:** `src/lib/types.ts`, `src/lib/enum.ts` (type-only files)
- **Reporters:** text, text-summary, html

### Svelte 5 Compatibility

Svelte 5 components require `resolve.conditions: ['browser']` in the Vitest config. Without this, `@testing-library/svelte` throws a `lifecycle_function_unavailable` error because Svelte resolves to server-side exports.

## Test Conventions

- Use descriptive `describe`/`it` blocks: `describe('getUrlPrefix')` + `it('returns /es for Spanish')`
- Prefer `expect().toBe()` for primitives, `expect().toEqual()` for objects
- Test edge cases: empty strings, undefined values, boundary conditions
- Do **not** test async functions that depend on `astro:content` directly — mock the collection instead
- Import order: vitest > testing-library > source modules > fixtures

## Testing Best Practices

### Do

- Test user-visible behavior, not implementation details
- Use meaningful test descriptions that explain the expected behavior
- Keep tests independent (no shared mutable state)
- Use test fixtures for mock data
- Test edge cases and error conditions

### Don't

- Test Astro/Svelte framework internals
- Over-mock to the point tests are meaningless
- Write flaky tests that depend on timing
- Skip running tests before committing

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Svelte](https://testing-library.com/docs/svelte-testing-library/intro)
- [Astro Testing Recipes](https://docs.astro.build/en/recipes/testing/)
