import { expect, test } from '@playwright/test'

test.describe('replace', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    await page.locator('#links-replace').click()
    await page.waitForURL('**/links/replace')
  })

  test('replaces the current history state', async ({ page }) => {
    await page.locator('#replace').click()
    await page.waitForURL('**/dump/get')

    await page.goBack({ waitUntil: 'load' })
    await expect(page).toHaveURL('/')

    await page.goForward({ waitUntil: 'load' })
    await expect(page).toHaveURL('/dump/get')
  })

  test('does not replace the current history state when it is set to false', async ({
    page,
  }) => {
    await page.locator('#replace-false').click()
    await page.waitForURL('**/dump/get')

    await page.goBack({ waitUntil: 'load' })
    await expect(page).toHaveURL('/links/replace')

    await page.goForward({ waitUntil: 'load' })
    await expect(page).toHaveURL('/dump/get')
  })
})
