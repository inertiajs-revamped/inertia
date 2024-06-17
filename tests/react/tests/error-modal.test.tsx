/* import { type Browser, type Page, launch } from 'puppeteer'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Error Modal', () => {
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

  it('displays the modal containing the response as HTML when an invalid Inertia response comes back', async () => {
    await page.goto('http://127.0.0.1:12345/error-modal', {
      waitUntil: 'domcontentloaded',
    })

    await Promise.all([page.click('span.invalid-visit')])

    const iframe = await page.waitForSelector('iframe')

    console.log(iframe)
  })
})
 */

import { expect, it } from 'vitest'

function sum(a: number, b: number) {
  return a + b
}

it('add 2 numbers', () => {
  expect(sum(2, 3)).toEqual(5)
})
