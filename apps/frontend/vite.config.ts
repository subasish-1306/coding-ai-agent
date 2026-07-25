import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@coding-ai/shared': path.resolve(__dirname, '../../packages/shared/ts/src'),
      '@coding-ai/ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'https://coding-ai-agent-s67b.onrender.com',
        changeOrigin: true,
      },
    },
  },
});