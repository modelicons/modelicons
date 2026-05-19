import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

const fileExists = (p: string) => { try { return statSync(p).isFile(); } catch { return false; } };
const dirExists = (p: string) => { try { return statSync(p).isDirectory(); } catch { return false; } };
const walk = (dir: string, out: string[] = []): string[] => {
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(js|cjs)$/.test(f)) out.push(p);
  }
  return out;
};

const resolveTarget = (fromFile: string, spec: string, ext: '.js' | '.cjs'): string | null => {
  if (!spec.startsWith('.')) return null;
  if (ext === '.cjs' && spec.endsWith('.js')) {
    const rewritten = spec.replace(/\.js$/, '.cjs');
    const base = path.resolve(path.dirname(fromFile), rewritten.replace(/\.cjs$/, ''));
    if (fileExists(base + '.cjs')) return rewritten;
  }
  if (/\.(js|cjs|json|mjs)$/.test(spec)) return null;
  const base = path.resolve(path.dirname(fromFile), spec);
  if (fileExists(base + ext)) return spec + ext;
  if (dirExists(base) && fileExists(path.join(base, `index${ext}`))) return `${spec}/index${ext}`;
  return null;
};

const files = walk(DIST);
for (const file of files) {
  const ext = file.endsWith('.cjs') ? '.cjs' : '.js';
  const src = readFileSync(file, 'utf8');
  const out = src.replace(
    /(\bfrom\s+|\bimport\s+|\brequire\s*\(\s*)(['"])(\.[^'"]+)\2/g,
    (full, kw: string, q: string, spec: string) => {
      const fixed = resolveTarget(file, spec, ext);
      return fixed ? `${kw}${q}${fixed}${q}` : full;
    },
  );
  if (out !== src) writeFileSync(file, out);
}
console.log(`[postbuild] rewrote extensions in ${files.length} files`);

const brands = readdirSync(DIST)
  .filter((n) => n.endsWith('.js') && n !== 'index.js')
  .map((n) => n.replace(/\.js$/, ''))
  .sort();

const pkgPath = path.join(ROOT, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
const exportsBlock: Record<string, unknown> = {
  '.': { types: './dist/index.d.ts', import: './dist/index.js', require: './dist/index.cjs' },
  './package.json': './package.json',
};
for (const b of brands) {
  exportsBlock[`./${b}`] = {
    types: `./dist/${b}.d.ts`,
    import: `./dist/${b}.js`,
    require: `./dist/${b}.cjs`,
  };
}
pkg.exports = exportsBlock;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`[postbuild] wrote ${brands.length} subpath exports`);
