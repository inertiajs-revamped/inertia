import { expect, test } from '@playwright/test'

test.describe('preserve-state', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/visits/preserve-state')
  })

  test("preserves the page's local state (visit method)", async ({ page }) => {
    await expect(page.locator('#foo')).toContainText('Foo is now default')

    await page.locator('#field').fill('Example value')
    await page.locator('#preserve').click()
    await page.waitForURL('**/visits/preserve-state-page-two')

    await expect(page.locator('#foo')).toContainText('Foo is now bar')
    await expect(page.locator('#field')).toHaveValue('Example value')
  })

  test("preserves the page's local state (GET method)", async ({ page }) => {
    await expect(page.locator('#foo')).toContainText('Foo is now default')

    await page.locator('#field').fill('Example value')
    await page.locator('#preserve-get').click()
    await page.waitForURL('**/visits/preserve-state-page-two')

    await expect(page.locator('#foo')).toContainText('Foo is now get-bar')
    await expect(page.locator('#field')).toHaveValue('Example value')
  })

  test("preserves the page's local state (callback)", async ({ page }) => {
    await expect(page.locator('#foo')).toContainText('Foo is now default')

    await page.locator('#field').fill('Example value')
    await page.locator('#preserve-callback').click()
    await page.waitForURL('**/visits/preserve-state-page-two')

    await expect(page.locator('#foo')).toContainText('Foo is now callback-bar')
    await expect(page.locator('#field')).toHaveValue('Example value')
  })

  test("does not preserve the page's local state (visit method)", async ({
    page,
  }) => {
    await expect(page.locator('#foo')).toContainText('Foo is now default')

    await page.locator('#field').fill('Another value')
    await page.locator('#preserve-false').click()
    await page.waitForURL('**/visits/preserve-state-page-two')

    await expect(page.locator('#foo')).toContainText('Foo is now baz')
    await expect(page.locator('#field')).toHaveValue('')
  })

  test("does not preserve the page's local state (GET method)", async ({
    page,
  }) => {
    await expect(page.locator('#foo')).toContainText('Foo is now default')

    await page.locator('#field').fill('Another value')
    await page.locator('#preserve-get-false').click()
    await page.waitForURL('**/visits/preserve-state-page-two')

    await expect(page.locator('#foo')).toContainText('Foo is now get-baz')
    await expect(page.locator('#field')).toHaveValue('')
  })

  test("does not preserve the page's local state (callback)", async ({
    page,
  }) => {
    await expect(page.locator('#foo')).toContainText('Foo is now default')

    await page.locator('#field').fill('Another value')
    await page.locator('#preserve-callback-false').click()
    await page.waitForURL('**/visits/preserve-state-page-two')

    await expect(page.locator('#foo')).toContainText('Foo is now callback-baz')
    await expect(page.locator('#field')).toHaveValue('')
  })
})
