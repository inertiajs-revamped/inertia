import { type Page, type PageHandler, createHeadManager, router } from '@inertiajs-revamped/core'
import type { ComponentPublicInstance } from 'vue'
import useForm from './useForm'

export type VuePageHandlerArgs = Parameters<PageHandler>[0] & {
  component: ComponentPublicInstance | Promise<ComponentPublicInstance>
}

declare module '@inertiajs-revamped/core' {
  export interface Router {
    form: typeof useForm
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $inertia: typeof router
    $page: Page
    $headManager: ReturnType<typeof createHeadManager>
  }

  export interface ComponentCustomOptions {
    remember?:
      | string
      | string[]
      | {
          data: string | string[]
          key?: string | (() => string)
        }
  }
}
