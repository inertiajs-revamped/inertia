import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest'
import { type App, start } from './helper'

// todo
describe('Error Modal', () => {
  let app: App

  beforeAll(async () => {
    app = await start()
  })

  beforeEach(async () => {
    await app.navigate('/error-modal')
  })

  afterAll(async () => {
    await app.stop()
  })

  it('displays the modal containing the response as HTML when an invalid Inertia response comes back', async () => {})

  it('displays the modal with a helpful message when a regular JSON response comes back instead of an Inertia response', async () => {})

  it('can close the modal using the escape key', async () => {})
})
