
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: 'all',
    hmr: {
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
      external: ['mongodb']
    }
  }
})
