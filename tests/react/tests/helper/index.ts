import { Browser, Page, launch } from 'puppeteer'

export const BASE_URL = 'http://localhost:12345'

export type App = {
  navigate(path: string): Promise<void>
  stop(): Promise<void>
  browser: Browser
  page: Page
}

async function openBrowser() {
  const browser = await launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  return { browser, page }
}

export async function start(): Promise<App> {
  const { browser, page } = await openBrowser()

  return {
    browser,
    page,
    navigate: async (path: string) => {
      let url = new URL(path, BASE_URL)
      await page.goto(url.toString(), {
        waitUntil: 'domcontentloaded',
      })
    },
    stop: async () => {
      await browser.close()
    },
  }
}

export const evalTextInput = async (page: Page, selector: string) => {
  const text = await page.evaluate((selector) => {
    return document.querySelector<HTMLInputElement>(selector)?.value
  }, selector)
  return text
}

export const evalCheckbox = async (page: Page, selector: string) => {
  const checkbox = await page.evaluate((selector) => {
    return document.querySelector<HTMLInputElement>(selector)?.checked
  }, selector)
  return checkbox
}

export const evalText = async (page: Page, selector: string) => {
  const text = await page.evaluate((selector) => {
    return document.querySelector<HTMLSpanElement>(selector)?.innerText
  }, selector)
  return text
}
