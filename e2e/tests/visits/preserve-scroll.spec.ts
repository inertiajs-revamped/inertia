import { expect, test } from '@playwright/test'

test.describe.skip('preserve-scroll', () => {
  test.describe('disabled (default)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/visits/preserve-scroll-false')

      await page.locator('#document-position').hover({ force: true })
      await page.mouse.wheel(5, 7)

      await page.locator('#slot').hover()
      await page.mouse.wheel(10, 15)

      await expect(page.locator('#foo')).toContainText('Foo is now default')

      await expect(page.locator('#document-position')).toContainText(
        'Document scroll position is 5 & 7'
      )
      await expect(page.locator('#slot-position')).toContainText(
        'Slot scroll position is 10 & 15'
      )
    })

    test('does not reset untracked scroll regions in persistent layouts (visit method)', async ({
      page,
    }) => {
      // https://github.com/microsoft/playwright/issues/5716#issuecomment-794713614
      await page.dispatchEvent('#reset', 'click', { force: true })
      await page.waitForURL('**/visits/preserve-scroll-false-page-two')

      await expect(page.locator('#foo')).toContainText('Foo is now bar')
      await expect(page.locator('#document-position')).toContainText(
        'Document scroll position is 0 & 0'
      )
      await expect(page.locator('#slot-position')).toContainText(
        'Slot scroll position is 10 & 15'
      )
    })

    test('does not reset untracked scroll regions in persistent layouts (GET method)', async ({
      page,
    }) => {
      await page.dispatchEvent('#reset-get', 'click', { force: true })
      await page.waitForURL('**/visits/preserve-scroll-false-page-two')

      await expect(page.locator('#foo')).toContainText('Foo is now baz')
      await expect(page.locator('#document-position')).toContainText(
        'Document scroll position is 0 & 0'
      )
      await expect(page.locator('#slot-position')).toContainText(
        'Slot scroll position is 10 & 15'
      )
    })

    test('does not reset untracked scroll regions in persistent layouts when returning false from a preserveScroll callback', async ({
      page,
    }) => {
      page.on('dialog', async (dialog) => {
        expect(JSON.parse(dialog.message())).toMatchObject({
          component: 'visits/preserve-scroll-false',
          props: {
            foo: 'foo',
          },
          url: '/visits/preserve-scroll-false-page-two',
          version: null,
        })
        await dialog.dismiss()
      })

      await page.dispatchEvent('#reset-callback', 'click', { force: true })
      await page.waitForURL('**/visits/preserve-scroll-false-page-two')

      await expect(page.locator('#foo')).toContainText('Foo is now foo')
      await expect(page.locator('#document-position')).toContainText(
        'Document scroll position is 0 & 0'
      )
      await expect(page.locator('#slot-position')).toContainText(
        'Slot scroll position is 10 & 15'
      )
    })

    test('does not restore untracked scroll regions when pressing the back button (visit method)', async ({
      page,
    }) => {
      await page.dispatchEvent('#reset', 'click', { force: true })
      await page.waitForURL('**/visits/preserve-scroll-false-page-two')

      await expect(page.locator('#foo')).toContainText('Foo is now bar')

      await page.locator('#slot').hover()
      await page.mouse.wheel(-10, -15)

      await expect(page.locator('#slot-position')).toContainText(
        'Slot scroll position is 0 & 0'
      )
      await Promise.all([
        page.waitForURL('**/visits/preserve-scroll-false'),
        page.goBack(),
      ])
      expect(page.url()).toContain('/visits/preserve-scroll-false')

      await expect(page.locator('#foo')).toContainText('Foo is now default')
      await expect(page.locator('#document-position')).toContainText(
        'Document scroll position is 5 & 7'
      )
      await expect(page.locator('#slot-position')).toContainText(
        'Slot scroll position is 0 & 0'
      )
    })

    test('does not restore untracked scroll regions when pressing the back button (GET method)', async ({
      page,
    }) => {
      await page.dispatchEvent('#reset-get', 'click', { force: true })
      await page.waitForURL('**/visits/preserve-scroll-false-page-two')

      await expect(page.locator('#foo')).toContainText('Foo is now baz')

      await page.locator('#slot').hover()
      await page.mouse.wheel(-10, -15)

      await expect(page.locator('#slot-position')).toContainText(
        'Slot scroll position is 0 & 0'
      )

      await Promise.all([
        page.waitForURL('**/visits/preserve-scroll-false'),
        page.goBack(),
      ])
      expect(page.url()).toContain('/visits/preserve-scroll-false')

      await expect(page.locator('#foo')).toContainText('Foo is now default')
      await expect(page.locator('#document-position')).toContainText(
        'Document scroll position is 5 & 7'
      )
      await expect(page.locator('#slot-position')).toContainText(
        'Slot scroll position is 0 & 0'
      )
    })

    test('does not restore untracked scroll regions when returning true from a preserveScroll callback', async ({
      page,
    }) => {
      page.on('dialog', async (dialog) => {
        expect(JSON.parse(dialog.message())).toMatchObject({
          component: 'visits/preserve-scroll-false',
          props: {
            foo: 'baz',
          },
          url: '/visits/preserve-scroll-false-page-two',
          version: null,
        })
        await dialog.dismiss()
      })

      await page.dispatchEvent('#preserve-callback', 'click', { force: true })
      await page.waitForURL('**/visits/preserve-scroll-false-page-two')

      await expect(page.locator('#foo')).toContainText('Foo is now baz')

      await page.locator('#slot').hover()
      await page.mouse.wheel(-10, -15)

      await expect(page.locator('#slot-position')).toContainText(
        'Slot scroll position is 0 & 0'
      )

      await Promise.all([
        page.waitForURL('**/visits/preserve-scroll-false'),
        page.goBack(),
      ])
      expect(page.url()).toContain('/visits/preserve-scroll-false')

      await expect(page.locator('#foo')).toContainText('Foo is now default')
      await expect(page.locator('#document-position')).toContainText(
        'Document scroll position is 5 & 7'
      )
      await expect(page.locator('#slot-position')).toContainText(
        'Slot scroll position is 0 & 0'
      )
    })

    test('does not restore untracked scroll regions when pressing the back button from another website', async ({
      page,
    }) => {
      page.on('response', async (res) => {
        if (res.url().endsWith('/non-inertia')) {
          expect(res.status()).toEqual(500)
        }
      })

      await page.dispatchEvent('#off-site', 'click', { force: true })
      await page.waitForURL('**/non-inertia')

      await Promise.all([
        page.waitForURL('**/visits/preserve-scroll-false'),
        page.goBack(),
      ])
      expect(page.url()).toContain('/visits/preserve-scroll-false')

      await expect(page.locator('#document-position')).toContainText(
        'Document scroll position is 0 & 0'
      )
      await expect(page.locator('#slot-position')).toContainText(
        'Slot scroll position is 0 & 0'
      )
    })
  })

  test.describe('enabled', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/visits/preserve-scroll')

      await page.locator('#document-position').hover({ force: true })
      await page.mouse.wheel(5, 7)

      await page.locator('#slot').hover()
      await page.mouse.wheel(10, 15)

      await expect(page.locator('#foo')).toContainText('Foo is now default')

      await expect(page.locator('#document-position')).toContainText(
        'Document scroll position is 5 & 7'
      )
      await expect(page.locator('#slot-position')).toContainText(
        'Slot scroll position is 10 & 15'
      )
    })

    test('resets scroll regions to the top when doing a regular visit (visit method)', async ({
      page,
    }) => {
      await page.locator('#reset').click({ force: true })
      await page.waitForURL('**/visits/preserve-scroll-page-two')

      await expect(page.locator('#foo')).toContainText('Foo is now bar')
      await expect(page.locator('#document-position')).toContainText(
        'Document scroll position is 0 & 0'
      )
      await expect(page.locator('#slot-position')).toContainText(
        'Slot scroll position is 0 & 0'
      )
    })

    test('resets scroll regions to the top when doing a regular visit (GET method)', async ({
      page,
    }) => {
      await page.locator('#reset-get').click({ force: true })
      await page.waitForURL('**/visits/preserve-scroll-page-two')

      await expect(page.locator('#foo')).toContainText('Foo is now baz')
      await expect(page.locator('#document-position')).toContainText(
        'Document scroll position is 0 & 0'
      )
      await expect(page.locator('#slot-position')).toContainText(
        'Slot scroll position is 0 & 0'
      )
    })

    test('resets scroll regions to the top when returning false from a preserveScroll callback', async ({
      page,
    }) => {
      page.on('dialog', async (dialog) => {
        expect(JSON.parse(dialog.message())).toMatchObject({
          component: 'visits/preserve-scroll',
          props: {
            foo: 'foo',
          },
          url: '/visits/preserve-scroll-page-two',
          version: null,
        })
        await dialog.dismiss()
      })

      await page.dispatchEvent('#reset-callback', 'click', { force: true })
      await page.waitForURL('**/visits/preserve-scroll-page-two')

      await expect(page.locator('#foo')).toContainText('Foo is now foo')
      await expect(page.locator('#document-position')).toContainText(
        'Document scroll position is 0 & 0'
      )
      await expect(page.locator('#slot-position')).toContainText(
        'Slot scroll position is 0 & 0'
      )
    })

    test('preserves scroll regions when using the "preserve-scroll" feature (visit method)', async ({
      page,
    }) => {
      await page.dispatchEvent('#preserve', 'click', { force: true })
      await page.waitForURL('**/visits/preserve-scroll-page-two')

      await expect(page.locator('#foo')).toContainText('Foo is now foo')
      await expect(page.locator('#document-position')).toContainText(
        'Document scroll position is 5 & 7'
      )
      await expect(page.locator('#slot-position')).toContainText(
        'Slot scroll position is 10 & 15'
      )
    })

    test('preserves scroll regions when using the "preserve-scroll" feature (GET method)', async ({
      page,
    }) => {
      await page.dispatchEvent('#preserve-get', 'click', { force: true })
      await page.waitForURL('**/visits/preserve-scroll-page-two')

      await expect(page.locator('#foo')).toContainText('Foo is now bar')
      await expect(page.locator('#document-position')).toContainText(
        'Document scroll position is 5 & 7'
      )
      await expect(page.locator('#slot-position')).toContainText(
        'Slot scroll position is 10 & 15'
      )
    })

    test('preserves scroll regions when using the "preserve-scroll" feature from a callback', async ({
      page,
    }) => {
      page.on('dialog', async (dialog) => {
        expect(JSON.parse(dialog.message())).toMatchObject({
          component: 'visits/preserve-scroll',
          props: {
            foo: 'baz',
          },
          url: '/visits/preserve-scroll-page-two',
          version: null,
        })
        await dialog.dismiss()
      })

      await page.dispatchEvent('#preserve-callback', 'click', { force: true })
      await page.waitForURL('**/visits/preserve-scroll-page-two')

      await expect(page.locator('#foo')).toContainText('Foo is now baz')
      await expect(page.locator('#document-position')).toContainText(
        'Document scroll position is 5 & 7'
      )
      await expect(page.locator('#slot-position')).toContainText(
        'Slot scroll position is 10 & 15'
      )
    })

    test('restores all tracked scroll regions when pressing the back button (visit method)', async ({
      page,
    }) => {
      await page.dispatchEvent('#preserve', 'click', { force: true })
      await page.waitForURL('**/visits/preserve-scroll-page-two')

      await page.locator('#slot').hover()
      await page.mouse.wheel(-10, -15)

      await expect(page.locator('#slot-position')).toContainText(
        'Slot scroll position is 0 & 0'
      )

      await Promise.all([
        page.waitForURL('**/visits/preserve-scroll'),
        page.goBack(),
      ])
      expect(page.url()).toContain('/visits/preserve-scroll')

      await expect(page.locator('#foo')).toContainText('Foo is now default')
      await expect(page.locator('#document-position')).toContainText(
        'Document scroll position is 5 & 7'
      )
      await expect(page.locator('#slot-position')).toContainText(
        'Slot scroll position is 10 & 15'
      )
    })

    test('restores all tracked scroll regions when pressing the back button (GET method)', async ({
      page,
    }) => {
      await page.dispatchEvent('#preserve-get', 'click', { force: true })
      await page.waitForURL('**/visits/preserve-scroll-page-two')

      await page.evaluate((selector) => {
        document.querySelector(selector)?.scrollTo(0, 0)
      }, '#slot')

      await page.locator('#slot').hover()
      await page.mouse.wheel(-10, -15)

      await Promise.all([
        page.waitForURL('**/visits/preserve-scroll'),
        page.goBack(),
      ])
      expect(page.url()).toContain('/visits/preserve-scroll')

      await expect(page.locator('#foo')).toContainText('Foo is now default')
      await expect(page.locator('#document-position')).toContainText(
        'Document scroll position is 5 & 7'
      )
      await expect(page.locator('#slot-position')).toContainText(
        'Slot scroll position is 10 & 15'
      )
    })

    // does not work
    test.skip('restores all tracked scroll regions when pressing the back button from another website', async ({
      page,
    }) => {
      page.on('response', async (res) => {
        if (res.url().endsWith('/non-inertia')) {
          expect(res.status()).toEqual(500)
        }
      })

      await page.dispatchEvent('#off-site', 'click', { force: true })
      await page.waitForURL('**/non-inertia')

      await Promise.all([
        page.waitForURL('**/visits/preserve-scroll'),
        page.goBack(),
      ])
      expect(page.url()).toContain('/visits/preserve-scroll')

      await expect(page.locator('#document-position')).toContainText(
        'Document scroll position is 5 & 7'
      )
      await expect(page.locator('#slot-position')).toContainText(
        'Slot scroll position is 10 & 15'
      )
    })
  })
})
