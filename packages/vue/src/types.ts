import { type Page, createHeadManager, router } from '@inertiajs-revamped/core'
import type { DefineComponent } from 'vue'
import useForm from './useForm'

export type InertiaComponentType<P = {}> = DefineComponent<P, any, any, any>

declare module '@inertiajs-revamped/core' {
  export interface Router {
    form: typeof useForm
  }
}

declare module '@vue/runtime-core' {
  /** https://vuejs.org/api/utility-types.html#componentcustomproperties */
  export interface ComponentCustomProperties {
    $inertia: typeof router
    $page: Page
    $headManager: ReturnType<typeof createHeadManager>
  }

  /** https://vuejs.org/api/utility-types.html#componentcustomoptions */
  export interface ComponentCustomOptions {
    // needs work
    layout?: any
    remember?:
      | string
      | string[]
      | {
          data: string | string[]
          key?: string | (() => string)
        }
  }

  /**
   * https://vuejs.org/api/utility-types.html#componentcustomprops
   *
   * export interface ComponentCustomProps {}
   */
}
