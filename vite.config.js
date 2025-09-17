import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Load backend URL from environment variables
const backendUrl = process.env.VITE_BACKEND_URL || 'http://localhost:5000';
console.log('🔧 Vite config - Backend URL:', backendUrl);

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: backendUrl,
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.log('🔴 Proxy error:', err.message);
          });
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('🔄 Proxying:', req.method, req.url, '→', backendUrl);
          });
        },
      },
    },
  },
});
