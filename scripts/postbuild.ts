/**
 * Postbuild:
 *   1. Rewrite extensionless relative imports in dist/**\/*.{js,cjs} to add
 *      explicit `.js`/`.cjs` suffixes (or `/index.js` for directory imports).
 *      Required for Node strict ESM resolution; bundlers (Vite/webpack/esbuild)
 *      tolerate either form, so this is purely defensive.
 *   2. Emit per-brand subpath exports into package.json's `exports` field,
 *      enabling `import OpenAI from 'modelicons/OpenAI'` for consumers
 *      who want to skip the index altogether.
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

// ---- 1. fix extension resolution -------------------------------------------
const walk = (dir: string, out: string[] = []): string[] => {
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(js|cjs)$/.test(f)) out.push(p);
  }
  return out;
};

const fileExists = (p: string) => {
  try {
    return statSync(p).isFile();
  } catch {
    return false;
  }
};

const dirExists = (p: string) => {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
};

const resolveImportTarget = (fromFile: string, spec: string, ext: '.js' | '.cjs'): string | null => {
  if (!spec.startsWith('.')) return null;
  // already has .js/.cjs/.json — leave it
  if (/\.(js|cjs|json|mjs|cjs)$/.test(spec)) return null;
  const base = path.resolve(path.dirname(fromFile), spec);
  if (fileExists(base + ext)) return spec + ext;
  if (dirExists(base) && fileExists(path.join(base, `index${ext}`))) return `${spec}/index${ext}`;
  return null;
};

const fixFile = (file: string) => {
  const ext = file.endsWith('.cjs') ? '.cjs' : '.js';
  const src = readFileSync(file, 'utf8');
  // Match: from "..." | from '...'    and: import "..." | import '...'
  const out = src.replace(
    /(\bfrom\s+|\bimport\s+|\brequire\s*\(\s*)(['"])(\.[^'"]+)\2/g,
    (full, kw: string, q: string, spec: string) => {
      const fixed = resolveImportTarget(file, spec, ext);
      return fixed ? `${kw}${q}${fixed}${q}` : full;
    },
  );
  if (out !== src) writeFileSync(file, out);
};

const files = walk(DIST);
files.forEach(fixFile);
console.log(`[postbuild] rewrote extensions in ${files.length} files`);

// ---- 2. subpath exports ----------------------------------------------------
const BRANDS_DIR = path.join(DIST, 'brands');
const brands = readdirSync(BRANDS_DIR).filter((n) => {
  const p = path.join(BRANDS_DIR, n);
  return statSync(p).isDirectory() && existsSync(path.join(p, 'index.js'));
});

const pkgPath = path.join(ROOT, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
const exportsBlock: Record<string, unknown> = {
  '.': {
    types: './dist/index.d.ts',
    import: './dist/index.js',
    require: './dist/index.cjs',
  },
  './package.json': './package.json',
};

for (const brand of brands) {
  exportsBlock[`./${brand}`] = {
    types: `./dist/brands/${brand}/index.d.ts`,
    import: `./dist/brands/${brand}/index.js`,
    require: `./dist/brands/${brand}/index.cjs`,
  };
}

pkg.exports = exportsBlock;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`[postbuild] wrote ${brands.length} subpath exports`);
