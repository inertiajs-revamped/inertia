import { expect, test } from '@playwright/test'

test.describe('auto-converted objects (when files are present)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/visits/data/auto-converted')
  })

  test('auto-converts objects to form-data when files are present using the POST method', async ({
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
      headers: {
        'content-type': expect.stringContaining(
          'multipart/form-data; boundary='
        ),
      },
      query: expect.objectContaining({}),
      form: expect.objectContaining({ foo: 'bar' }),
      files: expect.arrayContaining([
        {
          fieldname: 'file',
          originalname: 'example.jpg',
          encoding: '7bit',
          mimetype: 'application/octet-stream',
          buffer: { type: 'Buffer', data: [] },
          size: 0,
        },
      ]),
    })
  })

  test('auto-converts objects to form-data when files are present using the PUT method', async ({
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
      headers: {
        'content-type': expect.stringContaining(
          'multipart/form-data; boundary='
        ),
      },
      query: expect.objectContaining({}),
      form: expect.objectContaining({ foo: 'bar' }),
      files: expect.arrayContaining([
        {
          fieldname: 'file',
          originalname: 'example.jpg',
          encoding: '7bit',
          mimetype: 'application/octet-stream',
          buffer: { type: 'Buffer', data: [] },
          size: 0,
        },
      ]),
    })
  })

  test('auto-converts objects to form-data when files are present using the PATCH method', async ({
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
      headers: {
        'content-type': expect.stringContaining(
          'multipart/form-data; boundary='
        ),
      },
      query: expect.objectContaining({}),
      form: expect.objectContaining({ foo: 'bar' }),
      files: expect.arrayContaining([
        {
          fieldname: 'file',
          originalname: 'example.jpg',
          encoding: '7bit',
          mimetype: 'application/octet-stream',
          buffer: { type: 'Buffer', data: [] },
          size: 0,
        },
      ]),
    })
  })

  test('auto-converts objects to form-data when files are present using the DELETE method', async ({
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
      headers: {
        'content-type': expect.stringContaining(
          'multipart/form-data; boundary='
        ),
      },
      query: expect.objectContaining({}),
      form: expect.objectContaining({ foo: 'bar' }),
      files: expect.arrayContaining([
        {
          fieldname: 'file',
          originalname: 'example.jpg',
          encoding: '7bit',
          mimetype: 'application/octet-stream',
          buffer: { type: 'Buffer', data: [] },
          size: 0,
        },
      ]),
    })
  })
})
