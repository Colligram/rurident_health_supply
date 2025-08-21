import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Determine backend URL based on environment
const getBackendUrl = () => {
  // Check if we're in Replit
  if (process.env.REPL_ID || process.env.REPL_SLUG) {
    return `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
  }
  
  // Check if we're in a similar hosting environment
  if (process.env.HOSTNAME && process.env.HOSTNAME.includes('.repl.co')) {
    return `https://${process.env.HOSTNAME}`;
  }
  
  // Check if we're in a Vercel-like environment
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Check if we're in a Netlify-like environment
  if (process.env.NETLIFY_URL) {
    return `https://${process.env.NETLIFY_URL}`;
  }
  
  // For local development, use localhost:5000
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
    port: 3000,
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
      '/products': {
        target: `${backendUrl}/api`,
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/products/, '/products'),
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('🔴 Products proxy error:', err.message);
          });
        },
      },
    },
  },
});
