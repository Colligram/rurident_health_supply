import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    'process.env': {}
  },
  server: {
    port: 3000,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/products': {
        target: 'http://localhost:5000/api',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/products/, '/products'),
      },
    },
  },
});
