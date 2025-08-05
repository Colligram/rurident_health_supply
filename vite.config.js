import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '7afebb57-0054-43ae-9b29-a18fc1082131-00-iivyikg5rfnr.kirk.replit.dev'  // ← your Replit URL
    ]
  }
})
