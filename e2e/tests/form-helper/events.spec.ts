import { test } from '@playwright/test'

test.describe('events', () => {
  test.beforeEach(async ({ page }) => {})

  test.describe('onBefore', () => {
    test('fires when a request is about to be made', async ({ page }) => {})

    test('can prevent the visit from starting by returning false', async ({
      page,
    }) => {})

    test('will reset the successful and recently successful statuses immediately when the form gets (re)submitted', async ({
      page,
    }) => {})
  })

  test.describe('onStart', () => {
    test('fires when the request has started', async ({ page }) => {})

    test('marks the form as processing', async ({ page }) => {})
  })

  test.describe('onProgress', () => {
    test('fires when the form has files (and upload progression occurs)', async ({
      page,
    }) => {})

    test('does not fire when the form has no files', async ({ page }) => {})

    test('updates the progress property of the form', async ({ page }) => {})
  })

  test.describe('onCancel', () => {
    test('fires when the request was cancelled', async ({ page }) => {})
  })

  test.describe('onSuccess', () => {
    test('fires the request succeeds without validation errors', async ({
      page,
    }) => {})

    test('marks the form as no longer processing', async ({ page }) => {})

    test('resets the progress property back to null', async ({ page }) => {})

    test('can delay onFinish from firing by returning a promise', async ({
      page,
    }) => {})

    test('clears all existing errors and resets the hasErrors prop', async ({
      page,
    }) => {})

    test('will mark the form as being submitted successfully', async ({
      page,
    }) => {})

    test('will only mark the form as "recently successful" for two seconds', async ({
      page,
    }) => {})
  })

  test.describe('onError', () => {
    test('fires when the request finishes with validation errors', async ({
      page,
    }) => {})

    test('marks the form as no longer processing', async ({ page }) => {})

    test('resets the progress property back to null', async ({ page }) => {})

    test('sets form errors', async ({ page }) => {})

    test('can delay onFinish from firing by returning a promise', async ({
      page,
    }) => {})
  })

  test.describe('onFinish', () => {
    test('fires when the request is completed', async ({ page }) => {})
  })
})
