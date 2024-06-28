import { expect, test } from '@playwright/test'

test.describe('remember', () => {
  test.describe('form-helper', () => {
    test('does not remember form data as of default', async ({ page }) => {
      await page.goto('/remember/form-helper/default')

      await page.locator('#name').fill('A')
      await page.locator('#handle').fill('B')
      await page.locator('#remember').check()
      await page.locator('#untracked').fill('C')

      await page.locator('#link').click()
      await page.waitForURL('**/dump/get')

      await page.goBack({ waitUntil: 'load' })
      await expect(page).toHaveURL('/remember/form-helper/default')

      await expect(page.locator('#name')).toHaveValue('foo')
      await expect(page.locator('#handle')).toHaveValue('example')
      await expect(page.locator('#remember')).not.toBeChecked()
      await expect(page.locator('#untracked')).toBeEmpty()
    })

    test('does not remember form errors as of default', async ({ page }) => {
      await page.goto('/remember/form-helper/default')

      await page.locator('#name').fill('A')
      await page.locator('#handle').fill('B')
      await page.locator('#remember').check()
      await page.locator('#untracked').fill('C')

      await expect(page.locator('#name_error')).toHaveCount(0)
      await expect(page.locator('#handle_error')).toHaveCount(0)
      await expect(page.locator('#remember_error')).toHaveCount(0)

      await page.locator('#submit').click()
      await page.waitForURL('**/remember/form-helper/default')

      await expect(page.locator('#name_error')).toHaveText('Some name error')
      await expect(page.locator('#handle_error')).toHaveText(
        'The Handle was invalid'
      )
      await expect(page.locator('#remember_error')).toHaveCount(0)
    })

    test('remembers form data when tracked', async ({ page }) => {
      await page.goto('/remember/form-helper/remember')

      await page.locator('#name').fill('A')
      await page.locator('#handle').fill('B')
      await page.locator('#remember').check()
      await page.locator('#untracked').fill('C')

      await page.locator('#link').click()
      await page.waitForURL('**/dump/get')

      await page.goBack({ waitUntil: 'load' })
      await expect(page).toHaveURL('/remember/form-helper/remember')

      await expect(page.locator('#name')).toHaveValue('A')
      await expect(page.locator('#handle')).toHaveValue('B')
      await expect(page.locator('#remember')).toBeChecked()
      await expect(page.locator('#untracked')).toBeEmpty()
    })

    test('remembers form errors when tracked', async ({ page }) => {
      await page.goto('/remember/form-helper/remember')

      await page.locator('#name').fill('A')
      await page.locator('#handle').fill('B')
      await page.locator('#remember').check()
      await page.locator('#untracked').fill('C')

      await expect(page.locator('#name_error')).toHaveCount(0)
      await expect(page.locator('#handle_error')).toHaveCount(0)
      await expect(page.locator('#remember_error')).toHaveCount(0)

      await page.locator('#submit').click()
      await page.waitForURL('**/remember/form-helper/remember')

      await expect(page.locator('#name_error')).toHaveText('Some name error')
      await expect(page.locator('#handle_error')).toHaveText(
        'The Handle was invalid'
      )
      await expect(page.locator('#remember_error')).toHaveCount(0)

      await page.locator('#link').click()
      await page.waitForURL('**/dump/get')

      await page.goBack({ waitUntil: 'load' })
      await expect(page).toHaveURL('/remember/form-helper/remember')

      await expect(page.locator('#name')).toHaveValue('A')
      await expect(page.locator('#handle')).toHaveValue('B')
      await expect(page.locator('#remember')).toBeChecked()
      await expect(page.locator('#untracked')).toBeEmpty()

      await expect(page.locator('#name_error')).toHaveText('Some name error')
      await expect(page.locator('#handle_error')).toHaveText(
        'The Handle was invalid'
      )
      await expect(page.locator('#remember_error')).toHaveCount(0)
    })

    test('remembers the last state of a form when tracked', async ({
      page,
    }) => {
      await page.goto('/remember/form-helper/remember')

      await page.locator('#name').fill('A')
      await page.locator('#handle').fill('B')
      await page.locator('#remember').check()
      await page.locator('#untracked').fill('C')

      await expect(page.locator('#name_error')).toHaveCount(0)
      await expect(page.locator('#handle_error')).toHaveCount(0)
      await expect(page.locator('#remember_error')).toHaveCount(0)

      await page.locator('#submit').click()
      await page.waitForURL('**/remember/form-helper/remember')

      await expect(page.locator('#name')).toHaveValue('A')
      await expect(page.locator('#handle')).toHaveValue('B')
      await expect(page.locator('#remember')).toBeChecked()
      await expect(page.locator('#untracked')).toHaveValue('C') // Only due to visit POST/PUT/PATCH/DELETE method's default preserveState option.

      await expect(page.locator('#name_error')).toHaveText('Some name error')
      await expect(page.locator('#handle_error')).toHaveText(
        'The Handle was invalid'
      )
      await expect(page.locator('#remember_error')).toHaveCount(0)

      await page.locator('#reset-one').click()

      await expect(page.locator('#name')).toHaveValue('A')
      await expect(page.locator('#handle')).toHaveValue('example')
      await expect(page.locator('#remember')).toBeChecked()
      await expect(page.locator('#untracked')).toHaveValue('C') // Unchanged from above

      await expect(page.locator('#name_error')).toHaveCount(0)
      await expect(page.locator('#handle_error')).toHaveText(
        'The Handle was invalid'
      )
      await expect(page.locator('#remember_error')).toHaveCount(0)

      await page.locator('#link').click()
      await page.waitForURL('**/dump/get')

      await page.goBack({ waitUntil: 'load' })
      await expect(page).toHaveURL('/remember/form-helper/remember')

      await expect(page.locator('#name')).toHaveValue('A')
      await expect(page.locator('#handle')).toHaveValue('example')
      await expect(page.locator('#remember')).toBeChecked()
      await expect(page.locator('#untracked')).toBeEmpty()

      await expect(page.locator('#name_error')).toHaveCount(0)
      await expect(page.locator('#handle_error')).toHaveText(
        'The Handle was invalid'
      )
      await expect(page.locator('#remember_error')).toHaveCount(0)
    })
  })
})
