import { build, Options } from 'tsdown';

const isDev = process.argv.includes('--dev');

const options: Options = {
  outDir: 'dist',
  format: 'iife',
  minify: !isDev,
  watch: isDev,
  sourcemap: isDev,
};

await build({
  entry: 'src/background.ts',
  clean: true,
  ...options,
});

await build({
  entry: 'src/content.ts',
  clean: false,
  copy: [
    { from: 'src/manifest.json', to: 'dist/manifest.json' },
    { from: 'src/style.css', to: 'dist/style.css' },
  ],
  ...options,
});


