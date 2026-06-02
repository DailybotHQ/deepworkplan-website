/**
 * rehype-responsive-tables
 *
 * Wraps every Markdown-rendered `<table>` in a `<div class="table-responsive">`
 * so wide tables scroll horizontally on small screens instead of forcing the
 * whole page wider. The matching styles live in `src/styles/global.css`
 * (`.table-responsive` — `overflow-x: auto` below 768px), the same treatment the
 * homepage `Comparison` component applies manually.
 *
 * Dependency-free: walks the hast tree directly (no unist-util-visit) to avoid
 * adding a runtime dependency for a tiny transform.
 */
export default function rehypeResponsiveTables() {
  return (tree) => {
    walk(tree);
  };
}

function walk(node) {
  if (!node || !Array.isArray(node.children)) return;
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (child && child.type === 'element' && child.tagName === 'table') {
      // Replace the table with a scroll wrapper containing it.
      node.children[i] = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-responsive'] },
        children: [child],
      };
      // Descend into the original table (tables don't nest in Markdown, but
      // this keeps the walk total).
      walk(child);
    } else {
      walk(child);
    }
  }
}
