import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { type App, start } from './helper'

describe('Inertia', () => {
  let app: App

  beforeAll(async () => {
    app = await start()
  })

  afterAll(async () => {
    await app.stop()
  })

  it('mounts the initial page', async () => {
    await app.navigate('/')
    const entryText = await app.page
      .locator('span.text')
      .map((el) => el.textContent)
      .wait()

    expect(entryText).toEqual('This is the Test App Entrypoint page')
  })
})
