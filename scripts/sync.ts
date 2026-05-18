/**
 * Sync upstream SVG source to a target release.
 *
 *   npm run sync           → fetch latest tag
 *   npm run sync v5.8.0    → pin to a specific tag
 *
 * What it does:
 *   1. Resolves the target ref (latest GitHub release tag, or arg)
 *   2. Fetches the src/ tree of that ref into .upstream/ (shallow clone)
 *   3. Records the synced ref in .upstream-ref
 *   4. Re-runs codegen so src/brands reflects the new content
 *
 * Important: SVG content is the only thing we carry over. The upstream
 * component shells, package metadata, and build config are intentionally
 * ignored — that is where the heavy UI / styling dependencies live.
 */
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const UPSTREAM_DIR = path.join(ROOT, '.upstream');
const REF_FILE = path.join(ROOT, '.upstream-ref');
const REPO = 'https://github.com/lobehub/lobe-icons.git';

const sh = (cmd: string, opts: Parameters<typeof execSync>[1] = {}) =>
  execSync(cmd, { stdio: 'inherit', ...opts });

const shOut = (cmd: string) => execSync(cmd, { encoding: 'utf8' }).trim();

const resolveLatestTag = (): string => {
  console.log('[sync] resolving latest tag…');
  const out = shOut(`git ls-remote --tags --refs --sort='-v:refname' ${REPO} | head -n 1`);
  // "<sha>\trefs/tags/<tag>"
  const tag = out.split('\t')[1]?.replace('refs/tags/', '');
  if (!tag) throw new Error('could not resolve latest tag');
  return tag;
};

const target = process.argv[2] || resolveLatestTag();
console.log(`[sync] target ref: ${target}`);

const current = existsSync(REF_FILE) ? readFileSync(REF_FILE, 'utf8').trim() : null;
if (current === target) {
  console.log(`[sync] already at ${target} — pass --force to re-sync`);
  if (!process.argv.includes('--force')) process.exit(0);
}

if (existsSync(UPSTREAM_DIR)) {
  console.log('[sync] removing previous .upstream');
  rmSync(UPSTREAM_DIR, { recursive: true });
}

console.log(`[sync] shallow clone ${target}…`);
sh(`git clone --depth 1 --branch ${target} ${REPO} ${UPSTREAM_DIR}`);

writeFileSync(REF_FILE, `${target}\n`);
console.log(`[sync] pinned to ${target}`);

console.log('[sync] running codegen against new upstream…');
sh('npx tsx scripts/codegen.ts', { cwd: ROOT });

console.log('[sync] done — run `npm run build` to produce dist/');
