import type { Page, PageProps } from '@inertiajs-revamped/react'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { type App, BASE_URL, start } from './helper'

// https://stackoverflow.com/a/69321181

// needs work
describe('Pages', () => {
  let app: App

  beforeAll(async () => {
    app = await start()
  })

  afterAll(async () => {
    await app.stop()
  })

  it('receives data from the controllers as props', async () => {
    await app.navigate('/')
    expect(app.page.url()).toEqual(`${BASE_URL}/`)

    const pageProps: Page<PageProps> = await app.page.$eval('div#app', (el) => {
      return JSON.parse(el.dataset.page as string)
    })
    // When props are not declared, they become attrs
    expect(pageProps).toHaveProperty('props')
    expect(pageProps.props.example).toEqual('FooBar')
  })

  describe('Persistent Layouts', () => {
    describe('Render Function', () => {
      it('can have a persistent layout', async () => {
        await app.navigate('/persistent-layouts/render-function/simple/page-a')
        expect(app.page.url()).toEqual(
          `${BASE_URL}/persistent-layouts/render-function/simple/page-a`
        )

        const entryText = await app.page
          .locator('span.text')
          .map((el) => el.textContent)
          .wait()

        expect(entryText).toEqual('Simple Persistent Layout - Page A')

        await app.page.locator('a').click()
        await app.page.waitForResponse(
          `${BASE_URL}/persistent-layouts/render-function/simple/page-b`
        )
        await app.page.waitForNavigation()
        expect(app.page.url()).toEqual(
          `${BASE_URL}/persistent-layouts/render-function/simple/page-b`
        )
      })

      it('can create more complex layout arrangements using nested layouts', async () => {
        await app.navigate('/persistent-layouts/render-function/nested/page-a')
        expect(app.page.url()).toEqual(
          `${BASE_URL}/persistent-layouts/render-function/nested/page-a`
        )

        const entryText = await app.page
          .locator('span.text')
          .map((el) => el.textContent)
          .wait()

        expect(entryText).toEqual('Nested Persistent Layout - Page A')

        await app.page.locator('a').click()
        await app.page.waitForResponse(
          `${BASE_URL}/persistent-layouts/render-function/nested/page-b`
        )
        await app.page.waitForNavigation()
        expect(app.page.url()).toEqual(
          `${BASE_URL}/persistent-layouts/render-function/nested/page-b`
        )
      })
    })
  })

  describe('Shorthand', () => {
    it('can have a persistent layout', async () => {
      await app.navigate('/persistent-layouts/shorthand/simple/page-a')
      expect(app.page.url()).toEqual(
        `${BASE_URL}/persistent-layouts/shorthand/simple/page-a`
      )

      const entryText = await app.page
        .locator('span.text')
        .map((el) => el.textContent)
        .wait()

      expect(entryText).toEqual('Simple Persistent Layout - Page A')

      await app.page.locator('a').click()
      await app.page.waitForResponse(
        `${BASE_URL}/persistent-layouts/shorthand/simple/page-b`
      )
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(
        `${BASE_URL}/persistent-layouts/shorthand/simple/page-b`
      )
    })

    it('has the page props available within the persistent layout', async () => {
      await app.navigate('/persistent-layouts/shorthand/simple/page-a')
      expect(app.page.url()).toEqual(
        `${BASE_URL}/persistent-layouts/shorthand/simple/page-a`
      )

      const pageProps: Page<PageProps> = await app.page.$eval(
        'div#app',
        (el) => {
          return JSON.parse(el.dataset.page as string)
        }
      )
      expect(pageProps).toMatchObject({ props: { foo: 'bar', baz: 'example' } })
    })

    it('can create more complex layout arrangements using nested persistent layouts', async () => {
      await app.navigate('/persistent-layouts/shorthand/nested/page-a')
      expect(app.page.url()).toEqual(
        `${BASE_URL}/persistent-layouts/shorthand/nested/page-a`
      )

      await app.page.waitForNetworkIdle()

      const entryText = await app.page
        .locator('span.text')
        .map((el) => el.textContent)
        .wait()

      expect(entryText).toEqual('Nested Persistent Layout - Page A')

      await app.page.locator('a').click()
      await app.page.waitForResponse(
        `${BASE_URL}/persistent-layouts/shorthand/nested/page-b`
      )
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(
        `${BASE_URL}/persistent-layouts/shorthand/nested/page-b`
      )

      const text = await app.page
        .locator('span.text')
        .map((el) => el.textContent)
        .wait()

      expect(text).toEqual('Nested Persistent Layout - Page B')
    })

    it('has the page props available within all nested persistent layouts', async () => {
      await app.navigate('/persistent-layouts/shorthand/nested/page-a')
      expect(app.page.url()).toEqual(
        `${BASE_URL}/persistent-layouts/shorthand/nested/page-a`
      )

      const pageProps: Page<PageProps> = await app.page.$eval(
        'div#app',
        (el) => {
          return JSON.parse(el.dataset.page as string)
        }
      )
      expect(pageProps).toMatchObject({ props: { foo: 'bar', baz: 'example' } })
    })
  })
})
