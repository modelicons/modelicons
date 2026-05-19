'use client';

import { useDeferredValue, useMemo, useState } from 'react';

import { CATEGORIES, type CategoryId } from '../lib/categories';
import { ALL_BRANDS } from '../lib/brands';
import { BrandDetail } from './BrandDetail';
import { CopyButton } from './CopyButton';

const INSTALL_CMD = 'npm install modelicons';
const USAGE_SNIPPET = `import { OpenAI, Anthropic, Gemini } from 'modelicons';

<OpenAI size={32} />
<Anthropic.Avatar size={48} />
<Gemini.Color size={32} />`;

const FEATURES = [
  { title: 'Zero deps', body: 'Only react as peer. No antd, no CSS-in-JS engine, no utility libs.' },
  { title: 'Tree-shake friendly', body: '~5 KB minified per icon. 30 brands ≈ 60 KB gzip.' },
  { title: 'RSC ready', body: 'Render in Next.js Server Components for 0 KB client cost.' },
  { title: '319 brands', body: 'LLM, image gen, video gen, audio, code agents, cloud, vector DBs.' },
];

export function BrandGrid() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<CategoryId>('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const deferred = useDeferredValue(q.toLowerCase());

  const filtered = useMemo(() => {
    return ALL_BRANDS.filter((b) => {
      if (cat !== 'all' && b.category !== cat) return false;
      if (deferred && !b.id.toLowerCase().includes(deferred)) return false;
      return true;
    });
  }, [deferred, cat]);

  const opened = openId ? ALL_BRANDS.find((b) => b.id === openId) : null;

  return (
    <>
      <div className="container">
        <header className="hero">
          <h1>modelicons</h1>
          <p>
            {ALL_BRANDS.length} AI / LLM brand SVG icons for React. Zero runtime dependencies.
            Tree-shakeable to ~5 KB per icon.
          </p>
          <div className="hero-cta">
            <a className="cta" href="https://www.npmjs.com/package/modelicons" target="_blank" rel="noreferrer">
              View on npm →
            </a>
            <a
              className="cta secondary"
              href="https://github.com/modelicons/modelicons"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </header>

        <section className="why-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="why-cell">
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </section>

        <section className="quickstart">
          <div className="qs-row">
            <span className="qs-step">1. Install</span>
            <div className="qs-code">
              <CopyButton text={INSTALL_CMD} />
              <code>{INSTALL_CMD}</code>
            </div>
          </div>
          <div className="qs-row">
            <span className="qs-step">2. Use</span>
            <div className="qs-code multi">
              <CopyButton text={USAGE_SNIPPET} />
              <pre>
                <code>{USAGE_SNIPPET}</code>
              </pre>
            </div>
          </div>
        </section>

        <section className="browse">
          <div className="browse-header">
            <h2>Browse {ALL_BRANDS.length} brands</h2>
            <p>Click any brand for variants, copy snippets, and metadata.</p>
          </div>

          <div className="filter-bar">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search brand name…"
              className="search-input"
            />
          </div>

          <div className="chip-row">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`chip ${cat === c.id ? 'active' : ''}`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="result-meta">
            {filtered.length} of {ALL_BRANDS.length} brands
            {cat !== 'all' && ` · ${CATEGORIES.find((c) => c.id === cat)?.label}`}
            {q && ` · "${q}"`}
          </div>

          <div className="grid">
            {filtered.map((b) => {
              const Icon: any = b.Icon;
              const Preview = b.hasColor ? Icon.Color : Icon;
              return (
                <button
                  key={b.id}
                  onClick={() => setOpenId(b.id)}
                  className="card"
                  title={b.id}
                >
                  <div style={{ height: 48, display: 'flex', alignItems: 'center' }}>
                    <Preview size={40} />
                  </div>
                  <span className="name">{b.id}</span>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div className="card empty" style={{ gridColumn: '1 / -1' }}>
                No brands match "{q}".
              </div>
            )}
          </div>
        </section>

        <footer className="site-footer">
          <p>
            MIT licensed. Brand marks belong to their respective owners. SVG art derived from
            lobehub/lobe-icons (MIT).
          </p>
        </footer>
      </div>

      {opened && <BrandDetail brand={opened} onClose={() => setOpenId(null)} />}
    </>
  );
}
