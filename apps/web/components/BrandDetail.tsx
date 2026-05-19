'use client';

import { useEffect, useMemo, useState } from 'react';

import type { BrandEntry } from '../lib/brands';
import { CopyButton } from './CopyButton';

type VariantKey = 'Mono' | 'Color' | 'Text' | 'Avatar' | 'Combine';

export function BrandDetail({ brand, onClose }: { brand: BrandEntry; onClose: () => void }) {
  const { Icon } = brand;
  const [svgHtml, setSvgHtml] = useState<Record<VariantKey, string>>({} as any);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  useEffect(() => {
    // Capture rendered SVG HTML for each variant so we can offer a "copy SVG" button.
    const map: Partial<Record<VariantKey, string>> = {};
    const cells = document.querySelectorAll('[data-variant-cell] svg');
    cells.forEach((el) => {
      const v = el.closest('[data-variant-cell]')?.getAttribute('data-variant-cell') as VariantKey;
      if (v) map[v] = el.outerHTML;
    });
    setSvgHtml(map as any);
  }, [brand.id]);

  const variants = useMemo(() => {
    const list: { key: VariantKey; node: any }[] = [{ key: 'Mono', node: Icon }];
    if (brand.hasColor) list.push({ key: 'Color', node: (Icon as any).Color });
    if (brand.hasText) list.push({ key: 'Text', node: (Icon as any).Text });
    list.push({ key: 'Avatar', node: (Icon as any).Avatar });
    if (brand.hasCombine) list.push({ key: 'Combine', node: (Icon as any).Combine });
    return list;
  }, [Icon, brand]);

  const importLine = `import { ${brand.id} } from 'modelicons';`;
  const subpathImport = `import ${brand.id} from 'modelicons/${brand.id}';`;
  const jsxSnippet =
    `<${brand.id} size={32} />\n` +
    `<${brand.id}.Avatar size={48} />` +
    (brand.hasColor ? `\n<${brand.id}.Color size={32} />` : '') +
    (brand.hasCombine ? `\n<${brand.id}.Combine size={24} type="color" />` : '');

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-label={`${brand.id} brand`}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Icon.Avatar size={48} />
            <div>
              <h2>{brand.id}</h2>
              <div style={{ color: 'var(--muted)', fontSize: 13 }}>{brand.title}</div>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="meta-grid">
          <div className="meta-cell">
            <span className="meta-label">Title</span>
            <code>{brand.title}</code>
          </div>
          <div className="meta-cell">
            <span className="meta-label">Primary color</span>
            <span className="color-swatch" style={{ background: brand.colorPrimary }} />
            <code>{brand.colorPrimary}</code>
          </div>
          <div className="meta-cell">
            <span className="meta-label">Variants</span>
            <code>
              Mono{brand.hasColor && ' · Color'}{brand.hasText && ' · Text'} · Avatar
              {brand.hasCombine && ' · Combine'}
            </code>
          </div>
        </div>

        <div className="variant-row">
          {variants.map((v) => {
            const V: any = v.node;
            return (
              <div key={v.key} className="variant-cell" data-variant-cell={v.key}>
                <span className="label">{v.key}</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 56 }}>
                  {v.key === 'Avatar' ? <V size={48} /> : <V size={36} />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="code-section">
          <h3>1. Install</h3>
          <CodeBlock code="npm install modelicons" />
        </div>

        <div className="code-section">
          <h3>2. Import</h3>
          <CodeBlock code={importLine} />
          <div style={{ height: 8 }} />
          <CodeBlock code={subpathImport} />
        </div>

        <div className="code-section">
          <h3>3. Render</h3>
          <CodeBlock code={jsxSnippet} />
        </div>

        {svgHtml && Object.keys(svgHtml).length > 0 && (
          <div className="code-section">
            <h3>4. Raw SVG (for non-React usage)</h3>
            {variants.map((v) =>
              svgHtml[v.key] ? (
                <div key={v.key} style={{ marginBottom: 8 }}>
                  <div style={{ color: 'var(--muted)', fontSize: 12, marginBottom: 4 }}>{v.key}</div>
                  <CodeBlock code={prettifySvg(svgHtml[v.key])} maxLines={6} />
                </div>
              ) : null,
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function CodeBlock({ code, maxLines }: { code: string; maxLines?: number }) {
  return (
    <div className="code-block" style={maxLines ? { maxHeight: `${maxLines * 1.6}em`, overflow: 'auto' } : undefined}>
      <CopyButton text={code} />
      <code>{code}</code>
    </div>
  );
}

function prettifySvg(html: string): string {
  return html
    .replace(/></g, '>\n<')
    .replace(/^\s+/gm, '');
}
