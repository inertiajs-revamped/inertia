import { expect, test } from '@playwright/test'

test.describe('errors', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/form-helper/errors')

    await expect(page.locator('#errors-status')).toContainText(
      'Form has no errors'
    )

    await page.locator('#name').fill('A')
    await page.locator('#handle').fill('B')
    await page.locator('#remember').check()
  })

  test('can display form errors', async ({ page }) => {
    await expect(page.locator('#name_error')).toHaveCount(0)
    await expect(page.locator('#handle_error')).toHaveCount(0)
    await expect(page.locator('#remember_error')).toHaveCount(0)

    await page.locator('#submit').click()
    await page.waitForURL('**/form-helper/errors')

    await expect(page.locator('#errors-status')).toContainText(
      'Form has errors'
    )
    await expect(page.locator('#name_error')).toHaveText('Some name error')
    await expect(page.locator('#handle_error')).toHaveText(
      'The Handle was invalid'
    )
    await expect(page.locator('#remember_error')).toHaveCount(0)
  })

  test('can clear all form errors', async ({ page }) => {
    await page.locator('#submit').click()
    await page.waitForURL('**/form-helper/errors')

    await expect(page.locator('#errors-status')).toContainText(
      'Form has errors'
    )
    await expect(page.locator('#name_error')).toHaveText('Some name error')
    await expect(page.locator('#handle_error')).toHaveText(
      'The Handle was invalid'
    )
    await expect(page.locator('#remember_error')).toHaveCount(0)

    await page.locator('#clear').click()

    await expect(page.locator('#errors-status')).toContainText(
      'Form has no errors'
    )
    await expect(page.locator('#name_error')).toHaveCount(0)
    await expect(page.locator('#handle_error')).toHaveCount(0)
    await expect(page.locator('#remember_error')).toHaveCount(0)
  })

  test('does not reset fields back to their initial values when it clears all form errors', async ({
    page,
  }) => {
    await page.locator('#submit').click()
    await page.waitForURL('**/form-helper/errors')

    await expect(page.locator('#errors-status')).toContainText(
      'Form has errors'
    )
    await expect(page.locator('#name_error')).toHaveText('Some name error')
    await expect(page.locator('#handle_error')).toHaveText(
      'The Handle was invalid'
    )
    await expect(page.locator('#remember_error')).toHaveCount(0)
    await expect(page.locator('#name')).toHaveValue('A')
    await expect(page.locator('#handle')).toHaveValue('B')
    await expect(page.locator('#remember')).toBeChecked()
  })

  test('can clear a subset of form errors', async ({ page }) => {
    await page.locator('#submit').click()
    await page.waitForURL('**/form-helper/errors')

    await expect(page.locator('#errors-status')).toContainText(
      'Form has errors'
    )
    await expect(page.locator('#name_error')).toHaveText('Some name error')
    await expect(page.locator('#handle_error')).toHaveText(
      'The Handle was invalid'
    )
    await expect(page.locator('#remember_error')).toHaveCount(0)

    await page.locator('#clear-one').click()

    await expect(page.locator('#errors-status')).toContainText(
      'Form has errors'
    )
    await expect(page.locator('#name_error')).toHaveText('Some name error')
    await expect(page.locator('#handle_error')).toHaveCount(0)
    await expect(page.locator('#remember_error')).toHaveCount(0)
  })

  test('does not reset fields back to their initial values when it clears a subset of form errors', async ({
    page,
  }) => {
    await page.locator('#submit').click()
    await page.waitForURL('**/form-helper/errors')

    await expect(page.locator('#errors-status')).toContainText(
      'Form has errors'
    )
    await expect(page.locator('#name_error')).toHaveText('Some name error')
    await expect(page.locator('#handle_error')).toHaveText(
      'The Handle was invalid'
    )
    await expect(page.locator('#remember_error')).toHaveCount(0)
    await expect(page.locator('#name')).toHaveValue('A')
    await expect(page.locator('#handle')).toHaveValue('B')
    await expect(page.locator('#remember')).toBeChecked()

    await page.locator('#clear-one').click()

    await expect(page.locator('#errors-status')).toContainText(
      'Form has errors'
    )
    await expect(page.locator('#name_error')).toHaveText('Some name error')
    await expect(page.locator('#handle_error')).toHaveCount(0)
    await expect(page.locator('#remember_error')).toHaveCount(0)
    await expect(page.locator('#name')).toHaveValue('A')
    await expect(page.locator('#handle')).toHaveValue('B')
    await expect(page.locator('#remember')).toBeChecked()
  })

  test('can set a single error', async ({ page }) => {
    await page.locator('#set-one').click()

    await expect(page.locator('#errors-status')).toContainText(
      'Form has errors'
    )
    await expect(page.locator('#name_error')).toHaveCount(0)
    await expect(page.locator('#handle_error')).toHaveText(
      'Manually set Handle error'
    )
    await expect(page.locator('#remember_error')).toHaveCount(0)
  })

  test('can set multiple errors', async ({ page }) => {
    await page.locator('#set').click()

    await expect(page.locator('#errors-status')).toContainText(
      'Form has errors'
    )
    await expect(page.locator('#name_error')).toHaveText(
      'Manually set Name error'
    )
    await expect(page.locator('#handle_error')).toHaveText(
      'Manually set Handle error'
    )
    await expect(page.locator('#remember_error')).toHaveCount(0)
  })
})
