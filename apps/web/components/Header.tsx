'use client';

import { useState } from 'react';

import { QuickstartModal } from './QuickstartModal';
import { useTheme } from './ThemeProvider';

export function Header({ count }: { count: number }) {
  const { theme, toggle } = useTheme();
  const [showQuickstart, setShowQuickstart] = useState(false);
  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <a href="/" className="brand-mark">
            <span
              style={{
                display: 'inline-block',
                width: 24,
                height: 24,
                background: 'var(--accent)',
                borderRadius: 6,
              }}
            />
            modelicons
          </a>
          <span className="header-meta">{count} brands</span>
          <a
            href="https://modelmeta.dev/icons"
            target="_blank"
            rel="noreferrer"
            className="header-meta"
            title="Canonical live gallery"
          >
            modelmeta.dev/icons ↗
          </a>
          <div style={{ flex: 1 }} />
          <button
            onClick={() => setShowQuickstart(true)}
            className="cta-sm"
            aria-label="Open quick start guide"
          >
            Get started
          </button>
          <a
            href="https://www.npmjs.com/package/modelicons"
            target="_blank"
            rel="noreferrer"
            className="header-meta"
          >
            npm
          </a>
          <a
            href="https://github.com/modelicons/modelicons"
            target="_blank"
            rel="noreferrer"
            className="header-meta"
          >
            GitHub
          </a>
          <button onClick={toggle} className="theme-toggle" aria-label="Toggle theme">
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>
      </header>
      {showQuickstart && <QuickstartModal onClose={() => setShowQuickstart(false)} />}
    </>
  );
}
