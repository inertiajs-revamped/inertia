import { expect, test } from '@playwright/test'

test.describe('FormData objects', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/links/data/form-data')
  })

  test('can pass data using the POST method', async ({ page }) => {
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
      headers: {
        'content-type': expect.stringContaining(
          'multipart/form-data; boundary='
        ),
      },
      query: expect.objectContaining({}),
      form: expect.objectContaining({ bar: 'baz' }),
      files: expect.arrayContaining([]),
    })
  })

  test('can pass data using the PUT method', async ({ page }) => {
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
      headers: {
        'content-type': expect.stringContaining(
          'multipart/form-data; boundary='
        ),
      },
      query: expect.objectContaining({}),
      form: expect.objectContaining({ bar: 'baz' }),
      files: expect.arrayContaining([]),
    })
  })

  test('can pass data using the PATCH method', async ({ page }) => {
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
      headers: {
        'content-type': expect.stringContaining(
          'multipart/form-data; boundary='
        ),
      },
      query: expect.objectContaining({}),
      form: expect.objectContaining({ bar: 'baz' }),
      files: expect.arrayContaining([]),
    })
  })

  test('can pass data using the DELETE method', async ({ page }) => {
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
      headers: {
        'content-type': expect.stringContaining(
          'multipart/form-data; boundary='
        ),
      },
      query: expect.objectContaining({}),
      form: expect.objectContaining({ bar: 'baz' }),
      files: expect.arrayContaining([]),
    })
  })
})
