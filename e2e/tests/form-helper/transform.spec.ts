import { expect, test } from '@playwright/test'

test.describe('transform', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/form-helper/transform')
    await page.locator('#remember').check()
  })

  test('can transform the form prior to submission using the POST method', async ({
    page,
  }) => {
    const [request] = await Promise.all([
      page.waitForEvent('requestfinished', (request) =>
        request.url().includes('/dump/post')
      ),
      page.locator('#post').click(),
    ])

    const response = await request.response()
    expect(response?.status()).toBe(200)
    const body = await response?.json()

    expect(body.props).toMatchObject({
      method: expect.stringContaining('post'),
      query: expect.objectContaining({}),
      form: expect.objectContaining({
        name: 'bar',
        remember: true,
      }),
    })
  })

  test('can transform the form prior to submission using the PUT method', async ({
    page,
  }) => {
    const [request] = await Promise.all([
      page.waitForEvent('requestfinished', (request) =>
        request.url().includes('/dump/put')
      ),
      page.locator('#put').click(),
    ])

    const response = await request.response()
    expect(response?.status()).toBe(200)
    const body = await response?.json()

    expect(body.props).toMatchObject({
      method: expect.stringContaining('put'),
      query: expect.objectContaining({}),
      form: expect.objectContaining({
        name: 'baz',
        remember: true,
      }),
    })
  })

  test('can transform the form prior to submission using the PATCH method', async ({
    page,
  }) => {
    const [request] = await Promise.all([
      page.waitForEvent('requestfinished', (request) =>
        request.url().includes('/dump/patch')
      ),
      page.locator('#patch').click(),
    ])

    const response = await request.response()
    expect(response?.status()).toBe(200)
    const body = await response?.json()

    expect(body.props).toMatchObject({
      method: expect.stringContaining('patch'),
      query: expect.objectContaining({}),
      form: expect.objectContaining({
        name: 'foo',
        remember: true,
      }),
    })
  })

  test('can transform the form prior to submission using the DELETE method', async ({
    page,
  }) => {
    const [request] = await Promise.all([
      page.waitForEvent('requestfinished', (request) =>
        request.url().includes('/dump/delete')
      ),
      page.locator('#delete').click(),
    ])

    const response = await request.response()
    expect(response?.status()).toBe(200)
    const body = await response?.json()

    expect(body.props).toMatchObject({
      method: expect.stringContaining('delete'),
      query: expect.objectContaining({}),
      form: expect.objectContaining({
        name: 'bar',
        remember: true,
      }),
    })
  })
})
