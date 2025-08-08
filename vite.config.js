import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    allowedHosts: [
      '38e88840-04c7-464c-b9c4-b05bb33498de-00-2l7lrhfsfkdql.kirk.replit.dev' // ✅ Add your host here
    ],
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
