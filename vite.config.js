import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   base: '/URL-shorter/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://cleanuri.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
