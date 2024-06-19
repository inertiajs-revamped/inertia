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
import { type App, start } from './helper'

describe('Error Modal', () => {
  let app: App

  beforeAll(async () => {
    app = await start()
  })

  beforeEach(async () => {
    vi.stubGlobal('alert', vi.fn())

    app.page.on('dialog', async (dialog) => await dialog.dismiss())
    app.page.on('load', () => alert('A location/non-SPA visit was detected'))

    await app.navigate('/error-modal')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  afterAll(async () => {
    await app.stop()
  })

  it('displays the modal containing the response as HTML when an invalid Inertia response comes back', async () => {
    await app.page.locator('.invalid-visit').click()
    expect(global.window.alert).toHaveBeenCalledTimes(1)
    expect(global.window.alert).toBeCalledWith(
      'A location/non-SPA visit was detected'
    )

    await app.page.waitForNetworkIdle()

    // https://www.checklyhq.com/learn/headless/iframes/
    const iframeHandle = await app.page.$('iframe')
    const iframe = await iframeHandle?.contentFrame()
    const body = await iframe?.$('body')

    expect(await body?.evaluate((el) => el.innerText)).toEqual(
      'This is a page that does not have the Inertia app loaded.'
    )
  })

  it('displays the modal with a helpful message when a regular JSON response comes back instead of an Inertia response', async () => {
    await app.page.locator('.invalid-visit-json').click()
    await app.page.waitForNetworkIdle()

    const iframeHandle = await app.page.$('iframe')
    const iframe = await iframeHandle?.contentFrame()
    const body = await iframe?.$('body')

    expect(await body?.evaluate((el) => el.innerText)).toEqual(
      'All Inertia requests must receive a valid Inertia response, however a plain JSON response was received.\n{"foo":"bar"}'
    )
  })

  it('can close the modal using the escape key', async () => {
    await app.page.locator('.invalid-visit').click()
    await app.page.waitForNetworkIdle()

    let iframeHandle = await app.page.$('iframe')
    let iframe = await iframeHandle?.contentFrame()
    const body = await iframe?.$('body')

    expect(await body?.evaluate((el) => el.innerText)).toEqual(
      'This is a page that does not have the Inertia app loaded.'
    )

    await app.page.keyboard.press('Escape')

    iframeHandle = await app.page.$('iframe')
    iframe = await iframeHandle?.contentFrame()

    expect(iframe).toBeUndefined()
  })
})
