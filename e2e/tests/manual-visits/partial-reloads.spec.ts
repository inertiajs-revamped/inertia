import { expect, test } from '@playwright/test'

test.describe('partial-reloads', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/visits/partial-reloads')

    await expect(page.locator('#foo-text')).toContainText('Foo is now 1')
    await expect(page.locator('#bar-text')).toContainText('Bar is now 2')
    await expect(page.locator('#baz-text')).toContainText('Baz is now 3')
  })

  test.describe('visit-method', () => {
    test('does not have headers specific to partial reloads when the feature is not being used', async ({
      page,
    }) => {
      page.once('requestfinished', (req) => {
        if (req.url().includes('/visits/partial-reloads')) {
          expect(req.url()).toContain('/visits/partial-reloads?foo=1')
          expect(req).toHaveProperty('headers')
          expect(req.headers).toBeInstanceOf(Function)
          expect(req.headers()).not.toHaveProperty(
            'x-inertia-partial-component'
          )
          expect(req.headers()).not.toHaveProperty('x-inertia-partial-data')
        }
      })

      await page.locator('#visit').click()
    })

    test('has headers specific to "only" partial reloads', async ({ page }) => {
      page.once('requestfinished', (req) => {
        if (req.url().includes('/visits/partial-reloads')) {
          expect(req.url()).toContain('/visits/partial-reloads?foo=1')
          expect(req).toHaveProperty('headers')
          expect(req.headers).toBeInstanceOf(Function)
          expect(req.headers()).toHaveProperty(
            'accept',
            'text/html, application/xhtml+xml'
          )
          expect(req.headers()).toHaveProperty(
            'content-type',
            'application/json'
          )
          expect(req.headers()).toHaveProperty('x-inertia', 'true')
          expect(req.headers()).toHaveProperty(
            'x-inertia-partial-component',
            'visits/partial-reloads'
          )
          expect(req.headers()).toHaveProperty(
            'x-inertia-partial-data',
            'headers,foo,bar'
          )
        }
      })

      await page.locator('#visit-foo-bar').click()
    })

    test('has headers specific to "except" partial reloads', async ({
      page,
    }) => {
      page.once('requestfinished', (req) => {
        if (req.url().includes('/visits/partial-reloads')) {
          expect(req.url()).toContain('/visits/partial-reloads?foo=1')
          expect(req).toHaveProperty('headers')
          expect(req.headers).toBeInstanceOf(Function)
          expect(req.headers()).toHaveProperty(
            'accept',
            'text/html, application/xhtml+xml'
          )
          expect(req.headers()).toHaveProperty(
            'content-type',
            'application/json'
          )
          expect(req.headers()).toHaveProperty('x-inertia', 'true')
          expect(req.headers()).toHaveProperty(
            'x-inertia-partial-component',
            'visits/partial-reloads'
          )
          expect(req.headers()).toHaveProperty(
            'x-inertia-partial-except',
            'foo,bar'
          )
        }
      })

      await page.locator('#visit-except-foo-bar').click()
    })

    test('it updates all props when the feature is not being used', async ({
      page,
    }) => {
      await page.locator('#visit').click()

      await expect(page.locator('#foo-text')).toContainText('Foo is now 2')
      await expect(page.locator('#bar-text')).toContainText('Bar is now 3')
      await expect(page.locator('#baz-text')).toContainText('Baz is now 4')
    })

    test('it only updates props that are passed through "only"', async ({
      page,
    }) => {
      await page.locator('#visit-foo-bar').click()

      await expect(page.locator('#foo-text')).toContainText('Foo is now 2')
      await expect(page.locator('#bar-text')).toContainText('Bar is now 3')
      await expect(page.locator('#baz-text')).toContainText('Baz is now 3')

      await page.locator('#visit-baz').click()

      await expect(page.locator('#foo-text')).toContainText('Foo is now 2')
      await expect(page.locator('#bar-text')).toContainText('Bar is now 3')
      await expect(page.locator('#baz-text')).toContainText('Baz is now 5')

      await page.locator('#visit').click()

      await expect(page.locator('#foo-text')).toContainText('Foo is now 3')
      await expect(page.locator('#bar-text')).toContainText('Bar is now 4')
      await expect(page.locator('#baz-text')).toContainText('Baz is now 5')
    })

    test('it only updates props that are not passed through "except"', async ({
      page,
    }) => {
      await page.locator('#visit-except-foo-bar').click()

      await expect(page.locator('#foo-text')).toContainText('Foo is now 1')
      await expect(page.locator('#bar-text')).toContainText('Bar is now 2')
      await expect(page.locator('#baz-text')).toContainText('Baz is now 4')

      await page.locator('#visit-except-baz').click()

      await expect(page.locator('#foo-text')).toContainText('Foo is now 2')
      await expect(page.locator('#bar-text')).toContainText('Bar is now 3')
      await expect(page.locator('#baz-text')).toContainText('Baz is now 4')
    })
  })

  test.describe('GET-method', () => {
    test('does not have headers specific to partial reloads when the feature is not being used', async ({
      page,
    }) => {
      page.once('requestfinished', (req) => {
        if (req.url().includes('/visits/partial-reloads')) {
          expect(req.url()).toContain('/visits/partial-reloads?foo=1')
          expect(req).toHaveProperty('headers')
          expect(req.headers).toBeInstanceOf(Function)
          expect(req.headers()).not.toHaveProperty(
            'x-inertia-partial-component'
          )
          expect(req.headers()).not.toHaveProperty('x-inertia-partial-data')
        }
      })

      await page.locator('#get').click()
    })

    test('has headers specific to partial reloads', async ({ page }) => {
      page.once('requestfinished', (req) => {
        if (req.url().includes('/visits/partial-reloads')) {
          expect(req.url()).toContain('/visits/partial-reloads?foo=1')
          expect(req).toHaveProperty('headers')
          expect(req.headers).toBeInstanceOf(Function)
          expect(req.headers()).toHaveProperty(
            'accept',
            'text/html, application/xhtml+xml'
          )
          expect(req.headers()).toHaveProperty(
            'content-type',
            'application/json'
          )
          expect(req.headers()).toHaveProperty('x-inertia', 'true')
          expect(req.headers()).toHaveProperty(
            'x-inertia-partial-component',
            'visits/partial-reloads'
          )
          expect(req.headers()).toHaveProperty(
            'x-inertia-partial-data',
            'headers,foo,bar'
          )
        }
      })

      await page.locator('#get-foo-bar').click()
    })

    test('it updates all props when the feature is not being used', async ({
      page,
    }) => {
      await page.locator('#get').click()

      await expect(page.locator('#foo-text')).toContainText('Foo is now 2')
      await expect(page.locator('#bar-text')).toContainText('Bar is now 3')
      await expect(page.locator('#baz-text')).toContainText('Baz is now 4')
    })

    test('it only updates props that are passed through "only"', async ({
      page,
    }) => {
      await page.locator('#get-foo-bar').click()

      await expect(page.locator('#foo-text')).toContainText('Foo is now 2')
      await expect(page.locator('#bar-text')).toContainText('Bar is now 3')
      await expect(page.locator('#baz-text')).toContainText('Baz is now 3')

      await page.locator('#get-baz').click()

      await expect(page.locator('#foo-text')).toContainText('Foo is now 2')
      await expect(page.locator('#bar-text')).toContainText('Bar is now 3')
      await expect(page.locator('#baz-text')).toContainText('Baz is now 5')

      await page.locator('#get').click()

      await expect(page.locator('#foo-text')).toContainText('Foo is now 3')
      await expect(page.locator('#bar-text')).toContainText('Bar is now 4')
      await expect(page.locator('#baz-text')).toContainText('Baz is now 5')
    })

    test('it only updates props that are not passed through "except"', async ({
      page,
    }) => {
      await page.locator('#get-except-foo-bar').click()

      await expect(page.locator('#foo-text')).toContainText('Foo is now 1')
      await expect(page.locator('#bar-text')).toContainText('Bar is now 2')
      await expect(page.locator('#baz-text')).toContainText('Baz is now 4')

      await page.locator('#get-except-baz').click()

      await expect(page.locator('#foo-text')).toContainText('Foo is now 2')
      await expect(page.locator('#bar-text')).toContainText('Bar is now 3')
      await expect(page.locator('#baz-text')).toContainText('Baz is now 4')
    })
  })
})
