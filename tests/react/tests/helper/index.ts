import type { Page } from 'puppeteer'

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
