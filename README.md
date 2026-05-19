# modelicons

> Also available for **Vue 3** ([`@modelicons/vue`](packages/vue)) and as raw **framework-agnostic SVG strings** ([`@modelicons/svg`](packages/svg)). All packages share the same brand sources in `src/brands/`.

---

# modelicons

[![npm version](https://img.shields.io/npm/v/modelicons.svg?style=flat-square&color=cb3837)](https://www.npmjs.com/package/modelicons)
[![npm downloads](https://img.shields.io/npm/dm/modelicons.svg?style=flat-square&color=cb3837&label=downloads%2Fmonth)](https://www.npmjs.com/package/modelicons)
[![npm downloads total](https://img.shields.io/npm/dt/modelicons.svg?style=flat-square&color=cb3837&label=total%20downloads)](https://www.npmjs.com/package/modelicons)
[![bundle size](https://img.shields.io/bundlephobia/minzip/modelicons?style=flat-square&label=gzipped&color=5e72e4)](https://bundlephobia.com/package/modelicons)
[![tree-shakeable](https://img.shields.io/badge/tree--shakeable-yes-44cc11?style=flat-square)](https://bundlephobia.com/package/modelicons)
[![zero deps](https://img.shields.io/badge/runtime%20deps-0-44cc11?style=flat-square)](https://www.npmjs.com/package/modelicons?activeTab=dependencies)
[![license](https://img.shields.io/npm/l/modelicons.svg?style=flat-square&color=999999)](https://github.com/modelicons/modelicons/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/modelicons/modelicons?style=flat-square&color=ffd43b)](https://github.com/modelicons/modelicons)

300+ AI model brand SVG icons for React. Zero runtime dependencies. ~5 KB per icon tree-shaken.

```bash
npm install modelicons
```

```tsx
import { OpenAI, Anthropic, Gemini } from 'modelicons';

<OpenAI size={32} />
<Anthropic.Avatar size={48} />
<Gemini.Color size={32} />
```

That's it. No setup, no theme provider, no CSS import.

---

## Table of contents

- [API per brand](#api-per-brand)
- [Available brands](#available-brands)
- [Next.js / RSC: the zero-cost path](#nextjs--rsc-the-zero-cost-path)
- [Client Components (interactive UI)](#client-components-interactive-ui)
- [Dynamic provider lookup](#dynamic-provider-lookup)
- [Generic composition](#generic-composition)
- [Brand metadata (titles, colors)](#brand-metadata-titles-colors)
- [Bundle cost reference](#bundle-cost-reference)
- [TypeScript](#typescript)
- [Common recipes](#common-recipes)
- [Syncing upstream](#syncing-upstream)
- [License & attribution](#license--attribution)

---

## API per brand

Each brand is a **compound component** with multiple variants exposed as static properties:

```tsx
import { OpenAI } from 'modelicons';

<OpenAI size={32} />                {/* Mono — single-color logo, uses currentColor */}
<OpenAI.Color size={32} />          {/* Color — full-color version (if available) */}
<OpenAI.Text size={24} />           {/* Text — the wordmark / logotype */}
<OpenAI.Avatar size={48} />         {/* Avatar — circular/square chip with brand background */}
<OpenAI.Combine size={24} />        {/* Combine — logo + text side-by-side */}
<OpenAI.Combine size={24} type="color" />

{/* Metadata */}
OpenAI.title          // → "OpenAI"
OpenAI.colorPrimary   // → "#000"
OpenAI.colorGpt4      // → "#AB68FF" (brand-specific extras when present)
```

Not every brand has every variant. Most have `Mono`, `Text`, `Avatar`, `Combine`. Some also have `Color`. A handful expose extras like `Brand`, `BrandColor`, `Inner`, `Morden`.

Common props on every icon:

| Prop | Type | Default |
|---|---|---|
| `size` | `number \| string` | `'1em'` (inherits text size) |
| `color` | `string` | `'currentColor'` |
| `style` | `CSSProperties` | — |
| `className` | `string` | — |
| All other `<svg>` attrs | — | passed through |

---

## Available brands

301 brands. To browse the list at runtime:

```ts
import * as Icons from 'modelicons';
console.log(Object.keys(Icons).filter((k) => Icons[k]?.Avatar));
```

Highlights (non-exhaustive):

- **LLM**: OpenAI, Anthropic, Gemini, DeepSeek, Mistral, Cohere, Qwen, Moonshot, Doubao, Wenxin, Hunyuan, ChatGLM, Minimax, Yi, Spark, SenseNova, Grok, Perplexity
- **Image gen**: Midjourney, Dalle, Stability, AdobeFirefly, Recraft, Ideogram, Flux, NanoBanana, Krea, Reve
- **Video gen**: Runway, Pika, Sora, Kling, Luma, Hailuo, Vidu, DreamMachine, Viggle
- **Audio gen**: ElevenLabs, Suno, Udio, FishAudio, Coqui
- **Code agents**: Copilot, Cursor, Windsurf, Cline, ClaudeCode, GeminiCLI, CodeBuddy, RooCode, Codex, OpenHands
- **Cloud / inference**: Bedrock, Azure, AzureAI, VertexAI, GoogleCloud, Replicate, Together, Fireworks, Groq, SiliconCloud, AlibabaCloud, BaiduCloud, TencentCloud
- **Open / tools**: HuggingFace, LlamaIndex, LangChain, LangGraph, Ollama, LmStudio, OpenRouter, OpenWebUI, MCP

Full list in [`src/brands/`](src/brands/) on GitHub.

---

## Next.js / RSC: the zero-cost path

**Use brand icons in Server Components and they cost 0 KB of client JavaScript.** The SVG is rendered server-side and shipped as HTML.

```tsx
// app/components/ProviderList.tsx  ← no 'use client'
import { OpenAI, Anthropic, Gemini, DeepSeek } from 'modelicons';

const PROVIDERS = {
  openai: { Icon: OpenAI, label: 'OpenAI' },
  anthropic: { Icon: Anthropic, label: 'Anthropic' },
  gemini: { Icon: Gemini, label: 'Gemini' },
  deepseek: { Icon: DeepSeek, label: 'DeepSeek' },
} as const;

export function ProviderList() {
  return (
    <ul>
      {Object.entries(PROVIDERS).map(([id, { Icon, label }]) => (
        <li key={id}>
          <Icon.Avatar size={32} />
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}
```

Measured cost: **30 brands × all variants in a Server Component adds 0 bytes to client bundle.** All SVG output is in the SSR HTML.

---

## Client Components (interactive UI)

When you need `onClick`, `useState`, etc., the icons live in client bundle:

```tsx
'use client';
import { OpenAI, Anthropic, Gemini, DeepSeek } from 'modelicons';
import { useState } from 'react';

const PROVIDERS = {
  openai: OpenAI, anthropic: Anthropic, gemini: Gemini, deepseek: DeepSeek,
};

export function ProviderTabs() {
  const [active, setActive] = useState<keyof typeof PROVIDERS>('openai');
  const Icon = PROVIDERS[active];

  return (
    <div>
      <div>
        {(Object.keys(PROVIDERS) as Array<keyof typeof PROVIDERS>).map((id) => {
          const P = PROVIDERS[id];
          return (
            <button key={id} onClick={() => setActive(id)} style={{ opacity: active === id ? 1 : 0.5 }}>
              <P.Avatar size={32} />
            </button>
          );
        })}
      </div>
      <Icon.Combine size={32} type="color" />
    </div>
  );
}
```

Measured cost: **30 brands ≈ 195 KB raw / 59 KB gzip.** Each additional brand adds about 6.5 KB raw / 2 KB gzip.

---

## Dynamic provider lookup

When the provider name only comes from a runtime string (API response, user input), use the registry helpers. **They pull every brand into your bundle**, so always lazy-load them.

```tsx
'use client';
import { lazy, Suspense } from 'react';

const ProviderIcon = lazy(() =>
  import('modelicons').then((m) => ({ default: m.ProviderIcon })),
);
const ModelIcon = lazy(() =>
  import('modelicons').then((m) => ({ default: m.ModelIcon })),
);

export function DynamicProviderBadge({ provider }: { provider: string }) {
  return (
    <Suspense fallback={<span style={{ display: 'inline-block', width: 32, height: 32 }} />}>
      <ProviderIcon provider={provider} size={32} type="avatar" />
    </Suspense>
  );
}

export function DynamicModelBadge({ model }: { model: string }) {
  return (
    <Suspense fallback={null}>
      <ModelIcon model={model} type="combine-color" size={24} />
    </Suspense>
  );
}
```

`provider` accepts case-insensitive keywords matched against an internal registry: `"openai"`, `"anthropic"`, `"bedrock"`, `"azure"`, `"vertexai"`, `"deepseek"`, `"qwen"`, etc.

`model` accepts case-insensitive regex-matched patterns: `"claude-3-5-sonnet"`, `"gpt-4o"`, `"gemini-1.5-pro"`, `"deepseek-v3"`, etc.

`type` for both: `'avatar' | 'mono' | 'color' | 'combine' | 'combine-color'`.

Measured cost of the lazy chunk: **2.4 MB raw / 720 KB gzip**, downloaded once on first use, then cached by the browser indefinitely.

**Rule of thumb**: if you know the brand at compile time, use direct imports (~6 KB each). Use `ProviderIcon` / `ModelIcon` only when the brand truly comes from a runtime string.

---

## Generic composition

Build custom avatars / combinations on top of any icon:

```tsx
import { IconAvatar, IconCombine, OpenAI, Anthropic } from 'modelicons';

{/* Custom avatar — pick your own background/color */}
<IconAvatar size={48} Icon={OpenAI} background="#10A37F" color="#fff" />
<IconAvatar size={48} Icon={Anthropic} background="#F1F0E8" color="#141413" shape="square" />

{/* Custom logo+text */}
<IconCombine
  size={24}
  Icon={Anthropic}
  Text={Anthropic.Text}
  spaceMultiple={0.2}
  extra="Beta"
/>
```

`IconAvatar` props: `size` (required), `Icon`, `background`, `color`, `shape: 'circle' | 'square'`, `iconMultiple` (scale of inner icon, default 0.75), plus any `<div>` attrs.

`IconCombine` props: `size`, `Icon`, `Text`, `spaceMultiple`, `textMultiple`, `extra`, `inverse` (text-first), `showLogo`, `showText`.

---

## Brand metadata (titles, colors)

Every brand exposes its display title and primary brand color as static properties:

```tsx
import { OpenAI, Anthropic, Gemini } from 'modelicons';

OpenAI.title          // "OpenAI"
OpenAI.colorPrimary   // "#000"
Anthropic.title       // "Anthropic"
Anthropic.colorPrimary // "#F1F0E8"
```

Some brands include extras (model-specific colors, alternate marks):

```tsx
OpenAI.colorGpt3      // "#19C37D"
OpenAI.colorGpt4      // "#AB68FF"
OpenAI.colorGpt5      // "#F86AA4"
OpenAI.colorO1        // "#F9C322"
```

Inspect any brand in DevTools or via `Object.keys(OpenAI)` to discover what's available.

---

## Bundle cost reference

Measured with esbuild + minify + gzip against a real npm install:

| Usage | minified | gzipped |
|---|---|---|
| `import { OpenAI } from 'modelicons'` | 5.9 KB | 2.8 KB |
| `import OpenAI from 'modelicons/OpenAI'` (subpath) | 5.9 KB | 2.8 KB |
| Brand with gradients (e.g. `Gemini`) | 8.8 KB | 2.9 KB |
| 3 brands | 17.7 KB | 6.6 KB |
| 10 brands | 59 KB | 20 KB |
| 30 brands | 195 KB | **59 KB** |
| All 301 brands | 2.4 MB | 775 KB |
| `import { ProviderIcon }` (full registry) | 1.6 MB | 485 KB |

In **Next.js Server Components**, any number of brands costs **0 KB of client JavaScript** — the SVGs ship as HTML.

---

## TypeScript

All types are bundled. Per-brand prop types are accessible:

```ts
import type { IconType, IconAvatarProps, IconCombineProps } from 'modelicons';

interface MyButtonProps {
  Icon: IconType;
  size?: number;
}
```

`IconType` is the `forwardRef`-wrapped SVG component shape used by all brand mono/color/text variants.

---

## Common recipes

### Model badge (LLM provider chip)

```tsx
import { OpenAI, Anthropic, Gemini, DeepSeek } from 'modelicons';

const PROVIDER_ICONS = {
  openai: OpenAI, anthropic: Anthropic, gemini: Gemini, deepseek: DeepSeek,
} as const;

export function ModelBadge({ provider }: { provider: keyof typeof PROVIDER_ICONS }) {
  const Icon = PROVIDER_ICONS[provider];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <Icon.Avatar size={20} />
      <span style={{ fontSize: 13 }}>{Icon.title}</span>
    </span>
  );
}
```

### Stream-message indicator

```tsx
import { Anthropic } from 'modelicons';

export function StreamingIndicator() {
  return (
    <Anthropic
      size={20}
      style={{
        animation: 'spin 2s linear infinite',
      }}
    />
  );
}
```

### Themed avatar (uses brand's own color)

```tsx
import { OpenAI, IconAvatar } from 'modelicons';

<IconAvatar
  size={40}
  Icon={OpenAI}
  background={OpenAI.colorPrimary}   // "#000"
  color="#fff"
/>
```

### Tailwind class pass-through

```tsx
<OpenAI className="w-8 h-8 text-emerald-500 hover:scale-110 transition" />
```

Tailwind's text color applies because the icon uses `fill="currentColor"`.

### Animated provider switcher (lazy registry)

```tsx
'use client';
import { lazy, Suspense, useState } from 'react';
const ProviderIcon = lazy(() => import('modelicons').then((m) => ({ default: m.ProviderIcon })));

const PROVIDERS = ['openai', 'anthropic', 'gemini', 'deepseek', 'cohere', 'mistral'];

export function ProviderCarousel() {
  const [i, setI] = useState(0);
  return (
    <div onClick={() => setI((i + 1) % PROVIDERS.length)} style={{ cursor: 'pointer' }}>
      <Suspense fallback={<div style={{ width: 64, height: 64 }} />}>
        <ProviderIcon provider={PROVIDERS[i]} size={64} type="avatar" />
      </Suspense>
    </div>
  );
}
```

---

## Syncing upstream

The SVG source content is derived from an upstream icon library. To pull updates:

```bash
npm run sync                  # pin to latest upstream tag
npm run sync -- v5.8.0        # pin to a specific tag
npm run build                 # rebuild dist/
```

The current pin lives in `.upstream-ref`.

---

## License & attribution

MIT.

Brand marks belong to their respective owners and are included for identification purposes only. modelicons is not affiliated with, endorsed by, or sponsored by any of the brands depicted. To request removal of a brand, open an issue at [github.com/modelicons/modelicons/issues](https://github.com/modelicons/modelicons/issues).

SVG source content is derived from [lobehub/lobe-icons](https://github.com/lobehub/lobe-icons) (MIT). The runtime, build tooling, and component shells are original to this project.
