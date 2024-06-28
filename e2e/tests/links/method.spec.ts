import { expect, test } from '@playwright/test'

test.describe('links', () => {
  test('visits a different page', async ({ page }) => {
    await page.goto('/')

    await page.locator('#links-method').click()
    await page.waitForURL('**/links/method')

    await expect(page.locator('#text')).toContainText(
      'This is the links page that demonstrates inertia-link methods'
    )
  })

  test('can make a location visit', async ({ page }) => {
    await page.goto('/links/location')

    page.on('response', async (res) => {
      if (res.url().endsWith('/location')) {
        expect(res.status()).toEqual(409)
        expect(res.headers()).not.toHaveProperty('x-inertia')
      }
    })

    await page.locator('#example').click()
  })

  // https://github.com/so-teneff/jest-pupeteer/blob/master/src/index.spec.js
  test.describe('auto-cancellation', () => {
    test('will automatically cancel a pending visits when a new request is made', async ({
      page,
    }) => {
      await page.goto('/links/automatic-cancellation')

      await page.locator('#visit').click()

      await page.locator('#visit').click()
    })
  })

  test.describe('method', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/links/method')
    })

    test('can use the GET method', async ({ page }) => {
      const [request] = await Promise.all([
        page.waitForEvent('requestfinished', (request) =>
          request.url().includes('/dump/get')
        ),
        page.locator('#get').click(),
      ])

      const response = await request.response()
      expect(response?.status()).toBe(200)
      const body = await response?.json()

      expect(body.props).toMatchObject({
        method: expect.stringContaining('get'),
        query: expect.objectContaining({}),
        form: expect.objectContaining({}),
      })
    })

    test('can use the POST method', async ({ page }) => {
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
        form: expect.objectContaining({}),
      })
    })

    test('can use the PUT method', async ({ page }) => {
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
        form: expect.objectContaining({}),
      })
    })

    test('can use the PATCH method', async ({ page }) => {
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
        form: expect.objectContaining({}),
      })
    })

    test('can use the DELETE method', async ({ page }) => {
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
        form: expect.objectContaining({}),
      })
    })
  })
})
