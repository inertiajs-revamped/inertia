import { expect, test } from '@playwright/test'

test.describe('inertia', () => {
  test('mounts the initial page', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('#text')).toContainText(
      'This is the Test App Entrypoint page'
    )
  })
})
