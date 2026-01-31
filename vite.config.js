import { defineConfig } from 'vite';

export default defineConfig({
  root: './frontend',
  server: {
    port: 5173,
    open: true
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    outDir: './dist',
    emptyOutDir: true
  }
});
