import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts'],
  format: ['esm', 'cjs'],
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
