import { expect, test } from '@playwright/test'

test.describe('error-modal', () => {
  test.beforeEach(async ({ page }) => {
    page.on('load', async (_req) => {
      await page.evaluate(() => alert('A location/non-SPA visit was detected'))
    })

    await page.goto('/error-modal')
  })

  test('displays the modal containing the response as HTML when an invalid Inertia response comes back', async ({
    page,
  }) => {
    expect(page.url()).toContain('/error-modal')
    await page.locator('#invalid-visit').click()

    const locator = page.frameLocator('iframe').locator('body')
    await expect(locator).toContainText(
      'This is a page that does not have the Inertia app loaded.'
    )
  })

  test('displays the modal with a helpful message when a regular JSON response comes back instead of an Inertia response', async ({
    page,
  }) => {
    expect(page.url()).toContain('/error-modal')
    await page.locator('#invalid-visit-json').click()

    const locator = page.frameLocator('iframe').locator('body')
    await expect(locator).toContainText(
      'All Inertia requests must receive a valid Inertia response, however a plain JSON response was received.{"foo":"bar"}'
    )
  })

  test('can close the modal using the escape key', async ({ page }) => {
    expect(page.url()).toContain('/error-modal')
    await page.locator('#invalid-visit').click()

    const locator = page.frameLocator('iframe').locator('body')
    await expect(locator).toContainText(
      'This is a page that does not have the Inertia app loaded.'
    )

    await page.keyboard.press('Escape')

    await expect(page.frameLocator('iframe').locator('body')).toHaveCount(0)
  })
})
