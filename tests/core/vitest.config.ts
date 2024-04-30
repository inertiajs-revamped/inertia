import { defineProject } from 'vitest/config'

// https://github.com/ajv-validator/ajv/issues/2343#issuecomment-2080764965

export default defineProject({
  test: {
    environment: 'jsdom',
  },
})
