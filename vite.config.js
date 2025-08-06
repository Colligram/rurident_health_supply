
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: 'all',
    hmr: {
      host: 'localhost',
      port: 5000
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      }
    },
    headers: {
      'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
    }
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    exclude: ['mongodb'],
    include: []
  },
  build: {
    rollupOptions: {
      external: (id) => {
        return ['mongodb', 'crypto', 'util', 'fs', 'path', 'os', 'stream'].includes(id);
      }
    }
  },
  define: {
    'process.env.NODE_ENV': '"development"',
    'global': 'globalThis'
  }
})
