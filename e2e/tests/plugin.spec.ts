import { expect, test } from '@playwright/test'

test.skip(() => process.env.UI !== 'vue', 'vue-only')

// https://playwright.dev/docs/api/class-test#test-skip

test.describe('vue-only plugin', () => {
  test.describe('$page helper', () => {
    test('should work', async ({ page }) => {
      const windowHandle = await page.evaluateHandle(() => window)
      expect(windowHandle).toBeTruthy()
    })

    test('has the helper injected into the Vue component', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' })

      const windowHandle = await page.evaluateHandle(() => window)
      const component = await page.evaluate(
        (w) => w.testing.vue.$page,
        windowHandle
      )
      const expected = await page.evaluate(
        (w) => w.testing.vue.$inertia.page,
        windowHandle
      )
      expect(component).toEqual(expected)
    })

    test('misses the helper when not registered', async ({ page }) => {
      await page.goto('/plugin/without', { waitUntil: 'networkidle' })

      const windowHandle = await page.evaluateHandle(() => window)
      const component = await page.evaluate(
        (w) => w.testing.vue.$.subTree.component,
        windowHandle
      )
      expect(component.$page).toBeUndefined()
    })
  })

  test.describe('$inertia helper', () => {
    test('has the helper injected into the Vue component', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' })

      const windowHandle = await page.evaluateHandle(() => window)
      const vueInstance = await page.evaluate(
        (w) => w.testing.vue,
        windowHandle
      )
      const vueGlobalInstance = await page.evaluate(
        (w) => w.testing.vue.$.appContext.config.globalProperties,
        windowHandle
      )
      expect(vueInstance.$inertia).toEqual(vueInstance.Inertia)
      expect(vueGlobalInstance.$inertia).toEqual(vueInstance.Inertia)
    })

    test('misses the helper when not registered', async ({ page }) => {
      await page.goto('/plugin/without', { waitUntil: 'networkidle' })

      const windowHandle = await page.evaluateHandle(() => window)
      const component = await page.evaluate(
        (w) => w.testing.vue.$.subTree.component,
        windowHandle
      )
      expect(component.$page).toBeUndefined()
    })
  })
})
