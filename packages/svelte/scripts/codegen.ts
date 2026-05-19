/**
 * Codegen for @modelicons/svelte.
 *
 *   Walks ../../../src/brands/<Brand>/components/{Mono,Color,Text}.tsx and emits
 *   <Brand>{Variant}.svelte files plus per-brand index.ts re-exporting them.
 *
 *   Svelte components are shipped as raw .svelte source — consumers' bundlers
 *   (vite-plugin-svelte / SvelteKit / sveltefire) compile them. We also emit
 *   .d.ts shims so TypeScript users get prop typing.
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REACT_BRANDS = join(ROOT, '..', '..', 'src', 'brands');
const OUT = join(ROOT, 'src');

const NON_BRAND = new Set(['index.ts']);
const brands = readdirSync(REACT_BRANDS)
  .filter((n) => {
    if (NON_BRAND.has(n)) return false;
    try { return statSync(join(REACT_BRANDS, n)).isDirectory(); } catch { return false; }
  })
  .sort();

console.log(`[svelte-codegen] ${brands.length} brands`);

const jsxToSvgAttrs = (s: string) =>
  s
    .replace(/fillRule=/g, 'fill-rule=')
    .replace(/fillOpacity=/g, 'fill-opacity=')
    .replace(/clipRule=/g, 'clip-rule=')
    .replace(/clipPath=/g, 'clip-path=')
    .replace(/stopColor=/g, 'stop-color=')
    .replace(/stopOpacity=/g, 'stop-opacity=')
    .replace(/strokeWidth=/g, 'stroke-width=')
    .replace(/strokeLinecap=/g, 'stroke-linecap=')
    .replace(/strokeLinejoin=/g, 'stroke-linejoin=')
    .replace(/strokeOpacity=/g, 'stroke-opacity=')
    .replace(/gradientUnits=/g, 'gradient-units=')
    .replace(/gradientTransform=/g, 'gradient-transform=');

interface Variant { viewBox: string; inner: string; isMono: boolean }

function extractVariant(tsxPath: string, isMono: boolean): Variant | null {
  if (!existsSync(tsxPath)) return null;
  const src = readFileSync(tsxPath, 'utf8');
  const vb = src.match(/viewBox="([^"]+)"/);
  if (!vb) return null;
  const m = src.match(/<title>\{TITLE\}<\/title>([\s\S]*?)<\/svg>/);
  if (!m) return null;
  let inner = jsxToSvgAttrs(m[1].trim()).replace(/\s+\n\s+/g, ' ').replace(/\n\s*/g, '\n');
  return { viewBox: vb[1], inner, isMono };
}

if (existsSync(OUT)) rmSync(OUT, { recursive: true });
mkdirSync(OUT, { recursive: true });

interface BrandMeta { id: string; title: string; primary?: string; hasColor: boolean; hasText: boolean }
const list: BrandMeta[] = [];

for (const brand of brands) {
  const dir = join(REACT_BRANDS, brand);
  const styleFile = join(dir, 'style.ts');
  if (!existsSync(styleFile)) continue;
  const style = readFileSync(styleFile, 'utf8');
  const title = (style.match(/TITLE\s*=\s*['"]([^'"]+)['"]/) || [, brand])[1];
  const primary = (style.match(/COLOR_PRIMARY\s*=\s*['"]([^'"]+)['"]/) || [])[1];

  const mono = extractVariant(join(dir, 'components', 'Mono.tsx'), true);
  if (!mono) continue;
  const color = extractVariant(join(dir, 'components', 'Color.tsx'), false);
  const text = extractVariant(join(dir, 'components', 'Text.tsx'), false);

  mkdirSync(join(OUT, brand), { recursive: true });

  const emit = (name: string, v: Variant) => {
    const rootAttrs = v.isMono
      ? `width={size} height={size} fill={color} viewBox="${v.viewBox}"`
      : `width={size} height={size} viewBox="${v.viewBox}"`;
    const propsBlock = v.isMono
      ? `  export let size: string | number = '1em';\n  export let color: string = 'currentColor';`
      : `  export let size: string | number = '1em';`;
    const file = `<script lang="ts">
${propsBlock}
</script>

<svg xmlns="http://www.w3.org/2000/svg" ${rootAttrs} style="flex:none;line-height:1">
  <title>${title}</title>
  ${v.inner}
</svg>
`;
    writeFileSync(join(OUT, brand, `${name}.svelte`), file);
  };

  emit('Mono', mono);
  if (color) emit('Color', color);
  if (text) emit('Text', text);

  // brand index re-exports the components + style constants
  const indexLines: string[] = [];
  indexLines.push(`import Mono from './Mono.svelte';`);
  if (color) indexLines.push(`import Color from './Color.svelte';`);
  if (text) indexLines.push(`import Text from './Text.svelte';`);
  indexLines.push('');
  indexLines.push(`export { Mono${color ? ', Color' : ''}${text ? ', Text' : ''} };`);
  indexLines.push(`export const title = ${JSON.stringify(title)};`);
  if (primary) indexLines.push(`export const colorPrimary = ${JSON.stringify(primary)};`);
  indexLines.push('');
  writeFileSync(join(OUT, brand, 'index.ts'), indexLines.join('\n'));

  list.push({ id: brand, title, primary, hasColor: !!color, hasText: !!text });
}

// top-level barrel
const barrel: string[] = [];
for (const b of list) {
  barrel.push(`export * as ${b.id} from './${b.id}/index.js';`);
}
barrel.push('');
barrel.push(`export interface BrandMeta { id: string; title: string; colorPrimary?: string; hasColor: boolean; hasText: boolean }`);
barrel.push(`export const brands: BrandMeta[] = [`);
for (const b of list) {
  const props = [`id: ${JSON.stringify(b.id)}`, `title: ${JSON.stringify(b.title)}`];
  if (b.primary) props.push(`colorPrimary: ${JSON.stringify(b.primary)}`);
  props.push(`hasColor: ${b.hasColor}`);
  props.push(`hasText: ${b.hasText}`);
  barrel.push(`  { ${props.join(', ')} },`);
}
barrel.push(`];`);
barrel.push('');
writeFileSync(join(OUT, 'index.ts'), barrel.join('\n'));

console.log(`[svelte-codegen] wrote ${list.length} brand modules`);
