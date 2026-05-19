/**
 * Codegen for @modelicons/vue.
 *
 *   Walks ../../../src/brands/<Brand>/components/{Mono,Color,Text}.tsx in the root
 *   modelicons package, extracts each SVG body, and emits Vue 3 components that
 *   render an equivalent VNode tree via h().
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

console.log(`[vue-codegen] ${brands.length} brands`);

/** Convert SVG/JSX kebab-case + camelCase attrs to a uniform JS prop name for h(). */
const ATTR_MAP: Record<string, string> = {
  'fill-rule': 'fill-rule', // Vue 3 supports both kebab and camel; keep as-is in DOM attrs
  'fill-opacity': 'fill-opacity',
  'clip-rule': 'clip-rule',
  'clip-path': 'clip-path',
  'stop-color': 'stop-color',
  'stop-opacity': 'stop-opacity',
  'stroke-width': 'stroke-width',
  'stroke-linecap': 'stroke-linecap',
  'stroke-linejoin': 'stroke-linejoin',
  'stroke-opacity': 'stroke-opacity',
  'gradient-units': 'gradient-units',
  'gradient-transform': 'gradient-transform',
};

// camelCase attribute → kebab-case
const camelToKebab = (s: string) => s.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());

interface El { tag: string; attrs: Record<string, string>; children?: El[] }

function parseChildren(body: string): El[] {
  // Very small SVG parser tailored to lobe-icons output: handles self-closing
  // tags and simple parent/child gradients (linearGradient with <stop> children).
  const els: El[] = [];
  const ELEMENT = /<(path|polygon|polyline|rect|circle|ellipse|line|g|linearGradient|radialGradient|stop|defs|use|title|text)\b([^>]*?)(\/?)>/gs;
  let m: RegExpExecArray | null;
  const cursorEnd = (idx: number, tag: string) => {
    // find the matching closing tag for non-self-closing element
    const re = new RegExp(`</${tag}>`, 'g');
    re.lastIndex = idx;
    const close = re.exec(body);
    return close ? close.index : -1;
  };
  while ((m = ELEMENT.exec(body))) {
    const [full, tag, attrText, slash] = m;
    const attrs: Record<string, string> = {};
    const ATTR = /([\w:-]+)="([^"]*)"/g;
    let am: RegExpExecArray | null;
    while ((am = ATTR.exec(attrText))) attrs[am[1]] = am[2];

    let children: El[] | undefined;
    if (!slash) {
      const closeIdx = cursorEnd(ELEMENT.lastIndex, tag);
      if (closeIdx > 0) {
        const inner = body.slice(ELEMENT.lastIndex, closeIdx);
        children = parseChildren(inner);
        ELEMENT.lastIndex = closeIdx + tag.length + 3;
      }
    }
    els.push({ tag, attrs, children });
  }
  return els;
}

function emitH(el: El, indent = '    '): string {
  const attrStrs: string[] = [];
  for (const [k, v] of Object.entries(el.attrs)) {
    const key = /^[a-zA-Z][\w]*$/.test(k) ? k : `'${k}'`;
    attrStrs.push(`${key}: ${JSON.stringify(v)}`);
  }
  const attrLine = attrStrs.length ? `{ ${attrStrs.join(', ')} }` : 'null';
  if (!el.children?.length) {
    return `${indent}h('${el.tag}', ${attrLine})`;
  }
  const kids = el.children.map((c) => emitH(c, indent + '  ')).join(',\n');
  return `${indent}h('${el.tag}', ${attrLine}, [\n${kids}\n${indent}])`;
}

interface BrandVariant { viewBox: string; tree: El[]; isMono: boolean }

function extractVariant(tsxPath: string, isMono: boolean): BrandVariant | null {
  if (!existsSync(tsxPath)) return null;
  const src = readFileSync(tsxPath, 'utf8');
  const vb = src.match(/viewBox="([^"]+)"/);
  if (!vb) return null;
  const m = src.match(/<title>\{TITLE\}<\/title>([\s\S]*?)<\/svg>/);
  if (!m) return null;
  let body = m[1].trim();
  // JSX → SVG attrs (camel → kebab where SVG expects kebab)
  body = body
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
  const tree = parseChildren(body);
  return { viewBox: vb[1], tree, isMono };
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

  const monoP = join(dir, 'components', 'Mono.tsx');
  const colorP = join(dir, 'components', 'Color.tsx');
  const textP = join(dir, 'components', 'Text.tsx');

  const mono = extractVariant(monoP, true);
  const color = extractVariant(colorP, false);
  const text = extractVariant(textP, false);
  if (!mono) continue;

  const variants: { name: string; v: BrandVariant }[] = [{ name: 'Mono', v: mono }];
  if (color) variants.push({ name: 'Color', v: color });
  if (text) variants.push({ name: 'Text', v: text });

  const out: string[] = [];
  out.push(`// auto-generated from src/brands/${brand}/`);
  out.push(`import { defineComponent, h } from 'vue';`);
  out.push('');
  out.push(`export const title = ${JSON.stringify(title)};`);
  if (primary) out.push(`export const colorPrimary = ${JSON.stringify(primary)};`);
  out.push('');

  for (const { name, v } of variants) {
    const rootProps: string[] = [
      `xmlns: 'http://www.w3.org/2000/svg'`,
      `width: props.size`,
      `height: props.size`,
      `viewBox: ${JSON.stringify(v.viewBox)}`,
    ];
    if (v.isMono) rootProps.push(`fill: props.color`);
    const titleNode = `      h('title', null, ${JSON.stringify(title)})`;
    const children = [titleNode, ...v.tree.map((el) => emitH(el, '      '))].join(',\n');
    out.push(`export const ${name} = /*#__PURE__*/ defineComponent({`);
    out.push(`  name: ${JSON.stringify(brand + name)},`);
    out.push(`  props: {`);
    out.push(`    size: { type: [Number, String], default: '1em' },`);
    if (v.isMono) out.push(`    color: { type: String, default: 'currentColor' },`);
    out.push(`  },`);
    out.push(`  setup(props) {`);
    out.push(`    return () => h('svg', {`);
    out.push(`      ${rootProps.join(', ')},`);
    out.push(`      style: { flex: 'none', lineHeight: 1 }`);
    out.push(`    }, [`);
    out.push(children);
    out.push(`    ]);`);
    out.push(`  },`);
    out.push(`});`);
    out.push('');
  }

  writeFileSync(join(OUT, `${brand}.ts`), out.join('\n'));
  list.push({ id: brand, title, primary, hasColor: !!color, hasText: !!text });
}

// barrel
const barrel: string[] = [];
for (const b of list) {
  barrel.push(`export * as ${b.id} from './${b.id}.js';`);
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

console.log(`[vue-codegen] wrote ${list.length} brand modules`);
