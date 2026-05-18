# modelicons

Lightweight AI / LLM brand SVG icons for React.

A drop-in alternative to [`@lobehub/icons`](https://github.com/lobehub/lobe-icons) with the same 300+ brand SVGs and the same `Icon` / `Icon.Avatar` / `Icon.Text` / `Icon.Combine` API — but **zero runtime dependencies**.

## Why this exists

`@lobehub/icons` requires you to install (as peer or transitive deps):

- `antd` (v6 — ≈700 KB minified)
- `@lobehub/ui` (≈200 KB)
- `antd-style` + `@ant-design/cssinjs` + `@emotion/*`
- `polished`, `es-toolkit`, `lucide-react`

…all to render a 2 KB SVG. Multiple users have flagged this on the upstream tracker — [lobehub/lobe-icons#233](https://github.com/lobehub/lobe-icons/issues/233), [#132](https://github.com/lobehub/lobe-icons/issues/132), [#232](https://github.com/lobehub/lobe-icons/issues/232).

This package strips all of that out and keeps **only the SVG art**, on top of a 100-line hand-written CSS runtime.

## Cost comparison

| Scenario                                | `@lobehub/icons` | `modelicons` |
| --------------------------------------- | ---------------- | ----------------- |
| Single brand (`OpenAI` mono + avatar)   | ~1 MB minified¹  | **5.7 KB**        |
| Single brand with gradients (`Gemini`)  | ~1 MB minified¹  | **8.6 KB**        |
| Full registry (`ProviderIcon`)          | ~2 MB minified   | ~1 MB             |
| Runtime dependencies                    | 4 + 2 peer       | **0**             |

¹ dominated by the forced antd + @lobehub/ui parent payload that you can't tree-shake out.

## Install

```bash
npm install modelicons
```

Only `react >= 17` is required — no antd, no antd-style, no @lobehub/ui, no anything else.

## Usage

```tsx
import { OpenAI, Anthropic, Gemini } from 'modelicons';

<OpenAI size={32} />
<OpenAI.Avatar size={48} />
<OpenAI.Combine size={24} />
<Anthropic.Text size={24} />
<Gemini.Color size={32} />
```

### Subpath imports (skip the index entirely)

```tsx
import OpenAI from 'modelicons/OpenAI';
import Gemini from 'modelicons/Gemini';
```

301 brand subpaths are exposed in `package.json#exports`. Useful when you don't want your bundler to walk the full export list.

### Generic wrappers

```tsx
import { IconAvatar, IconCombine, OpenAI, Anthropic } from 'modelicons';

<IconAvatar size={48} Icon={OpenAI} background="#000" color="#fff" />
<IconCombine size={24} Icon={Anthropic} Text={Anthropic.Text} />
```

### Provider / model lookup (opt-in, pulls full registry)

```tsx
import { ProviderIcon, ModelIcon } from 'modelicons';

<ProviderIcon provider="openai" type="avatar" size={32} />
<ModelIcon model="claude-3-5-sonnet" type="combine-color" size={24} />
```

The registry imports every brand, so prefer direct imports when you know the brand at compile time.

## Migrating from `@lobehub/icons`

The public API surface is intentionally the same. For most apps, a project-wide find/replace is enough:

```diff
- import { OpenAI, Anthropic, ProviderIcon } from '@lobehub/icons';
+ import { OpenAI, Anthropic, ProviderIcon } from 'modelicons';
```

Differences you may hit:

- **No `AntdRegistry` / `ConfigProvider` required.** Just render the components — they have no theme context.
- **No `useThemeMode`-driven shadow.** The avatar's faint inset border (used for pure black/white brands) is computed inline. Dark/light theming is your app's concern, not ours.
- **`IconAvatarProps.size` is required** (matches upstream; the default is applied at the component boundary, but the prop is non-optional in the type so brand wrappers can do `rest.size * 0.05` math without `!`).

## How the SVG content stays in sync

```bash
npm run sync                  # pin to latest lobe-icons tag
npm run sync -- v5.8.0        # pin to a specific tag
npm run build                 # regenerate dist/
```

The current upstream ref is recorded in `.upstream-ref`.

## How it's built

```
.upstream/         # lobe-icons checkout (gitignored)
scripts/codegen.ts # walks .upstream/src, rewrites antd-flavored imports → src/brands
scripts/postbuild.ts # adds .js extensions for Node ESM + emits per-brand subpath exports
src/
  brands/          # codegen output: 301 brands × { Mono, Text, Color?, Avatar, Combine? }
  runtime/         # hand-written, antd-free: IconAvatar, IconCombine, SegmentedCombine,
                   #   DefaultIcon, DefaultAvatar, Flex
  hooks/useFillId  # React.useId() + inline kebabCase (replaces es-toolkit)
  features/        # ProviderIcon, ModelIcon, ProviderCombine, AgentIcon wrappers
  _internal/       # codegen output: providerConfig / modelConfig / agentConfig / providerEnum
```

The SVG `<path>` data is copied byte-for-byte from upstream. The wrappers around the SVG (Avatar containers, Combine layouts, etc.) are reimplemented in plain React + CSS.

## License

MIT — same as upstream. Brand marks belong to their respective owners.
