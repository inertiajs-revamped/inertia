import type { DumpProps } from '@inertiajs-revamped/react'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import { type App, BASE_URL, start } from './helper'

describe('Links', () => {
  let app: App

  beforeAll(async () => {
    app = await start()
  })

  afterAll(async () => {
    await app.stop()
  })

  it('visits a different page', async () => {
    /* app.page.on('load', () => {
      throw 'A location/non-SPA visit was detected'
    }) */

    await app.navigate('/')

    await app.page.locator('button.links-method').click()
    await app.page.waitForResponse(`${BASE_URL}/links/method`)
    await app.page.waitForNavigation()
    expect(app.page.url()).toEqual(`${BASE_URL}/links/method`)

    const entryText = await app.page
      .locator('span.text')
      .map((el) => el.textContent)
      .wait()

    expect(entryText).toEqual(
      'This is the links page that demonstrates inertia-link methods'
    )
  })

  it('can make a location visit', async () => {
    await app.navigate('/links/location')

    await app.page.locator('a.example').click()
    await app.page.waitForResponse(`${BASE_URL}/dump/get`)
    await app.page.waitForNavigation()
    expect(app.page.url()).toEqual(`${BASE_URL}/dump/get`)

    const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
      return JSON.parse(el.dataset.page as string)
    })
    expect(pageProps).toHaveProperty('headers')
    expect(pageProps.headers).not.toHaveProperty('x-inertia')
  })

  // https://github.com/so-teneff/jest-pupeteer/blob/master/src/index.spec.js
  describe('Auto-cancellation', () => {
    const dialogHandler = vi.fn(async (dialog) => await dialog.dismiss())

    beforeAll(() => {
      app.page.on('dialog', dialogHandler)
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('will automatically cancel a pending visits when a new request is made', async () => {
      await app.navigate('/links/automatic-cancellation')

      await app.page.locator('a.visit').click()
      expect(dialogHandler).toHaveBeenCalledTimes(1)

      await app.page.locator('a.visit').click()
      expect(dialogHandler).toHaveBeenCalledTimes(3)
    })
  })

  describe('Method', () => {
    beforeEach(async () => {
      await app.navigate('/links/method')
      expect(app.page.url()).toEqual(`${BASE_URL}/links/method`)
    })

    it('can use the GET method', async () => {
      await app.page.locator('.get').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/get`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/get`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('method', 'get')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form', {})
    })

    it('can use the POST method', async () => {
      await app.page.locator('.post').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/post`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/post`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('method', 'post')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form', {})
    })

    it('can use the PUT method', async () => {
      await app.page.locator('.put').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/put`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/put`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('method', 'put')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form', {})
    })

    it('can use the PATCH method', async () => {
      await app.page.locator('.patch').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/patch`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/patch`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('method', 'patch')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form', {})
    })

    it('can use the DELETE method', async () => {
      await app.page.locator('.delete').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/delete`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/delete`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('method', 'delete')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form', {})
    })
  })

  describe('FormData objects', () => {
    beforeEach(async () => {
      await app.navigate('/links/data/form-data')
      expect(app.page.url()).toEqual(`${BASE_URL}/links/data/form-data`)
    })

    it('can pass data using the POST method', async () => {
      await app.page.locator('.post').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/post`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/post`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('headers')
      expect(pageProps.headers).toHaveProperty('content-type')
      expect(pageProps.headers['content-type']).toContain(
        'multipart/form-data; boundary='
      )
      expect(pageProps).toHaveProperty('method', 'post')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form')
      expect(pageProps.form).toHaveProperty('bar', 'baz')
      expect(pageProps).toHaveProperty('files', [])
    })

    it('can pass data using the PUT method', async () => {
      await app.page.locator('.put').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/put`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/put`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('headers')
      expect(pageProps.headers).toHaveProperty('content-type')
      expect(pageProps.headers['content-type']).toContain(
        'multipart/form-data; boundary='
      )
      expect(pageProps).toHaveProperty('method', 'put')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form')
      expect(pageProps.form).toHaveProperty('bar', 'baz')
      expect(pageProps).toHaveProperty('files', [])
    })

    it('can pass data using the PATCH method', async () => {
      await app.page.locator('.patch').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/patch`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/patch`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('headers')
      expect(pageProps.headers).toHaveProperty('content-type')
      expect(pageProps.headers['content-type']).toContain(
        'multipart/form-data; boundary='
      )
      expect(pageProps).toHaveProperty('method', 'patch')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form')
      expect(pageProps.form).toHaveProperty('bar', 'baz')
      expect(pageProps).toHaveProperty('files', [])
    })

    it('can pass data using the DELETE method', async () => {
      await app.page.locator('.delete').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/delete`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/delete`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('headers')
      expect(pageProps.headers).toHaveProperty('content-type')
      expect(pageProps.headers['content-type']).toContain(
        'multipart/form-data; boundary='
      )
      expect(pageProps).toHaveProperty('method', 'delete')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form')
      expect(pageProps.form).toHaveProperty('bar', 'baz')
      expect(pageProps).toHaveProperty('files', [])
    })
  })

  describe('auto-converted objects (when files are present)', () => {
    beforeEach(async () => {
      await app.navigate('/links/data/auto-converted')
      expect(app.page.url()).toEqual(`${BASE_URL}/links/data/auto-converted`)
    })

    it('auto-converts objects to form-data when files are present using the POST method', async () => {
      await app.page.locator('.post').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/post`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/post`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('headers')
      expect(pageProps.headers).toHaveProperty('content-type')
      expect(pageProps.headers['content-type']).toContain(
        'multipart/form-data; boundary='
      )
      expect(pageProps).toHaveProperty('method', 'post')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form')
      expect(pageProps.form).toHaveProperty('foo', 'bar')
      expect(pageProps).not.toHaveProperty('files', [])
    })

    it('auto-converts objects to form-data when files are present using the PUT method', async () => {
      await app.page.locator('.put').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/put`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/put`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('headers')
      expect(pageProps.headers).toHaveProperty('content-type')
      expect(pageProps.headers['content-type']).toContain(
        'multipart/form-data; boundary='
      )
      expect(pageProps).toHaveProperty('method', 'put')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form')
      expect(pageProps.form).toHaveProperty('foo', 'bar')
      expect(pageProps).not.toHaveProperty('files', [])
    })

    it('auto-converts objects to form-data when files are present using the PATCH method', async () => {
      await app.page.locator('.patch').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/patch`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/patch`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('headers')
      expect(pageProps.headers).toHaveProperty('content-type')
      expect(pageProps.headers['content-type']).toContain(
        'multipart/form-data; boundary='
      )
      expect(pageProps).toHaveProperty('method', 'patch')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form')
      expect(pageProps.form).toHaveProperty('foo', 'bar')
      expect(pageProps).not.toHaveProperty('files', [])
    })

    it('auto-converts objects to form-data when files are present using the DELETE method', async () => {
      await app.page.locator('.delete').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/delete`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/delete`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('headers')
      expect(pageProps.headers).toHaveProperty('content-type')
      expect(pageProps.headers['content-type']).toContain(
        'multipart/form-data; boundary='
      )
      expect(pageProps).toHaveProperty('method', 'delete')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form')
      expect(pageProps.form).toHaveProperty('foo', 'bar')
      expect(pageProps).not.toHaveProperty('files', [])
    })
  })

  describe('Headers', () => {
    it('has the default set of headers', async () => {
      await app.navigate('/links/headers')
      expect(app.page.url()).toEqual(`${BASE_URL}/links/headers`)

      await app.page.locator('.default').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/get`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/get`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('headers')
      expect(pageProps.headers).toHaveProperty(
        'accept',
        'text/html, application/xhtml+xml'
      )
      expect(pageProps.headers).toHaveProperty(
        'x-requested-with',
        'XMLHttpRequest'
      )
      expect(pageProps.headers).toHaveProperty('x-inertia', 'true')
      expect(pageProps.headers).not.toHaveProperty('x-inertia-version')
    })

    it('starts using the x-inertia-version header when a version was given from the back-end', async () => {
      await app.navigate('/links/headers/version')
      expect(app.page.url()).toEqual(`${BASE_URL}/links/headers/version`)

      await app.page.locator('.default').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/get`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/get`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('headers')
      expect(pageProps.headers).toHaveProperty(
        'x-inertia-version',
        'example-version-header'
      )
    })

    it('allows to set custom headers', async () => {
      await app.navigate('/links/headers')
      expect(app.page.url()).toEqual(`${BASE_URL}/links/headers`)

      await app.page.locator('.custom').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/get`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/get`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('headers')
      expect(pageProps.headers).toHaveProperty(
        'accept',
        'text/html, application/xhtml+xml'
      )
      expect(pageProps.headers).toHaveProperty(
        'x-requested-with',
        'XMLHttpRequest'
      )
      expect(pageProps.headers).toHaveProperty('x-inertia', 'true')
      expect(pageProps.headers).toHaveProperty('foo', 'bar')
    })

    it('cannot override built-in Inertia headers', async () => {
      await app.navigate('/links/headers')
      expect(app.page.url()).toEqual(`${BASE_URL}/links/headers`)

      await app.page.locator('.overridden').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/post`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/post`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('headers')
      expect(pageProps.headers).toHaveProperty(
        'accept',
        'text/html, application/xhtml+xml'
      )
      expect(pageProps.headers).toHaveProperty(
        'x-requested-with',
        'XMLHttpRequest'
      )
      expect(pageProps.headers).toHaveProperty('x-inertia', 'true')
      expect(pageProps.headers).toHaveProperty('bar', 'baz')
    })
  })

  describe('Replace', () => {
    beforeEach(async () => {})

    it('replaces the current history state', async () => {})

    it('does not replace the current history state when it is set to false', async () => {})
  })

  describe('Preserve state', () => {
    beforeEach(async () => {})

    it("preserves the page's local state", async () => {})

    it("preserves the page's local state (callback)", async () => {})

    it("does not preserve the page's local state", async () => {})

    it("does not preserve the page's local state (callback)", async () => {})
  })

  describe('Preserve scroll', () => {
    beforeEach(async () => {})

    describe('disabled (default)', () => {
      beforeEach(async () => {})

      it('does not reset untracked scroll regions in persistent layouts', async () => {})

      it('does not reset untracked scroll regions in persistent layouts when returning false from a preserveScroll callback', async () => {})

      it('does not restore untracked scroll regions when pressing the back button', async () => {})

      it('does not restore untracked scroll regions when returning true from a preserveScroll callback', async () => {})

      it('does not restore untracked scroll regions when pressing the back button from another website', async () => {})
    })

    describe('enabled', () => {
      beforeEach(async () => {})

      it('resets scroll regions to the top when doing a regular visit', async () => {})

      it('resets scroll regions to the top when returning false from a preserveScroll callback', async () => {})

      it('preserves scroll regions when using the "preserve-scroll" feature', async () => {})

      it('preserves scroll regions when using the "preserve-scroll" feature from a callback', async () => {})

      it('restores all tracked scroll regions when pressing the back button', async () => {})

      it.skip('restores all tracked scroll regions when pressing the back button from another website', async () => {})
    })
  })

  describe('URL fragment navigation (& automatic scrolling)', () => {
    beforeEach(async () => {})

    it('Scrolls to the fragment element when making a visit to a different page', async () => {})

    it('Scrolls to the fragment element when making a visit to the same page', async () => {})

    it('Does not scroll to the fragment element when it does not exist on the page', async () => {})
  })

  describe('Partial Reloads', () => {
    beforeEach(async () => {})

    it('does not have headers specific to partial reloads when the feature is not being used', async () => {})

    it('has headers specific to partial reloads', async () => {})

    it('it updates all props when the feature is not being used', async () => {})

    it('it only updates props that are passed through "only"', async () => {})

    it('it only updates props that are not passed through "except"', async () => {})
  })

  describe('Redirects', () => {
    beforeEach(async () => {})

    it('follows 303 redirects', async () => {})

    it('follows external redirects', async () => {})
  })

  describe('"as" warning', () => {
    it('shows no warning when using GET inertia-links', async () => {})

    it('shows a warning when using POST inertia-links using the anchor tag', async () => {})

    it('shows no warning when using POST inertia-links "as" a non-anchor tag', async () => {})

    it('shows a warning when using PUT inertia-links using the anchor tag', async () => {})

    it('shows no warning when using PUT inertia-links "as" a non-anchor tag', async () => {})

    it('shows a warning when using PATCH inertia-links using the anchor tag', async () => {})

    it('shows no warning when using PATCH inertia-links "as" a non-anchor tag', async () => {})

    it('shows a warning when using DELETE inertia-links using the anchor tag', async () => {})

    it('shows no warning when using DELETE inertia-links "as" a non-anchor tag', async () => {})
  })
})
