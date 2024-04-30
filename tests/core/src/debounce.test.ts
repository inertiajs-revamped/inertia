import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { debounce } from '@inertiajs-revamped/core'

// https://vitest.dev/guide/mocking.html#timers

describe('debounce.ts', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should debounce with specified wait time', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 500)

    // Call debounced function twice in quick succession
    debouncedFn()
    debouncedFn()

    // Should not have been called yet
    expect(mockFn).not.toHaveBeenCalled()

    // Fast-forward time by 500 milliseconds
    vi.advanceTimersByTime(500)

    // Now the debounced function should be called with the last arguments
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
