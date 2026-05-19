'use client';

import { useDeferredValue, useMemo, useState } from 'react';

import { CATEGORIES, type CategoryId } from '../lib/categories';
import { ALL_BRANDS } from '../lib/brands';
import { BrandDetail } from './BrandDetail';

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
        {/* Compact hero — gives the grid maximum space */}
        <header className="hero hero-compact">
          <div className="hero-text">
            <h1>{ALL_BRANDS.length} AI brand icons for the web</h1>
            <p>
              Zero runtime dependencies. ~5 KB per icon tree-shaken. Available for React, Vue, and
              as raw SVG (Svelte / SolidJS / Astro / vanilla HTML).
            </p>
          </div>
        </header>

        {/* Sticky filter bar */}
        <div className="filter-bar-sticky">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${ALL_BRANDS.length} brands…`}
            className="search-input"
            autoFocus
          />
          <div className="chip-row inline-chips">
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
