import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative base so the build works when served from any subpath (e.g.
  // GitHub Pages' /<repo>/) without hardcoding the repo name; Vite uses
  // '/' for this automatically in dev, so local dev is unaffected.
  base: './',
  plugins: [react()],
});
