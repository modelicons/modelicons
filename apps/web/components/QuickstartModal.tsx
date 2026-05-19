'use client';

import { useEffect } from 'react';

import { CopyButton } from './CopyButton';

const INSTALL_CMD = 'npm install modelicons';
const USAGE_SNIPPET = `import { OpenAI, Anthropic, Gemini } from 'modelicons';

<OpenAI size={32} />
<Anthropic.Avatar size={48} />
<Gemini.Color size={32} />`;
const RSC_SNIPPET = `// app/components/ProviderList.tsx — Server Component
import { OpenAI, Anthropic, Gemini } from 'modelicons';

export function ProviderList() {
  return (
    <ul>
      <li><OpenAI.Avatar size={32} /> OpenAI</li>
      <li><Anthropic.Avatar size={32} /> Anthropic</li>
      <li><Gemini.Avatar size={32} /> Gemini</li>
    </ul>
  );
}`;
const DYNAMIC_SNIPPET = `'use client';
import { lazy, Suspense } from 'react';

const ProviderIcon = lazy(() =>
  import('modelicons').then((m) => ({ default: m.ProviderIcon }))
);

<Suspense fallback={null}>
  <ProviderIcon provider={dynamicName} size={32} type="avatar" />
</Suspense>`;

const FEATURES = [
  { title: 'Zero deps', body: 'Only react as peer. No antd, no CSS-in-JS engine, no utility libs.' },
  { title: 'Tree-shake friendly', body: '~5 KB minified per icon. 30 brands ≈ 60 KB gzipped.' },
  { title: 'RSC ready', body: 'Render in Next.js Server Components for 0 KB client cost.' },
  { title: '319 brands', body: 'LLM, image gen, video gen, audio, code agents, cloud, vector DBs.' },
];

export function QuickstartModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-label="Get started with modelicons">
        <div className="modal-header">
          <div>
            <h2 style={{ margin: 0 }}>Get started</h2>
            <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>
              Install in 5 seconds, render in 1 line.
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {/* Why */}
        <section style={{ marginBottom: 24 }}>
          <h3 className="qs-section-h">Why modelicons</h3>
          <div className="why-grid" style={{ margin: '8px 0 0' }}>
            {FEATURES.map((f) => (
              <div key={f.title} className="why-cell">
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 1. Install */}
        <section className="code-section">
          <h3>1. Install</h3>
          <div className="code-block">
            <CopyButton text={INSTALL_CMD} />
            <code>{INSTALL_CMD}</code>
          </div>
        </section>

        {/* 2. Basic usage */}
        <section className="code-section">
          <h3>2. Basic usage</h3>
          <div className="code-block">
            <CopyButton text={USAGE_SNIPPET} />
            <pre style={{ margin: 0 }}>
              <code>{USAGE_SNIPPET}</code>
            </pre>
          </div>
        </section>

        {/* 3. Next.js RSC (recommended) */}
        <section className="code-section">
          <h3>3. Next.js Server Components — 0 KB client cost</h3>
          <div className="code-block">
            <CopyButton text={RSC_SNIPPET} />
            <pre style={{ margin: 0 }}>
              <code>{RSC_SNIPPET}</code>
            </pre>
          </div>
        </section>

        {/* 4. Dynamic lookup */}
        <section className="code-section">
          <h3>4. Runtime provider lookup (lazy)</h3>
          <p style={{ color: 'var(--muted)', fontSize: 13, margin: '0 0 8px' }}>
            Use this only when the provider name comes from a runtime string. It pulls the full
            registry (~720 KB gzip) into a separate chunk.
          </p>
          <div className="code-block">
            <CopyButton text={DYNAMIC_SNIPPET} />
            <pre style={{ margin: 0 }}>
              <code>{DYNAMIC_SNIPPET}</code>
            </pre>
          </div>
        </section>

        {/* Links */}
        <section style={{ display: 'flex', gap: 12, paddingTop: 8, flexWrap: 'wrap' }}>
          <a
            className="cta"
            href="https://www.npmjs.com/package/modelicons"
            target="_blank"
            rel="noreferrer"
          >
            View on npm
          </a>
          <a
            className="cta secondary"
            href="https://github.com/modelicons/modelicons#readme"
            target="_blank"
            rel="noreferrer"
          >
            Full docs on GitHub →
          </a>
        </section>
      </div>
    </div>
  );
}
