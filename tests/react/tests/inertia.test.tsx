import { type Browser, type Page, launch } from 'puppeteer'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Inertia', () => {
  let page: Page
  let browser: Browser

  beforeAll(async () => {
    browser = await launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    page = await browser.newPage()
  })

  afterAll(async () => {
    await browser.close()
  })

  it('mounts the initial page', async () => {
    await page.goto('http://127.0.0.1:12345/', {
      waitUntil: 'domcontentloaded',
    })

    const textSelector = await page.waitForSelector(
      'text/This is the Test App Entrypoint page'
    )
    const text = await textSelector?.evaluate((el) => el.textContent)

    expect(text).toEqual('This is the Test App Entrypoint page')
  })
})
