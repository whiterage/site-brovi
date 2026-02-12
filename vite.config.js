import { defineConfig } from 'vite';
import { resolve } from 'node:path';

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
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
    reportCompressedSize: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'frontend/index.html'),
        obuchenie: resolve(__dirname, 'frontend/obuchenie.html'),
        brovi: resolve(__dirname, 'frontend/brovi.html'),
        resnitsy: resolve(__dirname, 'frontend/resnitsy.html'),
        podval: resolve(__dirname, 'frontend/podval.html')
      },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  }
});
