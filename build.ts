import * as fs from 'node:fs';
import * as path from 'node:path';
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
  onSuccess: () => {
    fs.copyFileSync(
      path.resolve(process.cwd(), 'src', 'manifest.json'),
      path.resolve(process.cwd(), 'dist', 'manifest.json'),
    );
    console.log('Copied manifest.json to dist directory');
  }
});


