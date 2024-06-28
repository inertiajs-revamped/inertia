import { expect, test } from '@playwright/test'

test.describe('Headers', () => {
  test('has the default set of headers', async ({ page }) => {
    await page.goto('/links/headers')

    const [request] = await Promise.all([
      page.waitForEvent('requestfinished', (request) =>
        request.url().includes('/dump/get')
      ),
      page.locator('#default').click(),
    ])

    const response = await request.response()
    expect(response?.status()).toBe(200)
    const body = await response?.json()

    expect(body.props).toMatchObject({
      headers: {
        accept: expect.stringContaining('text/html, application/xhtml+xml'),
        'x-requested-with': expect.stringContaining('XMLHttpRequest'),
        'x-inertia': expect.stringContaining('true'),
      },
    })
    expect(body.props.headers['x-inertia-version']).toBeUndefined()
  })

  test('starts using the x-inertia-version header when a version was given from the back-end', async ({
    page,
  }) => {
    await page.goto('/links/headers/version')

    const [request] = await Promise.all([
      page.waitForEvent('requestfinished', (request) =>
        request.url().includes('/dump/get')
      ),
      page.locator('#default').click(),
    ])

    const response = await request.response()
    expect(response?.status()).toBe(200)
    const body = await response?.json()

    expect(body.props).toMatchObject({
      headers: {
        'x-inertia-version': expect.stringContaining('example-version-header'),
      },
    })
  })

  test('allows to set custom headers', async ({ page }) => {
    await page.goto('/links/headers')

    const [request] = await Promise.all([
      page.waitForEvent('requestfinished', (request) =>
        request.url().includes('/dump/get')
      ),
      page.locator('#custom').click(),
    ])

    const response = await request.response()
    expect(response?.status()).toBe(200)
    const body = await response?.json()

    expect(body.props).toMatchObject({
      headers: {
        accept: expect.stringContaining('text/html, application/xhtml+xml'),
        'x-requested-with': expect.stringContaining('XMLHttpRequest'),
        'x-inertia': expect.stringContaining('true'),
        foo: expect.stringContaining('bar'),
      },
    })
  })

  test('cannot override built-in Inertia headers', async ({ page }) => {
    await page.goto('/links/headers')

    const [request] = await Promise.all([
      page.waitForEvent('requestfinished', (request) =>
        request.url().includes('/dump/post')
      ),
      page.locator('#overridden').click(),
    ])

    const response = await request.response()
    expect(response?.status()).toBe(200)
    const body = await response?.json()

    expect(body.props).toMatchObject({
      headers: {
        accept: expect.stringContaining('text/html, application/xhtml+xml'),
        'x-requested-with': expect.stringContaining('XMLHttpRequest'),
        'x-inertia': expect.stringContaining('true'),
        bar: expect.stringContaining('baz'),
      },
    })
  })
})
