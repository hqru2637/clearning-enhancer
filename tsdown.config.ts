import { defineConfig } from 'tsdown';

export default defineConfig((_, { ci }) => ({
  entry: {
    background: 'src/background.ts',
    content: 'src/content.ts',
  },
  clean: true,
  copy: [
    { from: 'src/manifest.json', to: 'dist/' },
    { from: 'src/style.css', to: 'dist/' },
    { from: 'public/**/*', to: 'dist/' },
  ],
  platform: 'neutral',
  minify: ci,
  sourcemap: !ci,
}));

