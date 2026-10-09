import { svelte } from '@sveltejs/vite-plugin-svelte';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    conditions: ['browser'],
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
      'astro:content': new URL(
        './tests/mocks/astro-content.ts',
        import.meta.url
      ).pathname,
    },
  },
  test: {
    environment: 'happy-dom',
    include: ['tests/**/*.test.ts'],
    // Ecosystem hub clones carry their own test suites; never collect them.
    exclude: [...configDefaults.exclude, '**/repositories/**'],
    globals: true,
    setupFiles: ['tests/helpers/setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/lib/**/*.ts'],
      exclude: ['src/lib/types.ts', 'src/lib/enum.ts'],
      reporter: ['text', 'text-summary', 'html'],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
