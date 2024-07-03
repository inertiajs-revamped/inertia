import { expect, test } from '@playwright/test'

test.describe('replace', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    await page.locator('#visits-replace').click()
    await page.waitForURL('**/visits/replace')
  })

  test('replaces the current history state (visit method)', async ({
    page,
  }) => {
    await page.locator('#replace').click()
    await page.waitForURL('**/dump/get')

    await page.goBack({ waitUntil: 'load' })
    await expect(page).toHaveURL('/')

    await page.goForward({ waitUntil: 'load' })
    await expect(page).toHaveURL('/dump/get')
  })

  test('replaces the current history state (GET method)', async ({ page }) => {
    await page.locator('#replace-get').click()
    await page.waitForURL('**/dump/get')

    await page.goBack({ waitUntil: 'load' })
    await expect(page).toHaveURL('/')

    await page.goForward({ waitUntil: 'load' })
    await expect(page).toHaveURL('/dump/get')
  })

  test('does not replace the current history state when it is set to false (visit method)', async ({
    page,
  }) => {
    await page.locator('#replace-false').click()
    await page.waitForURL('**/dump/get')

    await page.goBack({ waitUntil: 'load' })
    await expect(page).toHaveURL('/visits/replace')

    await page.goForward({ waitUntil: 'load' })
    await expect(page).toHaveURL('/dump/get')
  })

  test('does not replace the current history state when it is set to false (GET method)', async ({
    page,
  }) => {
    await page.locator('#replace-get-false').click()
    await page.waitForURL('**/dump/get')

    await page.goBack({ waitUntil: 'load' })
    await expect(page).toHaveURL('/visits/replace')

    await page.goForward({ waitUntil: 'load' })
    await expect(page).toHaveURL('/dump/get')
  })
})
