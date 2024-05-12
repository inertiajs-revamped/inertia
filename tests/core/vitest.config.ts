import { defineProject } from 'vitest/config'

// https://github.com/ajv-validator/ajv/issues/2343#issuecomment-2080764965

export default defineProject({
  test: {
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
