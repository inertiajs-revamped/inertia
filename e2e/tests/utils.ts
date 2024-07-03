import type { ElementHandle, Page } from '@playwright/test'

export const getWindowScrollTop = (page: Page) => {
  return page.evaluate(() => window.document.documentElement.scrollTop)
}

export const scrollTo = (
  scrollable: ElementHandle<HTMLElement | SVGElement>,
  offset: number
) => {
  return scrollable.evaluate((e, offset) => {
    e.scrollTop = offset
  }, offset)
}
