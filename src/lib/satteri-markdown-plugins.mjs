/**
 * Sätteri HAST plugins for the site Markdown/MDX pipeline.
 *
 * Restores the transforms previously provided by rehype-external-links and
 * rehype-responsive-tables when the site used the unified remark/rehype stack.
 */
import { defineHastPlugin } from 'satteri';

/**
 * Open absolute http(s) links in a new tab with a safe rel.
 * Relative and same-site path links are left alone.
 */
export const externalLinksPlugin = defineHastPlugin({
  name: 'external-links',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      const href = node.properties?.href;
      if (typeof href !== 'string') return;
      if (!href.startsWith('http://') && !href.startsWith('https://')) return;
      ctx.setProperty(node, 'target', '_blank');
      ctx.setProperty(node, 'rel', 'noopener noreferrer');
    },
  },
});

/**
 * Wrap every Markdown `<table>` in `<div class="table-responsive">` so wide
 * tables scroll horizontally on small screens (styles in global.css).
 */
export const responsiveTablesPlugin = defineHastPlugin({
  name: 'responsive-tables',
  element: {
    filter: ['table'],
    visit(node, ctx) {
      const parent = ctx.parent(node);
      if (
        parent &&
        parent.type === 'element' &&
        parent.tagName === 'div' &&
        Array.isArray(parent.properties?.className) &&
        parent.properties.className.includes('table-responsive')
      ) {
        return;
      }
      ctx.wrapNode(node, {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-responsive'] },
        children: [],
      });
    },
  },
});

/** Plugins wired into `satteri({ hastPlugins })` in astro.config.mjs. */
export const satteriHastPlugins = [externalLinksPlugin, responsiveTablesPlugin];
