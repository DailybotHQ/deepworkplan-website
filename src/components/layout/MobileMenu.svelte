<script lang="ts">
import { onDestroy, onMount } from 'svelte';
import { fade } from 'svelte/transition';
import { EVENTS, trackEvent } from '@/lib/analytics';
import { REPO_URLS } from '@/lib/constants/repos';
import {
  getActiveLanguages,
  getLanguageConfig,
  getUrlPrefix,
  stripLangPrefix,
} from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';

export let lang: string = 'en';
export let open: boolean;
export let toggleMenu: () => void;
let languageOpen = false;
let repoOpen = false;
let lockedScrollY = 0;
let isScrollLocked = false;

// Dropdown label: full native name + Title-case code, e.g. "Português (Pt)".
function languageLabel(code: string, nativeName: string): string {
  const titleCode = code.charAt(0).toUpperCase() + code.slice(1);
  return `${nativeName} (${titleCode})`;
}

$: t = getTranslations(lang);
$: prefix = getUrlPrefix(lang);
$: currentLangConfig = getLanguageConfig(lang);
// Only active (translated) languages appear in the switcher.
$: otherLanguages = getActiveLanguages().filter((l) => l !== lang);

function lockBodyScroll() {
  if (isScrollLocked) return;
  lockedScrollY = window.scrollY;
  isScrollLocked = true;
  // Defer DOM writes to next frame to avoid forced reflow (read/write in same tick as Svelte update)
  requestAnimationFrame(() => {
    document.body.style.position = 'fixed';
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  });
}

function unlockBodyScroll() {
  if (!isScrollLocked) return;
  const y = lockedScrollY;
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  isScrollLocked = false;
  requestAnimationFrame(() => window.scrollTo(0, y));
}

// Lock body scroll when menu is open
$: if (typeof document !== 'undefined') {
  if (open) {
    lockBodyScroll();
  } else {
    unlockBodyScroll();
  }
}

// Alternate language URLs - computed on mount from current page path
let alternateLanguageUrls: {
  lang: string;
  url: string;
  flag: string;
  nativeName: string;
  label: string;
}[] = [];

onMount(() => {
  const path = window.location.pathname;
  const basePath = stripLangPrefix(path);

  alternateLanguageUrls = otherLanguages.map((l) => {
    const config = getLanguageConfig(l);
    const url =
      basePath === '/'
        ? config.urlPrefix || '/'
        : `${config.urlPrefix}${basePath}`;
    return {
      lang: l,
      url,
      flag: config.flag,
      nativeName: config.nativeName,
      label: languageLabel(l, config.nativeName),
    };
  });
});

onDestroy(() => {
  if (typeof document !== 'undefined') {
    unlockBodyScroll();
  }
});
</script>

{#if open}
  <div class="fixed inset-0 z-50 bg-main text-white flex flex-col items-center justify-start pt-20 gap-6 overflow-y-auto overscroll-contain transition-all duration-300 md:hidden">
    <button
      class="absolute top-6 right-6 p-2"
      aria-label={t.nav.closeMenu}
      on:click={toggleMenu}
      type="button"
    >
      <!-- Close icon (X) -->
      <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
    <span class="masthead-wordmark text-2xl font-bold tracking-tight">Deep Work Plan</span>
    <span class="h-px w-12 bg-secondary" aria-hidden="true"></span>
    <a href="{prefix}/methodology" class="masthead-link text-xl text-center" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'methodology', source: 'mobile' })}>{t.nav.methodology}</a>
    <a href="{prefix}/spec" class="masthead-link text-xl text-center" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'spec', source: 'mobile' })}>{t.nav.spec}</a>
    <a href="{prefix}/kit" class="masthead-link text-xl text-center" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'kit', source: 'mobile' })}>{t.nav.kit}</a>
    <a href="{prefix}/examples" class="masthead-link text-xl text-center" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'examples', source: 'mobile' })}>{t.nav.examples}</a>
    <button
      class="masthead-link text-xl text-center flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
      on:click={() => repoOpen = !repoOpen}
      aria-expanded={repoOpen}
      aria-controls="repo-dropdown"
      type="button"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      {t.nav.github}
      <svg
        class="w-5 h-5 transition-transform duration-200"
        class:rotate-180={repoOpen}
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    {#if repoOpen}
      <div
        id="repo-dropdown"
        class="flex flex-col items-center gap-2 mt-1"
        transition:fade={{ duration: 150 }}
      >
        <a href={REPO_URLS.website} target="_blank" rel="noopener noreferrer" class="masthead-link text-base sm:text-lg text-center py-1 transition" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'github', repo: 'website', source: 'mobile' })}>{t.nav.repo.website}</a>
        <a href={REPO_URLS.skill} target="_blank" rel="noopener noreferrer" class="masthead-link text-base sm:text-lg text-center py-1 transition" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'github', repo: 'skill', source: 'mobile' })}>{t.nav.repo.skill}</a>
      </div>
    {/if}
    <button
      class="masthead-link text-xl text-center flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
      on:click={() => languageOpen = !languageOpen}
      aria-expanded={languageOpen}
      aria-controls="language-dropdown"
      type="button"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
      {lang.toUpperCase()}
      <svg
        class="w-5 h-5 transition-transform duration-200"
        class:rotate-180={languageOpen}
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    {#if languageOpen}
      <div
        id="language-dropdown"
        class="flex flex-col items-center gap-2 mt-1"
        transition:fade={{ duration: 150 }}
      >
        {#each alternateLanguageUrls as alt}
          <a href={alt.url} lang={alt.lang} class="masthead-link text-base sm:text-lg text-center py-1 transition flex items-center gap-2" on:click={() => { trackEvent(EVENTS.LANGUAGE_SWITCH, { from: lang, to: alt.lang }); toggleMenu(); }}>
            {alt.label}
          </a>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  /* Editorial mobile menu: serif wordmark + paper-on-ink links with an
   * oxblood hover, matching the masthead header. The overlay is always the
   * dark ink ground, so links use the paper text color. */
  .masthead-wordmark {
    font-family: var(--font-serif);
  }
  .masthead-link {
    font-family: var(--font-serif);
    color: #ece7da;
    transition: color 0.2s;
  }
  .masthead-link:hover {
    color: var(--color-secondary);
  }
</style>
