import {
  type InertiaComponentType,
  type Page,
  router,
} from '@inertiajs-revamped/vue'
import type { ComponentPublicInstance } from 'vue'

declare global {
  var testing: Partial<{
    Inertia: typeof router
    vue: ComponentPublicInstance
  }>
  var initialPage: Page
  var initialComponent: InertiaComponentType
  var _inertia_page_key: PropertyKey | null
}
