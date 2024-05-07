import {
  type HeadManager,
  type HeadManagerOnUpdate,
  type HeadManagerTitleCallback,
  type Page,
  type PageProps,
  type PageResolver,
  createHeadManager,
  router,
} from '@inertiajs-revamped/core'
import {
  type Plugin,
  type PropType,
  type Ref,
  computed,
  defineComponent,
  h,
  markRaw,
  reactive,
  ref,
  shallowRef,
} from 'vue'
import remember from './remember'
import type { InertiaComponentType } from './types'
import useForm from './useForm'

const page = ref({}) as Ref<Page>
const layout = shallowRef(null)

let headManager: HeadManager | null = null

const App = defineComponent({
  name: 'Inertia',
  props: {
    initialPage: {
      type: Object as PropType<Page>,
      required: true,
    },
    initialComponent: {
      type: [Object, Function, String] as PropType<InertiaComponentType>,
      required: false,
    },
    resolveComponent: {
      type: Function as PropType<PageResolver<InertiaComponentType>>,
      required: true,
    },
    titleCallback: {
      type: Function as PropType<HeadManagerTitleCallback>,
      required: false,
      default: ((title) => title) as HeadManagerTitleCallback,
    },
    onHeadUpdate: {
      type: [
        Function,
        null,
      ] as unknown as Object as PropType<HeadManagerOnUpdate | null>,
      required: false,
      default: () => {},
    },
  },
  setup({
    initialPage,
    initialComponent,
    resolveComponent,
    titleCallback,
    onHeadUpdate,
  }) {
    const component = ref(initialComponent ? markRaw(initialComponent) : null)
    page.value = initialPage
    const key = ref<number | string | undefined>(undefined)

    const isServer = typeof window === 'undefined'
    headManager = createHeadManager(
      isServer,
      titleCallback,
      onHeadUpdate ? onHeadUpdate : () => {}
    )

    if (!isServer) {
      router.init({
        initialPage,
        resolveComponent,
        swapComponent: async ({
          component: NextComponent,
          page: NextPage,
          preserveState,
        }) => {
          component.value = markRaw(NextComponent as InertiaComponentType)
          page.value = NextPage
          key.value = preserveState ? key.value : Date.now()
        },
      })

      router.on('navigate', () => headManager?.forceUpdate())
    }

    return () => {
      if (component.value) {
        component.value.inheritAttrs = !!component.value.inheritAttrs

        const child = h(component.value, {
          ...page.value.props,
          key: key.value,
        })

        if (layout.value) {
          component.value.layout = layout.value
          layout.value = null
        }

        if (component.value.layout) {
          if (typeof component.value.layout === 'function') {
            return component.value.layout(h, child)
          }

          return (
            Array.isArray(component.value.layout)
              ? component.value.layout
              : [component.value.layout]
          )
            .concat(child)
            .reverse()
            .reduce((child, layout) => {
              layout.inheritAttrs = !!layout.inheritAttrs
              return h(layout, { ...page.value.props }, () => child)
            })
        }

        return child
      }
    }
  },
})
export default App

export const plugin: Plugin = {
  install(app) {
    router.form = useForm

    Object.defineProperty(app.config.globalProperties, '$inertia', {
      get: () => router,
    })
    Object.defineProperty(app.config.globalProperties, '$page', {
      get: () => page.value,
    })
    Object.defineProperty(app.config.globalProperties, '$headManager', {
      get: () => headManager,
    })

    app.mixin(remember)
  },
}

export function usePage<
  SharedProps extends PageProps = PageProps,
>(): Page<SharedProps> {
  return reactive({
    props: computed(() => (page.value as Page<SharedProps>).props),
    url: computed(() => page.value?.url),
    component: computed(() => page.value?.component),
    version: computed(() => page.value?.version),
    scrollRegions: computed(() => page.value?.scrollRegions),
    rememberedState: computed(() => page.value?.rememberedState),
  })
}
