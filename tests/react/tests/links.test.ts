import { afterAll, beforeAll, describe, expect, it } from 'vitest'
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
    app.page.once('load', () =>
      app.page.on('window:load', () => {
        throw 'A location/non-SPA visit was detected'
      })
    )

    await app.navigate('/')
    await app.page.locator('button.links-method').click()
    await app.page.waitForResponse(`${BASE_URL}/links/method`)
    await app.page.waitForNavigation()

    expect(app.page.url()).toEqual(`${BASE_URL}/links/method`)
  })
})
