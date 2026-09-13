// Vite's `?raw` suffix inlines the file's contents as a string at build time,
// so this works identically in dev and in the production build regardless of
// where the compiled chunk ends up on disk (a plain fs path relative to
// import.meta.url breaks in the prerendered build output).
import initMarkdown from '../../public/init.md?raw';

/**
 * The canonical English init.md content — byte-for-byte what `/init.md` serves.
 *
 * `public/init.md` is a hand-maintained, standalone agent artifact (not a
 * content-collection page): it has no HTML sibling and no per-language
 * variants by design. The "Copy init.md" buttons (home hero + /quickstart
 * page) copy this so a user can paste the full onboarding prompt straight
 * into any agent, with zero fetch and zero friction, regardless of the
 * page's display language. English is intentional: init.md is first-class
 * English agent content (the literal prompt that works when pasted), so the
 * copy payload never localizes.
 */
export async function getCanonicalInitMarkdown(): Promise<string> {
  return initMarkdown;
}
