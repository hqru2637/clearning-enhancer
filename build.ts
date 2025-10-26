import { build } from 'tsdown';

const isDev = process.argv.includes('--dev');

await build({
  entry: 'src/content.ts',
  outDir: 'dist',
  format: 'iife',
  minify: !isDev,
  clean: true,
  watch: isDev,
  sourcemap: isDev,
  copy: [
    { from: 'src/manifest.json', to: 'dist/manifest.json' }
  ],
});


