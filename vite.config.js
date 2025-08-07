import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: [
      'ecde95be-2287-4dd3-9ff2-e2a4e8e42d82-00-2j800u1ht1e7i.picard.replit.dev',
      '38e88840-04c7-464c-b9c4-b05bb33498de-00-2l7lrhfsfkdql.kirk.replit.dev',
      'localhost',
      '127.0.0.1'
    ],
    hmr: {
      port: 3000,
      host: 'localhost'
    },
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:5000',
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    exclude: ['mongodb', 'util', 'crypto', 'fs', 'path']
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      external: ['mongodb', 'util', 'crypto', 'fs', 'path']
    }
  }
})