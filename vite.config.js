
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
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
    }
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    exclude: ['mongodb']
  },
  ssr: {
    noExternal: []
  },
  build: {
    rollupOptions: {
      external: ['mongodb', 'crypto', 'util', 'fs', 'path']
    }
  }
})
