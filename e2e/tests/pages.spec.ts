import { expect, test } from '@playwright/test'

test.describe('pages', () => {
  test('receives data from the controllers as props', async ({ page }) => {
    await page.goto('/')

    const pageProps = page.locator('div#app')
    await expect(pageProps).toHaveAttribute(
      'data-page',
      // When props are not declared, they become attrs
      expect.objectContaining({
        props: {
          example: 'FooBar',
        },
      })
    )
  })

  test.describe('persistent-layouts', () => {
    test.describe('render-function', () => {
      test('can have a persistent layout', async ({ page }) => {
        await page.goto('/persistent-layouts/render-function/simple/page-a')

        await expect(page.locator('#text')).toContainText(
          'Simple Persistent Layout - Page A'
        )

        await page.locator('a').click()
        await page.waitForURL(
          '**/persistent-layouts/render-function/simple/page-b'
        )
        await expect(page).toHaveURL(
          /.*persistent\-layouts\/render\-function\/simple\/page\-b/
        )
      })

      test('can create more complex layout arrangements using nested layouts', async ({
        page,
      }) => {
        await page.goto('/persistent-layouts/render-function/nested/page-a')

        await expect(page.locator('#text')).toContainText(
          'Nested Persistent Layout - Page A'
        )

        await page.locator('a').click()
        await page.waitForURL(
          '**/persistent-layouts/render-function/nested/page-b'
        )
        await expect(page).toHaveURL(
          /.*persistent\-layouts\/render\-function\/nested\/page\-b/
        )
      })
    })
  })

  test.describe('shorthand', () => {
    test('can have a persistent layout', async ({ page }) => {
      await page.goto('/persistent-layouts/shorthand/simple/page-a')

      await expect(page.locator('#text')).toContainText(
        'Simple Persistent Layout - Page A'
      )

      await page.locator('a').click()
      await page.waitForURL('**/persistent-layouts/shorthand/simple/page-b')
      await expect(page).toHaveURL(
        /.*persistent\-layouts\/shorthand\/simple\/page\-b/
      )
    })

    test('has the page props available within the persistent layout', async ({
      page,
    }) => {
      await page.goto('/persistent-layouts/shorthand/simple/page-a')

      const pageProps = page.locator('div#app')
      await expect(pageProps).toHaveAttribute(
        'data-page',
        expect.objectContaining({ props: { foo: 'bar', baz: 'example' } })
      )
    })

    test('can create more complex layout arrangements using nested persistent layouts', async ({
      page,
    }) => {
      await page.goto('/persistent-layouts/shorthand/nested/page-a')

      await expect(page.locator('#text')).toContainText(
        'Nested Persistent Layout - Page A'
      )

      await page.locator('a').click()
      await page.waitForURL('**/persistent-layouts/shorthand/nested/page-b')
      await expect(page).toHaveURL(
        /.*persistent\-layouts\/shorthand\/nested\/page\-b/
      )
      await expect(page.locator('#text')).toContainText(
        'Nested Persistent Layout - Page B'
      )
    })

    test('has the page props available within all nested persistent layouts', async ({
      page,
    }) => {
      await page.goto('/persistent-layouts/shorthand/nested/page-a')

      const pageProps = page.locator('div#app')
      await expect(pageProps).toHaveAttribute(
        'data-page',
        expect.objectContaining({ props: { foo: 'bar', baz: 'example' } })
      )
    })
  })
})
