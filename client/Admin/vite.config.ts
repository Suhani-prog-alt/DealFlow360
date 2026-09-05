import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { fs: { allow: ['..'] } }
  server: {
    host: true,
    port: 5173,
    strictPort: true
  }
})
