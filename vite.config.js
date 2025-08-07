
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
      host: '0.0.0.0',
      port: 3000,
      clientPort: 3000
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
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
    rollupOptions: {
      external: ['mongodb', 'util', 'crypto', 'fs', 'path']
    }
  }
})
