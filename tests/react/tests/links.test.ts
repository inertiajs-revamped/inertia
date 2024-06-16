import { type Browser, type Page, launch } from 'puppeteer'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

describe('Links', () => {
  let page: Page
  let browser: Browser

  beforeAll(async () => {
    browser = await launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    page = await browser.newPage()
  })

  afterEach(async () => {
    await page.close()
    page = await browser.newPage()
  })

  afterAll(async () => {
    await browser.close()
  })

  it('visits a different page', async () => {
    await page.goto('http://127.0.0.1:12345/', {
      waitUntil: 'domcontentloaded',
    })

    await Promise.all([page.click('button.links-method')])

    await page.waitForNavigation()

    expect(page.url()).toEqual('http://127.0.0.1:12345/links/method')
  })
})
