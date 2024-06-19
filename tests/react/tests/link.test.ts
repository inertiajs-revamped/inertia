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
import {
  type App,
  BASE_URL,
  getInputValue,
  getTextValue,
  start,
} from './helper'

describe('Links', () => {
  let app: App

  beforeAll(async () => {
    app = await start()
  })

  afterAll(async () => {
    await app.stop()
  })

  it('visits a different page', async () => {
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

    const pageProps: DumpProps = await app.page
      .locator('pre.dump')
      .map((el) => JSON.parse(el.dataset.page as string))
      .wait()

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

      const pageProps: DumpProps = await app.page
        .locator('pre.dump')
        .map((el) => JSON.parse(el.dataset.page as string))
        .wait()

      expect(pageProps).toHaveProperty('method', 'get')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form', {})
    })

    it('can use the POST method', async () => {
      await app.page.locator('.post').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/post`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/post`)

      const pageProps: DumpProps = await app.page
        .locator('pre.dump')
        .map((el) => JSON.parse(el.dataset.page as string))
        .wait()

      expect(pageProps).toHaveProperty('method', 'post')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form', {})
    })

    it('can use the PUT method', async () => {
      await app.page.locator('.put').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/put`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/put`)

      const pageProps: DumpProps = await app.page
        .locator('pre.dump')
        .map((el) => JSON.parse(el.dataset.page as string))
        .wait()

      expect(pageProps).toHaveProperty('method', 'put')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form', {})
    })

    it('can use the PATCH method', async () => {
      await app.page.locator('.patch').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/patch`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/patch`)

      const pageProps: DumpProps = await app.page
        .locator('pre.dump')
        .map((el) => JSON.parse(el.dataset.page as string))
        .wait()

      expect(pageProps).toHaveProperty('method', 'patch')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form', {})
    })

    it('can use the DELETE method', async () => {
      await app.page.locator('.delete').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/delete`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/delete`)

      const pageProps: DumpProps = await app.page
        .locator('pre.dump')
        .map((el) => JSON.parse(el.dataset.page as string))
        .wait()

      expect(pageProps).toHaveProperty('method', 'delete')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form', {})
    })
  })

  // https://github.com/puppeteer/puppeteer/issues/9864
  describe('Data', () => {
    describe('plain objects', () => {
      beforeEach(async () => {
        await app.navigate('/links/data/object')
        expect(app.page.url()).toEqual(`${BASE_URL}/links/data/object`)
      })

      describe('GET method', () => {
        it('passes data as params', async () => {
          app.page.once('response', async (res) => {
            if (res.url().includes('/dump/')) {
              const req = res.request()
              expect(req.url()).toEqual(`${BASE_URL}/dump/get?foo=get`)
              expect(req).toHaveProperty('headers')
              expect(req.headers).toBeTypeOf('function')
              expect(req.headers()).toHaveProperty(
                'content-type',
                'application/json'
              )
              expect(req.method).toBeTypeOf('function')
              expect(req.method()).to.eq('GET')

              const json = await res.json()
              expect(json).toHaveProperty('props')
              expect(json.props).toHaveProperty('form', {})
              expect(json.props.files).toBeUndefined()
            }
          })

          await app.page.locator('.get').click()
          await app.page.waitForNavigation()
        })

        describe('query string array formatter', () => {
          it('can use the brackets query string array formatter', async () => {
            app.page.once('request', (req) => {
              if (req.url().includes('/dump/')) {
                expect(req.url()).toEqual(`${BASE_URL}/dump/get?a[]=b&a[]=c`)
              }
            })

            await app.page.locator('.qsaf-brackets').click()
            await app.page.waitForNavigation()
          })

          it('can use the indices query string array formatter', async () => {
            app.page.once('request', (req) => {
              if (req.url().includes('/dump/')) {
                expect(req.url()).toEqual(`${BASE_URL}/dump/get?a[0]=b&a[1]=c`)
              }
            })

            await app.page.locator('.qsaf-indices').click()
            await app.page.waitForNavigation()
          })

          it('defaults to using the brackets query string array formatter', async () => {
            app.page.once('request', (req) => {
              if (req.url().includes('/dump/')) {
                expect(req.url()).toEqual(`${BASE_URL}/dump/get?a[]=b&a[]=c`)
              }
            })

            await app.page.locator('.qsaf-default').click()
            await app.page.waitForNavigation()
          })
        })
      })

      it('can pass data using the POST method', async () => {
        app.page.once('response', async (res) => {
          if (res.url().includes('/dump/')) {
            const req = res.request()
            expect(req.url()).toEqual(`${BASE_URL}/dump/post`)
            expect(req).toHaveProperty('headers')
            expect(req.headers).toBeTypeOf('function')
            expect(req.headers()).toHaveProperty(
              'content-type',
              'application/json'
            )
            expect(req.method).toBeTypeOf('function')
            expect(req.method()).to.eq('POST')

            const json = await res.json()
            expect(json).toHaveProperty('props')
            expect(json.props).toHaveProperty('form', { bar: 'post' })
            expect(json.props.files).toBeUndefined()
          }
        })

        await app.page.locator('.post').click()
        await app.page.waitForNavigation()
      })

      it('can pass data using the PUT method', async () => {
        app.page.once('response', async (res) => {
          if (res.url().includes('/dump/')) {
            const req = res.request()
            expect(req.url()).toEqual(`${BASE_URL}/dump/put`)
            expect(req).toHaveProperty('headers')
            expect(req.headers).toBeTypeOf('function')
            expect(req.headers()).toHaveProperty(
              'content-type',
              'application/json'
            )
            expect(req.method).toBeTypeOf('function')
            expect(req.method()).to.eq('PUT')

            const json = await res.json()
            expect(json).toHaveProperty('props')
            expect(json.props).toHaveProperty('form', { baz: 'put' })
            expect(json.props.files).toBeUndefined()
          }
        })

        await app.page.locator('.put').click()
        await app.page.waitForNavigation()
      })

      it('can pass data using the PATCH method', async () => {
        app.page.once('response', async (res) => {
          if (res.url().includes('/dump/')) {
            const req = res.request()
            expect(req.url()).toEqual(`${BASE_URL}/dump/patch`)
            expect(req).toHaveProperty('headers')
            expect(req.headers).toBeTypeOf('function')
            expect(req.headers()).toHaveProperty(
              'content-type',
              'application/json'
            )
            expect(req.method).toBeTypeOf('function')
            expect(req.method()).to.eq('PATCH')

            const json = await res.json()
            expect(json).toHaveProperty('props')
            expect(json.props).toHaveProperty('form', { foo: 'patch' })
            expect(json.props.files).toBeUndefined()
          }
        })

        await app.page.locator('.patch').click()
        await app.page.waitForNavigation()
      })

      it('can pass data using the DELETE method', async () => {
        app.page.once('response', async (res) => {
          if (res.url().includes('/dump/')) {
            const req = res.request()
            expect(req.url()).toEqual(`${BASE_URL}/dump/delete`)
            expect(req).toHaveProperty('headers')
            expect(req.headers).toBeTypeOf('function')
            expect(req.headers()).toHaveProperty(
              'content-type',
              'application/json'
            )
            expect(req.method).toBeTypeOf('function')
            expect(req.method()).to.eq('DELETE')

            const json = await res.json()
            expect(json).toHaveProperty('props')
            expect(json.props).toHaveProperty('form', { bar: 'delete' })
            expect(json.props.files).toBeUndefined()
          }
        })

        await app.page.locator('.delete').click()
        await app.page.waitForNavigation()
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
  })

  describe('Replace', () => {
    beforeEach(async () => {
      await app.navigate('/')
      expect(app.page.url()).toEqual(`${BASE_URL}/`)

      await app.page.locator('.links-replace').click()
      await app.page.waitForResponse(`${BASE_URL}/links/replace`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/links/replace`)
    })

    afterEach(() => {})

    it('replaces the current history state', async () => {
      await app.page.locator('.replace').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/get`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/get`)

      await app.page.goBack()
      expect(app.page.url()).toEqual(`${BASE_URL}/`)

      await app.page.goForward()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/get`)
    })

    it('does not replace the current history state when it is set to false', async () => {
      await app.page.locator('.replace-false').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/get`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/get`)

      await app.page.goBack()
      expect(app.page.url()).toEqual(`${BASE_URL}/links/replace`)

      await app.page.goForward()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/get`)
    })
  })

  describe('Preserve state', () => {
    beforeEach(async () => {
      await app.navigate('/links/preserve-state')
      expect(app.page.url()).toEqual(`${BASE_URL}/links/preserve-state`)
    })

    it("preserves the page's local state", async () => {
      expect(await getTextValue(app.page, '.foo')).toEqual('Foo is now default')

      await app.page.locator('.field').fill('Example value')

      await Promise.all([
        app.page.waitForNavigation(),
        app.page.locator('.preserve').click(),
      ])
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(
        `${BASE_URL}/links/preserve-state-page-two`
      )
      expect(await getTextValue(app.page, '.foo')).toEqual('Foo is now bar')
      expect(await getInputValue(app.page, '.field')).toEqual('Example value')
    })

    it("preserves the page's local state (callback)", async () => {
      expect(await getTextValue(app.page, '.foo')).toEqual('Foo is now default')

      await app.page.locator('.field').fill('Example value')

      await Promise.all([
        app.page.waitForNavigation(),
        app.page.locator('.preserve-callback').click(),
      ])
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(
        `${BASE_URL}/links/preserve-state-page-two`
      )
      expect(await getTextValue(app.page, '.foo')).toEqual(
        'Foo is now callback-bar'
      )
      expect(await getInputValue(app.page, '.field')).toEqual('Example value')
    })

    it("does not preserve the page's local state", async () => {
      expect(await getTextValue(app.page, '.foo')).toEqual('Foo is now default')

      await app.page.locator('.field').fill('Another value')

      await Promise.all([
        app.page.waitForNavigation(),
        app.page.locator('.preserve-false').click(),
      ])
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(
        `${BASE_URL}/links/preserve-state-page-two`
      )
      expect(await getTextValue(app.page, '.foo')).toEqual('Foo is now baz')
      expect(await getInputValue(app.page, '.field')).toEqual('')
    })

    it("does not preserve the page's local state (callback)", async () => {
      expect(await getTextValue(app.page, '.foo')).toEqual('Foo is now default')

      await app.page.locator('.field').fill('Another value')

      await Promise.all([
        app.page.waitForNavigation(),
        app.page.locator('.preserve-callback-false').click(),
      ])
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(
        `${BASE_URL}/links/preserve-state-page-two`
      )
      expect(await getTextValue(app.page, '.foo')).toEqual(
        'Foo is now callback-baz'
      )
      expect(await getInputValue(app.page, '.field')).toEqual('')
    })
  })

  describe('Partial Reloads', () => {
    beforeEach(async () => {
      await app.navigate('/links/partial-reloads')
      expect(app.page.url()).toEqual(`${BASE_URL}/links/partial-reloads`)
      expect(await getTextValue(app.page, '.foo-text')).toEqual('Foo is now 1')
      expect(await getTextValue(app.page, '.bar-text')).toEqual('Bar is now 2')
      expect(await getTextValue(app.page, '.baz-text')).toEqual('Baz is now 3')
    })

    it('does not have headers specific to partial reloads when the feature is not being used', async () => {
      app.page.once('requestfinished', (req) => {
        if (req.url().includes('/links/partial-reloads')) {
          expect(req.url()).toEqual(`${BASE_URL}/links/partial-reloads?foo=1`)
          expect(req).toHaveProperty('headers')
          expect(req.headers).toBeTypeOf('function')
          expect(req.headers()).not.toHaveProperty(
            'x-inertia-partial-component'
          )
          expect(req.headers()).not.toHaveProperty('x-inertia-partial-data')
        }
      })

      await app.page.locator('.all').click()
    })

    it('has headers specific to partial reloads', async () => {
      app.page.once('requestfinished', (req) => {
        if (req.url().includes('/links/partial-reloads')) {
          expect(req.url()).toEqual(`${BASE_URL}/links/partial-reloads?foo=1`)
          expect(req).toHaveProperty('headers')
          expect(req.headers).toBeTypeOf('function')
          expect(req.headers()).toHaveProperty(
            'accept',
            'text/html, application/xhtml+xml'
          )
          expect(req.headers()).toHaveProperty(
            'content-type',
            'application/json'
          )
          expect(req.headers()).toHaveProperty('x-inertia', 'true')
          expect(req.headers()).toHaveProperty(
            'x-inertia-partial-component',
            'links/partial-reloads'
          )
          expect(req.headers()).toHaveProperty(
            'x-inertia-partial-data',
            'headers,foo,bar'
          )
        }
      })

      await app.page.locator('.foo-bar').click()
    })

    // https://github.com/puppeteer/puppeteer/issues/1412#issuecomment-1232524682
    it('it updates all props when the feature is not being used', async () => {
      await app.page.locator('.all').click()
      await app.page.waitForResponse((response) => response.status() === 200)
      expect(app.page.url()).toEqual(`${BASE_URL}/links/partial-reloads`)
      expect(await getTextValue(app.page, '.foo-text')).toEqual('Foo is now 2')
      expect(await getTextValue(app.page, '.bar-text')).toEqual('Bar is now 3')
      expect(await getTextValue(app.page, '.baz-text')).toEqual('Baz is now 4')
    })

    /* it('it only updates props that are passed through "only"', async () => {
      await app.page.locator('.foo-bar').click()
      await app.page.waitForResponse((response) => response.status() === 200)
      expect(app.page.url()).toEqual(`${BASE_URL}/links/partial-reloads`)
      expect(await getTextValue(app.page, '.foo-text')).toEqual('Foo is now 2')
      expect(await getTextValue(app.page, '.bar-text')).toEqual('Bar is now 3')
      expect(await getTextValue(app.page, '.baz-text')).toEqual('Baz is now 3')

      await app.page.locator('.baz').click()
      await app.page.waitForResponse((response) => response.status() === 200)
      expect(app.page.url()).toEqual(`${BASE_URL}/links/partial-reloads`)
      expect(await getTextValue(app.page, '.foo-text')).toEqual('Foo is now 2')
      expect(await getTextValue(app.page, '.bar-text')).toEqual('Bar is now 3')
      expect(await getTextValue(app.page, '.baz-text')).toEqual('Baz is now 5')

      await app.page.locator('.all').click()
      await app.page.waitForResponse((response) => response.status() === 200)
      expect(app.page.url()).toEqual(`${BASE_URL}/links/partial-reloads`)
      expect(await getTextValue(app.page, '.foo-text')).toEqual('Foo is now 3')
      expect(await getTextValue(app.page, '.bar-text')).toEqual('Bar is now 4')
      expect(await getTextValue(app.page, '.baz-text')).toEqual('Baz is now 5')
    }) */

    it('it only updates props that are not passed through "except"', async () => {
      await app.page.locator('.except-foo-bar').click()
      await app.page.waitForResponse((response) => response.status() === 200)
      expect(app.page.url()).toEqual(`${BASE_URL}/links/partial-reloads`)
      expect(await getTextValue(app.page, '.foo-text')).toEqual('Foo is now 1')
      expect(await getTextValue(app.page, '.bar-text')).toEqual('Bar is now 2')
      expect(await getTextValue(app.page, '.baz-text')).toEqual('Baz is now 4')

      await app.page.locator('.except-baz').click()
      await app.page.waitForResponse((response) => response.status() === 200)
      expect(app.page.url()).toEqual(`${BASE_URL}/links/partial-reloads`)
      expect(await getTextValue(app.page, '.foo-text')).toEqual('Foo is now 2')
      expect(await getTextValue(app.page, '.bar-text')).toEqual('Bar is now 3')
      expect(await getTextValue(app.page, '.baz-text')).toEqual('Baz is now 4')
    })
  })

  describe('Redirects', () => {
    beforeEach(async () => {
      vi.stubGlobal('alert', vi.fn())

      app.page.on('dialog', async (dialog) => await dialog.dismiss())

      await app.navigate('/')
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('follows 303 redirects', async () => {
      await app.page.locator('.links-redirect').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/get`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/get`)
      expect(global.window.alert).toHaveBeenCalledTimes(0)
    })

    it('follows external redirects', async () => {
      app.page.on('request', (req) => {
        if (req.url().endsWith('/non-inertia')) {
          global.window.alert('A location/non-SPA visit was detected')
        }
      })

      await app.page.locator('.links-redirect-external').click()
      await app.page.waitForResponse(`${BASE_URL}/non-inertia`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/non-inertia`)
      expect(global.window.alert).toHaveBeenCalledTimes(1)
      expect(global.window.alert).toBeCalledWith(
        'A location/non-SPA visit was detected'
      )
    })
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
