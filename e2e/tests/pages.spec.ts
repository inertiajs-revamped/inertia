import { expect, test } from '@playwright/test'

test.skip(() => process.env.UI !== 'vue', 'vue-only')

test.describe('vue-only pages', () => {
  test('should work', async ({ page }) => {
    const windowHandle = await page.evaluateHandle(() => window)
    expect(windowHandle).toBeTruthy()
  })

  test('receives data from the controllers as props', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const component = await page.evaluate(
      () => window.testing.vue.$.subTree.component.subTree.component
    )
    expect(component.attrs).toHaveProperty('example', 'FooBar')
  })

  test.describe('persistent-layouts', () => {
    test.describe('render-function', () => {
      test('can have a persistent layout', async ({ page }) => {
        await page.goto('/persistent-layouts/render-function/simple/page-a', {
          waitUntil: 'networkidle',
        })

        const layoutAUid = await page.evaluate(
          () => window.testing.vue.$.subTree.component.uid
        )
        expect(layoutAUid).not.toBeNull()

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

        await expect(page.locator('#text')).toContainText(
          'Simple Persistent Layout - Page B'
        )

        const layoutBUid = await page.evaluate(
          () => window.testing.vue.$.subTree.component.uid
        )
        expect(layoutBUid).toEqual(layoutAUid)
      })

      test('can create more complex layout arrangements using nested layouts', async ({
        page,
      }) => {
        await page.goto('/persistent-layouts/render-function/nested/page-a', {
          waitUntil: 'networkidle',
        })

        const layoutA = await page.evaluate(() => {
          return {
            siteLayoutAUid: window.testing.vue.$.subTree.component.uid,
            nestedLayoutAUid:
              window.testing.vue.$.subTree.component.subTree.component.subTree
                .children[0].uid,
          }
        })
        expect(layoutA.siteLayoutAUid).not.toBeNull()
        expect(layoutA.nestedLayoutAUid).not.toBeNull()

        await expect(page.locator('#text')).toContainText(
          'Nested Persistent Layout - Page A'
        )

        await page.getByRole('link').click()
        await page.waitForURL(
          '**/persistent-layouts/render-function/nested/page-b'
        )
        await expect(page).toHaveURL(
          /.*persistent\-layouts\/render\-function\/nested\/page\-b/
        )

        await expect(page.locator('#text')).toContainText(
          'Nested Persistent Layout - Page B'
        )

        const layoutB = await page.evaluate(() => {
          return {
            siteLayoutBUid: window.testing.vue.$.subTree.component.uid,
            nestedLayoutBUid:
              window.testing.vue.$.subTree.component.subTree.component.subTree
                .children[0].uid,
          }
        })
        expect(layoutB.siteLayoutBUid).toEqual(layoutA.siteLayoutAUid)
        expect(layoutB.nestedLayoutBUid).toEqual(layoutA.nestedLayoutAUid)
      })
    })

    test.describe('shorthand', () => {
      test('can have a persistent layout', async ({ page }) => {
        await page.goto('/persistent-layouts/shorthand/simple/page-a', {
          waitUntil: 'networkidle',
        })

        const layoutAUid = await page.evaluate(
          () => window.testing.vue.$.subTree.component.uid
        )
        expect(layoutAUid).not.toBeNull()

        await expect(page.locator('#text')).toContainText(
          'Simple Persistent Layout - Page A'
        )

        await page.getByRole('link').click()
        await page.waitForURL('**/persistent-layouts/shorthand/simple/page-b')
        await expect(page).toHaveURL(
          /.*persistent\-layouts\/shorthand\/simple\/page\-b/
        )

        await expect(page.locator('#text')).toContainText(
          'Simple Persistent Layout - Page B'
        )

        const layoutBUid = await page.evaluate(
          () => window.testing.vue.$.subTree.component.uid
        )
        expect(layoutBUid).toEqual(layoutAUid)
      })

      test('has the page props available within the persistent layout', async ({
        page,
      }) => {
        await page.goto('/persistent-layouts/shorthand/simple/page-a', {
          waitUntil: 'networkidle',
        })
        await expect(page).toHaveURL(
          /.*persistent\-layouts\/shorthand\/simple\/page\-a/
        )

        const props = await page.evaluate(() => {
          return {
            pageProps: window._inertia_page_props,
            layoutProps: window._inertia_site_layout_props,
          }
        })
        expect(props.pageProps).toMatchObject({ foo: 'bar', baz: 'example' })
        expect(props.layoutProps).toMatchObject({ foo: 'bar', baz: 'example' })
      })

      test('can create more complex layout arrangements using nested persistent layouts', async ({
        page,
      }) => {
        await page.goto('/persistent-layouts/shorthand/nested/page-a', {
          waitUntil: 'networkidle',
        })

        const layoutA = await page.evaluate(() => {
          return {
            siteLayoutAUid:
              window.testing.vue.$.subTree.component.subTree.component.uid,
            nestedLayoutAUid:
              window.testing.vue.$.subTree.component.subTree.component.subTree
                .children[0].uid,
          }
        })
        expect(layoutA.siteLayoutAUid).not.toBeNull()
        expect(layoutA.nestedLayoutAUid).not.toBeNull()

        await expect(page.locator('#text')).toContainText(
          'Nested Persistent Layout - Page A'
        )

        await page.getByRole('link').click()
        await page.waitForURL('**/persistent-layouts/shorthand/nested/page-b')
        await expect(page).toHaveURL(
          /.*persistent\-layouts\/shorthand\/nested\/page\-b/
        )

        await expect(page.locator('#text')).toContainText(
          'Nested Persistent Layout - Page B'
        )

        const layoutB = await page.evaluate(() => {
          return {
            siteLayoutBUid:
              window.testing.vue.$.subTree.component.subTree.component.uid,
            nestedLayoutBUid:
              window.testing.vue.$.subTree.component.subTree.component.subTree
                .children[0].uid,
          }
        })
        expect(layoutB.siteLayoutBUid).toEqual(layoutA.siteLayoutAUid)
        expect(layoutB.nestedLayoutBUid).toEqual(layoutA.nestedLayoutAUid)
      })

      test('has the page props available within all nested persistent layouts', async ({
        page,
      }) => {
        await page.goto('/persistent-layouts/shorthand/nested/page-a', {
          waitUntil: 'networkidle',
        })
        await expect(page).toHaveURL(
          /.*persistent\-layouts\/shorthand\/nested\/page\-a/
        )

        const props = await page.evaluate(() => {
          return {
            pageProps: window._inertia_page_props,
            layoutProps: window._inertia_site_layout_props,
            nestedLayoutProps: window._inertia_nested_layout_props,
          }
        })
        expect(props.pageProps).toMatchObject({ foo: 'bar', baz: 'example' })
        expect(props.layoutProps).toMatchObject({ foo: 'bar', baz: 'example' })
        expect(props.nestedLayoutProps).toMatchObject({
          foo: 'bar',
          baz: 'example',
        })
      })
    })
  })
})
