import { Router } from './router'

export { debounce } from './debounce'
export { hasFiles, objectToFormData } from './form-data'
export { createHeadManager } from './head'
export { resolvePageComponent } from './helper'
export { shouldIntercept } from './shouldIntercept'
export {
  hrefToUrl,
  mergeDataIntoQueryString,
  objectToUrlParams,
  urlParamsToObject,
  urlWithoutHash,
} from './url'
export { getStructuredClone } from './utils'

export type { Router }
export * from './types'

export const router = new Router()
