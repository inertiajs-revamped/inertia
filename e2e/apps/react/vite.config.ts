import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/application/main.tsx'],
      ssr: 'resources/application/ssr.tsx',
      refresh: false,
    }),
    react(),
  ],
})
