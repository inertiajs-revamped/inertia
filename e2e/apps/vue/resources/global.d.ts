import {
  type InertiaComponentType,
  type Page,
  type PageProps,
  router,
} from '@inertiajs-revamped/vue'
import type {
  ComponentOptions,
  ComponentPublicInstance,
  ComputedRef,
} from 'vue'

declare global {
  var testing: Partial<{
    Inertia: typeof router
    vue: ComponentPublicInstance
  }>
  var initialPage: Page
  var initialComponent: InertiaComponentType
  var _inertia_request_dump: ComputedRef<{
    headers: Record<string, any> | undefined
    method: string | undefined
    form: Record<string, any> | undefined
    files: {}
    query: Record<string, any> | undefined
  }>
  var _inertia_props: PageProps
  var _inertia_page_key: PropertyKey | null
  var _inertia_page_props: (Data & ComponentOptions) | undefined
  var _inertia_site_layout_props: any
  var _inertia_nested_layout_props: any
}
