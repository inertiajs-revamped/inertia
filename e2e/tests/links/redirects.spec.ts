import { expect, test } from '@playwright/test'

test.describe('redirects', () => {
  test.beforeEach(async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toEqual('A location/non-SPA visit was detected')
      await dialog.dismiss()
    })

    await page.goto('/')
  })

  test('follows 303 redirects', async ({ page }) => {
    await page.locator('#links-redirect').click()
    await page.waitForURL('**/dump/get')
  })

  test('follows external redirects', async ({ page }) => {
    page.on('response', async (res) => {
      if (res.url().endsWith('/non-inertia')) {
        expect(res.status()).toEqual(500)
      }
    })

    // https://github.com/microsoft/playwright/issues/5716#issuecomment-794713614
    await page.dispatchEvent('#links-redirect-external', 'click', {
      force: true,
    })
    await page.waitForURL('**/non-inertia')
  })
})
