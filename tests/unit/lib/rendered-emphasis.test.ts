import { describe, expect, it } from 'vitest';
import {
  findUnclosedEmphasis,
  visibleText,
} from '../../../scripts/check-rendered-emphasis.mjs';

// The rendered-emphasis check runs at the end of `pnpm run build` over dist/.
// These cases pin what it reports: a bold span the Markdown renderer left
// unclosed (the CJK flanking-rule failure), and nothing inside verbatim
// elements or ordinary identifiers.

describe('findUnclosedEmphasis', () => {
  it('reports a bold span left open after full-width punctuation', () => {
    const html = '<p>一切：**这是什么类型的代码仓库？**它所推断出的原型</p>';
    expect(findUnclosedEmphasis(html)).toHaveLength(2);
  });

  it('reports a bold code span followed by a Korean particle', () => {
    const html =
      '<li>****는 모든 계정과 프로필에 남은 할당량을 보여 줍니다</li>';
    expect(findUnclosedEmphasis(html)).toHaveLength(2);
  });

  it('reports markers in plain-text strings and entity-encoded markers', () => {
    expect(
      findUnclosedEmphasis('<p>loads **at entry** each time</p>')
    ).toHaveLength(2);
    expect(findUnclosedEmphasis('<p>a &#42;&#42;b</p>')).toHaveLength(1);
    expect(findUnclosedEmphasis('<p>left __open__ here</p>')).toHaveLength(2);
  });

  it('accepts correctly rendered emphasis', () => {
    const html =
      '<p><strong>这是什么类型的代码仓库</strong>？它所推断出的原型</p>';
    expect(findUnclosedEmphasis(html)).toEqual([]);
  });

  it('ignores markers inside verbatim elements, comments and inner identifiers', () => {
    const html = [
      '<pre><code>x = a ** b</code></pre>',
      '<p>use <code>**kwargs</code> and <kbd>**</kbd></p>',
      '<script>const p = 2 ** 8;</script>',
      '<!-- **draft** -->',
      '<p>the snake__case name</p>',
    ].join('');
    expect(findUnclosedEmphasis(html)).toEqual([]);
  });

  it('ignores raw Markdown in attribute values', () => {
    const html =
      '<button data-copy="> quote\n\nmake it **AI-first**" title=\'a > b\'>Copy</button>';
    expect(findUnclosedEmphasis(html)).toEqual([]);
    expect(visibleText(html)).toBe('Copy');
  });

  it('keeps visible text and drops tags', () => {
    expect(visibleText('<p>a <em>b</em> &amp; c</p>')).toBe('a b & c');
  });
});
