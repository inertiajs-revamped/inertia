import { expect, test } from '@playwright/test'

// https://v3-migration.vuejs.org/breaking-changes/attribute-coercion#_3-x-syntax

test.describe('preserve-state', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/links/preserve-state')
  })

  test("preserves the page's local state", async ({ page }) => {
    await expect(page.locator('#foo')).toContainText('Foo is now default')

    await page.locator('#field').fill('Example value')
    await page.locator('#preserve').click()
    await page.waitForURL('**/links/preserve-state-page-two')

    await expect(page.locator('#foo')).toContainText('Foo is now bar')
    await expect(page.locator('#field')).toHaveValue('Example value')
  })

  test("preserves the page's local state (callback)", async ({ page }) => {
    await expect(page.locator('#foo')).toContainText('Foo is now default')

    await page.locator('#field').fill('Example value')
    await page.locator('#preserve-callback').click()
    await page.waitForURL('**/links/preserve-state-page-two')

    await expect(page.locator('#foo')).toContainText('Foo is now callback-bar')
    await expect(page.locator('#field')).toHaveValue('Example value')
  })

  test("does not preserve the page's local state", async ({ page }) => {
    await expect(page.locator('#foo')).toContainText('Foo is now default')

    await page.locator('#field').fill('Another value')
    await page.locator('#preserve-false').click()
    await page.waitForURL('**/links/preserve-state-page-two')

    await expect(page.locator('#foo')).toContainText('Foo is now baz')
    await expect(page.locator('#field')).not.toHaveValue('Example value')
  })

  test("does not preserve the page's local state (callback)", async ({
    page,
  }) => {
    await expect(page.locator('#foo')).toContainText('Foo is now default')

    await page.locator('#field').fill('Another value')
    await page.locator('#preserve-callback-false').click()
    await page.waitForURL('**/links/preserve-state-page-two')

    await expect(page.locator('#foo')).toContainText('Foo is now callback-baz')
    await expect(page.locator('#field')).not.toHaveValue('Example value')
  })
})
