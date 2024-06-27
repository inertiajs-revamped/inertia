import { resolve } from 'node:path'
import { defineProject } from 'vitest/config'

const alias = (p: string) => resolve(__dirname, p)

// https://github.com/ajv-validator/ajv/issues/2343#issuecomment-2080764965

export default defineProject({
  resolve: {
    alias: {
      '@inertiajs-revamped/core': alias('../../packages/core/src/'),
    },
  },
  test: {
    name: '@inertiajs-revamped/core-test',
    isolate: false,
    mockReset: true,
    restoreMocks: true,
    unstubGlobals: true,
    environment: 'jsdom',
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
})
