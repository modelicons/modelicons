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
  { title: 'Zero deps', body: 'No antd, no CSS-in-JS engine, no utility libs.' },
  { title: 'Tree-shake friendly', body: '~5 KB minified per icon. 30 brands ≈ 60 KB gzipped.' },
  { title: 'Multi-framework', body: 'React (modelicons), Vue 3 (@modelicons/vue), raw SVG (@modelicons/svg).' },
  { title: '319 brands', body: 'LLM, image gen, video gen, audio, code agents, cloud, vector DBs.' },
];

const VUE_SNIPPET = `<script setup>
import { Mono as OpenAI } from '@modelicons/vue/OpenAI';
import { Color as Gemini } from '@modelicons/vue/Gemini';
</script>

<template>
  <OpenAI :size="32" />
  <Gemini :size="48" />
</template>`;

const SVG_SNIPPET = `// Svelte / SolidJS / Astro / vanilla HTML
import { mono } from '@modelicons/svg/OpenAI';

document.getElementById('logo').innerHTML = mono;
// or in Svelte:  {@html mono}
// or in SolidJS: <div innerHTML={mono} />`;

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

        {/* React */}
        <section className="code-section">
          <h3>React</h3>
          <div className="code-block">
            <CopyButton text="npm install modelicons" />
            <code>npm install modelicons</code>
          </div>
          <div style={{ height: 8 }} />
          <div className="code-block">
            <CopyButton text={USAGE_SNIPPET} />
            <pre style={{ margin: 0 }}>
              <code>{USAGE_SNIPPET}</code>
            </pre>
          </div>
        </section>

        {/* Vue */}
        <section className="code-section">
          <h3>Vue 3</h3>
          <div className="code-block">
            <CopyButton text="npm install @modelicons/vue" />
            <code>npm install @modelicons/vue</code>
          </div>
          <div style={{ height: 8 }} />
          <div className="code-block">
            <CopyButton text={VUE_SNIPPET} />
            <pre style={{ margin: 0 }}>
              <code>{VUE_SNIPPET}</code>
            </pre>
          </div>
        </section>

        {/* Raw SVG */}
        <section className="code-section">
          <h3>Svelte / SolidJS / Astro / anywhere else</h3>
          <div className="code-block">
            <CopyButton text="npm install @modelicons/svg" />
            <code>npm install @modelicons/svg</code>
          </div>
          <div style={{ height: 8 }} />
          <div className="code-block">
            <CopyButton text={SVG_SNIPPET} />
            <pre style={{ margin: 0 }}>
              <code>{SVG_SNIPPET}</code>
            </pre>
          </div>
        </section>

        {/* React extras */}
        <section className="code-section">
          <h3>React extras: RSC + dynamic lookup</h3>
          <p style={{ color: 'var(--muted)', fontSize: 13, margin: '0 0 8px' }}>
            In Next.js Server Components the icons add 0 KB to client bundle.
          </p>
          <div className="code-block">
            <CopyButton text={RSC_SNIPPET} />
            <pre style={{ margin: 0 }}>
              <code>{RSC_SNIPPET}</code>
            </pre>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: 13, margin: '12px 0 8px' }}>
            For provider names that come from a runtime string, lazy-load the registry.
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
