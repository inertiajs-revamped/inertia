import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest'
import { type App, start } from './helper'

describe('Inertia', () => {
  let app: App

  beforeAll(async () => {
    app = await start()
  })

  beforeEach(async () => {
    app.page.once('load', () =>
      app.page.on('window:load', () => {
        alert('A location/non-SPA visit was detected')
      })
    )
    await app.navigate('/error-modal')
  })

  afterAll(async () => {
    await app.stop()
  })

  it('displays the modal containing the response as HTML when an invalid Inertia response comes back', async () => {
    //await app.page.locator('span.invalid-visit').click()
  })
})
