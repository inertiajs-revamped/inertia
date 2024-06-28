import { expect, test } from '@playwright/test'

test.describe('partial-reloads', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/links/partial-reloads')

    await expect(page.locator('#foo-text')).toContainText('Foo is now 1')
    await expect(page.locator('#bar-text')).toContainText('Bar is now 2')
    await expect(page.locator('#baz-text')).toContainText('Baz is now 3')
  })

  test('does not have headers specific to partial reloads when the feature is not being used', async ({
    page,
  }) => {
    page.once('requestfinished', (req) => {
      if (req.url().includes('/links/partial-reloads')) {
        expect(req.url()).toContain('/links/partial-reloads?foo=1')
        expect(req).toHaveProperty('headers')
        expect(req.headers).toBeInstanceOf(Function)
        expect(req.headers()).not.toHaveProperty('x-inertia-partial-component')
        expect(req.headers()).not.toHaveProperty('x-inertia-partial-data')
      }
    })

    await page.locator('#all').click()
  })

  test('has headers specific to partial reloads', async ({ page }) => {
    page.once('requestfinished', (req) => {
      if (req.url().includes('/links/partial-reloads')) {
        expect(req.url()).toContain('/links/partial-reloads?foo=1')
        expect(req).toHaveProperty('headers')
        expect(req.headers).toBeInstanceOf(Function)
        expect(req.headers()).toHaveProperty(
          'accept',
          'text/html, application/xhtml+xml'
        )
        expect(req.headers()).toHaveProperty('content-type', 'application/json')
        expect(req.headers()).toHaveProperty('x-inertia', 'true')
        expect(req.headers()).toHaveProperty(
          'x-inertia-partial-component',
          'links/partial-reloads'
        )
        expect(req.headers()).toHaveProperty(
          'x-inertia-partial-data',
          'headers,foo,bar'
        )
      }
    })

    await page.locator('#foo-bar').click()
  })

  test('it updates all props when the feature is not being used', async ({
    page,
  }) => {
    await page.locator('#all').click()

    await expect(page.locator('#foo-text')).toContainText('Foo is now 2')
    await expect(page.locator('#bar-text')).toContainText('Bar is now 3')
    await expect(page.locator('#baz-text')).toContainText('Baz is now 4')
  })

  test('it only updates props that are passed through "only"', async ({
    page,
  }) => {
    await page.locator('#foo-bar').click()

    await expect(page.locator('#foo-text')).toContainText('Foo is now 2')
    await expect(page.locator('#bar-text')).toContainText('Bar is now 3')
    await expect(page.locator('#baz-text')).toContainText('Baz is now 3')

    await page.locator('#baz').click()

    await expect(page.locator('#foo-text')).toContainText('Foo is now 2')
    await expect(page.locator('#bar-text')).toContainText('Bar is now 3')
    await expect(page.locator('#baz-text')).toContainText('Baz is now 5')

    await page.locator('#all').click()

    await expect(page.locator('#foo-text')).toContainText('Foo is now 3')
    await expect(page.locator('#bar-text')).toContainText('Bar is now 4')
    await expect(page.locator('#baz-text')).toContainText('Baz is now 5')
  })

  test('it only updates props that are not passed through "except"', async ({
    page,
  }) => {
    await page.locator('#except-foo-bar').click()

    await expect(page.locator('#foo-text')).toContainText('Foo is now 1')
    await expect(page.locator('#bar-text')).toContainText('Bar is now 2')
    await expect(page.locator('#baz-text')).toContainText('Baz is now 4')

    await page.locator('#except-baz').click()

    await expect(page.locator('#foo-text')).toContainText('Foo is now 2')
    await expect(page.locator('#bar-text')).toContainText('Bar is now 3')
    await expect(page.locator('#baz-text')).toContainText('Baz is now 4')
  })
})
