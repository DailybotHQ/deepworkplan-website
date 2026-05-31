<script lang="ts">
import { onDestroy, onMount } from 'svelte';
import { fade } from 'svelte/transition';
import { EVENTS, trackEvent } from '@/lib/analytics';
import {
  getLanguageConfig,
  getSupportedLanguages,
  getUrlPrefix,
  stripLangPrefix,
} from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';

export let lang: string = 'en';
export let open: boolean;
export let toggleMenu: () => void;
let languageOpen = false;
let lockedScrollY = 0;
let isScrollLocked = false;

$: t = getTranslations(lang);
$: prefix = getUrlPrefix(lang);
$: currentLangConfig = getLanguageConfig(lang);
$: otherLanguages = getSupportedLanguages().filter((l) => l !== lang);

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
    return { lang: l, url, flag: config.flag, nativeName: config.nativeName };
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
    <a href="https://github.com/DailybotHQ/deepworkplan-website" target="_blank" rel="noopener noreferrer" class="masthead-link text-xl text-center" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'github', source: 'mobile' })}>{t.nav.github}</a>
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
          <a href={alt.url} class="masthead-link text-base sm:text-lg text-center py-1 transition flex items-center gap-2" on:click={() => { trackEvent(EVENTS.LANGUAGE_SWITCH, { from: lang, to: alt.lang }); toggleMenu(); }}>
            {alt.nativeName}
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
