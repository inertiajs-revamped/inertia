import { expect, test } from '@playwright/test'

test.describe.skip('Preserve scroll', () => {
  test.beforeEach(async ({ page }) => {})

  test.describe('disabled (default)', () => {
    test.beforeEach(async ({ page }) => {})

    test('does not reset untracked scroll regions in persistent layouts', async ({
      page,
    }) => {})

    test('does not reset untracked scroll regions in persistent layouts when returning false from a preserveScroll callback', async ({
      page,
    }) => {})

    test('does not restore untracked scroll regions when pressing the back button', async ({
      page,
    }) => {})

    test('does not restore untracked scroll regions when returning true from a preserveScroll callback', async ({
      page,
    }) => {})

    test('does not restore untracked scroll regions when pressing the back button from another website', async ({
      page,
    }) => {})
  })

  test.describe('enabled', () => {
    test.beforeEach(async ({ page }) => {})

    test('resets scroll regions to the top when doing a regular visit', async ({
      page,
    }) => {})

    test('resets scroll regions to the top when returning false from a preserveScroll callback', async ({
      page,
    }) => {})

    test('preserves scroll regions when using the "preserve-scroll" feature', async ({
      page,
    }) => {})

    test('preserves scroll regions when using the "preserve-scroll" feature from a callback', async ({
      page,
    }) => {})

    test('restores all tracked scroll regions when pressing the back button', async ({
      page,
    }) => {})

    test.skip('restores all tracked scroll regions when pressing the back button from another website', async ({
      page,
    }) => {})
  })
})
