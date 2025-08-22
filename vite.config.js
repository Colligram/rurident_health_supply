import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Determine backend URL based on environment
const getBackendUrl = () => {
  // For local development, always use localhost:5000
  // This fixes the getaddrinfo ENOTFOUND errors
  return 'http://localhost:5000';
};

const backendUrl = getBackendUrl();
console.log('🔧 Vite config - Backend URL:', backendUrl);

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  server: {
    port: 5173,
    host: '0.0.0.0', // Allow external connections
    allowedHosts: true,
    proxy: {
      '/api': {
        target: backendUrl,
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('🔴 Proxy error:', err.message);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('🔄 Proxying:', req.method, req.url, '→', backendUrl);
          });
        },
      },
    },
  },
});
