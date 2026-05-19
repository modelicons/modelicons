/**
 * Codegen: transform .upstream/src into our self-contained src tree.
 *
 *  Inputs  ← .upstream/src/{<Brand>,features,...}
 *  Outputs → src/brands/<Brand>/...
 *            src/brands/index.ts                 (barrel)
 *            src/_internal/{providerConfig,modelConfig,providerEnum}.ts
 *
 * SVG content is preserved byte-for-byte from upstream. Imports are rewritten
 * so that brand and feature files resolve against our runtime/, hooks/, and
 * types modules instead of third-party UI libraries.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const UPSTREAM = join(ROOT, '.upstream/src');
const BRANDS_OUT = join(ROOT, 'src/brands');
const INTERNAL_OUT = join(ROOT, 'src/_internal');

const NON_BRAND = new Set(['components', 'features', 'hooks', 'types']);
const isBrand = (n: string) => {
  if (NON_BRAND.has(n)) return false;
  const p = join(UPSTREAM, n);
  try {
    return statSync(p).isDirectory() && existsSync(join(p, 'style.ts'));
  } catch {
    return false;
  }
};

const brands = readdirSync(UPSTREAM).filter(isBrand).sort();
console.log(`[codegen] ${brands.length} brands`);

// ----- per-brand component rewrite ------------------------------------------
// Resolves from src/brands/<Brand>/components/<File>.tsx.
const rewriteComponent = (src: string) =>
  src
    .replace(/^['"]use client['"];?\n+/m, '')
    .replace(/from ['"]@\/types['"]/g, "from '../../../types'")
    .replace(/from ['"]@\/hooks\/useFillId['"]/g, "from '../../../hooks/useFillId'")
    .replace(/from ['"]@\/features\/IconAvatar['"]/g, "from '../../../runtime/IconAvatar'")
    .replace(/from ['"]@\/features\/IconCombine['"]/g, "from '../../../runtime/IconCombine'")
    .replace(/from ['"]@\/([A-Z][\w]*)\//g, "from '../../$1/");

// index.ts lives one level up from components/, so paths differ.
const rewriteIndex = (src: string) =>
  src.replace(/^['"]use client['"];?\n+/m, '');

// ----- write brands ---------------------------------------------------------
// Only refresh brands that exist upstream. Local-only brands (added by hand
// in src/brands/<Name>/) are preserved across sync, so the codegen pipeline
// stays compatible with manual contributions.
mkdirSync(BRANDS_OUT, { recursive: true });
const upstreamBrandSet = new Set(brands);

let fileCount = 0;
for (const brand of brands) {
  const srcDir = join(UPSTREAM, brand);
  const dstDir = join(BRANDS_OUT, brand);
  // wipe just this brand's dir to drop deleted variants from upstream
  if (existsSync(dstDir)) rmSync(dstDir, { recursive: true });
  mkdirSync(join(dstDir, 'components'), { recursive: true });

  writeFileSync(join(dstDir, 'style.ts'), readFileSync(join(srcDir, 'style.ts'), 'utf8'));
  writeFileSync(
    join(dstDir, 'index.ts'),
    rewriteIndex(readFileSync(join(srcDir, 'index.ts'), 'utf8')),
  );

  const compDir = join(srcDir, 'components');
  for (const f of readdirSync(compDir)) {
    if (!f.endsWith('.tsx')) continue;
    writeFileSync(
      join(dstDir, 'components', f),
      rewriteComponent(readFileSync(join(compDir, f), 'utf8')),
    );
    fileCount++;
  }
}
console.log(`[codegen] wrote ${fileCount} component files across ${brands.length} upstream brands`);

// Detect local-only brands and preserve them. Regenerate the barrel from the
// union of (upstream brands) + (local-only brand dirs that have index.ts).
const localBrands = readdirSync(BRANDS_OUT)
  .filter((n) => {
    if (n === 'index.ts') return false;
    if (upstreamBrandSet.has(n)) return false;
    const p = join(BRANDS_OUT, n);
    try {
      return statSync(p).isDirectory() && existsSync(join(p, 'index.ts'));
    } catch {
      return false;
    }
  })
  .sort();

if (localBrands.length) {
  console.log(`[codegen] preserved ${localBrands.length} local-only brand(s):`, localBrands.join(', '));
}

const allBrands = [...brands, ...localBrands].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
writeFileSync(
  join(BRANDS_OUT, 'index.ts'),
  allBrands
    .map((b) => `export { default as ${b}, type CompoundedIcon as ${b}Props } from './${b}';`)
    .join('\n') + '\n',
);

// ----- internal registry (providerConfig + modelConfig + providerEnum) ------
// These are pure data tables that import every brand. We rewrite:
//   @/<Brand>                    → ../brands/<Brand>
//   external UI lib's DivProps   → React HTMLAttributes<HTMLDivElement>
//   './ProviderCombine/Combine'   → ../runtime/SegmentedCombine
//   './IconAvatar'                → ../runtime/IconAvatar
//   './IconCombine'               → ../runtime/IconCombine
//   './providerEnum'              → ./providerEnum
//   '@/types'                     → ../types
mkdirSync(INTERNAL_OUT, { recursive: true });

const rewriteFeature = (src: string) =>
  src
    .replace(/^['"]use client['"];?\n+/m, '')
    // drop the DivProps named import and substitute the React type below
    .replace(
      /import\s+\{\s*DivProps\s*\}\s*from\s+['"]@lobehub\/ui['"];?\n?/g,
      "import type { HTMLAttributes } from 'react';\n",
    )
    .replace(/\bDivProps\b/g, 'HTMLAttributes<HTMLDivElement>')
    .replace(/from ['"]@\/types['"]/g, "from '../types'")
    .replace(/from ['"]@\/([A-Z][\w]*)['"]/g, "from '../brands/$1'")
    .replace(/from ['"]\.\/IconAvatar['"]/g, "from '../runtime/IconAvatar'")
    .replace(/from ['"]\.\/IconCombine['"]/g, "from '../runtime/IconCombine'")
    .replace(/from ['"]@\/features\/IconAvatar['"]/g, "from '../runtime/IconAvatar'")
    .replace(/from ['"]@\/features\/IconCombine['"]/g, "from '../runtime/IconCombine'")
    .replace(/from ['"]\.\/ProviderCombine\/Combine['"]/g, "from '../runtime/SegmentedCombine'")
    .replace(/from ['"]\.\/providerEnum['"]/g, "from './providerEnum'");

writeFileSync(
  join(INTERNAL_OUT, 'providerEnum.ts'),
  readFileSync(join(UPSTREAM, 'features/providerEnum.ts'), 'utf8'),
);

writeFileSync(
  join(INTERNAL_OUT, 'providerConfig.tsx'),
  rewriteFeature(readFileSync(join(UPSTREAM, 'features/providerConfig.tsx'), 'utf8')),
);

writeFileSync(
  join(INTERNAL_OUT, 'modelConfig.ts'),
  rewriteFeature(readFileSync(join(UPSTREAM, 'features/modelConfig.ts'), 'utf8')),
);

// agentConfig is small and similar — port if present
const agentSrc = join(UPSTREAM, 'features/agentConfig.ts');
if (existsSync(agentSrc)) {
  writeFileSync(join(INTERNAL_OUT, 'agentConfig.ts'), rewriteFeature(readFileSync(agentSrc, 'utf8')));
}

console.log('[codegen] wrote internal registry');
