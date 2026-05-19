/**
 * Codegen for @modelicons/svg.
 *
 *   Walks ../../../src/brands/<Brand>/components/{Mono,Color,Text}.tsx in the root
 *   modelicons package, extracts the literal SVG body from the JSX, and emits
 *   framework-agnostic SVG string exports under src/<Brand>.ts.
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
const REACT_STYLE_DIR = REACT_BRANDS;
const OUT = join(ROOT, 'src');

const NON_BRAND = new Set(['index.ts']);
const brands = readdirSync(REACT_BRANDS)
  .filter((n) => {
    if (NON_BRAND.has(n)) return false;
    const p = join(REACT_BRANDS, n);
    try {
      return statSync(p).isDirectory();
    } catch {
      return false;
    }
  })
  .sort();

console.log(`[svg-codegen] ${brands.length} brands`);

// ----- helpers ---------------------------------------------------------------
const escapeSvgForJs = (s: string) =>
  s
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${');

const jsxAttrToSvgAttr: Record<string, string> = {
  fillRule: 'fill-rule',
  fillOpacity: 'fill-opacity',
  clipRule: 'clip-rule',
  clipPath: 'clip-path',
  stopColor: 'stop-color',
  stopOpacity: 'stop-opacity',
  strokeWidth: 'stroke-width',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  strokeOpacity: 'stroke-opacity',
  strokeDasharray: 'stroke-dasharray',
  gradientUnits: 'gradient-units',
  gradientTransform: 'gradient-transform',
  textAnchor: 'text-anchor',
  fontFamily: 'font-family',
  fontSize: 'font-size',
};

// extract the inner SVG body + viewBox from a brand's component .tsx file.
const extractFromTsx = (
  tsx: string,
  brand: string,
  variant: string,
): { viewBox: string; inner: string } | null => {
  const vbMatch = tsx.match(/viewBox="([^"]+)"/);
  if (!vbMatch) return null;
  const viewBox = vbMatch[1];

  // pull everything between `<title>{TITLE}</title>` and `</svg>`
  const m = tsx.match(/<title>\{TITLE\}<\/title>([\s\S]*?)<\/svg>/);
  if (!m) return null;
  let inner = m[1].trim();

  // un-JSX-ify: camelCase attrs → kebab-case where SVG expects kebab
  for (const [jsx, svg] of Object.entries(jsxAttrToSvgAttr)) {
    inner = inner.replace(new RegExp(`\\b${jsx}=`, 'g'), `${svg}=`);
  }
  // collapse multi-line attrs into a single line for compactness
  inner = inner.replace(/\s+\n\s+/g, ' ').replace(/\n\s*/g, '\n');

  return { viewBox, inner };
};

// ----- write ----------------------------------------------------------------
if (existsSync(OUT)) rmSync(OUT, { recursive: true });
mkdirSync(OUT, { recursive: true });

const allBrandEntries: Array<{ id: string; title: string; primary?: string }> = [];

for (const brand of brands) {
  const dir = join(REACT_BRANDS, brand);
  const styleFile = join(dir, 'style.ts');
  if (!existsSync(styleFile)) continue;

  const style = readFileSync(styleFile, 'utf8');
  const title = (style.match(/TITLE\s*=\s*['"]([^'"]+)['"]/) || [, brand])[1];
  const primary = (style.match(/COLOR_PRIMARY\s*=\s*['"]([^'"]+)['"]/) || [])[1];

  const out: string[] = [];
  out.push(`// auto-generated from src/brands/${brand}/`);
  out.push('');
  out.push(`export const title = ${JSON.stringify(title)};`);
  if (primary) out.push(`export const colorPrimary = ${JSON.stringify(primary)};`);
  out.push('');

  for (const variant of ['Mono', 'Color', 'Text']) {
    const file = join(dir, 'components', `${variant}.tsx`);
    if (!existsSync(file)) continue;
    const tsx = readFileSync(file, 'utf8');
    const ext = extractFromTsx(tsx, brand, variant);
    if (!ext) continue;

    const key = variant.toLowerCase();
    const root =
      variant === 'Mono'
        ? `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="${ext.viewBox}">`
        : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${ext.viewBox}">`;
    const svg = `${root}<title>${title}</title>${ext.inner}</svg>`;
    out.push(`export const ${key} = \`${escapeSvgForJs(svg)}\`;`);
  }

  out.push('');
  writeFileSync(join(OUT, `${brand}.ts`), out.join('\n'));
  allBrandEntries.push({ id: brand, title, primary });
}

// barrel + brand list
const barrel: string[] = [];
barrel.push('// Re-export each brand under a namespace so consumers can import a single brand.');
for (const b of allBrandEntries) {
  barrel.push(`export * as ${b.id} from './${b.id}.js';`);
}
barrel.push('');
barrel.push('// Flat metadata list — useful for building dynamic galleries.');
barrel.push('export interface BrandMeta { id: string; title: string; colorPrimary?: string }');
barrel.push('export const brands: BrandMeta[] = [');
for (const b of allBrandEntries) {
  barrel.push(`  { id: ${JSON.stringify(b.id)}, title: ${JSON.stringify(b.title)}${b.primary ? `, colorPrimary: ${JSON.stringify(b.primary)}` : ''} },`);
}
barrel.push('];');
barrel.push('');
writeFileSync(join(OUT, 'index.ts'), barrel.join('\n'));

console.log(`[svg-codegen] wrote ${allBrandEntries.length} brands → src/`);
