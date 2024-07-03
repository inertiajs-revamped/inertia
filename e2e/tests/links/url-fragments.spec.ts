import { expect, test } from '@playwright/test'
import { getWindowScrollTop } from '../utils'

test.describe('url-fragment-navigation-automatic-scrolling', () => {
  /** @see https://github.com/inertiajs/inertia/pull/257 */

  test.beforeEach(async ({ page }) => {
    await Promise.all([
      page.waitForURL('**/links/url-fragments'),
      page.goto('/links/url-fragments'),
    ])

    const offsetTop = await getWindowScrollTop(page)
    expect(offsetTop).toEqual(0)
  })

  test('Scrolls to the fragment element when making a visit to a different page', async ({
    page,
  }) => {
    await page.locator('#basic').click()
    await page.waitForURL('**/links/url-fragments#target', {
      waitUntil: 'networkidle',
    })

    const offsetTop = await getWindowScrollTop(page)
    expect(offsetTop).not.toEqual(0)
  })

  test('Scrolls to the fragment element when making a visit to the same page', async ({
    page,
  }) => {
    await page.locator('#fragment').click()
    await page.waitForURL(/.*\#target/, { waitUntil: 'networkidle' })

    const offsetTop = await getWindowScrollTop(page)
    expect(offsetTop).not.toEqual(0)
  })

  test('Does not scroll to the fragment element when it does not exist on the page', async ({
    page,
  }) => {
    await page.locator('#non-existent-fragment-link').click()
    await page.waitForURL('**/links/url-fragments#non-existent-fragment', {
      waitUntil: 'networkidle',
    })

    const offsetTop = await getWindowScrollTop(page)
    expect(offsetTop).toEqual(0)
  })
})
