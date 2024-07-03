import type { ElementHandle, Page } from '@playwright/test'

declare global {
  var testing: Partial<{
    Inertia: any
    vue: any
  }>
  var initialPage: any
  var initialComponent: any
  var _inertia_request_dump: {
    headers: Record<string, any> | undefined
    method: string | undefined
    form: Record<string, any> | undefined
    files: {}
    query: Record<string, any> | undefined
  }
  var _inertia_props: any
  var _inertia_page_key: any | null
  var _inertia_page_props: any
  var _inertia_site_layout_props: any
  var _inertia_nested_layout_props: any
}

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
