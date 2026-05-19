/**
 * Build for @modelicons/svelte.
 *
 *   1. Run codegen (regenerates src/<Brand>/{Mono,Color,Text}.svelte + index.ts)
 *   2. Copy src/ → dist/ verbatim — Svelte components ship as-is and the
 *      consumer's bundler (vite-plugin-svelte etc.) compiles them.
 *   3. Emit per-component .d.ts shims with prop typings.
 *   4. Inject per-brand subpath exports into package.json.
 */
import { execSync } from 'node:child_process';
import {
  cpSync,
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
const SRC = join(ROOT, 'src');
const DIST = join(ROOT, 'dist');

// 1. codegen
console.log('[build] running codegen…');
execSync('tsx scripts/codegen.ts', { cwd: ROOT, stdio: 'inherit' });

// 2. copy src → dist
if (existsSync(DIST)) rmSync(DIST, { recursive: true });
mkdirSync(DIST, { recursive: true });
cpSync(SRC, DIST, { recursive: true });
console.log('[build] copied src/ → dist/');

// 3. emit .d.ts shims for each .svelte component
const ATTRS_MONO = `  size?: string | number;\n  color?: string;`;
const ATTRS_NO_COLOR = `  size?: string | number;`;

const svelteFiles: string[] = [];
const walk = (dir: string) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (f.endsWith('.svelte')) svelteFiles.push(p);
  }
};
walk(DIST);

for (const sv of svelteFiles) {
  const src = readFileSync(sv, 'utf8');
  const isMono = src.includes('export let color');
  const dts = `import type { SvelteComponent } from 'svelte';

export interface ${(sv.split('/').pop() || '').replace('.svelte', '')}Props {
${isMono ? ATTRS_MONO : ATTRS_NO_COLOR}
}

export default class extends SvelteComponent<${(sv.split('/').pop() || '').replace('.svelte', '')}Props> {}
`;
  writeFileSync(sv.replace('.svelte', '.svelte.d.ts'), dts);
}

// 3b. emit .d.ts for brand index.ts + top-level index.ts (the codegen already
// produced them as .ts; we just need them re-emitted as .d.ts).
// Simplest: copy the .ts content as .d.ts since they're pure type-friendly exports.
const tsFiles: string[] = [];
const walkTs = (dir: string) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walkTs(p);
    else if (f.endsWith('.ts') && !f.endsWith('.d.ts')) tsFiles.push(p);
  }
};
walkTs(DIST);
for (const ts of tsFiles) {
  const src = readFileSync(ts, 'utf8');
  // For .ts barrel files, also keep .js + .d.ts shims so tsc & node resolve them
  // Use the original content as the JS module
  writeFileSync(ts.replace(/\.ts$/, '.js'), src);
  // Generate a minimal .d.ts that re-exports the same
  writeFileSync(ts.replace(/\.ts$/, '.d.ts'), src);
  rmSync(ts);
}

console.log(`[build] emitted .d.ts for ${svelteFiles.length} Svelte components`);

// 4. per-brand subpath exports
const brandsDir = DIST;
const brands = readdirSync(brandsDir)
  .filter((n) => {
    const p = join(brandsDir, n);
    return statSync(p).isDirectory() && existsSync(join(p, 'index.js'));
  })
  .sort();

const pkgPath = join(ROOT, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
const exportsBlock: Record<string, unknown> = {
  '.': {
    types: './dist/index.d.ts',
    svelte: './dist/index.js',
    default: './dist/index.js',
  },
  './package.json': './package.json',
};
for (const b of brands) {
  exportsBlock[`./${b}`] = {
    types: `./dist/${b}/index.d.ts`,
    svelte: `./dist/${b}/index.js`,
    default: `./dist/${b}/index.js`,
  };
}
pkg.exports = exportsBlock;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`[build] wrote ${brands.length} subpath exports`);
