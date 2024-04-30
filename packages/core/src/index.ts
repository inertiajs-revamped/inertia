import { Router } from './router'

export { default as createHeadManager } from './head'
export { default as shouldIntercept } from './shouldIntercept'
export { hrefToUrl, mergeDataIntoQueryString, urlWithoutHash } from './url'
export { hasFiles, objectToFormData } from './form-data'
export { default as debounce } from './debounce'
export { resolvePageComponent } from './helper'

export type { Router }
export * from './types'

export const router = new Router()
