import { expect, test } from '@playwright/test'

test.describe('react-only remember', () => {
  test.describe('use-remmember', () => {
    test('does not remember anything as of default', async ({ page }) => {
      await page.goto('/remember/default')

      await page.locator('#name').fill('A')
      await page.locator('#remember').check()
      await page.locator('#untracked').fill('B')

      await page.locator('#link').click()
      await page.waitForURL('**/dump/get')

      await page.goBack({ waitUntil: 'load' })
      await expect(page).toHaveURL('/remember/default')

      await expect(page.locator('#name')).toBeEmpty()
      await expect(page.locator('#remember')).not.toBeChecked()
      await expect(page.locator('#untracked')).toBeEmpty()
    })

    test('remembers tracked fields using the array syntax', async ({
      page,
    }) => {
      await page.goto('/remember/array')

      await page.locator('#name').fill('A')
      await page.locator('#remember').check()
      await page.locator('#untracked').fill('B')

      await page.locator('#link').click()
      await page.waitForURL('**/dump/get')

      await page.goBack({ waitUntil: 'load' })
      await expect(page).toHaveURL('/remember/array')

      await expect(page.locator('#name')).toHaveValue('A')
      await expect(page.locator('#remember')).toBeChecked()
      await expect(page.locator('#untracked')).toBeEmpty()
    })

    test('remembers tracked fields using the object syntax', async ({
      page,
    }) => {
      await page.goto('/remember/object')

      await page.locator('#name').fill('A')
      await page.locator('#remember').check()
      await page.locator('#untracked').fill('B')

      await page.locator('#link').click()
      await page.waitForURL('**/dump/get')

      await page.goBack({ waitUntil: 'load' })
      await expect(page).toHaveURL('/remember/object')

      await expect(page.locator('#name')).toHaveValue('A')
      await expect(page.locator('#remember')).toBeChecked()
      await expect(page.locator('#untracked')).toBeEmpty()
    })

    test('remembers tracked fields using the string syntax', async ({
      page,
    }) => {
      await page.goto('/remember/string')

      await page.locator('#name').fill('A')
      await page.locator('#remember').check()
      await page.locator('#untracked').fill('B')

      await page.locator('#link').click()
      await page.waitForURL('**/dump/get')

      await page.goBack({ waitUntil: 'load' })
      await expect(page).toHaveURL('/remember/string')

      await expect(page.locator('#name')).toHaveValue('A')
      await expect(page.locator('#remember')).not.toBeChecked()
      await expect(page.locator('#untracked')).toBeEmpty()
    })

    test('restores remembered data when pressing the back button', async ({
      page,
    }) => {
      await page.goto('/remember/multiple-components')

      await page.locator('#name').fill('D')
      await page.locator('#remember').check()
      await page.locator('#untracked').fill('C')

      await page.locator('#a-name').fill('A1')
      await page.locator('#a-untracked').fill('A2')
      await page.locator('#b-name').fill('B1')
      await page.locator('#b-remember').check()
      await page.locator('#b-untracked').fill('B2')

      await page.locator('#link').click()
      await page.waitForURL('**/dump/get')

      await page.goBack({ waitUntil: 'load' })
      await expect(page).toHaveURL('/remember/multiple-components')

      await expect(page.locator('#name')).toHaveValue('D')
      await expect(page.locator('#remember')).toBeChecked()
      await expect(page.locator('#untracked')).toBeEmpty()

      await expect(page.locator('#a-name')).toHaveValue('A1')
      await expect(page.locator('#a-remember')).not.toBeChecked()
      await expect(page.locator('#a-untracked')).toBeEmpty()

      await expect(page.locator('#b-name')).toHaveValue('B1')
      await expect(page.locator('#b-remember')).toBeChecked()
      await expect(page.locator('#b-untracked')).toBeEmpty()
    })

    test.skip(() => process.env.UI !== 'react', 'react-only')

    test('react-only restores remembered data when pressing the back button from another website', async ({
      page,
    }) => {
      await page.goto('/remember/multiple-components')

      await page.locator('#name').fill('D')
      await page.locator('#remember').check()
      await page.locator('#untracked').fill('C')

      await page.locator('#a-name').fill('A1')
      await page.locator('#a-untracked').fill('A2')
      await page.locator('#b-name').fill('B1')
      await page.locator('#b-remember').check()
      await page.locator('#b-untracked').fill('B2')

      page.on('response', async (res) => {
        if (res.url().endsWith('/non-inertia')) {
          expect(res.status()).toEqual(500)
        }
      })

      await page.locator('#off-site').click()
      await page.waitForURL('**/non-inertia')

      await page.goBack({ waitUntil: 'load' })
      await expect(page).toHaveURL('/remember/multiple-components')

      await expect(page.locator('#name')).toHaveValue('D')
      await expect(page.locator('#remember')).toBeChecked()
      await expect(page.locator('#untracked')).toBeEmpty()

      await expect(page.locator('#a-name')).toHaveValue('A1')
      await expect(page.locator('#a-remember')).not.toBeChecked()
      await expect(page.locator('#a-untracked')).toBeEmpty()

      await expect(page.locator('#b-name')).toHaveValue('B1')
      await expect(page.locator('#b-remember')).toBeChecked()
      await expect(page.locator('#b-untracked')).toBeEmpty()
    })
  })
})
