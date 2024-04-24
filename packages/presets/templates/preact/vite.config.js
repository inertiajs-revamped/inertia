import { URL, fileURLToPath } from 'node:url'
import preact from '@preact/preset-vite'
import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/application/main.tsx'],
      ssr: 'resources/application/ssr.tsx',
      refresh: true,
    }),
    preact(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./resources/', import.meta.url)),
    },
  },
})
