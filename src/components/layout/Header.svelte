<script lang="ts">
import { onMount } from 'svelte';
import { EVENTS, trackEvent } from '@/lib/analytics';
import {
  getLanguageConfig,
  getSupportedLanguages,
  getUrlPrefix,
  stripLangPrefix,
} from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';
import MobileMenu from './MobileMenu.svelte';

export let lang: string = 'en';
let open: boolean = false;
let languageOpen = false;

$: t = getTranslations(lang);
$: prefix = getUrlPrefix(lang);
$: currentLangConfig = getLanguageConfig(lang);
$: otherLanguages = getSupportedLanguages().filter((l) => l !== lang);

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

function toggleMenu() {
  open = !open;
  trackEvent(EVENTS.MOBILE_MENU_TOGGLE, { action: open ? 'open' : 'close' });
}

function openDropdown(which: string) {
  languageOpen = which === 'language';
}

function closeAllDropdowns() {
  languageOpen = false;
}
</script>

<svelte:window on:click={closeAllDropdowns} />

<header class="bg-main text-white sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
  <nav class="main-container flex items-center justify-between">
    <a
      href={prefix || '/'}
      class="font-extrabold text-2xl md:text-3xl tracking-tight text-blue-600 select-none"
      aria-label="Deep Work Plan"
    >
      <img
        class="h-7 w-auto md:h-8"
        src="/images/logo_small_version_white.svg"
        alt=""
        width={952}
        height={168}
        loading="eager"
        fetchpriority="high"
      />
    </a>
    <!-- Desktop menu -->
    <div class="hidden md:flex items-center gap-8">
      <div class="flex gap-6">
        <a href="{prefix}/methodology" class="nav-link" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'methodology' })}>{t.nav.methodology}</a>
        <a href="{prefix}/spec" class="nav-link" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'spec' })}>{t.nav.spec}</a>
        <a href="{prefix}/kit" class="nav-link" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'kit' })}>{t.nav.kit}</a>
        <a href="{prefix}/examples" class="nav-link" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'examples' })}>{t.nav.examples}</a>
        <a href="https://github.com/DailybotHQ/deepworkplan-website" target="_blank" rel="noopener noreferrer" class="nav-link flex items-center gap-1" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'github' })} aria-label={t.nav.github}>
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          {t.nav.github}
        </a>
        <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
        <div
          role="group"
          class="relative group"
          on:mouseenter={() => openDropdown('language')}
          on:mouseleave={() => languageOpen = false}
          on:click|stopPropagation={() => {}}
        >
          <button
            class="nav-link flex items-center gap-1 cursor-pointer select-none"
            aria-expanded={languageOpen}
            aria-haspopup="true"
            aria-controls="language-dropdown"
            type="button"
            on:click={() => languageOpen ? closeAllDropdowns() : openDropdown('language')}
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            {lang.toUpperCase()}
            <svg
              class="w-4 h-4 transition-transform duration-200"
              style="transform: rotate({languageOpen ? '180deg' : '0deg'});"
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
              class="absolute left-1/2 -translate-x-1/2 top-full w-20"
              style="height: 12px; pointer-events: auto;"
            ></div>
            <div
              id="language-dropdown"
              class="absolute left-1/2 -translate-x-1/2 top-full w-20 bg-white dark:bg-gray-800 text-black dark:text-gray-200 rounded shadow-lg z-50 overflow-hidden transition-all duration-200"
              style="pointer-events: auto; opacity: 1; transform: translateY(12px);"
            >
              {#each alternateLanguageUrls as alt}
                <a href={alt.url} class="block w-full text-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition" on:click={() => trackEvent(EVENTS.LANGUAGE_SWITCH, { from: lang, to: alt.lang })}>
                  {alt.lang.toUpperCase()}
                </a>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>
    <!-- Mobile menu button -->
    <button
      class="block md:hidden p-2"
      aria-label={t.nav.menu}
      on:click={toggleMenu}
      type="button"
    >
      <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
  </nav>
  <MobileMenu {lang} {open} {toggleMenu} />
</header>
