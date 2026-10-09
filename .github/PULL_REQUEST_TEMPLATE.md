## Summary

<!-- What changes and why, in a few sentences. -->

## Linked issue

<!-- Closes #… (or "none"). -->

## Test evidence

<!-- Paste the last line of each run. -->

- `pnpm run biome:check`:
- `pnpm run astro:check`:
- `pnpm run test`:
- `pnpm run build`:
- `pnpm run i18n:check` / `pnpm run md:check:strict`:
- `bash scripts/check-public-hygiene.sh`:

## Checklist

- [ ] Conventional commit title (`feat:`, `fix:`, `docs:`, …)
- [ ] Content changed in every active language (17), with correct orthography
- [ ] Agent Markdown endpoints (`src/content/pages/<lang>/*.md`) updated with the HTML
- [ ] Tests added or updated (docs/TESTING_GUIDE.md); docs updated where behavior changed
- [ ] `CHANGELOG.md` `[Unreleased]` updated for user-visible changes
- [ ] No fetch-piped-to-shell install line in any page, translation or doc
- [ ] No secrets, tokens, personal paths or private context in the diff
