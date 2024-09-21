import { Router } from './router'

export { createHeadManager } from './head'
export { shouldIntercept } from './should-intercept'
export { hrefToUrl, mergeDataIntoQueryString, urlWithoutHash } from './url'
export { objectToFormData } from './form-data'
export { hasFiles } from './files'
export { resolvePageComponent } from './helper'

export type { Router }
export * from './types'

export const router = new Router()
