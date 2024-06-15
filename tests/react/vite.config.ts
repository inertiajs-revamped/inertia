import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'

const alias = (p: string) => resolve(__dirname, p)

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/application/main.tsx'],
      ssr: 'resources/application/ssr.tsx',
      refresh: false,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@inertiajs-revamped/core': alias('../../packages/core/src/'),
      '@inertiajs-revamped/react': alias('../../packages/react/src/'),
    },
  },
  test: {
    name: '@inertiajs-revamped/react-test',
    environment: 'jsdom',
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
})
