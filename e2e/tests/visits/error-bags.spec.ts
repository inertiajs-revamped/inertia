import { expect, test } from '@playwright/test'

test.describe('error-bags', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/visits/error-bags')
  })

  test('does not use error bags by default', async ({ page }) => {
    const [request] = await Promise.all([
      page.waitForEvent('requestfinished', (request) =>
        request.url().includes('/dump/post')
      ),
      page.locator('#default').click(),
    ])

    const response = await request.response()
    expect(response?.status()).toBe(200)
    const body = await response?.json()

    expect(body.props).toMatchObject({
      method: expect.stringContaining('post'),
    })
    expect(body.props.headers['x-inertia-error-bag']).toBeUndefined()
  })

  test('uses error bags using the visit method', async ({ page }) => {
    const [request] = await Promise.all([
      page.waitForEvent('requestfinished', (request) =>
        request.url().includes('/dump/post')
      ),
      page.locator('#visit').click(),
    ])

    const response = await request.response()
    expect(response?.status()).toBe(200)
    const body = await response?.json()

    expect(body.props).toMatchObject({
      method: expect.stringContaining('post'),
      headers: {
        'x-inertia-error-bag': expect.stringContaining('visitErrorBag'),
      },
      query: expect.objectContaining({}),
      form: expect.objectContaining({
        foo: 'bar',
      }),
    })
  })

  test('uses error bags using the GET method', async ({ page }) => {
    const [request] = await Promise.all([
      page.waitForEvent('requestfinished', (request) =>
        request.url().includes('/dump/post')
      ),
      page.locator('#get').click(),
    ])

    const response = await request.response()
    expect(response?.status()).toBe(200)
    const body = await response?.json()

    expect(body.props).toMatchObject({
      method: expect.stringContaining('post'),
      headers: {
        'x-inertia-error-bag': expect.stringContaining('postErrorBag'),
      },
      query: expect.objectContaining({}),
      form: expect.objectContaining({
        foo: 'baz',
      }),
    })
  })
})
