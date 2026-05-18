import { defineConfig } from 'tsup';

export default defineConfig({
  // Per-file output preserves the source module graph so consumers' bundlers
  // can tree-shake at the brand-component granularity. A single bundled file
  // would force every `memo()` call to look like a side effect and bloat the
  // tree-shaken output to ~2 MB for a single icon import.
  entry: ['src/**/*.ts', 'src/**/*.tsx'],
  format: ['esm', 'cjs'],
  // DTS emit handled by tsc (script: build:types). tsup's worker-based DTS
  // pipeline OOMs on 2000+ source files.
  dts: false,
  sourcemap: false,
  clean: true,
  bundle: false,
  splitting: false,
  treeshake: false,
  outDir: 'dist',
  target: 'es2020',
  outExtension: ({ format }) => ({ js: format === 'cjs' ? '.cjs' : '.js' }),
});
