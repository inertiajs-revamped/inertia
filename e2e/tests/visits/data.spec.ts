import { expect, test } from '@playwright/test'

test.describe('plain-objects', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/visits/data/object')
  })

  test('passes data as params by default when using the visit method', async ({
    page,
  }) => {
    const [request] = await Promise.all([
      page.waitForEvent('requestfinished', (request) =>
        request.url().includes('/dump/get')
      ),
      page.locator('#visit').click(),
    ])

    const response = await request.response()
    expect(response?.status()).toBe(200)
    const body = await response?.json()

    expect(request.url()).toContain('/dump/get?foo=visit')
    expect(request).toHaveProperty('headers')
    expect(request.headers).toBeInstanceOf(Function)
    expect(request.headers()).toHaveProperty('content-type', 'application/json')
    expect(request.method).toBeInstanceOf(Function)
    expect(request.method()).toEqual('GET')

    expect(body.props).toMatchObject({
      form: expect.objectContaining({}),
    })
    expect(body.props.files).toBeUndefined()
  })

  test.describe('GET method', () => {
    test('passes data as params', async ({ page }) => {
      const [request] = await Promise.all([
        page.waitForEvent('requestfinished', (request) =>
          request.url().includes('/dump/get')
        ),
        page.locator('#get').click(),
      ])

      const response = await request.response()
      expect(response?.status()).toBe(200)
      const body = await response?.json()

      expect(request.url()).toContain('/dump/get?bar=get')
      expect(request).toHaveProperty('headers')
      expect(request.headers).toBeInstanceOf(Function)
      expect(request.headers()).toHaveProperty(
        'content-type',
        'application/json'
      )
      expect(request.method).toBeInstanceOf(Function)
      expect(request.method()).toEqual('GET')

      expect(body.props).toMatchObject({
        form: expect.objectContaining({}),
      })
      expect(body.props.files).toBeUndefined()
    })

    test.describe('query string array formatter', () => {
      test('can use the brackets query string array formatter', async ({
        page,
      }) => {
        page.once('request', (req) => {
          if (req.url().includes('/dump/')) {
            expect(req.url()).toContain('/dump/get?a[]=b&a[]=c')
          }
        })

        await page.locator('#qsaf-brackets').click()
      })

      test('can use the indices query string array formatter', async ({
        page,
      }) => {
        page.once('request', (req) => {
          if (req.url().includes('/dump/')) {
            expect(req.url()).toContain('/dump/get?a[0]=b&a[1]=c')
          }
        })

        await page.locator('#qsaf-indices').click()
      })

      test('defaults to using the brackets query string array formatter', async ({
        page,
      }) => {
        page.once('request', (req) => {
          if (req.url().includes('/dump/')) {
            expect(req.url()).toContain('/dump/get?a[]=b&a[]=c')
          }
        })

        await page.locator('#qsaf-default').click()
      })
    })
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

    expect(request.url()).toContain('/dump/post')
    expect(request).toHaveProperty('headers')
    expect(request.headers).toBeInstanceOf(Function)
    expect(request.headers()).toHaveProperty('content-type', 'application/json')
    expect(request.method).toBeInstanceOf(Function)
    expect(request.method()).toEqual('POST')

    expect(body.props).toMatchObject({
      form: expect.objectContaining({ baz: 'post' }),
      query: expect.objectContaining({}),
    })
    expect(body.props.files).toBeUndefined()
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

    expect(request.url()).toContain('/dump/put')
    expect(request).toHaveProperty('headers')
    expect(request.headers).toBeInstanceOf(Function)
    expect(request.headers()).toHaveProperty('content-type', 'application/json')
    expect(request.method).toBeInstanceOf(Function)
    expect(request.method()).toEqual('PUT')

    expect(body.props).toMatchObject({
      form: expect.objectContaining({ foo: 'put' }),
      query: expect.objectContaining({}),
    })
    expect(body.props.files).toBeUndefined()
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

    expect(request.url()).toContain('/dump/patch')
    expect(request).toHaveProperty('headers')
    expect(request.headers).toBeInstanceOf(Function)
    expect(request.headers()).toHaveProperty('content-type', 'application/json')
    expect(request.method).toBeInstanceOf(Function)
    expect(request.method()).toEqual('PATCH')

    expect(body.props).toMatchObject({
      form: expect.objectContaining({ bar: 'patch' }),
      query: expect.objectContaining({}),
    })
    expect(body.props.files).toBeUndefined()
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

    expect(request.url()).toContain('/dump/delete')
    expect(request).toHaveProperty('headers')
    expect(request.headers).toBeInstanceOf(Function)
    expect(request.headers()).toHaveProperty('content-type', 'application/json')
    expect(request.method).toBeInstanceOf(Function)
    expect(request.method()).toEqual('DELETE')

    expect(body.props).toMatchObject({
      form: expect.objectContaining({ baz: 'delete' }),
      query: expect.objectContaining({}),
    })
    expect(body.props.files).toBeUndefined()
  })
})
