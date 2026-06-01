import { defineConfig } from 'tsdown';

const isDev = process.argv.includes('--dev');

export default defineConfig((_, { ci }) => ({
  entry: {
    background: 'src/background.ts',
    content: 'src/content.ts',
  },
  clean: true,
  copy: [
    { from: 'src/manifest.json', to: 'dist/manifest.json' },
    { from: 'src/style.css', to: 'dist/style.css' },
  ],
  outDir: 'dist',
  platform: 'neutral',
  minify: ci,
  sourcemap: !ci,
}));

