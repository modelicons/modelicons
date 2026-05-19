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
        <header className="hero">
          <h1>modelicons</h1>
          <p>
            300+ AI / LLM brand SVG icons for React. Zero runtime dependencies. ~5 KB per icon
            tree-shaken. Click any brand for variants, copy snippets, and metadata.
          </p>
          <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`Search ${ALL_BRANDS.length} brands…`}
              className="search-input"
              autoFocus
            />
          </div>
        </header>

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
          <button
            onClick={() => setCat('all' as CategoryId)}
            className={`chip ${cat === ('other' as any) ? 'active' : ''}`}
            style={{ display: 'none' }}
          />
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
                style={{ background: 'var(--card)', cursor: 'pointer' }}
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
      </div>

      {opened && <BrandDetail brand={opened} onClose={() => setOpenId(null)} />}
    </>
  );
}
