import { expect, test } from '@playwright/test'

test.describe('data', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/form-helper/data')
  })

  test('can reset all fields to their initial values', async ({ page }) => {
    await page.locator('#name').fill('A')
    await page.locator('#remember').check()

    await expect(page.locator('#name')).toHaveValue('A')
    await expect(page.locator('#handle')).toHaveValue('example')
    await expect(page.locator('#remember')).toBeChecked()

    await page.locator('#submit').click()
    await page.waitForURL('**/form-helper/data')

    await page.locator('#reset').click()

    await expect(page.locator('#name')).toHaveValue('foo')
    await expect(page.locator('#handle')).toHaveValue('example')
    await expect(page.locator('#remember')).not.toBeChecked()
  })

  test('can reset a single field to its initial value', async ({ page }) => {
    await page.locator('#name').fill('A')
    await page.locator('#handle').fill('B')
    await page.locator('#remember').check()

    await page.locator('#submit').click()
    await page.waitForURL('**/form-helper/data')

    await expect(page.locator('#name')).toHaveValue('A')
    await expect(page.locator('#handle')).toHaveValue('B')
    await expect(page.locator('#remember')).toBeChecked()

    await page.locator('#reset-one').click()

    await expect(page.locator('#name')).toHaveValue('A')
    await expect(page.locator('#handle')).toHaveValue('example')
    await expect(page.locator('#remember')).toBeChecked()
  })

  test('does not reset errors when it resets a field to its initial value', async ({
    page,
  }) => {
    await page.locator('#name').fill('A')
    await page.locator('#handle').fill('B')
    await page.locator('#remember').check()

    await page.locator('#submit').click()
    await page.waitForURL('**/form-helper/data')

    await expect(page.locator('#name')).toHaveValue('A')
    await expect(page.locator('#handle')).toHaveValue('B')
    await expect(page.locator('#remember')).toBeChecked()
    await expect(page.locator('#errors-status')).toContainText(
      'Form has errors'
    )
    await expect(page.locator('#name_error')).toHaveText('Some name error')
    await expect(page.locator('#handle_error')).toHaveText(
      'The Handle was invalid'
    )

    await page.locator('#reset-one').click()

    await expect(page.locator('#name')).toHaveValue('A')
    await expect(page.locator('#handle')).toHaveValue('example')
    await expect(page.locator('#remember')).toBeChecked()

    await expect(page.locator('#errors-status')).toContainText(
      'Form has errors'
    )
    await expect(page.locator('#name_error')).toHaveText('Some name error')
    await expect(page.locator('#handle_error')).toHaveText(
      'The Handle was invalid'
    )
    await expect(page.locator('#remember_error')).toHaveCount(0)
  })

  test('does not reset errors when it resets all fields to their initial values', async ({
    page,
  }) => {
    await page.locator('#name').fill('A')
    await page.locator('#handle').fill('B')
    await page.locator('#remember').check()

    await page.locator('#submit').click()
    await page.waitForURL('**/form-helper/data')

    await expect(page.locator('#name')).toHaveValue('A')
    await expect(page.locator('#handle')).toHaveValue('B')
    await expect(page.locator('#remember')).toBeChecked()
    await expect(page.locator('#errors-status')).toContainText(
      'Form has errors'
    )
    await expect(page.locator('#name_error')).toHaveText('Some name error')
    await expect(page.locator('#handle_error')).toHaveText(
      'The Handle was invalid'
    )

    await page.locator('#reset').click()

    await expect(page.locator('#name')).toHaveValue('foo')
    await expect(page.locator('#handle')).toHaveValue('example')
    await expect(page.locator('#remember')).not.toBeChecked()
    await expect(page.locator('#errors-status')).toContainText(
      'Form has errors'
    )
    await expect(page.locator('#name_error')).toHaveText('Some name error')
    await expect(page.locator('#handle_error')).toHaveText(
      'The Handle was invalid'
    )
    await expect(page.locator('#remember_error')).toHaveCount(0)
  })

  test.describe('Update "reset" defaults', () => {
    test.beforeEach(async ({ page }) => {
      await expect(page.locator('#name')).toHaveValue('foo')
      await expect(page.locator('#handle')).toHaveValue('example')
      await expect(page.locator('#remember')).not.toBeChecked()
    })

    test('can assign the current values as the new defaults', async ({
      page,
    }) => {
      await page.locator('#name').fill('A')
      await page.locator('#handle').fill('B')
      await page.locator('#remember').check()

      await page.locator('#reassign').click()

      await page.locator('#name').fill('foo')
      await page.locator('#handle').fill('example')
      await page.locator('#remember').uncheck()

      await expect(page.locator('#name')).toHaveValue('foo')
      await expect(page.locator('#handle')).toHaveValue('example')
      await expect(page.locator('#remember')).not.toBeChecked()

      await page.locator('#reset').click()

      await expect(page.locator('#name')).toHaveValue('A')
      await expect(page.locator('#handle')).toHaveValue('B')
      await expect(page.locator('#remember')).toBeChecked()
    })

    test('can assign new defaults for multiple fields', async ({ page }) => {
      await page.locator('#reassign-object').click()

      await expect(page.locator('#name')).toHaveValue('foo')
      await expect(page.locator('#handle')).toHaveValue('example')
      await expect(page.locator('#remember')).not.toBeChecked()

      await page.locator('#reset-one').click()

      await expect(page.locator('#name')).toHaveValue('foo')
      await expect(page.locator('#handle')).toHaveValue('updated handle')
      await expect(page.locator('#remember')).not.toBeChecked()

      await page.locator('#reset').click()

      await expect(page.locator('#name')).toHaveValue('foo')
      await expect(page.locator('#handle')).toHaveValue('updated handle')
      await expect(page.locator('#remember')).toBeChecked()
    })

    test('can assign new default for a single field', async ({ page }) => {
      await page.locator('#reassign-single').click()

      await expect(page.locator('#name')).toHaveValue('foo')
      await expect(page.locator('#handle')).toHaveValue('example')
      await expect(page.locator('#remember')).not.toBeChecked()

      await page.locator('#reset').click()

      await expect(page.locator('#name')).toHaveValue('single value')
      await expect(page.locator('#handle')).toHaveValue('example')
      await expect(page.locator('#remember')).not.toBeChecked()
    })
  })
})
